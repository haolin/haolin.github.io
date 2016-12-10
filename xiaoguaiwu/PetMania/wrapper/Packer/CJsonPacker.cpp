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

CJsonPacker::CJsonPacker()
{
    m_cValue.clear();
}


CJsonPacker::~CJsonPacker()
{
    m_cValue.clear();
}


void CJsonPacker::initWithDescription(const char *pszDescription)
{
    CSJson::Reader cReader;
    m_cValue.clear();
    if (pszDescription && *pszDescription)
    {
        std::string strValue = pszDescription;
        cReader.parse(strValue, m_cValue, false);
    }
}


void CJsonPacker::readDescription(const char *pszDescription)
{
    CSJson::Reader cReader;
    if (pszDescription && *pszDescription)
    {
        std::string strValue = pszDescription;
        cReader.parse(strValue, m_cValue, false);
    }
}


void CJsonPacker::initWithValue(CSJson::Value& value)
{
    m_cValue = value;
}


void CJsonPacker::insertItem(const char *pszKey, int nValue)
{
    m_cValue[pszKey] = nValue;
}


void CJsonPacker::insertItem(const char *pszKey, double fValue)
{
    m_cValue[pszKey] = fValue;
}


void CJsonPacker::insertItem(const char *pszKey, const char * pszValue)
{
    m_cValue[pszKey] = pszValue;
}

void CJsonPacker::insertItem(const char *pszKey, bool bValue)
{
    m_cValue[pszKey] = bValue;
}

void CJsonPacker::insertItem(const char *pszKey, CJsonPacker * subDictionary)
{
    if (subDictionary)
        m_cValue[pszKey] = subDictionary->m_cValue;
}


bool CJsonPacker::deleteItem(const char *pszKey)
{
    if(!m_cValue.isMember(pszKey))
        return false;
    
    m_cValue.removeMember(pszKey);
    
    return true;
}


void CJsonPacker::cleanUp()
{
    m_cValue.clear();
}


bool CJsonPacker::isKeyValidate(const char *pszKey)
{
    return m_cValue.isMember(pszKey);
}


int CJsonPacker::getItemIntValue(const char *pszKey, int nDefaultValue)
{
    if (!isKeyValidate(pszKey, m_cValue) || !m_cValue[pszKey].isNumeric())
        return nDefaultValue;
    
    return m_cValue[pszKey].asInt();
}


double CJsonPacker::getItemFloatValue(const char *pszKey, double fDefaultValue)
{
    if (!isKeyValidate(pszKey, m_cValue) || !m_cValue[pszKey].isNumeric())
        return fDefaultValue;
    
    return m_cValue[pszKey].asDouble();
}


const char * CJsonPacker::getItemStringValue(const char *pszKey)
{
//    printf("root ppp %p",&m_cValue);

    if (!&m_cValue || !isKeyValidate(pszKey, m_cValue) || !m_cValue[pszKey].isString())
        return NULL;
    
    return m_cValue[pszKey].asCString();
}

bool CJsonPacker::getItemBoolvalue(const char *pszKey, bool bDefaultValue)
{
    if (!isKeyValidate(pszKey, m_cValue) || !m_cValue[pszKey].isBool())
        return bDefaultValue;
    
    return m_cValue[pszKey].asBool();
}


CJsonPacker * CJsonPacker::getSubDictionary(const char *pszKey)
{
    CJsonPacker * pNewDictionary;
    if (!isKeyValidate(pszKey, m_cValue) || (!m_cValue[pszKey].isArray() &&
                                             !m_cValue[pszKey].isObject() &&
                                             !m_cValue[pszKey].isConvertibleTo(CSJson::arrayValue) &&
                                             !m_cValue[pszKey].isConvertibleTo(CSJson::objectValue)))
    {
        pNewDictionary = NULL;
    }
    else
    {
        pNewDictionary = new CJsonPacker();
        pNewDictionary->initWithValue(m_cValue[pszKey]);
    }
    return pNewDictionary;
}


std::string CJsonPacker::getDescription()
{
    std::string strReturn = m_cValue.toStyledString();
    return strReturn;
}


bool CJsonPacker::insertItemToArray(const char *pszArrayKey, int nValue)
{
    CSJson::Value array;
    if(m_cValue.isMember(pszArrayKey))
    {
        if (!m_cValue[pszArrayKey].isArray() && !m_cValue[pszArrayKey].isConvertibleTo(CSJson::arrayValue))
            return false;
        
        array = m_cValue[pszArrayKey];
    }
    
    array.append(nValue);
    m_cValue[pszArrayKey] = array;
    
    return true;
}


bool CJsonPacker::insertItemToArray(const char *pszArrayKey, double fValue)
{
    CSJson::Value array;
    if(m_cValue.isMember(pszArrayKey))
    {
        if (!m_cValue[pszArrayKey].isArray() && !m_cValue[pszArrayKey].isConvertibleTo(CSJson::arrayValue))
            return false;
        
        array = m_cValue[pszArrayKey];
    }
    
    array.append(fValue);
    m_cValue[pszArrayKey] = array;
    
    return true;
}


