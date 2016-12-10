//
//  FileMgr.cpp
//  PetMania
//
//  Created by 周成山 on 13-9-5.
//
//

#include "FileMgr.h"
#include <stdio.h>
#include <string>
#include "../Packer/CJsonReader.h"

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include <jni.h>
#include <android/log.h>
#include "jni/JniHelper.h"
#include "jni/Java_org_cocos2dx_lib_Cocos2dxHelper.h"
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
#include "CSystemInfoMgr.h"
#include "FileUnZip.h"
#endif

#include <dirent.h>
#include "CGameConfig.h"
#include "../jni/Jni.h"
#include "MD5String.h"



using namespace cocos2d;

std::string FileMgr::getSDCardRoot()
{
    #if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo info;
    if(JniHelper::getStaticMethodInfo(info,
                                       "com/android/tool/CSPackage",
                                       "getSDRoot",
                                       "()Ljava/lang/String;"))
    {
        jstring jSD = (jstring)info.env->CallStaticObjectMethod(info.classID, info.methodID);
        const char* str = info.env->GetStringUTFChars(jSD, 0);
        std::string strRoot = std::string(str);

        info.env->ReleaseStringUTFChars(jSD, str);
        info.env->DeleteLocalRef(info.classID);
        //cocos2d::CCLog("************ SD root : %s", strRoot.c_str());
        return strRoot;
    }
    #endif
    return "";
}

std::string FileMgr::getAppFileRoot()//没有sdcard下获取的文件路径
{
#if(CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo info;
    if(JniHelper::getStaticMethodInfo(info,
                               "com/android/tool/CSPackage",
                                   "getFileRoot",
                                   "()Ljava/lang/String;"))
    {
        jstring jSD = (jstring)info.env->CallStaticObjectMethod(info.classID, info.methodID);
        const char* str = info.env->GetStringUTFChars(jSD, 0);
        std::string strRoot = std::string(str);

        info.env->ReleaseStringUTFChars(jSD, str);
        info.env->DeleteLocalRef(info.classID);
        //cocos2d::CCLog("************ File root : %s", strRoot.c_str());
        return strRoot;
    }
#endif
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->getAppPaths();
#endif
    return "";
}

std::string FileMgr::getWriteFilePath()//获取文件保存的路径根目录
{
    std::string path = FileMgr::getSDCardRoot();
    if(path != "")
    {
        return path;
    }
    path = FileMgr::getAppFileRoot();

    return path;
}

//返回文件夹下面的文件列表
cocos2d::CCArray* FileMgr::getFolderFileArray(const char* folderPath,const char* extension)
{
    CCArray *fileArray = CCArray::create();
    
    DIR *dp = opendir(folderPath);
    
    struct dirent *dirp;
    int n=0;
    
    if (dp) {
        while (((dirp=readdir(dp))!=NULL) && (n<=50))
        {
            if (n % 1 == 0) printf("\n");
            n++;
            
            CCString *FileName = CCString::createWithFormat("%s%s",folderPath,dirp->d_name);
            
            std::string ext = FileMgr::getCodeExt(std::string(dirp->d_name),".");
            
            std::string allExt = "*";
            //CCLOG("ext  %s   dirp:   %s",ext.c_str(),dirp->d_name);
            if (ext == extension || extension == allExt) {
                fileArray->addObject(FileName);
            }
        }
        printf("\n");
        closedir(dp);
    }
    
    return fileArray;
}

std::string FileMgr::getCodeExt(const std::string& code,const char *c) {
    size_t pos = code.rfind(c);
    if (pos<code.length()) {
        return code.substr(pos+1, code.length());
    }
    else {
        return code;
    }
}

std::string FileMgr::InterceptionRightStr(const std::string pathStr, const std::string findStr)
{
    std:: string pathTemp = pathStr;
    size_t pos = pathTemp.find(findStr);
    
    if (pos <= pathTemp.length()) {
        pathTemp = pathTemp.substr(pos+findStr.length(), pathTemp.length());
    }
    return pathTemp;
}

