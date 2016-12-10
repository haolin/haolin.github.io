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



#ifndef SPII_EncryptionManager_h
#define SPII_EncryptionManager_h

#define const_uint_ptr      const int*

#include <iostream>
//#include "CommonDef.h"
    
/**	@class SPEncryptionManager
 *	@brief Implementation base64 and XXTEA(bTEA) encoding and decoding methords.
 *
 * The #SPEncryptionManager implementation encrypt & decrypt and binary data 
 * encoding to string & string decoding to binary data functions. All function 
 * in this class is static, can be call directly.
 */
class SPEncryptionManager
{
public:
    /**	@fn Base64Encode(const unsigned char * pInputBuffer, 
     *                      unsigned char * pOutputBuffer, 
     *                      size_t nLength)
     *	@brief Encoding binary data to ASCII string.
     *
     *	@param pInputBuffer Buffer of input binary data.
     *  @param pOutputBuffer Buffer to output encode data. Function won't check
     *          buffer overflow. User should provide buffer with enough size.
     *  @param nLength Byte size of data in input buffer.
     *	@return If pOutputBuffer pointer is NULL, function will return buffer 
     *              size needed to contain output data. Caution : This buffer 
     *              size won't contian terminate null char at end, user must 
     *              provide a buffer bigger than return size.
     *          Otherwise return value is the encoded data size .
     */
    static size_t base64Encode(const unsigned char * pInputBuffer,
                               unsigned char * pOutputBuffer, 
                               size_t nLength);


    /**	@fn Base64Decode(const unsigned char * pInputBuffer, 
     *                      unsigned char * pOutputBuffer)
     *	@brief Decoding ASCII string to binary data.
     *
     *	@param pInputBuffer Buffer of input ASCII string.
     *  @param pOutputBuffer Buffer to output decode data. Function won't check
     *          buffer overflow. User should provide buffer with enough size.
     *	@return If pOutputBuffer pointer is NULL, function will return buffer 
     *              size needed to contain output data. This value is a rough
     *              value, maybe bigger than decode data size, but won't less 
     *              than decode size.
     *          Otherwise return value is the decoded data size .
     */
    static size_t base64Decode(const unsigned char * pInputBuffer,
                               unsigned char * pOutputBuffer);


    /**	@fn XXTEAEncode(const unsigned char * pInputBuffer, 
     *                      unsigned char * pOutputBuffer)
     *	@brief Encrypt source data with XXTEA algorithm.
     *
     *	@param pInputBuffer Buffer of input data.
     *  @param pOutputBuffer Buffer to output encrypt data. Function won't check
     *          buffer overflow. User should provide buffer with enough size.
     *  @param nLength Byte size of data in input buffer. Caution : It's must be
     *          eight bytes aligned. Otherwise may cause unknown error.
     *  @param pUserDefineKey User defined encrypt key. It should be contain 
     *          more than four 32bit interger, otherwise may cause unknown error.
     *          This param set to NULL to use default encrypt key.
     *	@return If pOutputBuffer pointer is NULL, function will return buffer 
     *              size needed to contain output data.
     *          Otherwise return value is the encrypt data size.
     */
    static size_t xxTEAEncode(const unsigned char * pInputBuffer,
                              unsigned char * pOutputBuffer, 
                              size_t nLength, 
                              const_uint_ptr pUserDefineKey = NULL);


    /**	@fn XXTEADecode(const unsigned char * pInputBuffer, 
     *                      unsigned char * pOutputBuffer)
     *	@brief Decrypt source data with XXTEA algorithm.
     *
     *	@param pInputBuffer Buffer of input data.
     *  @param pOutputBuffer Buffer to output encrypt data. Function won't check
     *          buffer overflow. Buffer should be same or bigger than input 
     *          buffer. If decrypt data is string, user must alloc the terminate
     *          charator memory and set it to 0.
     *  @param nLength Byte size of data in input buffer. Caution : It's must be
     *          eight bytes aligned. Otherwise may cause unknown error.
     *  @param pUserDefineKey User defined encrypt key. It should be contain 
     *          more than four 32bit interger, otherwise may cause unknown error.
     *          This param set to NULL to use default encrypt key.
     *	@return If nLength is not eight bytes aligned, the input data is bad,
     *          return false, otherwise return true.
     */
    static bool xxTEADecode(const unsigned char * pInputBuffer,
                            unsigned char * pOutputBuffer, 
                            size_t nLength, 
                            const_uint_ptr pUserDefineKey = NULL);


    /**	@fn URLEncode(const char * pInputBuffer,
     *                  size_t nLenth)
     *	@brief	Encoding string with URL encoding
     *
     *	@param 	pInputBuffer String that need to encode.
     *	@param 	nLenth       Length of string in pInputBuffer.
     *
     *	@return	Encoded string buffer.
     */
    static char * urlEncode(const char * pInputBuffer, size_t nLenth);


    /**	@fn URLDecode(const char * pInputBuffer,
     *                  size_t * pnOutLength)
     *	@brief	Decode URL encoded string
     *
     *	@param 	pInputBuffer 	String that need to decode.
     *	@param 	pnOutLength 	Length of string in pInputBuffer
     *
     *	@return	Decoded string buffer.
     */
    static char * urlDecode(const char * pInputBuffer, size_t * pnOutLength);


    /**	@fn ConfuseString(char * pszText)
     *	@brief	Confuse base64 or other encoded string
     *
     *	@param 	pszText 	Buffer of string need to be confused.
     */
    static void confuseString(char * pszText);
};

#endif
