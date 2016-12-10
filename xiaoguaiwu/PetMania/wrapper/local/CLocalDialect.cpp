//本地化
#include "CLocalDialect.h"
#include "cocos2d.h"

using namespace cocos2d;

static cocos2d::CCDictionary *g_plistData = NULL;

CLocalDialect::~CLocalDialect()
{
    
}

CLocalDialect* CLocalDialect::share()
{
    static CLocalDialect _localDialect;
    return &_localDialect;
}

CLocalDialect::CLocalDialect()
{
    std::string localizable = "CLocal/Localizable";
    
    ccLanguageType type = CCApplication::sharedApplication()->getCurrentLanguage();
    CCLOG("ccLanguageType type   %d",type);
//    ccLanguageType
//      kLanguageEnglish = 0,
//      kLanguageChinese,
//      kLanguageFrench,
//      kLanguageItalian,
//      kLanguageGerman,
//      kLanguageSpanish,
//      kLanguageRussian,
//      kLanguageKorean,
//      kLanguageJapanese,
//      kLanguageHungarian,
//      kLanguagePortuguese,
//      kLanguageArabic
    
    std::string localizablePath = localizable+".plist";
    
    switch (type) {
        case kLanguageEnglish:
            localizablePath = localizable+"_en"+".plist";//英文plist
            break;
        case kLanguageChinese:
            localizablePath = localizable+"_cn"+".plist";//中文plist
            break;
        case kLanguageJapanese:
            localizablePath = localizable+"_jp"+".plist";//日文plist
            break;
		case kLanguageKorean:
            localizablePath = localizable+"_ko"+".plist";//韩文plist
            break;
        default:
            localizablePath = localizable+"_ko"+".plist";//默认是韩文plist
            break;
    }
    
    if (!CCFileUtils::sharedFileUtils()->isFileExist(localizablePath.c_str())) {//如果文件不存在默认是韩文plist
        localizablePath = localizable+"_ko"+".plist";
    }
    
    std::string fullPath = CCFileUtils::sharedFileUtils()->fullPathForFilename(localizablePath.c_str());
    
    CCString *fullStr = CCString::create(fullPath.c_str());
   
    g_plistData = CCDictionary::createWithContentsOfFileThreadSafe(fullStr->getCString());
    
    CCLOG("g_plistData   %p  %s",g_plistData,fullPath.c_str());
#ifdef DEBUG
    if (g_plistData) {
        
        CCArray *allkeys = g_plistData->allKeys();
        
        CCLOG("加载资源->");
        
        for (int i=0; i<allkeys->count(); i++) {
            
            CCString *key = (CCString*)allkeys->objectAtIndex(i);
            CCString *value = (CCString*)g_plistData->objectForKey(key->getCString());
            
            CCLOG("%s = %s",key->getCString(),value->getCString());
        }
        
        CCLOG("<-加载资源");
    }
#endif
}

const char* CLocalDialect::textLocal(const char* key)
{
    if (!g_plistData) {
        return key;
    }
    
    const cocos2d::CCString* value = g_plistData->valueForKey(key);
    
    if (value) {
        return value->getCString();
    }
    
    return key;
}
