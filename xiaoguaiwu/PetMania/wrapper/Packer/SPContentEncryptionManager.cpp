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

#include "SPContentEncryptionManager.h"
#include "CAlgorithm.h"
#include "../../CGameConfig.h"

#define XXTEA_ALIGNMENT_BYTES   8

size_t SPEncryptionManager::base64Encode(const unsigned char * pInputBuffer,
                                        unsigned char * pOutputBuffer,
                                        size_t nLength)
{
    size_t nResult = 0;

    if(pInputBuffer && pOutputBuffer && nLength > 0)
        return EnBase64(pOutputBuffer, pInputBuffer, nLength);
    else if(nLength > 0)
        nResult = ((nLength / 3) + (nLength % 3 ? 1 : 0)) * 4;

    return nResult;
}

size_t SPEncryptionManager::base64Decode(const unsigned char * pInputBuffer,
                                        unsigned char * pOutputBuffer)
{
    size_t nResult = 0;

    if(pInputBuffer && pOutputBuffer)
    {
        return UnBase64(pOutputBuffer, pInputBuffer, strlen((char *)pInputBuffer));
    }
    else if(pInputBuffer)
    {
        nResult = strlen((char *)pInputBuffer);
        if(nResult)
            nResult = ((nResult / 4) + (nResult % 4 ? 1 : 0)) * 3;
    }

    return nResult;
}


size_t SPEncryptionManager::xxTEAEncode(const unsigned char * pInputBuffer,
                                       unsigned char * pOutputBuffer, 
                                       size_t nLength, 
                                       const_uint_ptr pUserDefineKey)
{
    size_t nResult = 0;
    if (pInputBuffer && pOutputBuffer && nLength > 0)
    {
        nResult = nLength / XXTEA_ALIGNMENT_BYTES + 
                    (nLength % XXTEA_ALIGNMENT_BYTES ? 1 : 0);
        memset(pOutputBuffer, 0, nResult * 8);
        memcpy(pOutputBuffer, pInputBuffer, nLength);
        unsigned int const * pnKey = pUserDefineKey ? (unsigned int const *)pUserDefineKey : DefaultEncryptKey;
        btea((uint32_t *)pOutputBuffer, nResult * 2, pnKey);

        nResult *= 8;
    }
    else if(nLength > 0)
        nResult = ((nLength / XXTEA_ALIGNMENT_BYTES) + 
                   (nLength % XXTEA_ALIGNMENT_BYTES ? 1 : 0)) * XXTEA_ALIGNMENT_BYTES;

    return nResult;
}


bool SPEncryptionManager::xxTEADecode(const unsigned char * pInputBuffer,
                                     unsigned char * pOutputBuffer, 
                                     size_t nLength, 
                                     const_uint_ptr pUserDefineKey)
{
    if(nLength % 4)
        return false;

    bool result = false;

    if(pInputBuffer && pOutputBuffer && nLength > 0)
    {
        int nSize = (nLength / XXTEA_ALIGNMENT_BYTES) * 2;
        memset(pOutputBuffer, 0, nLength);
        memcpy(pOutputBuffer, pInputBuffer, nLength);
        unsigned int const * pnKey = pUserDefineKey ? (unsigned int const *)pUserDefineKey : DefaultEncryptKey;
        btea((uint32_t *)pOutputBuffer, -nSize, pnKey);
        result = true;
    }

    return result;
}


char * SPEncryptionManager::urlEncode(const char * pInputBuffer, size_t nLenth)
{
    return tcurlencode(pInputBuffer, nLenth);
}


char * SPEncryptionManager::urlDecode(const char * pInputBuffer, size_t * pnOutLength)
{
    return tcurldecode(pInputBuffer, (int *)pnOutLength);
}


void SPEncryptionManager::confuseString(char * pszText)
{
    int nLength = strlen(pszText);
    char *pCurPos = pszText, *pEndPos = pszText + nLength;
    while (pEndPos - pCurPos > 4)
    {
        char cTemp = *pCurPos;
        *pCurPos = *(pCurPos + 1);
        *(pCurPos + 1) = cTemp;
        pCurPos += 2;
    }
}

