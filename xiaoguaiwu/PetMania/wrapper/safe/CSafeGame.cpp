//
//  CSafeGame.cpp
//  PetMania
//
//  Created by Wang CunKai on 14-1-7.
//
//

#include "CSafeGame.h"
#include "cocos2d.h"
#include "support/zip_support/ZipUtils.h"

using namespace cocos2d;

CSafeGame* CSafeGame::getInstance()
{
    static CSafeGame _safeGame;
    return &_safeGame;
}

void CSafeGame::start()
{
    ZipUtils::ccSetPvrEncryptionKeyPart(1, 0xa636dd2a);//TEXTURE_PACKER_KEY 1
    ZipUtils::ccSetPvrEncryptionKeyPart(2, 0x03fa23af);//TEXTURE_PACKER_KEY 2
    ZipUtils::ccSetPvrEncryptionKeyPart(3, 0x8855652c);//TEXTURE_PACKER_KEY 3
}