std::string FileMgr::InterceptionLeftStr(const std::string pathStr, const std::string findStr)
{
    std:: string pathTemp = pathStr;
    size_t pos = pathTemp.find(findStr);
    
    if (pos <= pathTemp.length()) {
        pathTemp = pathTemp.substr(0, pos);
    }
    return pathTemp;
}



bool FileMgr::copyResourceFile(const char* fromPath , const char* toPath , const char *toFolder)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    //CCLog("start to copyResourceFile");
    JniMethodInfo t;
    if (JniHelper::getStaticMethodInfo(t,
                                       "com/download/UpdateAllMgr",
                                       "copyResourceFile",
                                       "(Ljava/lang/String;Ljava/lang/String;)Z"))
    {
        jstring jSrc = t.env->NewStringUTF(fromPath);
        jstring jTar = t.env->NewStringUTF(toPath);

        jboolean ret = t.env->CallStaticBooleanMethod(t.classID, t.methodID,jSrc, jTar);
        t.env->DeleteLocalRef(jSrc);
        t.env->DeleteLocalRef(jTar);
        t.env->DeleteLocalRef(t.classID);
        return ret;
    }
#endif
    //CCLOG("fromPath  %s  toPath  %s   toFolder  %s",fromPath,toPath,toFolder);
#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return CSystemInfoMgr::sharedSystemInfoMgr()->moveFile(fromPath, toPath, toFolder);
#endif
    return true;
}

void FileMgr::startPakage(bool isPack)
{
    if(!isPack){
        CCLog("THE RESOURCE IS NOT PACKED : false");
        return;
    }
    std::string strWritePath = FileMgr::getWriteFilePath()+K_GAME_WRITE_PATH;

    std::string zipFolderPath = strWritePath+K_GAME_WRITE_DOWN_PATH;
    std::string dataFolderPath = strWritePath+K_GAME_WRITE_DATA_PATH;
    std::string typeDataFolderPath = strWritePath+K_GAME_WRITE_TYPE_DATA_PATH;

    
    bool isNewApp = FileMgr::isNewApp();
    
    if (isNewApp) {//为了不在每个新版本发布都考虑老版本的下载资源，下载的资源全部删除
        CCLog("new App");
        FileMgr::removePath(strWritePath.c_str());
    }
    
    ///test////
    std::string initPakName = "init.pak";
    std::string initJsonName = "init.json";
    
    std::string initPak = dataFolderPath+initPakName;
    std::string initJson = dataFolderPath+initJsonName;
    
    std::string resPakPath = CCFileUtils::sharedFileUtils()->fullPathForFilename(initPakName.c_str());
    std::string resJsonPath = CCFileUtils::sharedFileUtils()->fullPathForFilename(initJsonName.c_str());
     CCLog("pak---------------------------1");
    if( !cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(initPak) || !cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(initJson))
    {
        bool isCopyPak = FileMgr::copyResourceFile(resPakPath.c_str(), initPak.c_str(),dataFolderPath.c_str());
        bool isJsonPak = FileMgr::copyResourceFile(resJsonPath.c_str(), initJson.c_str(),dataFolderPath.c_str());
        
        if(!isCopyPak && cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(initPak))
        {
            remove(resPakPath.c_str());
        }
        
        if(!isJsonPak && cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(initJson))
        {
            remove(initJson.c_str());
        }
    }
    
         CCLog("pak---------------------------2");
    if( !cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(initPak) || !cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(initJson))
    {
        int pakSize = Jni::getAssetsFileSize(resPakPath.c_str())+1;
        bool isEnough =  Jni::isSizeEnough(pakSize);
        
        
        if(!isEnough){
            char info[256] = "";
            sprintf(info, "对不起，你的手机SD卡空间不足，请清理出%dM空间", pakSize);
            Jni::showDialog(info);
            return;
        }
    }

     CCLog("pak---------------------------3");
    //移动typedata文件夹内容到data文件夹
    FileMgr::moveTypeDataFile(typeDataFolderPath.c_str(), dataFolderPath.c_str());
    
    //! get android write file path
    ///////////////START LOG\\\\\\\\\\\\///
    
    //cocos2d::CCLog("write path: %s \n", strWritePath.c_str());
    //cocos2d::CCLog("zipFolder path: %s\n", zipFolderPath.c_str());
    //cocos2d::CCLog("dataFolder path: %s\n", dataFolderPath.c_str());
    //cocos2d::CCLog("typeDataFolder path: %s\n", typeDataFolderPath.c_str());
    
    ///////////////END    LOG\\\\\\\\\\\\\
         CCLog("pak---------------------------4");
    FileMgr::loadConfigJson(dataFolderPath);
	JsonReader::setRootPath(dataFolderPath.c_str());
	     CCLog("pak---------------------------5");
}

