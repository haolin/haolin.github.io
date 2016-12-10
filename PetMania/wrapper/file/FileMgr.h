//
//  FileMgr.h
//  PetMania
//
//  Created by 周成山 on 13-9-5.
//
//

#ifndef __PetMania__FileMgr__
#define __PetMania__FileMgr__

#include <iostream>
#include <string>
#include "cocos2d.h"

#define KFILE_LIST_FOLDER "FILE_LIST_FOLDER"
#define KFILE_LIST_FILE "FILE_LIST_FILE"

class FileMgr{
public :
    static std::string getSDCardRoot();
    static std::string getAppFileRoot();//没有sdcard下获取的文件路径
    static std::string getWriteFilePath();//获取文件保存的路径根目录
    
    static cocos2d::CCArray* getFolderFileArray(const char* folderPath,const char* extension);//folder:文件夹目录  extension:  扩展名
    static std::string getCodeExt(const std::string& code,const char *c);//截取尾部字符串
    static std::string InterceptionRightStr(const std::string pathStr, const std::string findStr);//搜索第一个符合条件的截取它的右边值返回
    static std::string InterceptionLeftStr(const std::string pathStr, const std::string findStr);//搜索第一个符合条件的截取它的左边值返回

    static void startPakage(bool);//设置是否加密 并初始化打包
    static void loadConfigJson(std::string strWritePath);//加载json
    
    static bool copyResourceFile(const char* src , const char* target , const char* toFolder);
    
    static void moveTypeDataFile(const char *typeDataPath,const char *dataPath);
    static bool moveFile(const char *fromPath,const char *toPath,const char *toFolder);
    
    static bool isNewApp();
    static void removePath(const char* path);
    
    static bool folderList(const char *path,cocos2d::CCArray *outFolderArray,cocos2d::CCArray *outFileArray);//文件夹内部列表
    
    static bool isFolderExit(const char *path);
    static void createFolder(const char *path);
};
#endif /* defined(__PetMania__FileMgr__) */
