//
//  GooglePlayGame.h
//  PetMania
//
//  Created by 周成山 on 14-3-4.
//
//

#ifndef __PetMania__GooglePlayGame__
#define __PetMania__GooglePlayGame__

#include <iostream>
#include "cocos2d.h"
class GooglePlayGame : public cocos2d::CCNode{
    
public:
    GooglePlayGame();
    static GooglePlayGame* getInstance();
    
    void increment(const char* , int);
    
    void unLockAchievement(const char*);
    
    void displayAchievement();
    
    void submitLevel(const char* , int);
    
    void displayLeaderBoard(const char*);
        
};

#endif /* defined(__PetMania__GooglePlayGame__) */
