/*
 * Copyright (c) 2012 Chukong Technologies, Inc.
 *
 * http://www.sweetpome.com
 * http://tools.cocoachina.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

#include <iostream>
#include "SPContentManager.h"
#include "SPContentCompressor.h"
#include "SPContentEncryptionManager.h"
#include <zlib.h>
#include "cocos2d.h"

using namespace std;

#define BLANK_MARK              0xFFFFFFFF
#define CM_BUFFER_ALIGNSIZE     16
#define CM_DATABUF_EXTRA        512

static inline int SizeAlign(int nSize)
{
    nSize = nSize / CM_BUFFER_ALIGNSIZE + (nSize % CM_BUFFER_ALIGNSIZE ? 2 : 1);
    nSize *= CM_BUFFER_ALIGNSIZE;
    return nSize;
}

SPFileOperator::SPFileOperator()
{
    m_pnEncryptKey = NULL;
    m_bHashTableCreated = false;
    prepareStormBuffer();
}

void SPFileOperator::prepareStormBuffer()
{
    unsigned int dwSeed = 0x00100001;
    unsigned int index1 = 0;
    unsigned int index2 = 0;
    int   i;

    if(m_bHashTableCreated == false)
    {
        for(index1 = 0; index1 < 0x100; index1++)
        {
            for(index2 = index1, i = 0; i < 5; i++, index2 += 0x100)
            {
                unsigned int temp1, temp2;
                
                dwSeed = (dwSeed * 125 + 3) % 0x2AAAAB;
                temp1  = (dwSeed & 0xFFFF) << 0x10;
                
                dwSeed = (dwSeed * 125 + 3) % 0x2AAAAB;
                temp2  = (dwSeed & 0xFFFF);
                
                m_dwHashTable[index2] = (temp1 | temp2);
            }
        }
        m_bHashTableCreated = true;
    }
}

unsigned int SPFileOperator::calculateHashIndex(unsigned int nEntryCount, const char * szFileName)
{
    BYTE * pbKey   = (BYTE *)szFileName;
    unsigned int  dwSeed1 = 0x7FED7FED;
    unsigned int  dwSeed2 = 0xEEEEEEEE;
    unsigned int  ch;
    
    while(*pbKey != 0)
    {
        ch = toupper(*pbKey++);
        
        dwSeed1 = m_dwHashTable[0x000 + ch] ^ (dwSeed1 + dwSeed2);
        dwSeed2 = ch + dwSeed1 + dwSeed2 + (dwSeed2 << 5) + 3;
    }
    return (dwSeed1 & nEntryCount - 1);
}

unsigned int SPFileOperator::calculateName1(const char * szFileName)
{
    BYTE * pbKey   = (BYTE *)szFileName;
    unsigned int  dwSeed1 = 0x7FED7FED;
    unsigned int  dwSeed2 = 0xEEEEEEEE;
    unsigned int  ch;
    
    while(*pbKey != 0)
    {
        ch = toupper(*pbKey++);
        
        dwSeed1 = m_dwHashTable[0x100 + ch] ^ (dwSeed1 + dwSeed2);
        dwSeed2 = ch + dwSeed1 + dwSeed2 + (dwSeed2 << 5) + 3;
    }
    return dwSeed1;
}

unsigned int SPFileOperator::calculateName2(const char * szFileName)
{
    BYTE * pbKey   = (BYTE *)szFileName;
    unsigned int  dwSeed1 = 0x7FED7FED;
    unsigned int  dwSeed2 = 0xEEEEEEEE;
    int    ch;
    
    while(*pbKey != 0)
    {
        ch = toupper(*pbKey++);
        
        dwSeed1 = m_dwHashTable[0x200 + ch] ^ (dwSeed1 + dwSeed2);
        dwSeed2 = ch + dwSeed1 + dwSeed2 + (dwSeed2 << 5) + 3;
    }
    return dwSeed1;
}


void SPFileOperator::setEncryptKey(int * pnKey)
{
    m_pnEncryptKey = pnKey;
}


////////////////////////////////////////////////////////////////////////////////

SPPackageMaker::SPPackageMaker() : SPFileOperator()
{
    m_pInputFile = NULL;
    m_pOutputFile = NULL;
}

SPPackageMaker::~SPPackageMaker()
{
    closeFiles();
}

void SPPackageMaker::closeFiles()
{
    if (m_pOutputFile)
    {
        fclose(m_pOutputFile);
        m_pOutputFile = NULL;
    }
    if (m_pInputFile)
    {
        fclose(m_pInputFile);
        m_pInputFile = NULL;
    }
}

string SPPackageMaker::makeValidatePackageName(char * pszName)
{
    string strRet = "";
    if (pszName && *pszName)
    {
        strRet = pszName;

        char * pszFileName;
        size_t nPos = strRet.rfind('/');
        if (string::npos == nPos)
            nPos = strRet.rfind('\\');
        if (string::npos == nPos)
            pszFileName = pszName;
        else
            pszFileName = pszName + nPos;
        while (*pszFileName)
        {
            *pszFileName = tolower(*pszFileName);
            pszFileName++;
        }
        strRet = pszName;
        if (0 != strncmp(strRet.substr(strRet.length() - strlen(PACKAGE_EXTENTION)).c_str(), PACKAGE_EXTENTION, strlen(PACKAGE_EXTENTION)))
        {
            strRet += PACKAGE_EXTENTION;
        }
    }

    return strRet;
}

inline bool SPPackageMaker::isFileExist(char * pszFileName)
{
    FILE * f = fopen(pszFileName, "r");
    bool bRet = (f != NULL);
	if(bRet)
	{
		fclose(f);
	}
    return bRet;
}

int SPPackageMaker::readerFunc(char * buffer, int nSize)
{
    int nRet = fread(buffer, 1, nSize, m_pInputFile);
    m_nSrcFileSize += nRet;
    m_nSrcCRC32 = crc32(m_nSrcCRC32, (unsigned char *)buffer, nRet);
    return nRet;
}

int SPPackageMaker::writerFunc(char * buffer, int nSize)
{
    int nRet = fwrite(buffer, 1, nSize, m_pOutputFile);
    m_nDesFileSize += nRet;
    m_nDesCRC32 = crc32(m_nDesCRC32, (unsigned char *)buffer, nRet);
    return nRet;
}

inline bool SPPackageMaker::prepaireOutput(char * pszOutput, bool bOverWrite)
{
    bool bRet = false;

    if (!isFileExist(pszOutput) || bOverWrite)
    {
        m_pOutputFile = fopen(pszOutput, "wb+");
        bRet = m_pOutputFile != NULL;
    }

    return bRet;
}

inline bool SPPackageMaker::writeWithCheck(void * buffer, size_t chunkSize, size_t chunkCount, FILE * f)
{
    return (chunkSize * chunkCount == fwrite(buffer, chunkSize, chunkCount, f));
}

inline bool SPPackageMaker::writeHeader(LPSPPackageHeader pHeader, LPSPFileDescriptor pFileDescripts)
{
    bool bRet = false;

    if (m_pOutputFile)
    {
        fseek(m_pOutputFile, 0, SEEK_SET);
        if (writeWithCheck(pHeader, 1, sizeof(SPPackageHeader), m_pOutputFile) && !ferror(m_pOutputFile))
        {
            if (writeWithCheck(pFileDescripts, 1, sizeof(SPFileDescriptor) * pHeader->EntryCount, m_pOutputFile) && !ferror(m_pOutputFile))
                bRet = true;
            fseek(m_pOutputFile, 0, SEEK_END);
        }
    }

    return bRet;
}


LPSPFileDescriptor SPPackageMaker::getCurFileDesPos(LPSPFileDescriptor lpDesList, int nCount, char * pszFileName)
{
    LPSPFileDescriptor pRetDescriptor = NULL;
    unsigned int dwIndex, dwName1, dwName2;
    if (nCount > 0 && lpDesList && pszFileName && *pszFileName)
    {
        dwIndex = calculateHashIndex(nCount, pszFileName);
        dwName1 = calculateName1(pszFileName);
        dwName2 = calculateName2(pszFileName);
        int nCurPos = dwIndex % nCount;
        int nStartPos = nCurPos;
        if (lpDesList[nCurPos].FileIdentifier[0] == BLANK_MARK)
        {
            pRetDescriptor = lpDesList + nCurPos;
        }
        else
        {
            while (lpDesList[nCurPos].FileIdentifier[0] != BLANK_MARK)
            {
                if (lpDesList[nCurPos].FileIdentifier[0] == dwIndex &&
                    lpDesList[nCurPos].FileIdentifier[1] == dwName1 &&
                    lpDesList[nCurPos].FileIdentifier[2] == dwName2)
                {
                    break;  // duplicate file return null for false
                }
                nCurPos = (nCurPos + 1) % nCount;
                if (nCurPos == nStartPos)
                    break;
            }
            if (nCurPos != nStartPos)
                pRetDescriptor = lpDesList + nCurPos;
        }
    }

    if (pRetDescriptor)
    {
        pRetDescriptor->FileIdentifier[0] = dwIndex;
        pRetDescriptor->FileIdentifier[1] = dwName1;
        pRetDescriptor->FileIdentifier[2] = dwName2;
        memcpy(pRetDescriptor->SPFileMark, PACK_HEADER_MARK, PACK_HEADER_MARK_LEN);
    }
    return pRetDescriptor;
}


int SPPackageMaker::encryptFileToPacket(FILE * f, int nEncryptType, int nCompressLevel, char ** ppOutBuf)
{
    char * pszSrcData = NULL;
    char * pszCompressData = NULL;
    int nRet = E_PACKRESULT_SUCCESSED;
    fseek(f, 0, SEEK_END);
    m_nSrcFileSize = ftell(f);
    fseek(f, 0, SEEK_SET);
    if (m_nSrcFileSize > 0 && !ferror(f))
    {
        size_t nSize = SizeAlign(m_nSrcFileSize);
        pszSrcData = (char *)malloc(nSize);
        pszCompressData = (char *)malloc(nSize + (nSize / 2 > CM_DATABUF_EXTRA ? nSize / 2 : CM_DATABUF_EXTRA));
        if (pszSrcData && pszCompressData)
        {
            memset(pszSrcData, 0, nSize);
            memset(pszCompressData, 0, nSize + nSize + (nSize / 2 > CM_DATABUF_EXTRA ? nSize / 2 : CM_DATABUF_EXTRA));
            if (m_nSrcFileSize == fread(pszSrcData, 1, m_nSrcFileSize, f))
            {
                m_nSrcCRC32 = crc32(m_nSrcCRC32, (unsigned char *)pszSrcData, m_nSrcFileSize);
                SPCompressor spc;
                size_t nCompressSize = spc.compressToBuffer(pszSrcData, m_nSrcFileSize, pszCompressData, nSize + (nSize / 2 > CM_DATABUF_EXTRA ? nSize / 2 : CM_DATABUF_EXTRA), nCompressLevel);
                // 如果buffer不足, 则直接存储不压缩，buffer还不足返回错误
                if (COMPRESSOR_ERR_CODE_OUTOFFBUF == spc.getLastCompressorErrorCode())
                {
                    memset(pszCompressData, 0, nSize + nSize + (nSize / 2 > CM_DATABUF_EXTRA ? nSize / 2 : CM_DATABUF_EXTRA));
                    nCompressSize = spc.compressToBuffer(pszSrcData, m_nSrcFileSize, pszCompressData, nSize + (nSize / 2 > CM_DATABUF_EXTRA ? nSize / 2 : CM_DATABUF_EXTRA), 0);
                }
                if (nCompressSize > 0)
                {
                    size_t nEptSize = SPEncryptionManager::xxTEAEncode((const unsigned char *)pszCompressData, NULL, nCompressSize);
                    if (nEptSize > nSize)
                    {
                        free(pszSrcData);
                        nSize = SizeAlign(nEptSize);
                        pszSrcData = (char *)malloc(nSize);
                    }
                    if (pszSrcData)
                    {
                        memset(pszSrcData, 0, nSize);
                        nEptSize = SPEncryptionManager::xxTEAEncode((const unsigned char *)pszCompressData, (unsigned char *)pszSrcData, nCompressSize, m_pnEncryptKey);
                        if (nEptSize)
                        {
                            *ppOutBuf = pszSrcData;
                            nRet = nEptSize;
                            m_nDesCRC32 = crc32(m_nDesCRC32, (unsigned char *)pszSrcData, nEptSize);
                        }
                        else
                            nRet = E_PACKRESULT_ERROR;
                    }
                    else
                        nRet = E_PACKRESULT_MEMORYNOTENOUGH;
                }
                else
                    nRet =  E_PACKRESULT_COMPRESSERROR;
            }
            else
                nRet =  E_PACKRESULT_INPUTFILEOPERATIONERR;
        }
        else
            nRet = E_PACKRESULT_MEMORYNOTENOUGH;
    }
    else
        nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;

    if (pszCompressData)
        free(pszCompressData);
    if (nRet <= 0 && pszSrcData)
        free(pszSrcData);

    return nRet;
}


int SPPackageMaker::makeContentPackage(CJsonPacker * inputFiles, char * pszSrcFilePath, char * pszOutput, bool bOverWrite)
{
    int nRet = E_PACKRESULT_SUCCESSED;
    int nCount;
    SPCompressor spc;
    if (!pszOutput || !*pszOutput || !inputFiles || (nCount = inputFiles->getArrayItemCount(FILE_LIST_ARRAY)) <= 0)
    {
        nRet = E_PACKRESULT_FILELISTERROR;
    }
    else
    {
        if (nCount % 2)
            nCount++;
        else
            nCount += 2;

        string strOutput = makeValidatePackageName(pszOutput);
        SPPackageHeader header;
        memcpy(header.SPPakMark, PACK_HEADER_MARK, PACK_HEADER_MARK_LEN);
        header.PackageVersion = PACK_FILE_VERSION;
        header.EntryCount = nCount;
        header.HeaderSize = sizeof(SPPackageHeader) + header.EntryCount * sizeof(SPFileDescriptor);
        size_t nFileDesSize = sizeof(SPFileDescriptor) * header.EntryCount;
        LPSPFileDescriptor lpFileDes = (LPSPFileDescriptor)malloc(nFileDesSize);
        if (!lpFileDes)
        {
            nRet = E_PACKRESULT_MEMORYNOTENOUGH;
        }
        else
        {
            memset(lpFileDes, 0, nFileDesSize);
            for (int i = 0; i < nCount; i++)
                lpFileDes[i].FileIdentifier[0] = BLANK_MARK;

            m_strSrcPath = pszSrcFilePath;
            char cEnd = pszSrcFilePath[strlen(pszSrcFilePath) - 1];
            if (cEnd != '/' && cEnd != '\\')
                m_strSrcPath += "/";

            if (!prepaireOutput(pszOutput, bOverWrite))
            {
                nRet = E_PACKRESULT_OUTPUTFILEOPERATIONERR;
            }
            else
            {
                if (writeHeader(&header, lpFileDes))
                {
                    for (int i = 0; i < inputFiles->getArrayItemCount(FILE_LIST_ARRAY); i++)
                    {
                        string strFileToPack = m_strSrcPath;
                        CJsonPacker * subDict = inputFiles->getSubItemFromArray(FILE_LIST_ARRAY, i);
                        if (!subDict)
                        {
                            nRet = E_PACKRESULT_FILELISTERROR;
                            break;
                        }
                        strFileToPack = strFileToPack + subDict->getItemStringValue(FILE_LIST_NAME);
                        int nEncryptType = subDict->getItemIntValue(FILE_ENCRYPT_TYPE,  E_ENCRYPT_ERROR);
                        int nCompressLevel = subDict->getItemIntValue(FILE_COMPRESS_LEVEL, BAD_COMPRESS_LEVEL);
                        LPSPFileDescriptor lpCurFileDescriptor = getCurFileDesPos(lpFileDes, nCount, (char *)subDict->getItemStringValue(FILE_LIST_NAME));
                        delete subDict;
                        if (!lpCurFileDescriptor)
                        {
                            nRet = E_PACKRESULT_FILELISTERROR;
                            break;
                        }
                        lpCurFileDescriptor->StorageOffset = ftell(m_pOutputFile);
                        m_pInputFile = fopen(strFileToPack.c_str(), "rb");
                        if (!m_pInputFile)
                        {
                            nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
                            break;
                        }
                        if ( E_ENCRYPT_ERROR >= nEncryptType || E_ENCRYPT_UNKNOWN <= nEncryptType ||
                            BAD_COMPRESS_LEVEL == nCompressLevel)
                        {
                            nRet = E_PACKRESULT_FILELISTERROR;
                            break;
                        }
                        m_nDesFileSize = 0;     m_nSrcFileSize = 0;
                        m_nSrcCRC32    = 0;     m_nDesCRC32    = 0;
                        if (nEncryptType != E_ENCRYPT_NONE)
                        {
                            char * pszDataBuffer = NULL;
                            m_nDesFileSize = encryptFileToPacket(m_pInputFile, nEncryptType, nCompressLevel, &pszDataBuffer);
                            if (m_nDesFileSize <= 0)
                            {
                                nRet = m_nDesFileSize;
                                free(pszDataBuffer);
                                break;
                            }
                            if (m_nDesFileSize != fwrite(pszDataBuffer, 1, m_nDesFileSize, m_pOutputFile))
                            {
                                nRet = E_PACKRESULT_OUTPUTFILEOPERATIONERR;
                                free(pszDataBuffer);
                                break;
                            }
                            free(pszDataBuffer);
                        }
                        else
                        {
                            if (!spc.compressWithProcessor(this, nCompressLevel))
                            {
                                nRet = E_PACKRESULT_COMPRESSERROR;
                                break;
                            }
                        }
                        lpCurFileDescriptor->OriginalCRC32  = m_nSrcCRC32;
                        lpCurFileDescriptor->OriginalLength = m_nSrcFileSize;
                        lpCurFileDescriptor->PackedCRC32    = m_nDesCRC32;
                        lpCurFileDescriptor->PackedSize     = m_nDesFileSize;
                        lpCurFileDescriptor->EncryptType    = nEncryptType;
                        fclose(m_pInputFile);
                        m_pInputFile = NULL;
                    }
                    if (m_pInputFile)
                    {
                        fclose(m_pInputFile);
                        m_pInputFile = NULL;
                    }
                    writeHeader(&header, lpFileDes);
                }
                else
                {
                    nRet = E_PACKRESULT_OUTPUTFILEOPERATIONERR;
                }
            }
            free(lpFileDes);
        }
    }

    closeFiles();
    return nRet;
}



////////////////////////////////////////////////////////////////////////////////

SPContentManager::SPContentManager() : SPFileOperator()
{
    m_pPackageFileList  = NULL;
    m_nPackageFileCount = 0;
    m_strPackageName    = "";
    m_isPackageOpened   = false;
    m_pPackageFileHandle= NULL;
    m_pOutputFileHandle = NULL;
    m_pDecryptKey       = NULL;
}

SPContentManager::SPContentManager(const char * pszPakFile) : SPFileOperator()
{
    m_pPackageFileList  = NULL;
    m_nPackageFileCount = 0;
    m_strPackageName    = "";
    m_isPackageOpened   = false;
    m_pPackageFileHandle= NULL;
    m_pOutputFileHandle = NULL;
    m_pDecryptKey       = NULL;

    openPakFile(pszPakFile);
}


SPContentManager::~SPContentManager()
{
    m_nPackageFileCount = 0;
    if (m_pPackageFileHandle)
    {
        m_isPackageOpened = false;
        fclose(m_pPackageFileHandle);
        m_pPackageFileHandle = NULL;
    }
    if (m_pPackageFileList)
    {
        free(m_pPackageFileList);
        m_pPackageFileList = NULL;
    }
    if (m_pOutputFileHandle)
    {
        fclose(m_pOutputFileHandle);
        m_pOutputFileHandle = NULL;
    }
}

int SPContentManager::openPakFile(const char * pszPakFile)
{
    std::string filePath = cocos2d::CCFileUtils::sharedFileUtils()->fullPathForFilename(pszPakFile) ;
    const char *fileName = filePath.c_str();
    
    int nRet = E_PACKRESULT_SUCCESSED;
    if (m_pPackageFileHandle)
        fclose(m_pPackageFileHandle);
    m_isPackageOpened = false;
 
    m_pPackageFileHandle = fopen(pszPakFile, "rb");
	//cocos2d::CCLog("filename : %s  openres: %p\n ", fileName, m_pPackageFileHandle);
    if (m_pPackageFileHandle)
    {
        fseek(m_pPackageFileHandle, 0, SEEK_SET);
        SPPackageHeader header;
        fread(&header, 1, sizeof(SPPackageHeader), m_pPackageFileHandle);
        if( 0 == memcmp(header.SPPakMark, PACK_HEADER_MARK, strlen(PACK_HEADER_MARK)))
        {
            m_pPackageFileList = (LPSPFileDescriptor)malloc(sizeof(SPFileDescriptor) * header.EntryCount);
            if (m_pPackageFileList)
            {
                if (sizeof(SPFileDescriptor) * header.EntryCount == fread(m_pPackageFileList, 1, sizeof(SPFileDescriptor) * header.EntryCount, m_pPackageFileHandle))
                {
                    m_isPackageOpened = true;
                    m_nPackageFileCount = header.EntryCount;
                }
                else
                    nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
            }
            else
                nRet = E_PACKRESULT_MEMORYNOTENOUGH;
        }
        else
            nRet = E_PACKRESULT_BADPACKAGE;
    }
    else
        nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
    return nRet;
}


int SPContentManager::readFileFromPackage(const char * pszFileName, char ** ppOutBuf)
{
    if (!m_isPackageOpened)
        return E_PACKRESULT_NOPAKFILE_OPENED;

    int nRet = E_PACKRESULT_SUCCESSED;
    char * pszDecompressBuf = NULL;
    char * pszSrcBuf = NULL;
    LPSPFileDescriptor lpFileDes = getFileDescription((const char *)pszFileName);
    if (lpFileDes)
    {
        if (m_pPackageFileHandle)
        {
            fseek(m_pPackageFileHandle, lpFileDes->StorageOffset, SEEK_SET);
            if (!ferror(m_pPackageFileHandle))
            {
                pszDecompressBuf = (char *)malloc(lpFileDes->OriginalLength + 128);
                pszSrcBuf = (char *)malloc(lpFileDes->PackedSize + 16);
                if (pszDecompressBuf && pszSrcBuf)
                {
                    memset(pszDecompressBuf, 0, lpFileDes->OriginalLength + 128);
                    memset(pszSrcBuf, 0, lpFileDes->PackedSize + 16);
                    if (readWithCheck(pszSrcBuf, lpFileDes->PackedSize, m_pPackageFileHandle))
                    {
                        if (lpFileDes->EncryptType > 0)
                        {
                            char * pszDecryptBuf = (char *)malloc(lpFileDes->PackedSize + 16);
                            memset(pszDecryptBuf, 0, lpFileDes->PackedSize + 16);
                            if(SPEncryptionManager::xxTEADecode((const unsigned char *)pszSrcBuf, (unsigned char *)pszDecryptBuf, lpFileDes->PackedSize))
                            {
                                free(pszSrcBuf);
                                pszSrcBuf = pszDecryptBuf;
                            }
                            else
                                nRet = E_PACKRESULT_DECRYPTERROR;
                        }
                        if (nRet > E_PACKRESULT_ERROR)
                        {
                            SPCompressor spc;
                            size_t outSize = spc.decompressToBuffer(pszSrcBuf, lpFileDes->PackedSize, pszDecompressBuf, lpFileDes->OriginalLength + 128);
                            if (COMPRESSOR_ERR_CODE_NONE == spc.getLastCompressorErrorCode() && outSize >= lpFileDes->OriginalLength)
                            {
                                nRet = outSize;
                            }
                            else
                                nRet = E_PACKRESULT_DECOMPRESSERROR;
                        }
                    }
                    else
                        nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
                }
                else
                    nRet = E_PACKRESULT_MEMORYNOTENOUGH;
            }
            else
                nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
        }
        else
            nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
    }
    else
        nRet = E_PACKRESULT_FILENOTINPACKAGE;

    if (pszSrcBuf)
        free(pszSrcBuf);
    if (nRet < E_PACKRESULT_SUCCESSED && pszDecompressBuf)
    {
        free(pszDecompressBuf);
        *ppOutBuf = NULL;
    }
    else
        *ppOutBuf = pszDecompressBuf;

    return nRet;
}


int SPContentManager::getFileFromPackage(char * pszFileName, char * pszDestFile)
{
    if(!m_isPackageOpened)
        return E_PACKRESULT_NOPAKFILE_OPENED;

    int nRet = E_PACKRESULT_SUCCESSED;
    m_nOutputFileSize = 0;
    m_nPackedCRC32 = 0;
    m_nUnpackedCRC32 = 0;

    LPSPFileDescriptor lpFileDes = getFileDescription(pszFileName);
    if (lpFileDes)
    {
        m_nCurPackFileSize = lpFileDes->PackedSize;
        m_pOutputFileHandle = fopen(pszDestFile, "wb");
        if (m_pOutputFileHandle)
        {
            fseek(m_pPackageFileHandle, lpFileDes->StorageOffset, SEEK_SET);
            if (!ferror(m_pPackageFileHandle))
            {
                SPCompressor spc;
                if (lpFileDes->EncryptType > E_ENCRYPT_NONE && lpFileDes->EncryptType < E_ENCRYPT_UNKNOWN )
                {
                    char * pszEncryptData = (char *)malloc(lpFileDes->PackedSize + 16);
                    char * pszDecryptData = (char *)malloc(lpFileDes->PackedSize + 16);
                    if (pszEncryptData && pszDestFile)
                    {
                        memset(pszEncryptData, 0, lpFileDes->PackedSize + 16);
                        memset(pszDecryptData, 0, lpFileDes->PackedSize + 16);
                        if (readWithCheck(pszEncryptData, lpFileDes->PackedSize, m_pPackageFileHandle))
                        {
                            bool bRes = SPEncryptionManager::xxTEADecode((const unsigned char *)pszEncryptData, (unsigned char *)pszDecryptData, lpFileDes->PackedSize);
                            if (bRes)
                            {
                                free(pszEncryptData);
                                pszEncryptData = (char *)malloc(lpFileDes->OriginalLength + 64);
                                if (pszEncryptData)
                                {
                                    memset(pszEncryptData, 0, lpFileDes->OriginalLength + 64);
                                    size_t nUnzip = spc.decompressToBuffer(pszDecryptData, lpFileDes->PackedSize, pszEncryptData, lpFileDes->OriginalLength + 64);
                                    if (nUnzip >= lpFileDes->OriginalLength &&
                                        lpFileDes->OriginalCRC32 == crc32(m_nUnpackedCRC32, (unsigned char *)pszEncryptData, lpFileDes->OriginalLength))
                                    {
                                        if (nUnzip != fwrite(pszEncryptData, 1, nUnzip, m_pOutputFileHandle)) 
                                        {
                                            nRet = E_PACKRESULT_OUTPUTFILEOPERATIONERR;
                                        }
                                    }
                                    else
                                        nRet = E_PACKRESULT_DECOMPRESSERROR;
                                }
                                else
                                {
                                    nRet = E_PACKRESULT_MEMORYNOTENOUGH;
                                }
                            }
                        }
                        else
                        {
                            nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
                        }
                        if (pszEncryptData)
                            free(pszEncryptData);
                        if (pszDecryptData)
                            free(pszDecryptData);
                    }
                    else
                    {
                        nRet = E_PACKRESULT_MEMORYNOTENOUGH;
                        if (pszEncryptData)
                            free(pszEncryptData);
                        if (pszDecryptData)
                            free(pszDecryptData);
                    }
                }
                else
                {
                    if(spc.decompressWithProcessor(this))
                    {
                        if (lpFileDes->OriginalCRC32 != m_nUnpackedCRC32)
                            nRet = E_PACKRESULT_BADCRC;
                        else
                            nRet = m_nOutputFileSize;
                    }
                    else
                        nRet = E_PACKRESULT_DECOMPRESSERROR;
                }
            }
            else
                nRet = E_PACKRESULT_INPUTFILEOPERATIONERR;
        }
        else
            nRet = E_PACKRESULT_OUTPUTFILEOPERATIONERR;
    }
    else
        nRet = E_PACKRESULT_FILENOTINPACKAGE;

    if (m_pOutputFileHandle)
    {
        fclose(m_pOutputFileHandle);
        m_pOutputFileHandle = NULL;
    }
    return nRet;
}


LPSPFileDescriptor SPContentManager::getFileDescription(const char * pszFilename)
{
    LPSPFileDescriptor pDesRet = NULL;
    if (m_pPackageFileList && m_nPackageFileCount > 0)
    {
        unsigned int dwIndex, dwName1, dwName2;
        dwIndex = calculateHashIndex(m_nPackageFileCount, pszFilename);
        dwName1 = calculateName1(pszFilename);
        dwName2 = calculateName2(pszFilename);
        int nCurPos = dwIndex % m_nPackageFileCount;
        int nStartPos = nCurPos;
        if (m_pPackageFileList[nCurPos].FileIdentifier[0] == dwIndex &&
            m_pPackageFileList[nCurPos].FileIdentifier[1] == dwName1 &&
            m_pPackageFileList[nCurPos].FileIdentifier[2] == dwName2)
        {
            pDesRet = m_pPackageFileList + nCurPos;
        }
        else
        {
            while (m_pPackageFileList[nCurPos].FileIdentifier[0] != dwIndex ||
                   m_pPackageFileList[nCurPos].FileIdentifier[1] != dwName1 ||
                   m_pPackageFileList[nCurPos].FileIdentifier[2] != dwName2)

            {
                nCurPos = (nCurPos + 1) % m_nPackageFileCount;
                if (nCurPos == nStartPos)
                    break;
            }
            if (nCurPos != nStartPos)
                pDesRet = m_pPackageFileList + nCurPos;
        }
    }

    return pDesRet;
}


inline bool SPContentManager::readWithCheck(void * buffer, size_t readSize, FILE * f)
{
    return readSize == fread(buffer, 1, readSize, f);
}


int SPContentManager::readerFunc(char * buffer, int nSize)
{
    size_t nRet = fread(buffer, 1, (nSize <= m_nCurPackFileSize ? nSize : m_nCurPackFileSize), m_pPackageFileHandle);
    m_nCurPackFileSize -= nRet;
    m_nPackedCRC32 = crc32(m_nPackedCRC32, (unsigned char *)buffer, nRet);
    return nRet;
}


int SPContentManager::writerFunc(char * buffer, int nSize)
{
    int nRet = fwrite(buffer, 1, nSize, m_pOutputFileHandle);
    m_nOutputFileSize += nRet;
    m_nUnpackedCRC32 = crc32(m_nUnpackedCRC32, (unsigned char *)buffer, nRet);
    return nRet;
}
int SPContentManager::getBuffer(char** output, const char* filename, const char* pak)
{
    //读取数据
    SPContentManager spcm;
    
    std::string Path = cocos2d::CCFileUtils::sharedFileUtils()->fullPathForFilename(pak) ;
    spcm.openPakFile(Path.c_str());
    
    if (spcm.hasPackageOpend())
    {
        int nUnpackSize = spcm.readFileFromPackage(filename, output);
        if (nUnpackSize <= 0) 
        {
            return -1;
        }
        else 
        {
            return nUnpackSize;
        }
    }
    return -1;
}

