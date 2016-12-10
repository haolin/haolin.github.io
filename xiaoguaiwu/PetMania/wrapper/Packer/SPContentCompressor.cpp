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
#include "SPContentCompressor.h"
#include <zlib.h>

inline FILE * openFile(const char * pszFileName, const char * pszMode);

SPCompressor::SPCompressor()
{
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;

	m_nChunkSize = DEFAULT_CHUNK_SIZE;
}

SPCompressor::SPCompressor(unsigned nChunkSize)
{
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;
    m_nChunkSize = nChunkSize >= MIN_CHUNK_SIZE ? nChunkSize : MIN_CHUNK_SIZE;
}

void SPCompressor::setChunkSize(unsigned nNewSize)
{
    m_nChunkSize = nNewSize >= MIN_CHUNK_SIZE ? nNewSize : MIN_CHUNK_SIZE;
}

int SPCompressor::getLastCompressorErrorCode()
{
    return m_nCompressorLastErrorCodeNumber;
}


size_t SPCompressor::compressToBuffer(const char * pszFileName, char * pszOutBuf, size_t bufLen)
{
    return compressToBuffer(pszFileName, pszOutBuf, bufLen, Z_DEFAULT_COMPRESSION);
}


size_t SPCompressor::compressToBuffer(const char * pszInputBuf, size_t inputLen, char * pszOutBuf, size_t outputLen)
{
    return compressToBuffer(pszInputBuf, inputLen, pszOutBuf, outputLen, Z_DEFAULT_COMPRESSION);
}


bool SPCompressor::compressToFile(const char * pszSrcFileName, const char * pszDestFileName)
{
    return compressToFile(pszSrcFileName, pszDestFileName, Z_DEFAULT_COMPRESSION);
}


bool SPCompressor::compressToFile(const char * pszInputBuf, size_t inputlen, const char * pszDestFileName)
{
    return compressToFile(pszInputBuf, inputlen, pszDestFileName, Z_DEFAULT_COMPRESSION);
}


bool SPCompressor::compressWithProcessor(SPFileOperator * pOperator)
{
    return compressWithProcessor(pOperator, Z_DEFAULT_COMPRESSION);
}


size_t SPCompressor::compressToBuffer(const char * pszFileName, char * pszOutBuf, size_t bufLen, int nCompressLevel)
{
    int ret, flush;
    z_stream strm;

	unsigned char *in = new unsigned char[m_nChunkSize];
    
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;
    size_t compressSize = 0;

    FILE * source = fopen(pszFileName, "rb");
    if (!source)
        m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;

    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_out = bufLen;
    strm.next_out = (unsigned char *)pszOutBuf;

    ret = deflateInit(&strm, nCompressLevel);
    if (ret == Z_OK && source)
    {
        do
        {
            strm.avail_in = fread(in, 1, m_nChunkSize, source);
            if (ferror(source))
            {
                (void)deflateEnd(&strm);
                return Z_ERRNO;
            }
            flush = feof(source) ? Z_FINISH : Z_NO_FLUSH;
            strm.next_in = in;

            ret = deflate(&strm, flush);
            if (Z_STREAM_ERROR == ret)
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
                break;
            }
            if (strm.avail_out <= 0)
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_OUTOFFBUF;
                break;
            }
        } while (flush != Z_FINISH);

        (void)deflateEnd(&strm);
    }
    else
        m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;

    compressSize = bufLen - strm.avail_out;

    if (source)
        fclose(source);

	if(in != NULL)
		delete []in;
		in = NULL;

    return compressSize;
}


