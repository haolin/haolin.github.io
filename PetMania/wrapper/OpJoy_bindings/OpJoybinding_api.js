/**
 * @module OpJoybinding
 */
var opJoy = opJoy || {};

/**
 * @class OpJoy
 */
opJoy.OpJoy = {

/**
 * @method ShowGameCenterLeaderboard
 */
ShowGameCenterLeaderboard : function () {},

/**
 * @method getAbledInviteFriends
 */
getAbledInviteFriends : function () {},

/**
 * @method addGetUidInfo
 * @param {const char*}
 * @param {const char*}
 */
addGetUidInfo : function () {},

/**
 * @method updateUserPhoto
 */
updateUserPhoto : function () {},

/**
 * @method CommonInterface_navitecallBack
 * @param {std::string}
 * @param {std::string}
 */
CommonInterface_navitecallBack : function () {},

/**
 * @method CommonUserInfo_navitecallBack
 * @param {std::string}
 * @param {std::string}
 * @param {std::string}
 */
CommonUserInfo_navitecallBack : function () {},

/**
 * @method isGameCenterAvailable
 * @return A value converted from C/C++ "bool"
 */
isGameCenterAvailable : function () {},

/**
 * @method ReportGameCenterScore
 * @param {int}
 */
ReportGameCenterScore : function () {},

/**
 * @method isAutoLogin
 * @param {int}
 */
isAutoLogin : function () {},

/**
 * @method isGameCenterLogin
 * @return A value converted from C/C++ "bool"
 */
isGameCenterLogin : function () {},

/**
 * @method facebookInvite
 * @param {const char*}
 */
facebookInvite : function () {},

/**
 * @method inviteOneFriend
 * @param {const char*}
 * @param {const char*}
 */
inviteOneFriend : function () {},

/**
 * @method downUserPhoto
 * @param {int}
 * @param {const char*}
 */
downUserPhoto : function () {},

/**
 * @method addFriendFromID
 * @param {const char*}
 */
addFriendFromID : function () {},

/**
 * @method payBilling
 * @param {const char*}
 * @param {int}
 * @param {const char*}
 * @param {const char*}
 */
payBilling : function () {},

/**
 * @method logout
 */
logout : function () {},

/**
 * @method GameCenterLogin
 */
GameCenterLogin : function () {},

/**
 * @method loginCallBack
 * @param {const char*}
 * @param {const char*}
 */
loginCallBack : function () {},

/**
 * @method getJoyGameFriends
 */
getJoyGameFriends : function () {},

/**
 * @method bindUserInfo
 * @param {int}
 */
bindUserInfo : function () {},

/**
 * @method login
 * @param {int}
 */
login : function () {},

/**
 * @method unregister
 */
unregister : function () {},

/**
* @method sendTemplateMessage
* @param {int}             messageType,1 = normal,2 = invite
* @param {const char*}     friendid
* @param {const char*}     templete id
* @param {const char*}     excuteurl string form like "key1=value1&key2=value2" , if no excuteurl, use empty string
*/
sendTemplateMessage: function(){},

showMessageBlockDialog:function(){},

/**
* @method partytrackEvent
* @param {int}
*/
partytrackEvent: function(){},

/**
* @method partytrackPayment
* @param {const char*}
* @param {const char*}
* @param {float}
* @param {int}
*/
partytrackPayment: function(){},

/**
 * @method partytrackEvent
 */
appFirstLaunched: function(){},

/**
 * @method getInstance
 * @return A value converted from C/C++ "OpJoy*"
 */
getInstance : function () {},

/**
 * @method OpJoy
 * @constructor
 */
OpJoy : function () {},

};