void FileMgr::moveTypeDataFile(const char *typeDataPath,const char *dataPath)
{
    CCArray *folderArray = CCArray::create();
    CCArray *fileArray = CCArray::create();

    bool status= FileMgr::folderList(typeDataPath,folderArray,fileArray);
    
    if (status) {
        
        for (int i=0; i<fileArray->count(); i++) {
            
            CCString *fromPath = (CCString*)fileArray->objectAtIndex(i);
            
            std::string fileName = FileMgr::getCodeExt(fromPath->getCString(), "/");
            
            std::string filePath = FileMgr::InterceptionRightStr(fromPath->getCString(),"typedata/");
            
            CCString * toFilePath = CCString::create(dataPath+filePath);
            
            std::string toFolderPath = dataPath+FileMgr::InterceptionLeftStr(filePath,fileName);
            
            CCString * ccToFolderPath = CCString::create(toFolderPath.c_str());
            
            CCLog("fileName:  %s   ccToFolderPath:  %s",fileName.c_str(),ccToFolderPath->getCString());
            
            FileMgr::moveFile(fromPath->getCString(), toFilePath->getCString(), ccToFolderPath->getCString());
        }
    }
}

bool FileMgr::moveFile(const char *fromPath,const char *toPath,const char *toFolder)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t , "com/download/UpdateAllMgr",
                                      "copyFileToFile",
                                      "(Ljava/lang/String;Ljava/lang/String;)Z")){
        
        jstring jfromPath = t.env->NewStringUTF(fromPath);
        jstring jtoPath = t.env->NewStringUTF(toPath);
        jboolean ret = t.env->CallStaticBooleanMethod(t.classID , t.methodID , jfromPath , jtoPath);
        t.env->DeleteLocalRef(jfromPath);
        t.env->DeleteLocalRef(jtoPath);
        return ret;
    }
#endif

#if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    CSystemInfoMgr::sharedSystemInfoMgr()->moveFile(fromPath, toPath, toFolder);
#endif
    
    if( cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(fromPath) &&  cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(toPath))
    {
        remove(fromPath);
    }
    
    return true;
}


void FileMgr::loadConfigJson(std::string strWritePath)
{
    std::string initJsonName = "init.json";
    
    CCArray *jsonFileArray = FileMgr::getFolderFileArray(strWritePath.c_str(),"json");
    
    for (int i=0; i<jsonFileArray->count(); i++) {
        CCString *filePath = (CCString*)jsonFileArray->objectAtIndex(i);
        
        std::string fileName = FileMgr::getCodeExt(filePath->getCString(), "/");
        if (fileName==initJsonName) {
            CCLOG("init.Json form SD");
        }
        
        //CCLOG("filePath:  %s",filePath->getCString());
        JsonReader::readConfigJson(filePath->getCString());
    }
    
    if (jsonFileArray->count()<=0) {
        
        std::string initPakPath = CCFileUtils::sharedFileUtils()->fullPathForFilename(initJsonName.c_str());
        
        if( cocos2d::CCFileUtils::sharedFileUtils()->isFileExist(initPakPath))
        {
            JsonReader::readConfigJson(initJsonName.c_str());
            
            //设置是否需要读取Resources pak
            JsonReader::setIsResPakage(true);
        }
        
    }
}

