//
//  KakaoJoy.h
//  PetMania
//
//  Created by hong.zhang on 14-7-18.
//
//

#ifndef __PetMania__KakaoJoy__
#define __PetMania__KakaoJoy__

#include <iostream>
#include "cocos2d.h"
class KakaoJoy : public cocos2d::CCNode{

public:
    KakaoJoy();
    static KakaoJoy* getInstance();

    void sendTemplateMessage(int, const char*, const char*, const char*,const char*);

    void showMessageBlockDialog();

};

#endif
