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
#include <fstream>
#include "CJsonReader.h"

#define SP_ASSERT_STR( a, fail_handle, str, ... )									\
if( ( a ) == false )															\
{																				\
char log_str[ 1024 ];														\
sprintf( log_str, str, ##__VA_ARGS__ );										\
}



CJsonPacker* JsonReader::m_pJson = NULL;
SPContentManager* JsonReader::m_contentManager = new SPContentManager();
std::string JsonReader::m_strCuropendPackage = "";
std::string JsonReader::m_strRootPath = "";
bool  JsonReader::m_bIsResPakage = false;


JsonReader::JsonReader()
{
    
}

JsonReader::~JsonReader()
{
    destroy();
}

bool JsonReader::init()
{
    CC_SAFE_DELETE(m_pJson);
    m_pJson = new CJsonPacker;
    return true;
}

bool JsonReader::destroy()
{
    CC_SAFE_DELETE(m_pJson);
    return true;
}

void reset()
{
    
}

void JsonReader::readConfigJson(const char* file)
{
    if (m_pJson == NULL)
    {
        init();
    }
#if (SP_TARGET_PLATFORM == SP_PLATFORM_IOS || SP_TARGET_PLATFORM == SP_PLATFORM_WIN32)
    const char *des = NULL;
    std::string doc;
    
    std::string jsonpath = cocos2d::CCFileUtils::sharedFileUtils()->fullPathForFilename(file);
    
    std::ifstream ifs;
    ifs.open(jsonpath.c_str());
    
    
    std::getline(ifs, doc, (char)EOF);
    des = doc.c_str();
    ifs.close();
    
    CJsonPacker *tempJsonPacker = new CJsonPacker;
    
    tempJsonPacker->readDescription(des);
    //			std::string pp = m_pJson->getItemStringValue("class.js");
#endif
#if (SP_TARGET_PLATFORM == SP_PLATFORM_ANDROID)
    //cocos2d::CCLog("--------------------------- start  01  %s", file);
    cocos2d::CCString* pFileContent = cocos2d::CCString::createWithContentsOfFile(file);
    //cocos2d::CCLog("--------------------------- start  02");
    tempJsonPacker->readDescription(pFileContent->getCString());
    //cocos2d::CCLog("--------------------------- end");
    //cocos2d::CCLog("create m_pJson ok!\n");
#endif
    
    std::vector<std::string>::iterator iter;
    std::vector<std::string> list;
    list = tempJsonPacker->getAllMemberNames();
    for (iter = list.begin(); iter != list.end(); iter++)
    {
        const char * pszValue = tempJsonPacker->getItemStringValue(iter->c_str());

        JsonReader::m_pJson->insertItem(iter->c_str(), pszValue);
    }
    
#ifdef DEBUG
    //下面是log
//    CCLOG("Description log ____ :");
//    std::vector<std::string>::iterator iter1;
//    std::vector<std::string> list1;
//    list1 = JsonReader::m_pJson->getAllMemberNames();
//    for (iter1 = list1.begin(); iter1 != list1.end(); iter1++)
//    {
//        const char * pszValue = JsonReader::m_pJson->getItemStringValue(iter1->c_str());
//        
//        printf("    %s ___ %s \n",iter1->c_str(),pszValue);
//    }
#endif

    //		CJSManager::Instance()->setJsDict(m_pJson->getSubDictionary("js"));
//    CJSManager::Instance()->setJsDict(m_pJson);
    
}
std::string JsonReader::getPakName(const char* sourcefile)
{
    const char* pak = m_pJson->getItemStringValue(sourcefile);
    if(NULL == pak)
    {
        return "";
    }
    std::string path = cocos2d::CCFileUtils::sharedFileUtils()->fullPathForFilename(pak);
    
    std::string  realPath = "";
    
    realPath = m_strRootPath + pak;
    //cocos2d::CCLog("getPakName realPath %s " , realPath.c_str());

    if(cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(realPath))
    {
        int res = JsonReader::m_contentManager->openPakFile(realPath.c_str());
        //cocos2d::CCLog("open pak[%s] res[%d]\n", realPath.c_str(), res);
        return realPath;
    }

    return path;
}

cocos2d::CCObject* JsonReader::createGameObjectWithDataFile(const char* filename){
   // cocos2d::CCLog("--------------------------- create  01");
    const char *des = NULL;
    std::string jsonpath;
    std::string doc;
    CJsonPacker *jsonDict = NULL;
        
#if (SP_TARGET_PLATFORM == SP_PLATFORM_IOS || SP_TARGET_PLATFORM == SP_PLATFORM_WIN32)
        jsonpath = cocos2d::CCFileUtils::sharedFileUtils()->fullPathForFilename(filename);
        std::ifstream ifs;
        ifs.open(jsonpath.c_str());
        std::getline(ifs, doc, (char)EOF);
        des = doc.c_str();
        ifs.close();
        jsonDict = new CJsonPacker();
        jsonDict->initWithDescription(des);
#endif
        
#if (SP_TARGET_PLATFORM == SP_PLATFORM_ANDROID)
        cocos2d::CCString* pFileContent = cocos2d::CCString::createWithContentsOfFile(filename);
        jsonDict = new CJsonPacker();
        jsonDict->initWithDescription(pFileContent->getCString());
#endif
        
    
    //cocos2d::CCLog("--------------------------- create  04");
    cocos2d::CCObject* gb = createObject(jsonDict,NULL);
    delete jsonDict;
    jsonDict = NULL;
    SP_ASSERT_STR(NULL != gb, return NULL, "")
    //		preLoadComponent(gb);
    //cocos2d::CCLog("--------------------------- create  05");
    return gb;
    
}

cocos2d::CCObject* JsonReader::createObject(CJsonPacker * inputFiles,cocos2d::CCObject* parenet){
//    const char* className = inputFiles->getItemStringValue("classname");
//
//    if(strcmp(className, "GameObject")==0){
//        cocos2d::CCObject* gb = (cocos2d::CCObject*)ObjectFactory::getSingleton().createObject(className);
//        gb->setPropertyFromJsonDict(inputFiles);
//        if (parenet) {
//            parenet->addChild(gb);
//        }
//        
//        for (int i = 0; i < inputFiles->getArrayItemCount("components"); i++){
//            SPII::CJsonPacker * subDict = inputFiles->getSubItemFromArray("components", i);
//            if (!subDict) break;
//            const char* comName = subDict->getItemStringValue("classname");
//            
//            SPII::Component::Component* com = (SPII::Component::Component*)ObjectFactory::getSingleton().createObject(comName);
//            
//            com->setOwner( gb );
//            
//            com->setPropertyFromJsonDict(subDict);
//            
//            gb->addComponent(com);
//            
//            SP_SAFE_DELETE(subDict);
//        }
//        
//        for (int i = 0; i < inputFiles->getArrayItemCount("gameobjects"); i++){
//            SPII::CJsonPacker * subDict = inputFiles->getSubItemFromArray("gameobjects", i);
//            if (!subDict) {
//                break;
//            }
//            createObject(subDict, gb);
//            SP_SAFE_DELETE(subDict);
//        }
//        return gb;
//    }else {
//        if (strcmp(className, "Template")==0) {
//            const char *key = inputFiles->getItemStringValue("templatekey");
//            if(key)
//            {
//                CJsonPacker *dict = GameObjectTemplateManager::getSingleton().getGameObjectTemplate(key);
//                GameObject* gb =  createObject(dict ,parenet);
//                gb->setPropertyFromJsonDict(inputFiles);
//            }
//        }
//    }
//    
    return NULL;
    
}

void JsonReader::loadGameObjectTemplateFile(const char* file)
{
//    if(GameObjectTemplateManager::getSingleton().isTemplateExisted(file))
//    {
//        return;
//    }
//    
//    const char *des = NULL;
//    std::string doc;
//    SPII::CJsonPacker *jsonDict = NULL;
//    if(SPII::JsonReader::isUsePakage())
//    {
//        char *temp = NULL;
//        int size = JsonReader::getFileBuffer(file, &temp);
//        SP_ASSERT_STR(size>0, return, "Read Template[file] error!");
//        des = temp;
//        jsonDict = new SPII::CJsonPacker();
//        jsonDict->initWithDescription(des);
//        CC_SAFE_DELETE(temp);
//    }
//    else
//    {
//        
//#if (SP_TARGET_PLATFORM == SP_PLATFORM_IOS || SP_TARGET_PLATFORM == SP_PLATFORM_WIN32)
//        std::string jsonpath = cocos2d::CCFileUtils::sharedFileUtils()->fullPathFromRelativePath(file) ;
//        std::ifstream ifs;
//        ifs.open(jsonpath.c_str());
//        std::getline(ifs, doc, (char)EOF);
//        des = doc.c_str();
//        ifs.close();
//        jsonDict = new SPII::CJsonPacker();
//        jsonDict->initWithDescription(des);
//#endif
//        
//#if (SP_TARGET_PLATFORM == SP_PLATFORM_ANDROID)
//        cocos2d::CCString* pFileContent = cocos2d::CCString::createWithContentsOfFile(file);
//        jsonDict = new SPII::CJsonPacker();
//        jsonDict->initWithDescription(pFileContent->getCString());
//#endif
//    }
//    
//    GameObjectTemplateManager::getSingleton().addGameObjectTemplateFile(file, jsonDict);
//    for (int i = 0; i<jsonDict->getItemCount(); i++) {
//        std::string str = jsonDict->getAllMemberNames()[i];
//        SPJsonDictionary *jDict = jsonDict->getSubDictionary(str.c_str());
//        GameObjectTemplateManager::getSingleton().addGameObjectTemplate(str.c_str(), jDict);
//    }
//    
}

bool JsonReader::isPakageConfirmation(const char *path)
{
    std::string relativePath = path;
    std::string findStr = ".app/";
    
    size_t pos = relativePath.find(findStr);
    
    
    if (pos <= relativePath.length()) {
        relativePath = relativePath.substr(pos+findStr.length(), relativePath.length());
    }
    
    
    std::string fullPath = JsonReader::getPakName(relativePath.c_str());
    
    if (fullPath=="" || fullPath==relativePath) {//判断如果不是从pak加载||pak加载错误
       // CCLOG("file %s not in pak",relativePath.c_str());
        return false;
    }
    return true;
}

/**
 * @brief  refresh position
 */

int JsonReader::getFileBuffer(const char* file, char** outputBuffer)
{
    std::string relativePath = file;
    std::string findStr = ".app/";
    
    size_t pos = relativePath.find(findStr);
    
    if (pos <= relativePath.length()) {
        relativePath = relativePath.substr(pos+findStr.length(), relativePath.length());
    }

    //cocos2d::CCLog("--------------  00 Begin\n");
    std::string path = JsonReader::getPakName(relativePath.c_str());
    //cocos2d::CCLog("--------------  get path: %s  file: %s\n", path.c_str(), relativePath.c_str());
    SP_ASSERT_STR(!path.empty(), return 0, "Read file[%s] from pakage error! Maybe have not this file in this pakage\n", relativePath.c_str());
    //cocos2d::CCLog("--------------  01\n");
    
    //cocos2d::CCLog("--------------  03\n m_strCuropendPackage=%s",m_strCuropendPackage.c_str());
    if(path != m_strCuropendPackage)
    {
        //cocos2d::CCLog("--------------  04\n");
        m_strCuropendPackage = path;
        
        int res = JsonReader::m_contentManager->openPakFile(path.c_str());
        //cocos2d::CCLog("open pak[%s] res[%d]\n", path.c_str(), res);
    }
    //cocos2d::CCLog("--------------  05\n");
    int nUnpackSize = JsonReader::m_contentManager->readFileFromPackage(relativePath.c_str(), outputBuffer);
    //cocos2d::CCLog("--------------  06 size: %d\n", nUnpackSize);
    
    m_strCuropendPackage = path;
    
    //cocos2d::CCLog("--------------  07 End\n");
    return nUnpackSize;
}

//! enable Pakage
void JsonReader::setIsResPakage(bool use)
{
    m_bIsResPakage = use;
}

//! the apk root path
void JsonReader::setRootPath(const char* path)
{
    JsonReader::m_strRootPath = path;
}


cocos2d::CCDictionary* JsonReader::createWithContentsOfFileThreadSafe(const char *pFileName)
{
    cocos2d::CCDictionary* jsonDic = NULL;
    
    char* buffer;
    int size = getFileBuffer(pFileName, &buffer);
    //CCLOG("buffer: %s",buffer);
    SP_ASSERT_STR(size >= 0, return NULL, "Read file[%s] error[%d]! ", pFileName, size);
    
    CC_SAFE_DELETE(buffer);
    
    return jsonDic;
}

