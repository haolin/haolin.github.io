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

#ifndef SPII_Compressor_h
#define SPII_Compressor_h

#include "SPContentManager.h"

#define DEFAULT_CHUNK_SIZE                  (256 * 1024)
#define MIN_CHUNK_SIZE                      1024

#define COMPRESSOR_ERR_CODE_NONE             0   // 没有错误
#define COMPRESSOR_ERR_CODE_OUTOFFBUF       -1  // 输出Buffer不足
#define COMPRESSOR_ERR_CODE_FILE_OPERATION  -2  // 文件操作失败
#define COMPRESSOR_ERR_CODE_ZIPPROCESS      -3  // 压缩解压缩过程中出错

//typedef int (*DATAPROCESSOR)(char *, int);
    
class SPCompressor
{
public:
    SPCompressor();
    SPCompressor(unsigned nChunkSize);

public:
    void setChunkSize(unsigned nNewSize);

    size_t compressToBuffer(const char * pszFileName, char * pszOutBuf, size_t bufLen);
    size_t compressToBuffer(const char * pszInputBuf, size_t inputLen, char * pszOutBuf, size_t outputLen);
    bool compressToFile(const char * pszSrcFileName, const char * pszDestFileName);
    bool compressToFile(const char * pszInputBuf, size_t inputlen, const char * pszDestFileName);

    bool compressWithProcessor(SPFileOperator * pOperator);

    size_t compressToBuffer(const char * pszFileName, char * pszOutBuf, size_t bufLen, int nCompressLevel);
    size_t compressToBuffer(const char * pszInputBuf, size_t inputLen, char * pszOutBuf, size_t outputLen, int nCompressLevel);
    bool compressToFile(const char * pszSrcFileName, const char * pszDestFileName, int nCompressLevel);
    bool compressToFile(const char * pszInputBuf, size_t inputlen, const char * pszDestFileName, int nCompressLevel);

    bool compressWithProcessor(SPFileOperator * pOperator, int nCompressLevel);

    size_t decompressToBuffer(const char * pszFileName, char * pszOutBuf, size_t bufLen);
    size_t decompressToBuffer(const char * pszInputBuf, size_t inputLen, char * pszOutBuf, size_t outputLen);
    bool decompressToFile(const char * pszSrcFileName, const char * pszDestFileName);
    bool decompressToFile(const char * pszInputBuf, size_t inputLen, const char * pszDestFileName);

    bool decompressWithProcessor(SPFileOperator * pOperator);

    int getLastCompressorErrorCode();

private:
    int m_nCompressorLastErrorCodeNumber;
    unsigned m_nChunkSize;
};


#endif
