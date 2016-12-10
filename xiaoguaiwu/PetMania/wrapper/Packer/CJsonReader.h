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

#ifndef SPII_JsonReader_h
#define SPII_JsonReader_h

#include "CJsonPacker.h"
#include "cocos2d.h"
#include "SPContentManager.h"

enum SouceType
{
    E_JSON,
    E_JS,
    E_PNG,
    E_SPRITE,
    E_MUSIC,
    E_TMX,
};

/*
 * @brief read json data file, include pack and file
 */
class JsonReader
{
public:
    JsonReader();
    ~JsonReader(void);
    
    /**
     *	@brief  init JsonReader
     */
    static bool init();
    
    /**
     *	@brief  Destroy JsonReader
     */
    static bool destroy();
    
    /**
     *	@brief  reset JsonReader
     */
    static void reset();
public:
    
    /**
     *	@brief  create gameobject by json file
     */
    static cocos2d::CCObject* createGameObjectWithDataFile(const char* file);
    
    /**
     *	@brief  read
     */
    static void readConfigJson(const char* file);
    
    /**
     *	@brief  get file buffer
     */
    static int getFileBuffer(const char* file, char** outputBuffer);
    
    /**
     *	@brief  load template data from josn file
     */
    static void loadGameObjectTemplateFile(const char* file);
    
    /**
     *	@brief get the Code json name of json pack
     */
    static std::string getPakName(const char* sourcefile);
    
    /**
     *	@brief create json dictionary with json pack
     */
    static CJsonPacker* createJsonDictionaryWithBuffer(const char* packfile);
    
    /**
     *	@brief create json dictionary with json file
     */
    static CJsonPacker* createJsonDictionaryWithFile(const char* file);
    
    /**
     *	@brief  create root gameobject , this root is one scene, you can change scene with it;
     */
    static cocos2d::CCObject* createObject(CJsonPacker * inputFiles, cocos2d::CCObject* parent);
	
    /**
     *	@brief  preLoad component
     */
    static void preLoadComponent();
	
    /**
     *	@brief  delLoad component
     */
    static void delPreLoadComponent();
	
    /**
     * @brief  refresh position
     */
    static void refresh();
    
    //! enable  Pakage
    static void setIsResPakage(bool use);
    
    //! wether enable  Pakage
    static bool isPakage();
    
    // 确认path是否在Pakage中
    static bool isPakageConfirmation(const char *path);
    
    //! the android file Code root path
    static void setRootPath(const char* path);
    
    
    //下面是一些cocos2d里面读取pak的解析类-------------------------------------------------
    cocos2d::CCDictionary* createWithContentsOfFileThreadSafe(const char *pFileName);
    
public:
    /**
     *	@brief  stores json data
     */
    static CJsonPacker *m_pJson;
    
    /**
     *	@brief  now opend package file
     */
    static std::string m_strCuropendPackage;
    
    /**
     *	@brief  now opend package file
     */
    static bool m_bIsResPakage;
    
    /**
     *	@brief  now opend root package file
     */
    static std::string m_strRootPath;
    
protected:
    /**
     *	@brief  pak 
     */
    static SPContentManager *m_contentManager;
};


#endif
