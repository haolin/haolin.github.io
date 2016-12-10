/**
 * Created by hong.zhang on 2014/7/24.
 */

Achieve = {};

Achieve.AchieveType = {
    TYPE_CLEAR_STAGE: 0,
    TYPE_CLEAR_SHARE: 1,
    TYPE_ANSWER_HEART: 2,
    TYPE_ASK_HEART: 3,
    TYPE_NAME_STAGE: 4,
    TYPE_PERFECT_CLRAR: 5
}
//
//Achieve.AchieveID = {
//    TYPE_CLEAR_STAGE: "cj0",
//    TYPE_CLEAR_SHARE: "cj1",
//    TYPE_ANSWER_HEART: "cj2",
//    TYPE_ASK_HEART: "cj3",
//    TYPE_NAME_STAGE: "cj4",
//    TYPE_PERFECT_CLRAR: "cj5"
//}

var getAchieveName0 = function(nIdx)
{
//    return Resource.KoreanTxt["cj0" + (nIdx < 10? "0" + (nIdx.toString()):(nIdx.toString()))];
    return Resource.KoreanTxt["cj000"];
}

var getAchieveName1 = function(nIdx)
{
    return Resource.KoreanTxt["cj101"];
}

var getAchieveName2 = function(nIdx)
{
    return Resource.KoreanTxt["cj201"];
}

var getAchieveName3 = function(nIdx)
{
    return Resource.KoreanTxt["cj301"];
}

var getAchieveName4 = function(nIdx)
{
//    return Tools.sprintfs(Resource.KoreanTxt["cj401"],nIdx);
    return Resource.KoreanTxt["cj401"];
}

var getAchieveName5 = function(nIdx)
{
    return Resource.KoreanTxt["cj501"];
}

Achieve.AchieveName = {
    0: getAchieveName0,
    1: getAchieveName1,
    2: getAchieveName2,
    3: getAchieveName3,
    4: getAchieveName4,
    5: getAchieveName5
}

var getAchieveDes0 = function(nTarget)
{
    return Tools.sprintfs(Resource.KoreanTxt["cj001_des"],nTarget.toString());
}

var getAchieveDes1 = function(nTarget)
{
    return Tools.sprintfs(Resource.KoreanTxt["cj101_des"],nTarget.toString());
}

var getAchieveDes2 = function(nTarget)
{
    return Tools.sprintfs(Resource.KoreanTxt["cj201_des"],nTarget.toString());
}

var getAchieveDes3 = function(nTarget)
{
    return Tools.sprintfs(Resource.KoreanTxt["cj301_des"],nTarget.toString());
}

var getAchieveDes4 = function(nTarget)
{
    return Tools.sprintfs(Resource.KoreanTxt["cj401_des"],nTarget.toString());
}


var getAchieveDes5 = function(nTarget)
{
    return Tools.sprintfs(Resource.KoreanTxt["cj501_des"],nTarget.toString());
}

Achieve.AchieveDes = {
    0: getAchieveDes0,
    1: getAchieveDes1,
    2: getAchieveDes2,
    3: getAchieveDes3,
    4: getAchieveDes4,
    5: getAchieveDes5
}