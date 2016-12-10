//
//  CashslideJni.h
//  PetMania
//
//  Created by hong.zhang on 14-8-19.
//
//

#ifndef __PetMania__CashslideJni__
#define __PetMania__CashslideJni__

#include <iostream>
#include "cocos2d.h"
class CashslideJni : public cocos2d::CCNode{

public:
    CashslideJni();
    static CashslideJni* getInstance();

    void appFirstLaunched();

};

#endif