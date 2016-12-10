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
#include "CJsonPacker.h"
#include <stdint.h>

const char  table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";


bool isbase64(char c);
char *tcstrdup(const void *str);


size_t EnBase64(unsigned char * dest, const unsigned char * src, size_t src_size)
{
    unsigned char * destOrg = dest;
    while(src_size)
    {
        *dest++ = table[(src[0] >> 2) & 0x3f];
        *dest++ = table[((src[0] << 4) + (--src_size ? src[1] >> 4 : 0)) & 0x3f];
        *dest++ = (src_size ? table[((src[1] << 2) + (--src_size ? src[2] >> 6 : 0)) & 0x3f] : '=');
        *dest++ = src_size ? table[src[2] & 0x3f] : '=';
        if(src_size)
            src_size--;
        if(src_size)
            src += 3;
    }
    return dest - destOrg;
}


bool isbase64(char c)
{
    return c && strchr(table, c) != NULL;
}


inline unsigned char value(char c)
{
    const char *p = strchr(table, c);

    if(p)
        return p-table;
    else
        return 0;
}


size_t UnBase64(unsigned char *dest, const unsigned char * src, size_t src_size)
{
    *dest = 0;

    if(*src == 0) 
    {
        return 0;
    }

    unsigned char *p = dest;

    do
    {
        unsigned char a = value(src[0]);
        unsigned char b = value(src[1]);
        unsigned char c = value(src[2]);
        unsigned char d = value(src[3]);
        *p++ = (a << 2) | (b >> 4);
        *p++ = (b << 4) | (c >> 2);
        *p++ = (c << 6) | d;
        if(!isbase64(src[1])) 
        {
            p -= 2;
            break;
        } 
        else if(!isbase64(src[2])) 
        {
            p -= 2;
            break;
        } 
        else if(!isbase64(src[3])) 
        {
            p--;
            break;
        }
        src += 4;
        while(*src && (*src == 13 || *src == 10))
            src++;
    } while(src_size-= 4);

    *p = 0;

    return p-dest;
}


#define DELTA 0x9e3779b9
#define MX (((z>>5^y<<2) + (y>>3^z<<4)) ^ ((sum^y) + (key[(p&3)^e] ^ z)))

void btea(uint32_t *v, int n, uint32_t const key[4])
{
    uint32_t y, z, sum;
    unsigned p, rounds, e;
    if (n > 1)                      // Coding Part
    {
        rounds = 6 + 52/n;
        sum = 0;
        z = v[n-1];
        do
        {
            sum += DELTA;
            e = (sum >> 2) & 3;
            for (p=0; p<n-1; p++)
            {
                y = v[p+1]; 
                z = v[p] += MX;
            }
            y = v[0];
            z = v[n-1] += MX;
        } while (--rounds);
    }
    else if (n < -1)                // Decoding Part
    {
        n = -n;
        rounds = 6 + 52/n;
        sum = rounds*DELTA;
        y = v[0];
        do
        {
            e = (sum >> 2) & 3;
            for (p=n-1; p>0; p--)
            {
                z = v[p-1];
                y = v[p] -= MX;
            }
            z = v[n-1];
            y = v[0] -= MX;
        } while ((sum -= DELTA) != 0);
    }
}


/* Duplicate a string on memory. */
char *tcstrdup(const void *str)
{
    int size = strlen((char *)str);
    char *p;
    p = (char *)malloc(size + 1);
    memset(p, 0, size + 1);
    memcpy(p, str, size);
    p[size] = '\0';
    return p;
}

/* Encode a serial object with URL encoding. */
char *tcurlencode(const char *ptr, int size)
{
    char *buf;
    buf = (char *)malloc(size * 3 + 1);
    memset(buf, 0, size * 3 + 1);
    char *wp = buf;
    for(int i = 0; i < size; i++){
        int c = ((unsigned char *)ptr)[i];
        if((c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') ||
           (c >= '0' && c <= '9') || (c != '\0' && strchr("_-.!~*'()", c))){
            *(wp++) = c;
        } else {
            wp += sprintf(wp, "%%%02X", c);
        }
    }
    *wp = '\0';
    return buf;
}

/* Decode a string encoded with URL encoding. */
char *tcurldecode(const char *str, int *sp)
{
    char *buf = tcstrdup(str);
    char *wp = buf;
    while(*str != '\0'){
        if(*str == '%'){
            str++;
            if(((str[0] >= '0' && str[0] <= '9') || (str[0] >= 'A' && str[0] <= 'F') ||
                (str[0] >= 'a' && str[0] <= 'f')) &&
               ((str[1] >= '0' && str[1] <= '9') || (str[1] >= 'A' && str[1] <= 'F') ||
                (str[1] >= 'a' && str[1] <= 'f'))){
                   unsigned char c = *str;
                   if(c >= 'A' && c <= 'Z') c += 'a' - 'A';
                   if(c >= 'a' && c <= 'z'){
                       *wp = c - 'a' + 10;
                   } else {
                       *wp = c - '0';
                   }
                   *wp *= 0x10;
                   str++;
                   c = *str;
                   if(c >= 'A' && c <= 'Z') c += 'a' - 'A';
                   if(c >= 'a' && c <= 'z'){
                       *wp += c - 'a' + 10;
                   } else {
                       *wp += c - '0';
                   }
                   str++;
                   wp++;
               } else {
                   break;
               }
        } else if(*str == '+'){
            *wp = ' ';
            str++;
            wp++;
        } else {
            *wp = *str;
            str++;
            wp++;
        }
    }
    *wp = '\0';
    *sp = wp - buf;
    return buf;
}