bool CJsonPacker::insertItemToArray(const char *pszArrayKey, const char * pszValue)
{
    CSJson::Value array;
    if(m_cValue.isMember(pszArrayKey))
    {
        if (!m_cValue[pszArrayKey].isArray() && !m_cValue[pszArrayKey].isConvertibleTo(CSJson::arrayValue))
            return false;
        
        array = m_cValue[pszArrayKey];
    }
    
    array.append(pszValue);
    m_cValue[pszArrayKey] = array;
    
    return true;
}


bool CJsonPacker::insertItemToArray(const char *pszArrayKey, CJsonPacker * subDictionary)
{
    CSJson::Value array;
    if(m_cValue.isMember(pszArrayKey))
    {
        if (!m_cValue[pszArrayKey].isArray() && !m_cValue[pszArrayKey].isConvertibleTo(CSJson::arrayValue))
            return false;
        
        array = m_cValue[pszArrayKey];
    }
    
    array.append(subDictionary->m_cValue);
    m_cValue[pszArrayKey] = array;
    
    return true;
}


int CJsonPacker::getItemCount()
{
    return m_cValue.size();
}


DicItemType CJsonPacker::getItemType(int nIndex)
{
    return (DicItemType)m_cValue[nIndex].type();
}


DicItemType CJsonPacker::getItemType(const char *pszKey)
{
    return (DicItemType)m_cValue[pszKey].type();
}

std::vector<std::string> CJsonPacker::getAllMemberNames()
{
    return m_cValue.getMemberNames();
}


int CJsonPacker::getArrayItemCount(const char *pszArrayKey)
{
    int nRet = 0;
    if (!isKeyValidate(pszArrayKey, m_cValue) ||
        (!m_cValue[pszArrayKey].isArray() && !m_cValue[pszArrayKey].isObject() &&
         !m_cValue[pszArrayKey].isConvertibleTo(CSJson::arrayValue) && !m_cValue[pszArrayKey].isConvertibleTo(CSJson::objectValue)))
    {
        nRet = 0;
    }
    else
    {
        CSJson::Value arrayValue = m_cValue[pszArrayKey];
        nRet = arrayValue.size();
    }
    
    return nRet;
}


int CJsonPacker::getIntValueFromArray(const char *pszArrayKey, int nIndex, int nDefaultValue)
{
    int nRet = nDefaultValue;
    CSJson::Value * arrayValue = validateArrayItem(pszArrayKey, nIndex);
    if (arrayValue)
    {
        if ((*arrayValue)[nIndex].isNumeric())
            nRet = (*arrayValue)[nIndex].asInt();
    }
    
    return nRet;
}


double CJsonPacker::getFloatValueFromArray(const char *pszArrayKey, int nIndex, double fDefaultValue)
{
    double fRet = fDefaultValue;
    CSJson::Value * arrayValue = validateArrayItem(pszArrayKey, nIndex);
    if (arrayValue)
    {
        if ((*arrayValue)[nIndex].isNumeric())
            fRet = (*arrayValue)[nIndex].asDouble();
    }
    
    return fRet;
}


const char * CJsonPacker::getStringValueFromArray(const char *pszArrayKey, int nIndex)
{
    CSJson::Value * arrayValue = validateArrayItem(pszArrayKey, nIndex);
    if (arrayValue)
    {
        if ((*arrayValue)[nIndex].isString())
            return (*arrayValue)[nIndex].asCString();
    }
    
    return NULL;
}


CJsonPacker * CJsonPacker::getSubItemFromArray(const char *pszArrayKey, int nIndex)
{
    CSJson::Value * arrayValue = validateArrayItem(pszArrayKey, nIndex);
    if (arrayValue)
    {
        if ((*arrayValue)[nIndex].isArray() || (*arrayValue)[nIndex].isObject())
        {
            CJsonPacker * pNewDictionary = new CJsonPacker();
            pNewDictionary->initWithValue((*arrayValue)[nIndex]);
            return pNewDictionary;
        }
    }
    
    return NULL;
}


DicItemType CJsonPacker::getItemTypeFromArray(const char *pszArrayKey, int nIndex)
{
    CSJson::Value * arrayValue = validateArrayItem(pszArrayKey, nIndex);
    if (arrayValue)
        return (DicItemType)((*arrayValue)[nIndex].type());
    
    return (DicItemType)CSJson::nullValue;
}


inline bool CJsonPacker::isKeyValidate(const char *pszKey, CSJson::Value& root)
{
    if (!root || root.isNull() || !root.isMember(pszKey))
        return false;
    
    return true;
}


inline CSJson::Value * CJsonPacker::validateArrayItem(const char *pszArrayKey, int nIndex)
{
    if (!isKeyValidate(pszArrayKey, m_cValue) && !m_cValue[pszArrayKey].isArray() && !m_cValue[pszArrayKey].isConvertibleTo(CSJson::arrayValue))
        return NULL;
    if (!m_cValue[pszArrayKey].isValidIndex(nIndex))
        return NULL;
    
    return &m_cValue[pszArrayKey];
}