size_t SPCompressor::compressToBuffer(const char * pszInputBuf, size_t inputLen, char * pszOutBuf, size_t outputLen, int nCompressLevel)
{
    int ret;
    z_stream strm;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;
    size_t compressSize = 0;

    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_out = outputLen;
    strm.next_out = (unsigned char *)pszOutBuf;
    strm.avail_in = inputLen;
    strm.next_in = (unsigned char *)pszInputBuf;

    ret = deflateInit(&strm, nCompressLevel);
    if (ret == Z_OK)
    {
        ret = deflate(&strm, Z_FINISH);
        if (Z_STREAM_ERROR == ret)
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;

        if (strm.avail_out <= 0)
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_OUTOFFBUF;

        (void)deflateEnd(&strm);
        compressSize = outputLen - strm.avail_out;
    }
    else
        m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;

    return compressSize;
}


bool SPCompressor::compressToFile(const char * pszSrcFileName, const char * pszDestFileName, int nCompressLevel)
{
    bool bRet = false;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;

    int ret, flush;
    unsigned have;
    z_stream strm;

	unsigned char *in = new unsigned char[m_nChunkSize];
    unsigned char *out= new unsigned char[m_nChunkSize];
    
    FILE * source = fopen(pszSrcFileName, "rb");
    FILE * dest = fopen(pszDestFileName, "wb");

    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    ret = deflateInit(&strm, nCompressLevel);
    if (ret == Z_OK && source && dest)
    {
        do
        {
            // read input file to input buffer
            strm.avail_in = fread(in, 1, m_nChunkSize, source);
            if (ferror(source))
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
                break;
            }
            flush = feof(source) ? Z_FINISH : Z_NO_FLUSH;
            strm.next_in = in;

            do {
                // Compress data in input buffer to output buffer then write to output file.
                strm.avail_out = m_nChunkSize;
                strm.next_out = out;

                ret = deflate(&strm, flush);
                if (Z_OK != ret && Z_STREAM_END != ret)
                    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;

                have = m_nChunkSize - strm.avail_out;
                if (fwrite(out, 1, have, dest) != have || ferror(dest))
                    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;

            } while (strm.avail_out == 0 && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);

        } while (flush != Z_FINISH && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);

        (void)deflateEnd(&strm);
        bRet = COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber;
    }
    else
    {
        if (Z_OK != ret)
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
        else
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
    }

    if (source)
        fclose(source);
    if (dest)
        fclose(dest);

	if(in != NULL)
		delete []in;
	    in = NULL;
	if(out != NULL)
		delete []out;
	    out = NULL;

    return bRet;
}


bool SPCompressor::compressToFile(const char * pszInputBuf, size_t inputlen, const char * pszDestFileName, int nCompressLevel)
{
    bool bRet = false;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;

    int ret;
    unsigned have;
    z_stream strm;

    unsigned char *out= new unsigned char[m_nChunkSize];

    FILE * dest = fopen(pszDestFileName, "wb");
    
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_in = inputlen;
    strm.next_in = (unsigned char *)pszInputBuf;

    ret = deflateInit(&strm, nCompressLevel);
    if (ret == Z_OK && dest)
    {
        do
        {
            // Compress data in input buffer to output buffer then write to output file.
            strm.avail_out = m_nChunkSize;
            strm.next_out = out;

            ret = deflate(&strm, Z_FINISH);
            if (Z_OK != ret && Z_STREAM_END != ret)
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
                break;
            }

            have = m_nChunkSize - strm.avail_out;
            if (fwrite(out, 1, have, dest) != have || ferror(dest))
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
                break;
            }
        } while (strm.avail_out == 0 && Z_OK == ret);

        if ((Z_OK == ret || Z_STREAM_END == ret) && 
            COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber)
            bRet = true;

        (void)deflateEnd(&strm);
    }
    else
    {
        if (Z_OK != ret)
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
        else
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
    }
    if (dest)
        fclose(dest);

	if(out != NULL)
		delete []out;
	    out = NULL;

    return bRet;
}


