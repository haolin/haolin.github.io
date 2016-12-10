//
//  PartyTrackJni.h
//  PetMania
//
//  Created by hong.zhang on 14-8-18.
//
//

#ifndef __PetMania__PartyTrackJni__
#define __PetMania__PartyTrackJni__

#include <iostream>
#include "cocos2d.h"
class PartyTrackJni : public cocos2d::CCNode{

public:
    PartyTrackJni();
    static PartyTrackJni* getInstance();

    void partytrackEvent(int);

    void partytrackPayment(const char*, const char*, int, int);

};

#endif