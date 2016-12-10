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

#ifndef SPII_ContentManager_h
#define SPII_ContentManager_h

#include "CJsonPacker.h"

#if (SP_TARGET_PLATFORM == SP_PLATFORM_IOS || SP_TARGET_PLATFORM == SP_PLATFORM_ANDROID)
#define SP_EXTERN
#endif

#define PACKAGE_EXTENTION   ".spp"

#define FILE_LIST_ARRAY     "FileList"
#define FILE_LIST_NAME      "FileName"
#define FILE_ENCRYPT_TYPE   "EncryptType"
#define FILE_COMPRESS_LEVEL "CompressLevel"

#define PACK_FILE_VERSION       (0x00010000)
#define PACK_HEADER_MARK_LEN    4
static const char PACK_HEADER_MARK[] = "SPPK";

#define BAD_COMPRESS_LEVEL  (-2)

#define HASH_BUFFER_SIZE   0x500


typedef unsigned char BYTE;


typedef enum _encryptType
{
    E_ENCRYPT_ERROR   = -1,
    E_ENCRYPT_NONE    = 0,
    E_ENCRYPT_BASE64,
    E_ENCRYPT_BASE64CONFUSE,
    E_ENCRYPT_XXTEA,
    E_ENCRYPT_UNKNOWN
}EncryptType;
    
typedef struct _fileDescriptor
{
    unsigned char   SPFileMark[4];
    unsigned int    FileIdentifier[3];
    unsigned int    OriginalCRC32;
    unsigned int    PackedCRC32;
    int             EncryptType;
    unsigned int    OriginalLength;
    unsigned int    PackedSize;
    unsigned int    StorageOffset;
    unsigned int    StorageSize;    // 如果保存时存储长度要按2n对齐时存储长度和压缩长度不同
    unsigned int    Reserved;
}SPFileDescriptor, *LPSPFileDescriptor;

typedef struct _pakHeader
{
    unsigned char   SPPakMark[PACK_HEADER_MARK_LEN];
    unsigned int    PackageVersion;
    unsigned int    EntryCount;
    unsigned int    HeaderSize;
    unsigned int    Reserved[4];
}SPPackageHeader, *LPSPPackageHeader;

typedef enum _packingResult
{
    E_PACKRESULT_DECRYPTERROR = -11,
    E_PACKRESULT_BADCRC = -10,
    E_PACKRESULT_NOPAKFILE_OPENED= -9,
    E_PACKRESULT_BADPACKAGE = -8,
    E_PACKRESULT_FILENOTINPACKAGE = -7,
    E_PACKRESULT_FILELISTERROR = -6,
    E_PACKRESULT_MEMORYNOTENOUGH = -5,
    E_PACKRESULT_COMPRESSERROR = -4,
    E_PACKRESULT_DECOMPRESSERROR = -3,
    E_PACKRESULT_INPUTFILEOPERATIONERR = -2,
    E_PACKRESULT_OUTPUTFILEOPERATIONERR = -1,
    E_PACKRESULT_ERROR = 0,
    E_PACKRESULT_SUCCESSED = 1
}PackingResult;

///////////////////////////////////////////////////////////////////////
class SP_EXTERN SPFileOperator
{
public:
    SPFileOperator();
public:
    virtual int readerFunc(char * buffer, int nSize) { return 0; };
    virtual int writerFunc(char * buffer, int nSize) { return 0; };
public:
    void  prepareStormBuffer();
    unsigned int calculateHashIndex(unsigned int nEntryCount, const char * szFileName);
    unsigned int calculateName1(const char * szFileName);
    unsigned int calculateName2(const char * szFileName);
    void  setEncryptKey(int * pnKey);

protected:
    int * m_pnEncryptKey;

private:
    unsigned int m_dwHashTable[HASH_BUFFER_SIZE];
    bool  m_bHashTableCreated;
};