bool FileMgr::isNewApp()
{
    std::string save_md5= CCUserDefault::sharedUserDefault()->getStringForKey(K_GAME_PREVIOUS_MD5);
    
    if (save_md5 != STR_MD5) {
        CCUserDefault::sharedUserDefault()->setStringForKey(K_GAME_PREVIOUS_MD5,STR_MD5);
        CCUserDefault::sharedUserDefault()->flush();
        return true;
    }
    return false;
}


void FileMgr::removePath(const char* path)
{
    CCArray *folderArray = CCArray::create();
    CCArray *fileArray = CCArray::create();

    bool status= FileMgr::folderList(path,folderArray,fileArray);
    
    if (status) {
        for (int j=0; j<fileArray->count(); j++) {
            CCString *filePath = (CCString*)fileArray->objectAtIndex(j);
            std::string cFilePath = filePath->getCString();
            
            rename(cFilePath.c_str(), (cFilePath+"del").c_str());
            remove((cFilePath+"del").c_str());
        }
        
        for (int i=folderArray->count()-1; i>=0; i--) {
            CCString *folderPath = (CCString*)folderArray->objectAtIndex(i);
            std::string cfolderPath = folderPath->getCString();
            rename(cfolderPath.c_str(), (cfolderPath + "del").c_str());
            remove((cfolderPath + "del").c_str());
        }
        
        std::string cpath = std::string(path);
        rename(path, (cpath + "del").c_str());
        remove((cpath + "del").c_str());
    }
    
}

//文件夹内部列表，包括子文件夹里面的文件
bool FileMgr::folderList(const char *path,CCArray *outFolderArray,CCArray *outFileArray) {
    struct dirent* ent = NULL;
    DIR *pDir;
    pDir = opendir(path);
    
    if (pDir == NULL) {
        //被当作目录，但是执行opendir后发现又不是目录，比如软链接就会发生这样的情况。
        return false;
    }
    
    while (NULL != (ent = readdir(pDir))) {
        if (ent->d_type == 8) {
            //file
            std::string _path(path);
            std::string _dirName(ent->d_name);
            std::string fullfilePath = _path +"/"+ _dirName;
            //CCLOG("——————————文件： %s", fullfilePath.c_str());
            outFileArray->addObject(CCString::create(fullfilePath.c_str()));
        } else {
            if (strcmp(ent->d_name, ".") == 0 || strcmp(ent->d_name, "..") == 0) {
                continue;
            }
            //directory
            std::string _path(path);
            std::string _dirName(ent->d_name);
            std::string fullDirPath = _path +"/"+ _dirName;

            //CCLOG("文件夹： %s", fullDirPath.c_str());
            outFolderArray->addObject(CCString::create(fullDirPath.c_str()));
            FileMgr::folderList(fullDirPath.c_str(), outFolderArray, outFileArray);
        }
    }
        
    return true;
}

bool FileMgr :: isFolderExit(const char *path)
{
   #if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t , "org/cocos2dx/lib/Cocos2dxHelper",
                                      "isFolderExit",
                                      "(Ljava/lang/String;)Z")){
        
        jstring jfromPath = t.env->NewStringUTF(path);
        jboolean ret = t.env->CallStaticBooleanMethod(t.classID , t.methodID , jfromPath);
        t.env->DeleteLocalRef(jfromPath);
        return ret;
    }
  #endif
  return true;
}

void FileMgr :: createFolder(const char *path)
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    JniMethodInfo t;
    if(JniHelper::getStaticMethodInfo(t , "org/cocos2dx/lib/Cocos2dxHelper",
                                      "createFolder",
                                      "(Ljava/lang/String;)V")){
        jstring jfromPath = t.env->NewStringUTF(path);
        t.env->CallStaticVoidMethod(t.classID , t.methodID , jfromPath);
        t.env->DeleteLocalRef(jfromPath);
    }
#endif
}