bool SPCompressor::compressWithProcessor(SPFileOperator * pOperator, int nCompressLevel)
{
    bool bRet = false;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;
    
    int ret, flush;
    unsigned have;
    z_stream strm;

	unsigned char *in = new unsigned char[m_nChunkSize];
    unsigned char *out= new unsigned char[m_nChunkSize];
    
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    ret = deflateInit(&strm, nCompressLevel);
    if (ret == Z_OK)
    {
        do
        {
            strm.avail_in = pOperator->readerFunc((char *)in, m_nChunkSize);
            flush = (strm.avail_in == m_nChunkSize ? Z_NO_FLUSH : Z_FINISH);
            strm.next_in = in;

            do {
                // Compress data in input buffer to output buffer then write to output file.
                strm.avail_out = m_nChunkSize;
                strm.next_out = out;

                ret = deflate(&strm, flush);
                if (Z_OK != ret && Z_STREAM_END != ret)
                {
                    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
                    break;
                }
                have = m_nChunkSize - strm.avail_out;
                if (pOperator->writerFunc((char *)out, have) != have)
                {
                    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
                    break;
                }

            } while (strm.avail_out == 0 && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);

        } while (flush != Z_FINISH && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);

        (void)deflateEnd(&strm);
        bRet = COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber;
    }
    else
    {
        if (Z_OK != ret)
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
        else
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
    }

	if(in != NULL)
		delete []in;
	    in = NULL;
	if(out != NULL)
		delete []out;
	    out = NULL;


    return bRet;
}


size_t SPCompressor::decompressToBuffer(const char * pszFileName, char * pszOutBuf, size_t bufLen)
{
    size_t decompressSize = 0;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;

    int ret;
    z_stream strm;

	unsigned char *in = new unsigned char[m_nChunkSize];

    FILE * source = fopen(pszFileName, "rb");
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_in = 0;
    strm.next_in = Z_NULL;
    strm.next_out = (unsigned char *)pszOutBuf;
    strm.avail_out = bufLen;
    ret = inflateInit(&strm);
    if (ret == Z_OK)
    {
        do
        {
            strm.avail_in = fread(in, 1, m_nChunkSize, source);
            if (ferror(source))
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
                break;
            }
            if (strm.avail_in == 0)
                break;
            strm.next_in = in;
            
            ret = inflate(&strm, Z_NO_FLUSH);
            if (Z_OK != ret && Z_STREAM_END != ret)
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
                break;
            }
            if (strm.avail_out <= 0)
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_OUTOFFBUF;
                break;
            }
        } while (ret != Z_STREAM_END && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);
        
        (void)inflateEnd(&strm);
        if (COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber)
            decompressSize = bufLen - strm.avail_out;
    }

	if(in != NULL)
		delete []in;
	    in = NULL;

    return decompressSize;
}


size_t SPCompressor::decompressToBuffer(const char * pszInputBuf, size_t inputLen, char * pszOutBuf, size_t outputLen)
{
    size_t decompressSize = 0;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;

    int ret;
    z_stream strm;

    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_in = inputLen;
    strm.next_in = (unsigned char *)pszInputBuf;
    strm.next_out = (unsigned char *)pszOutBuf;
    strm.avail_out = outputLen;
    ret = inflateInit(&strm);
    if (ret == Z_OK)
    {
        ret = inflate(&strm, Z_NO_FLUSH);

        if (Z_OK != ret && Z_STREAM_END != ret)
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
        if (strm.avail_out <= 0)
            m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_OUTOFFBUF;

        (void)inflateEnd(&strm);

        if (COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber)
            decompressSize = outputLen - strm.avail_out;
    }

    return decompressSize;
}