///////////////////////////////////////////////////////////////////////
class SP_EXTERN SPPackageMaker : public SPFileOperator
{
public:
    SPPackageMaker();
    ~SPPackageMaker();

public:
    /**
     *	@brief	packing resource file
     *
     *	@param 	inputFiles 	file list, that need compressed into pakage; files list use Json format
     *                      format:
     *                      "FileList" = 
     *                      "[
     *                          {
     *                              "FileName" = "Content/Resource/image.png",
     *                              "EncryptType" = 0,
     *                              "CompressLevel" = -1
     *                          },
     *                          {
     *                              "FileName" = "Content/script/main.js",
     *                              "EncryptType" = 3,
     *                              "CompressLevel" = -1
     *                          }
     *                      ]"
     *                      Json Parameters that:
     *                          "FileName" - file relative path and name, use string data
     *                          "EncryptType" - encryption type, integer data. Numerical meaning on the above enumerated definition;
     *                          "CompressLevel" - compression radio, integer data. compression radio: -1...9
     *                          specific meaning:  -1 default (Equivalent to compression rate5)
     *                                              0 storage uncompressed
     *                                              1 fast speed compressed
     *                                              ...
     *                                              9 the highest compression ratio compression
     *	@param 	pszSrcFilePath    Contains need to pack the path to the file； 
                                  files in the list of the relative path for relative this path relative path
     *
     *	@param 	pszOutput 	Output package filename，if there is no extension or extension and default expansion
     *                      show name PACKAGE_EXTENTION does not conform to, will be automatically add default extension
     *
     *	@param 	bOverWrite 	if the output packaged file already exists, whether compulsory cover
     *
     *	@return	the result
     */
    int makeContentPackage(CJsonPacker * inputFiles, char * pszSrcFilePath, char * pszOutput, bool bOverWrite);

    virtual int readerFunc(char * buffer, int nSize);
    virtual int writerFunc(char * buffer, int nSize);

private:
    std::string      makeValidatePackageName(char * pszName);
    void        closeFiles();
    inline bool isFileExist(char * pszFileName);
    inline bool prepaireOutput(char * pszOutput, bool bOverWrite);
    inline bool prepaireInput(char * pszOutput);
    inline bool writeWithCheck(void * buffer, size_t chunkSize, size_t chunkCount, FILE * f);
    inline bool writeHeader(LPSPPackageHeader pHeader, LPSPFileDescriptor pFileDescripts);
    LPSPFileDescriptor getCurFileDesPos(LPSPFileDescriptor lpDesList, int nCount, char * pszFileName);
    inline int  encryptFileToPacket(FILE * f, int nEncryptType, int nCompressLevel, char ** ppOutBuf);

private:
    FILE * m_pInputFile;
    FILE * m_pOutputFile;
    std::string m_strSrcPath;
    unsigned long m_nSrcCRC32;
    unsigned long m_nDesCRC32;
    unsigned int  m_nSrcFileSize;
    unsigned int  m_nDesFileSize;
};

///////////////////////////////////////////////////////////////////////
class SP_EXTERN SPContentManager : public SPFileOperator
{
public:
    SPContentManager();
    SPContentManager(const char * pszPakFile);
    ~SPContentManager();

public:
    bool hasPackageOpend() { return m_isPackageOpened; };
    int  openPakFile(const char * pszPakFile);
    int  readFileFromPackage(const char * pszFileName, char ** ppOutBuf);
    int  getFileFromPackage(char * pszFileName, char * pszDestFile);

    virtual int readerFunc(char * buffer, int nSize);
    virtual int writerFunc(char * buffer, int nSize);
    
    int getBuffer(char** output, const char* filename, const char* pak);

private:
    LPSPFileDescriptor  getFileDescription(const char * pszFilename);
    inline bool         readWithCheck(void * buffer, size_t readSize, FILE * f);

private:
    LPSPFileDescriptor      m_pPackageFileList;
    int                     m_nPackageFileCount;
    std::string                  m_strPackageName;
    bool                    m_isPackageOpened;
    FILE *                  m_pPackageFileHandle;
    FILE *                  m_pOutputFileHandle;
    int *                   m_pDecryptKey;
    size_t                  m_nCurPackFileSize;
    size_t                  m_nOutputFileSize;
    unsigned long           m_nPackedCRC32;
    unsigned long           m_nUnpackedCRC32;
};

#endif
