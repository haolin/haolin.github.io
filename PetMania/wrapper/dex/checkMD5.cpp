#include "checkMD5.h"
#include "cocos2d.h"
#include "ccmd5.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include "jni/Java_org_cocos2dx_lib_Cocos2dxHelper.h"
#endif
using namespace cocos2d;
using namespace std;

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
#include "MD5String.h"
#else
#define STR_MD5         ""
#endif

#define FILE_NAME  "classes.dex"

std::string getCurMD5Str()
{
    unsigned char* buffer = NULL;
    unsigned long bufSize = 0;
    std::string strRet = "";
    char szTemp[48] = {0};

#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    const char* fullPath = getApkPath();
    CCLOG("full path is %s", fullPath);
    buffer = CCFileUtils::sharedFileUtils()->getFileDataFromZip(fullPath, FILE_NAME, &bufSize);
    lutil_md5_data(buffer, bufSize, szTemp);
    strRet = szTemp;
    CC_SAFE_DELETE_ARRAY(buffer);
#else
    unsigned long nSize = 0;
    unsigned char* pBuffer = CCFileUtils::sharedFileUtils()->getFileData(FILE_NAME, "rb", &nSize);
    if (pBuffer)
    {
        lutil_md5_data(buffer, bufSize, szTemp);
        strRet = szTemp;
    }
    
    //yh
    CC_SAFE_DELETE_ARRAY(pBuffer);
#endif

    return strRet;
}

bool isMD5Correct()
{
    bool bRet = true;

    do 
    {
        std::string strMD5 = STR_MD5;
        //CCLOG("Record md5 string is : %s", strMD5.c_str());
        if (strMD5.length() <= 0)
        {
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
            CCMessageBox("MD5 string is empty! PLZ ensure it's in debug mode!", "Debug");
#endif
            break;
        }

        std::string curMD5 = getCurMD5Str();
        //CCLOG("current md5 string is : %s", curMD5.c_str());
        if (0 != curMD5.compare(strMD5))
        {
            bRet = false;
        }
    } while (0);
 
    return bRet;
}