bool SPCompressor::decompressToFile(const char * pszSrcFileName, const char * pszDestFileName)
{
    bool bRet = false;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;

    int ret;
    unsigned have;
    z_stream strm;

	unsigned char *in = new unsigned char[m_nChunkSize];
    unsigned char *out= new unsigned char[m_nChunkSize];

    FILE * source = fopen(pszSrcFileName, "rb");
    FILE * dest = fopen(pszDestFileName, "wb");
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_in = 0;
    strm.next_in = Z_NULL;
    ret = inflateInit(&strm);
    if (ret == Z_OK)
    {
        do
        {
            strm.avail_in = fread(in, 1, m_nChunkSize, source);
            if (ferror(source))
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
                break;
            }
            if (strm.avail_in == 0)
                break;
            strm.next_in = in;

            do
            {
                strm.avail_out = m_nChunkSize;
                strm.next_out = out;
                ret = inflate(&strm, Z_NO_FLUSH);
                if (Z_OK != ret && Z_STREAM_END != ret)
                {
                    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
                }
                else
                {
                    have = m_nChunkSize - strm.avail_out;
                    if (fwrite(out, 1, have, dest) != have || ferror(dest))
                        m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
                }
            } while (strm.avail_out == 0 && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);

        } while (ret != Z_STREAM_END && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);

        (void)inflateEnd(&strm);
        bRet = COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber;
    }


	if(in != NULL)
		delete []in;
	    in = NULL;
	if(out != NULL)
		delete []out;
	    out = NULL;

    return bRet;
}


bool SPCompressor::decompressToFile(const char * pszInputBuf, size_t inputLen, const char * pszDestFileName)
{
    bool bRet = false;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;

    int ret;
    unsigned have;
    z_stream strm;

	unsigned char *out = new unsigned char[m_nChunkSize];

    FILE * dest = fopen(pszDestFileName, "wb");
    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_in = inputLen;
    strm.next_in = (unsigned char *)pszInputBuf;
    ret = inflateInit(&strm);
    if (ret == Z_OK)
    {
        do
        {
            strm.avail_out = m_nChunkSize;
            strm.next_out = out;
            ret = inflate(&strm, Z_NO_FLUSH);
            if (Z_OK != ret && Z_STREAM_END != ret)
            {
                m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
            }
            else
            {
                have = m_nChunkSize - strm.avail_out;
                if (fwrite(out, 1, have, dest) != have || ferror(dest))
                    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
            }
        } while (strm.avail_out == 0 && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);
        
        (void)inflateEnd(&strm);
        bRet = COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber;
    }


	if(out != NULL)
		delete []out;
	    out = NULL;

    return bRet;
}


bool SPCompressor::decompressWithProcessor(SPFileOperator * pOperator)
{
    bool bRet = false;
    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_NONE;
    
    int ret;
    unsigned have;
    z_stream strm;

	unsigned char *in = new unsigned char[m_nChunkSize];
    unsigned char *out= new unsigned char[m_nChunkSize];


    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    strm.avail_in = 0;
    strm.next_in = Z_NULL;
    ret = inflateInit(&strm);
    if (ret == Z_OK)
    {
        do
        {
            strm.avail_in = pOperator->readerFunc((char *)in, m_nChunkSize);
            if (strm.avail_in == 0)
                break;
            strm.next_in = in;
            
            do
            {
                strm.avail_out = m_nChunkSize;
                strm.next_out = out;
                ret = inflate(&strm, Z_NO_FLUSH);
                if (Z_OK != ret && Z_STREAM_END != ret)
                {
                    m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_ZIPPROCESS;
                }
                else
                {
                    have = m_nChunkSize - strm.avail_out;
                    if (have != pOperator->writerFunc((char *)out, have))
                        m_nCompressorLastErrorCodeNumber = COMPRESSOR_ERR_CODE_FILE_OPERATION;
                }
            } while (strm.avail_out == 0 && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);
            
        } while (ret != Z_STREAM_END && COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber);
        
        (void)inflateEnd(&strm);
        bRet = COMPRESSOR_ERR_CODE_NONE == m_nCompressorLastErrorCodeNumber;
    }

	if(in != NULL)
		delete []in;
	    in = NULL;
	if(out != NULL)
		delete []out;
	    out = NULL;

    return bRet;
}

