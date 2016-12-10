/**
 * 注意事项
 * 1.ID 不可改动
 * 2.以后钻石从100开始记， 其它的新增物品从各自阶段开始加
 */

//=================================================== GUIShopData ======================================================
GUI.SHOP_ITEM_TYPE =
{
    SHOP_ITEM_DIAMOND: 0,               /*钻石*/
    SHOP_ITEM_LIFE: 1,                  /*薄荷糖*/
    SHOP_ITEM_ITEM: 2,                  /*道具*/
    SHOP_ITEM_CONTINUE: 3,              /*继续游戏*/
    SHOP_ITEM_PRESENT: 4,              /*赠送礼物*/
    SHOP_ITEM_MOVES: 5,                 /*加5步*/
    SHOP_ITEM_NEW: 6,                   /*新手特惠包*/
    SHOP_ITEM_SUPER: 7,                 /*超级大礼包*/
    SHOP_ITEM_WORLD: 8,                 /*宇宙至尊包*/
    SHOP_ITEM_UNLOCK_NEW_ZONE: 9,       /*解锁新星球*/
    SHOP_ITEM_HEART_LIMIT: 10,          /*增加薄荷糖上限*/
    SHOP_ITEM_ACTIVATE: 11,              /*正版激活*/
    SHOP_ITEM_TIME: 12,                 /*加15秒*/
    SHOP_LOGIN_ITEM: 13,               /*登陆推送*/
    SHOP_FAILED_ITEM: 14,               /*失败推送*/
    SHOP_FREE_CANDY: 15               /*无限薄荷糖*/
};

//----------------------------------------------------------------------------------------------------------------------
GUI.ITEM_CELL_TYPE =
{
    CELL_TYPE_NULL: 0,
    CELL_TYPE_NEW: 1,
    CELL_TYPE_HOT: 2,
    CELL_TYPE_PROMOTION: 3
};

//----------------------------------------------------------------------------------------------------------------------
GUI.ITEM_CELL_CURRENCY =
{
    CELL_CURRENCY_RMB: 0,
    CELL_CURRENCY_DIAMOND: 1
};

//----------------------------------------------------------------------------------------------------------------------
GUI.PAY_TYPE =
{
    SMS: 101,
    OTHERS: 102,
    ANY: 103
};

//----------------------------------------------------------------------------------------------------------------------
GUI.SHOP_DATA =
{
    SHOP_DATA_DIAMOND:
        [
            {
                ID: 1,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_0"],
                ENG_NAME:"diamond_0",
                GIFT_COUNT: 0,
                COUNT: 400,
                TOTAL_PRICE: 2,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_NEW,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_0.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_0"],
                "PAY":{
                    "cmpayCode" : "001",
                    "cmmmpayCode" : "30000745208813",
                    "cupayCode1" : "130909010577",
                    "cupayCode" : "001",
                    "ctpayCode" : "94260",
                    "ctotherCode": "109659",
                    "miCode":"com.xiaomi.jjdxgw.code1",
                    "miType":"consume"
                }
            },

            {
                ID: 2,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_1"],                                       /*iOS:1200个钻石*/
                ENG_NAME:"diamond_1",
                GIFT_COUNT: 0,                                          /*iOS:100*/
                COUNT: 1000,                                             /*iOS:1200*/
                TOTAL_PRICE: 5,
                DISCOUNT: 0,                                     /*iOS:6*/
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_NEW,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_1.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_1"],                                /*iOS:1200个钻石*/
                "PAY":{
                    "cmpayCode" : "002",
                    "cmmmpayCode" : "30000745208810",
                    "cupayCode1" : "130909010580",
                    "cupayCode" : "004",
                    "ctpayCode" : "94263",
                    "ctotherCode": "109660",
                    "miCode":"com.xiaomi.jjdxgw.code2",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.um.iap.tier1",
                    "iap" : "yourstar1200",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.m.iap.tier1"
                }
            },

            {
                ID: 3,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_2"],                                       /*iOS:2400个钻石*/
                ENG_NAME:"diamond_2",
                SF_GIFT: 0,
                GIFT_COUNT: 200,                                          /*iOS:300*/
                COUNT: 2000,                                              /*iOS:2400*/
                TOTAL_PRICE: 10,
                DISCOUNT: 0,                                        /*iOS:12*/
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_2.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_2"],                                 /*iOS:2400个钻石*/
                "PAY":{
                    "cmpayCode" : "003",
                    "cmmmpayCode" : "30000745208809",
                    "cupayCode1" : "130909010581",
                    "cupayCode" : "005",
                    "ctpayCode" : "94264",
                    "ctotherCode": "109661",
                    "miCode":"com.xiaomi.jjdxgw.code3",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.um.iap.tier2",
                    "iap" : "com.cocoentertainment.jinjidexiaoguaiwu.iap.tier2",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.m.iap.tier2"
                }
            },

            {
                ID: 4,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_3"],
                ENG_NAME:"diamond_3",
                SF_GIFT: 0,
                GIFT_COUNT: 400,
                COUNT: 3000,
                TOTAL_PRICE: 15,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_3.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_3"],
                "PAY":{
                    "cmpayCode" : "004",
                    "cmmmpayCode" : "30000745208808",
                    "cupayCode1" : "130910010740",
                    "cupayCode" : "011",
                    "ctpayCode" : "95085",
                    "ctotherCode" : "109662",
                    "miCode":"com.xiaomi.jjdxgw.code4",
                    "miType":"consume"
                }
            },

            {
                ID: 5,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_4"],
                ENG_NAME:"diamond_4",
				SF_GIFT: 0,
                GIFT_COUNT: 600,
                COUNT: 4000,
                TOTAL_PRICE: 20,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_4.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_4"],
                "PAY":{
                    "cmpayCode" : "005",
                    "cmmmpayCode" : "30000745208807",
                    "cupayCode1" : "130910010741",
                    "cupayCode" : "012",
                    "ctpayCode" : "95086",
                    "ctotherCode" : "109663",
                    "miCode":"com.xiaomi.jjdxgw.code5",
                    "miType":"consume"
                }
            },

            {
                ID: 6,                                                     //ios googleplay 6000s
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_5"],
                ENG_NAME:"diamond_5",
				SF_GIFT: 0,
                GIFT_COUNT: 600,
                COUNT: 6000,
                TOTAL_PRICE: 30,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_5.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_5"],
                "PAY":{
                    "cmpayCode" : "006",
                    "cmmmpayCode" : "30000745208801",
                    "cupayCode1" : "130909010582",
                    "cupayCode" : "006",
                    "ctpayCode" : "0111C001741102210073711102210072550115174000000000000000000000000000",
                    "ctotherCode": "109664",
                    "miCode":"com.xiaomi.jjdxgw.code6",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.um.iap.tier5",
                    "iap" : "yourstar6000",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.m.iap.tier5"
                }
            },

            {
                ID: 7,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_6"],
                ENG_NAME:"diamond_6",
                GIFT_COUNT: 1800,
                COUNT: 13600,
                TOTAL_PRICE: 68,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_6.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_6"],
                "PAY":{
                    "cmpayCode" : "007",
                    "cupayCode" : "130909010583",
                    "ctpayCode" : "0111C001741102210073711102210072550115174000000000000000000000000000",
                    "miCode":"com.xiaomi.jjdxgw.code7",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.um.iap.tier10",
                    "iap" : "yourstar12000",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.m.iap.tier10"
                }
            },

            {
                ID: 8,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_7"],
                ENG_NAME:"diamond_7",
                GIFT_COUNT: 4800,
                COUNT: 25600,
                TOTAL_PRICE: 128,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_7.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_7"],
                "PAY":{
                    "cmpayCode" : "008",
                    "cupayCode" : "130909010584",
                    "ctpayCode" : "0111C001741102210073711102210072550115174000000000000000000000000000",
                    "miCode":"com.xiaomi.jjdxgw.code8",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.um.iap.tier20",
                    "iap" : "yourstar24000",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.m.iap.tier20"
                }
            },

            {
                ID: 108,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_8"],
                ENG_NAME:"diamond_8",
                GIFT_COUNT: 15000,
                COUNT: 65600,
                TOTAL_PRICE: 328,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_8.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_8"],
                "PAY":{
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.um.iap.tier20",
                    "iap" : "yourstar60000",
                    "miCode":"com.xiaomi.jjdxgw.code16",
                    "miType":"consume",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.m.iap.tier50"
                }
            },

            {
                ID: 109,
                BILL_TYPE: "Diamond",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_DIAMOND,
                NAME: Resource.ChineseTxt["diamond_name_base_9"],
                ENG_NAME:"diamond_9",
                GIFT_COUNT: 36000,
                COUNT: 129600,
                TOTAL_PRICE: 648,
                DISCOUNT: 0,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_diamond_9.png",
                DESCRIPTION: Resource.ChineseTxt["diamond_desc_base_9"],
                "PAY":{
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.um.iap.tier20",
                    "iap" : "yourstar120000",//.iap.tier60",
                    "miCode":"com.xiaomi.jjdxgw.code17",
                    "miType":"consume",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.m.iap.tier60"
                }
            }
        ],

    SHOP_DATA_LIFE:
        [
            {
                ID: 9,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE,
                NAME: Resource.ChineseTxt["heart_name_base_0"],
                GIFT_COUNT: 0,
                COUNT: 5,
                TOTAL_PRICE: 600,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
                SPRITE_SOURCE: "icon_heart_0.png",
                DESCRIPTION: Resource.ChineseTxt["heart_desc_base_0"]
            },

            {
                ID: 10,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE,
                NAME: Resource.ChineseTxt["heart_name_base_1"],
                GIFT_COUNT: 2,
                COUNT: 10,
                TOTAL_PRICE: 1200,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
                SPRITE_SOURCE: "icon_heart_1.png",
                DESCRIPTION: Resource.ChineseTxt["heart_desc_base_1"]
            },

            {
                ID: 11,
                BILL_TYPE: "middleHeart",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE,
                NAME: Resource.ChineseTxt["heart_name_base_2"],
                ENG_NAME:"middleHeart",
                GIFT_COUNT: 5,
                COUNT: 20,
                TOTAL_PRICE: 2400,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
                SPRITE_SOURCE: "icon_heart_2.png",
                DESCRIPTION: Resource.ChineseTxt["heart_desc_base_2"],
                "PAY":{
                    "cmpayCode" : "001",
                    "cmmmpayCode" : "30000745208801",
                    "cupayCode" : "130925012044",
                    "ctpayCode" : "1011C1105711022232593711022232503301MC099474000000000000000000000000"
                }
            },

            {
                ID: 12,
                BILL_TYPE: "bigHeartBag",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_LIFE,
                NAME: Resource.ChineseTxt["heart_name_base_3"],
                ENG_NAME:"bigHeartBag",
                GIFT_COUNT: 15,
                COUNT: 50,
                TOTAL_PRICE: 6000,                                                    /*运营商：20元*/
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,               /*运营商：RMB*/
                SPRITE_SOURCE: "icon_heart_3.png",
                DESCRIPTION: Resource.ChineseTxt["heart_desc_base_3"],
                "PAY":{
                    "cmpayCode" : "008",
                    "cmmmpayCode" : "30000745208803",
                    "cupayCode1" : "130925012035",
                    "cupayCode" : "013",
                    "ctpayCode" : "108746",
                    "ctotherCode" : "109666",
                    "miCode":"com.xiaomi.jjdxgw.code10",
                    "miType":"consume"
                }
            }
        ],

    //道具们
    SHOP_DATA_ITEM:
        [
            {
                ID: 13,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_DIRECTION_EX,
                NAME: Resource.ChineseTxt["item_name_base_0"],
                ENG_NAME:"LineXiao",
                COUNT: 3,                                                             /*CM：5个*/
                UNIT_PRICE: 200,
                TOTAL_PRICE: 500,                                                     /*CM：5元*/
                ORIGINAL_PRICE: 200 * 3,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_NEW,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,               /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_1.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_0"],
                "PAY":{
                    "cmpayCode" : "004",
                    "cmmmpayCode" : "30000745208804",
                    "cupayCode" : "130925012036",
                    "ctpayCode" : "0511C1105711022232593711022232503501MC099474000000000000000000000000"
                }
            },

            {
                ID: 14,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_WARP_EX,
                NAME: Resource.ChineseTxt["item_name_base_1"],
                ENG_NAME:"BoomXiao",
                COUNT: 3,                                                            /*CM：5个*/
                UNIT_PRICE: 200,
                TOTAL_PRICE: 500,                                                    /*CM：5元*/
                ORIGINAL_PRICE: 200 * 3,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,              /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_2.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_1"],
                "PAY":{
                    "cmpayCode" : "005",
                    "cmmmpayCode" : "30000745208805",
                    "cupayCode" : "130925012037",
                    "ctpayCode" : "0511C1105711022232593711022232503601MC099474000000000000000000000000"
                }
            },

            {
                ID: 15,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_COLORFUL_EX,
                NAME: Resource.ChineseTxt["item_name_base_2"],
                ENG_NAME:"SameXiao",
                COUNT: 3,                                                            /*CM：5个*/
                UNIT_PRICE: 400,
                TOTAL_PRICE: 1000,                                                   /*CM：10元*/
                ORIGINAL_PRICE: 400 * 3,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,              /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_3.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_2"],
                "PAY":{
                    "cmpayCode" : "006",
                    "cmmmpayCode" : "30000745208806",
                    "cupayCode" : "130925012038",
                    "ctpayCode" : "1011C1105711022232593711022232503701MC099474000000000000000000000000"
                }
            },

            {
                ID: 16,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_TRANSPOSITION,
                NAME: Resource.ChineseTxt["item_name_base_3"],
                ENG_NAME:"Move",
                COUNT: 3,                                                           /*CM：5个*/
                UNIT_PRICE: 500,
                TOTAL_PRICE: 1200,                                                  /*CM：10元*/
                ORIGINAL_PRICE: 500 * 3,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,             /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_4.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_3"],
                "PAY":{
                    "cmpayCode" : "007",
                    "cmmmpayCode" : "30000745208807",
                    "cupayCode" : "130925012039",
                    "ctpayCode" : "1011C1105711022232593711022232503801MC099474000000000000000000000000"
                }
            },

            {
                ID: 17,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_TIME,
                NAME: Resource.ChineseTxt["item_name_base_4"],
                ENG_NAME:"TimePanel",
                COUNT: 3,                                                           /*CM：10个*/
                UNIT_PRICE: 400,
                TOTAL_PRICE: 1000,                                                  /*CM：15元*/
                ORIGINAL_PRICE: 400 * 3,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,             /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_5.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_4"],
                "PAY":{
                    "cmpayCode" : "008",
                    "cmmmpayCode" : "30000745208808",
                    "cupayCode" : "130925012040",
                    "ctpayCode" : "1511C1105711022232593711022232503901MC099474000000000000000000000000"
                }
            },

            {
                ID: 18,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_STAINING,
                NAME: Resource.ChineseTxt["item_name_base_5"],
                ENG_NAME:"Color",
                COUNT: 3,                                                          /*CM：10个*/
                UNIT_PRICE: 400,
                TOTAL_PRICE: 1000,                                                 /*CM：15元*/
                ORIGINAL_PRICE: 400 * 3,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,            /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_6.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_5"],
                "PAY":{
                    "cmpayCode" : "009",
                    "cmmmpayCode" : "30000745208809",
                    "cupayCode" : "130925012041",
                    "ctpayCode" : "1511C1105711022232593711022232504001MC099474000000000000000000000000"
                }
            },

            {
                ID: 19,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_STORM,
                NAME: Resource.ChineseTxt["item_name_base_6"],
                ENG_NAME:"LanMao",
                COUNT: 3,                                                         /*CM：10个*/
                UNIT_PRICE: 300,
                TOTAL_PRICE: 750,                                                 /*CM：10元*/
                ORIGINAL_PRICE: 300 * 3,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,           /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_7.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_6"],
                "PAY":{
                    "cmpayCode" : "010",
                    "cmmmpayCode" : "30000745208810",
                    "cupayCode" : "130925012042",
                    "ctpayCode" : "1011C1105711022232593711022232504101MC099474000000000000000000000000"
                }
            },

            {
                ID: 20,
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ITEM,
                GAME_ITEM: Defines.GameItems.ITEM_GOLDEN_KEY,
                NAME: Resource.ChineseTxt["item_name_base_7"],
                ENG_NAME:"FireX",
                COUNT: 7,                                                         /*CM：10个*/
                UNIT_PRICE: 500,
                TOTAL_PRICE: 2800,                                                /*CM：10元*/
                ORIGINAL_PRICE: 500 * 7,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,           /*CM：RMB*/
                SPRITE_SOURCE: "icon_item_8.png",
                DESCRIPTION: Resource.ChineseTxt["item_desc_base_7"],
                "PAY":{
                    "cmpayCode" : "011",
                    "cmmmpayCode" : "30000745208811",
                    "cupayCode" : "130925012043",
                    "ctpayCode" : "1011C1105711022232593711022232504201MC099474000000000000000000000000"
                }
            }
        ],

    //iOS：加秒数 6元
    //安卓：继续游戏 5元
    SHOP_DATA_TIME:
        [
            {
                ID: 21,
                BILL_TYPE: "addTime",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_TIME,
                NAME: Resource.ChineseTxt["time_name_base_0"],
                ENG_NAME:"addTime15",
                COUNT: 15,
                TOTAL_PRICE: 5,                                                 /*iOS:6*/
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: null,
                DESCRIPTION: Resource.ChineseTxt["time_desc_base_0"],
                "PAY":{
                    "cmpayCode" : "010",
                    "cmmmpayCode" : "30000745208811",
                    "cupayCode1" : "130909010579",
                    "cupayCode" : "003",
                    "ctpayCode" : "94262",
                    "ctotherCode" : "109668",
                    "miCode":"com.xiaomi.jjdxgw.code12",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.jimiaoshu.um.iap.tier1",
                    "iap" : "com.cocoentertainment.jinjidexiaoguaiwu.jiamiaoshu.iap.tier1",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.jimiaoshu.m.iap.tier1"
                }
            }
        ],

    //iOS：加步数 6元
    //安卓：继续游戏 5元
    SHOP_DATA_MOVES:
        [
            {
                ID: 22,
                BILL_TYPE: "addStep",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_MOVES,
                NAME: Resource.ChineseTxt["move_name_base_0"],
                ENG_NAME:"addStep5",
                COUNT: 5,
                TOTAL_PRICE: 5,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: null,
                DESCRIPTION: Resource.ChineseTxt["move_desc_base_0"],
                "PAY":{
                    "cmpayCode" : "010",
                    "cmmmpayCode" : "30000745208811",
                    "cupayCode1" : "130909010579",
                    "cupayCode" : "003",
                    "ctpayCode" : "94262",
                    "ctotherCode" : "109668",
                    "miCode":"com.xiaomi.jjdxgw.code12",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.jiabushu.um.iap.tier1",
                    "iap" : "com.cocoentertainment.jinjidexiaoguaiwu.jiabushu.iap.tier1",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.jiabushu.m.iap.tier1"
                }
            }
        ],

    //iOS：新手特惠包 6元
    //安卓：新手大礼包 1元
    SHOP_DATA_NEW:
        [
            {
                ID: 23,
                BILL_TYPE: "newUserGift",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_NEW,
                NAME: Resource.ChineseTxt["pack_name_base_0"],
                ENG_NAME:"newUserGift",
                COUNT: 1,
                TOTAL_PRICE: 5,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_package_0.png",
                DESCRIPTION: Resource.ChineseTxt["pack_desc_base_0"],
                "PAY":{
                    "cmpayCode" : "011",
                    "cmmmpayCode" : "30000745208806",
                    "cupayCode1" : "131114015665",
                    "cupayCode" : "026",
                    "ctpayCode" : "108748",
                    "ctotherCode" : "109669",
                    "miCode":"com.xiaomi.jjdxgw.code15",
                    "miType":"nonconsume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.xinshoubao.m.iap.tier1",
                    "iap" : "yourstarbeginner",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.xinshoubao.m.iap.tier1"
                }
            }
        ],

    //超级大礼包 快用是50元
    SHOP_DATA_SUPER:
        [
            {
                ID: 24,
                BILL_TYPE: "superGift",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_SUPER,
                NAME: Resource.ChineseTxt["pack_name_base_1"],
                ENG_NAME:"superGift",
                COUNT: 5,
                TOTAL_PRICE: 9700,//45,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,//GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_package_1.png",
                DESCRIPTION: Resource.ChineseTxt["pack_desc_base_1"],
                "PAY":{
                    "cmpayCode" : "001",
                    "cupayCode" : "130909010585",
                    "ctpayCode" : "0111C001741102210073711102210072550115174000000000000000000000000000",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.chaojibao.um.iap.tier7",
                    "iap" : "com.cocoentertainment.jinjidexiaoguaiwu.chaojibao.iap.tier7",
                    "miCode":"com.xiaomi.jjdxgw.code14",
                    "miType":"consume",
                    "amazoniap":"sku.punchbox.jinjidexiaoguaiwu.chaojibao.m.iap.tier7"
                }
            }
        ],

    //宇宙至尊包 快用是200元
    SHOP_DATA_WORLD:
        [
            {
                ID: 25,
                BILL_TYPE: "worldGift",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_WORLD,
                NAME: Resource.ChineseTxt["pack_name_base_2"],
                ENG_NAME:"worldGift",
                COUNT: 25,
                TOTAL_PRICE: 39700,//198,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,//GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_package_2.png",
                DESCRIPTION: Resource.ChineseTxt["pack_desc_base_2"],
                "PAY":{
                    "cmpayCode" : "001",
                    "cupayCode" : "130909010586",
                    "ctpayCode" : "0111C001741102210073711102210072550115174000000000000000000000000000",
                    "miCode":"com.xiaomi.jjdxgw.code13",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.yuzhoubao.um.iap.tier3",
                    "iap" : "com.cocoentertainment.jinjidexiaoguaiwu.yuzhoubao.iap.tier30",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.yuzhoubao.m.iap.tier30"
                }
            }
        ],

    //解锁新星球 AppStore为6元
    SHOP_DATA_UNLOCK_NEW_ZONE:
        [
            {
                ID: 26,
                BILL_TYPE: "unlockNewZone",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_UNLOCK_NEW_ZONE,
                NAME: Resource.ChineseTxt["new_zone_name_base"],
                ENG_NAME:"unlockNewZone",
                COUNT: 1,
                TOTAL_PRICE: Defines.DIAMOND_PAY.UNLOCK_NEW_STAR,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
                SPRITE_SOURCE: null,
                DESCRIPTION: Resource.ChineseTxt["new_zone_desc_base"]
            }
        ],

    //薄荷糖上限加1 AppStore为6元
    SHOP_DATA_HEART_LIMIT:
        [
            {
                ID: 27,
                BILL_TYPE: "heartLimit",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_HEART_LIMIT,
                NAME: Resource.ChineseTxt["heart_name_base_4"],
                ENG_NAME:"heartLimit",
                COUNT: 1,
                TOTAL_PRICE: 5,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_heart_5.png",
                DESCRIPTION: Resource.ChineseTxt["heart_desc_base_4"],
                "PAY":{
                    "cmpayCode" : "007",
                    "cmmmpayCode" : "30000745208802",
                    "cupayCode1" : "131114015662",
                    "cupayCode" : "023",
                    "ctpayCode" : "108745",
                    "ctotherCode" : "109665",
                    "miCode":"com.xiaomi.jjdxgw.code9",
                    "miType":"consume",
                    "iap" : "com.cocoentertainment.jinjidexiaoguaiwu.shangxian.iap.tier1",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.shangxian.m.iap.tier1"
                }
            }
        ],

    //运营商正版激活
    SHOP_DATA_ACTIVATE:
        [
            {
                ID: 28,
                BILL_TYPE: "gameActivate",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_ACTIVATE,
                NAME: Resource.ChineseTxt["activate_name_base"],
                ENG_NAME:"gameActivate",
                COUNT: 1,
                TOTAL_PRICE: 4,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "icon_heart_5.png",
                DESCRIPTION: Resource.ChineseTxt["activate_desc_base"],
                "PAY":{
                    "cmpayCode" : "001",
                    "cmmmpayCode" : "30000745208805",
                    "cupayCode1" : "131122016476",
                    "cupayCode" : "028",
                    "ctpayCode" : "108749"
                }
            }
        ],

    //继续游戏
    SHOP_DATA_CONTINUE:
        [
            {
                ID: 29,
                BILL_TYPE: "gameContinue",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE,
                NAME: Resource.ChineseTxt["continue_name_base_0"],
                ENG_NAME:"gameContinue_0",
                GIFT_COUNT: 1,
                COUNT: 4,
                TOTAL_PRICE: 6000,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
                SPRITE_SOURCE: "icon_continue.png",
                DESCRIPTION: Resource.ChineseTxt["continue_desc_base_0"]
            },

            {
                ID: 30,
                BILL_TYPE: "gameContinue",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE,
                NAME: Resource.ChineseTxt["continue_name_base_1"],
                ENG_NAME:"gameContinue_1",
                GIFT_COUNT: 3,
                COUNT: 10,
                TOTAL_PRICE: 15000,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
                SPRITE_SOURCE: "icon_continue.png",
                DESCRIPTION: Resource.ChineseTxt["continue_desc_base_1"]
            },

            {
                ID: 31,
                BILL_TYPE: "gameContinue",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_CONTINUE,
                NAME: Resource.ChineseTxt["continue_name_base_2"],
                ENG_NAME:"gameContinue_2",
                GIFT_COUNT: 8,
                COUNT: 20,
                TOTAL_PRICE: 30000,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_NEW,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
                SPRITE_SOURCE: "icon_continue.png",
                DESCRIPTION: Resource.ChineseTxt["continue_desc_base_2"]
            }
        ],
        //赠送礼品
        SHOP_DATA_PRESENT:
        [
            {
                ID: 32,
                BILL_TYPE: "gameContinue",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT,
                NAME: "지구 선물 패키지",
                ENG_NAME:"yourstarearth",
                GIFT_DIAMOND: 11000,
                GIFT_CANDY: 5,
                TOTAL_PRICE: 9900,
                COUNT:1,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_HOT,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "shop_gift1.png",
                DESCRIPTION: Resource.ChineseTxt["continue_desc_base_0"],
                "PAY":{
                    "cmpayCode" : "009",
                    "cmmmpayCode" : "30000745208804",
                    "cupayCode1" : "131122016475",
                    "cupayCode" : "027",
                    "ctpayCode" : "108747",
                    "ctotherCode" : "109667",
                    "miCode":"com.xiaomi.jjdxgw.code11",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.yuzhoubao.um.iap.tier3",
                    "iap" : "yourstarearth",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.xinxingqiu.m.iap.tier1"
                }
            },

            {
                ID: 33,
                BILL_TYPE: "gameContinue",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT,
                NAME: "금성 선물 패키지",
                ENG_NAME:"yourstarvenus",
                GIFT_DIAMOND: 48000,
                GIFT_CANDY: 20,
                TOTAL_PRICE: 44000,
                COUNT:1,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "shop_gift2.png",
                DESCRIPTION: Resource.ChineseTxt["continue_desc_base_1"],
                "PAY":{
                "cmpayCode" : "009",
                    "cmmmpayCode" : "30000745208804",
                    "cupayCode1" : "131122016475",
                    "cupayCode" : "027",
                    "ctpayCode" : "108747",
                    "ctotherCode" : "109667",
                    "miCode":"com.xiaomi.jjdxgw.code11",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.yuzhoubao.um.iap.tier3",
                    "iap" : "yourstarvenus",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.xinxingqiu.m.iap.tier1"
                }
        },

        {
                ID: 34,
                BILL_TYPE: "gameContinue",
                ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_ITEM_PRESENT,
                NAME: "화성 선물 패키지",
                ENG_NAME:"yourstarmars",
                GIFT_DIAMOND: 110000,
                GIFT_CANDY: 50,
                TOTAL_PRICE: 99000,
                COUNT:1,
                CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_NEW,
                CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB,
                SPRITE_SOURCE: "shop_gift3.png",
                DESCRIPTION: Resource.ChineseTxt["continue_desc_base_2"],
                "PAY":{
                "cmpayCode" : "009",
                    "cmmmpayCode" : "30000745208804",
                    "cupayCode1" : "131122016475",
                    "cupayCode" : "027",
                    "ctpayCode" : "108747",
                    "ctotherCode" : "109667",
                    "miCode":"com.xiaomi.jjdxgw.code11",
                    "miType":"consume",
                    "googleiap" : "com.punchboxusa.jinjidexiaoguaiwu.yuzhoubao.um.iap.tier3",
                    "iap" : "yourstarmars",
                    "amazoniap" : "sku.punchbox.jinjidexiaoguaiwu.xinxingqiu.m.iap.tier1"
                }
        }
    ],

    SHOP_DATA_LOGIN_PUSH:
    [
        {
            ID:1001,
            BILL_TYPE: "loginPushItem",
            ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_LOGIN_ITEM,
            NAME:Resource.KoreanTxt["login_push_name"],
            COUNT:1,
            DESCRIPTION:Resource.KoreanTxt["login_push_name"],
            ENG_NAME:"loginPushItem",
            TOTAL_PRICE: 5500,
            PAY:
            {
                tstore:"0910016978",
                googleiap:"yourstarday",
                iap:"yourstarday"
            }
        }
    ],


    SHOP_DATA_FAILED_PUSH:
    [
        {
            ID:1101,
            BILL_TYPE: "failedPushItem",
            ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_FAILED_ITEM,
            NAME: Resource.KoreanTxt["failed_push_name"],
            COUNT:1,
            DESCRIPTION:Resource.KoreanTxt["login_push_name"],
            ENG_NAME:"failedPushItem",
            TOTAL_PRICE: 11000,
            SPRITE_SOURCE: "push_sprite_item_icons.png",
            SPRITE_SCALE: 0.9,
            PAY:
            {
                tstore:"0910016980",
                googleiap:"yourstarfail",
                iap:"yourstarfail"
            }
        }
    ],


    SHOP_DATA_FREE_CANDY:
    [
        {
            ID:1102,
            ITEM_TYPE: GUI.SHOP_ITEM_TYPE.SHOP_FREE_CANDY,
            NAME: Resource.KoreanTxt["free_candy_name"],
			GIFT_COUNT: 0,
            COUNT:1,
            ENG_NAME:"freeCandyItem",
            TOTAL_PRICE: 3000,
            CELL_TYPE: GUI.ITEM_CELL_TYPE.CELL_TYPE_PROMOTION,
            CURRENCY: GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND,
            SPRITE_SOURCE: "free_candy.png",
			DESCRIPTION:Resource.KoreanTxt["free_candy_desc"]
        }
    ]

};




//======================================================================================================================
/**
 * 钻石    1      2       3       4       5       6       7        8
 * 数量    400    1000    2000    3000    4000    6000    13600    25600
 * 赠送    0      80      200     400     600     1000    3200     8000
 * 价格    2      5       10      15      20      30      68       128
 *
 * 薄荷    1      2       3       4
 * 数量    5      10      20      50
 * 赠送    0      2       5       15
 * 价格    600    1200    2400    6000
 */

//----------------------------------------------------------------------------------------------------------------------
var _CM_Heart = function()
{
    GUI.SHOP_DATA.SHOP_DATA_LIFE[2].TOTAL_PRICE = 10;
    GUI.SHOP_DATA.SHOP_DATA_LIFE[2].CURRENCY = GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB;
    GUI.SHOP_DATA.SHOP_DATA_LIFE[3].TOTAL_PRICE = 20;
    GUI.SHOP_DATA.SHOP_DATA_LIFE[3].CURRENCY = GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB;
};
//----------------------------------------------------------------------------------------------------------------------
var _CM_Item = function()
{
    var itemCMData = [
        {_count:  5, _total_price:  5},
        {_count:  5, _total_price:  5},
        {_count:  5, _total_price: 10},
        {_count:  5, _total_price: 10},
        {_count: 10, _total_price: 15},
        {_count: 10, _total_price: 15},
        {_count: 10, _total_price: 10},
        {_count: 10, _total_price: 10}
    ];

    GUI.SHOP_DATA.SHOP_DATA_ITEM.forEach(
        function(each, index)
        {
            each.ORIGINAL_PRICE = 0;
            each.COUNT = itemCMData[index]._count;
            each.TOTAL_PRICE = itemCMData[index]._total_price;
            each.CURRENCY = GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB;
        }
    );
};
//----------------------------------------------------------------------------------------------------------------------
var _CMMM_Diamond = function()
{
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(6, 4);
};
//----------------------------------------------------------------------------------------------------------------------
var _CT_Diamond = function()
{
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(5, 5);
};
//----------------------------------------------------------------------------------------------------------------------
var _Main_Heart = function()
{
    GUI.SHOP_DATA.SHOP_DATA_LIFE[3].TOTAL_PRICE = 20;
    GUI.SHOP_DATA.SHOP_DATA_LIFE[3].CURRENCY = GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_RMB;
};
//----------------------------------------------------------------------------------------------------------------------
var _Main_Others = function()
{
    GUI.SHOP_DATA.SHOP_DATA_TIME[0].NAME = Resource.ChineseTxt["time_name_main_0"];
    GUI.SHOP_DATA.SHOP_DATA_MOVES[0].NAME = Resource.ChineseTxt["move_name_main_0"];

    GUI.SHOP_DATA.SHOP_DATA_NEW[0].NAME = Resource.ChineseTxt["pack_name_main_0"];
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE = 1;
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].DESCRIPTION = Resource.ChineseTxt["pack_desc_main_0"];
};


//----------------------------------------------------------------------------------------------------------------------
var _AppStore_Diamond = function()
{
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].NAME = Resource.ChineseTxt["diamond_name_store_1"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].COUNT = 1200;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].DISCOUNT = 92;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].DESCRIPTION = Resource.ChineseTxt["diamond_desc_store_1"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].TOTAL_PRICE = Defines.IS_KO ? 0.99 : 6;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].TOTAL_PRICE = Defines.IS_KO ? 1100 : 0.99;

//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].NAME = Resource.ChineseTxt["diamond_name_store_2"];
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].GIFT_COUNT = 300;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].COUNT = 2400;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].DISCOUNT = 89;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].DESCRIPTION = Resource.ChineseTxt["diamond_desc_store_2"];
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].TOTAL_PRICE = Defines.IS_EN ? 1.99 : 12;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].TOTAL_PRICE = Defines.IS_KO ? 1100 : 1.99;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].NAME = Resource.ChineseTxt["diamond_name_store_5"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].TOTAL_PRICE = Defines.IS_KO ? 4.99 : 30;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].TOTAL_PRICE = Defines.IS_KO ? 5500 : 4.99;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].DISCOUNT = 85;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].NAME = Resource.ChineseTxt["diamond_name_store_6"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].TOTAL_PRICE = Defines.IS_KO ? 9.99 : 68;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].TOTAL_PRICE = Defines.IS_KO ? 11000 : 9.99;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].DISCOUNT = 80;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].NAME = Resource.ChineseTxt["diamond_name_store_7"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].TOTAL_PRICE = Defines.IS_KO ? 19.99 : 128;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].TOTAL_PRICE = Defines.IS_KO ? 22000 : 19.99;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].DISCOUNT = 76;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].NAME = Resource.ChineseTxt["diamond_name_store_8"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].TOTAL_PRICE = Defines.IS_KO ? 49.99 : 328;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].TOTAL_PRICE = Defines.IS_KO ? 55000 : 49.99;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].NAME = Resource.ChineseTxt["diamond_name_store_9"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].TOTAL_PRICE = Defines.IS_KO ? 99.99 : 648;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].TOTAL_PRICE = Defines.IS_KO ? 110000 : 99.99;


    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].NAME = Resource.ChineseTxt["diamond_kakao_android_1"];
	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].COUNT = 1200;
	
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].NAME = Resource.ChineseTxt["diamond_kakao_android_5"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].COUNT = 6000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].NAME = Resource.ChineseTxt["diamond_kakao_android_6"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].COUNT = 12000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].NAME = Resource.ChineseTxt["diamond_kakao_android_7"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].COUNT = 24000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].NAME = Resource.ChineseTxt["diamond_kakao_android_8"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].COUNT = 60000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].NAME = Resource.ChineseTxt["diamond_kakao_android_9"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].COUNT = 120000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(0, 1);
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(1, 3);
	
	GUI.SHOP_DATA.SHOP_DATA_PRESENT[0].TOTAL_PRICE = Defines.IS_KO ? 8.99 : 9900;
	GUI.SHOP_DATA.SHOP_DATA_PRESENT[1].TOTAL_PRICE = Defines.IS_KO ? 39.99 : 44000;
	GUI.SHOP_DATA.SHOP_DATA_PRESENT[2].TOTAL_PRICE = Defines.IS_KO ? 89.99 : 990000;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(2, 2);
};
//----------------------------------------------------------------------------------------------------------------------
var _AppStore_Others = function()
{
    GUI.SHOP_DATA.SHOP_DATA_TIME[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;
    GUI.SHOP_DATA.SHOP_DATA_MOVES[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;

    GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].DESCRIPTION = Resource.ChineseTxt["pack_desc_store_0"];
//    GUI.SHOP_DATA.SHOP_DATA_SUPER[0].TOTAL_PRICE = Defines.IS_EN ? 6.99 : 45;
//    GUI.SHOP_DATA.SHOP_DATA_WORLD[0].TOTAL_PRICE = Defines.IS_EN ? 29.99 : 198;

    GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;

    GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0].TOTAL_PRICE = 1500;
    GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0].CURRENCY = GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND;

    if(Defines.IS_KO)
    {
        GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE = 4.99;
        GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE = 8;
        GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].MONEY_ICON = "general_rmb.png";
        GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0].TOTAL_PRICE = 9.99;
        GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0].MONEY_ICON = "general_rmb.png";
        GUI.SHOP_DATA.SHOP_DATA_NEW[0].PUSH = Resource.KoreanTxt["new_pack_ios"];
        GUI.SHOP_DATA.SHOP_DATA_NEW[0].MONEY_ICON = "general_rmb.png";
        GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE = 2.99;

    }
//    _addLoginItem();

};
//----------------------------------------------------------------------------------------------------------------------
var _Amazon_Diamond = function()
{
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].NAME = Resource.ChineseTxt["diamond_name_store_1"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].GIFT_COUNT = 100;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].COUNT = 1200;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].DISCOUNT = 92;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].DESCRIPTION = Resource.ChineseTxt["diamond_desc_store_1"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;
//	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].TOTAL_PRICE = Defines.IS_KO ? 1100 : 6;

//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].NAME = Resource.ChineseTxt["diamond_name_store_2"];
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].GIFT_COUNT = 300;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].COUNT = 2400;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].DISCOUNT = 89;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].DESCRIPTION = Resource.ChineseTxt["diamond_desc_store_2"];
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[2].TOTAL_PRICE = Defines.IS_EN ? 1.99 : 12;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].NAME = Resource.ChineseTxt["diamond_name_store_5"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].TOTAL_PRICE = Defines.IS_EN ? 4.99 : 30;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].DISCOUNT = 85;
//	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].TOTAL_PRICE = Defines.IS_KO ? 5500 : 6;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].NAME = Resource.ChineseTxt["diamond_name_store_6"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].TOTAL_PRICE = Defines.IS_EN ? 9.99 : 68;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].DISCOUNT = 80;
//	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].TOTAL_PRICE = Defines.IS_KO ? 11000 : 6;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].NAME = Resource.ChineseTxt["diamond_name_store_7"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].TOTAL_PRICE = Defines.IS_EN ? 19.99 : 128;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].DISCOUNT = 76;
//	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].TOTAL_PRICE = Defines.IS_KO ? 22000 : 6;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].NAME = Resource.ChineseTxt["diamond_name_store_8"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].TOTAL_PRICE = Defines.IS_EN ? 49.99 : 328;
//	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].TOTAL_PRICE = Defines.IS_KO ? 55000 : 6;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].NAME = Resource.ChineseTxt["diamond_name_store_9"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].TOTAL_PRICE = Defines.IS_EN ? 99.99 : 648;
//	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].TOTAL_PRICE = Defines.IS_KO ? 110000 : 6;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].NAME = Resource.ChineseTxt["diamond_kakao_android_1"];
	GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].COUNT = 1200;
	
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].NAME = Resource.ChineseTxt["diamond_kakao_android_5"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].COUNT = 6000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].NAME = Resource.ChineseTxt["diamond_kakao_android_6"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].COUNT = 12000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].NAME = Resource.ChineseTxt["diamond_kakao_android_7"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].COUNT = 24000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].NAME = Resource.ChineseTxt["diamond_kakao_android_8"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].COUNT = 60000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].NAME = Resource.ChineseTxt["diamond_kakao_android_9"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].COUNT = 120000;

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(0, 1);
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(1, 3);
};
//----------------------------------------------------------------------------------------------------------------------
var _Amazon_Others = function()
{
    GUI.SHOP_DATA.SHOP_DATA_TIME[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;
    GUI.SHOP_DATA.SHOP_DATA_MOVES[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;

    GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].DESCRIPTION = Resource.ChineseTxt["pack_desc_store_0"];
    GUI.SHOP_DATA.SHOP_DATA_SUPER[0].TOTAL_PRICE = Defines.IS_EN ? 6.99 : 45;
    GUI.SHOP_DATA.SHOP_DATA_WORLD[0].TOTAL_PRICE = Defines.IS_EN ? 29.99 : 198;

    GUI.SHOP_DATA.SHOP_DATA_UNLOCK_NEW_ZONE[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;
    GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0].TOTAL_PRICE = Defines.IS_EN ? 0.99 : 6;
};
//----------------------------------------------------------------------------------------------------------------------
var _KuaiYong_Diamond = function()
{
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].NAME = Resource.ChineseTxt["diamond_name_kuaiyong_6"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].GIFT_COUNT = 2000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].COUNT = 10000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].TOTAL_PRICE = 50;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].DESCRIPTION = Resource.ChineseTxt["diamond_desc_kuaiyong_6"];

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].NAME = Resource.ChineseTxt["diamond_name_kuaiyong_7"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].GIFT_COUNT = 5000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].COUNT = 20000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].TOTAL_PRICE = 100;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].DESCRIPTION = Resource.ChineseTxt["diamond_desc_kuaiyong_7"];
};
//----------------------------------------------------------------------------------------------------------------------
var _KuaiYong_Others = function()
{
    GUI.SHOP_DATA.SHOP_DATA_SUPER[0].TOTAL_PRICE = 50;
    GUI.SHOP_DATA.SHOP_DATA_SUPER[0].DESCRIPTION = Resource.ChineseTxt["pack_desc_kuaiyong_1"];
    GUI.SHOP_DATA.SHOP_DATA_WORLD[0].TOTAL_PRICE = 200;
    GUI.SHOP_DATA.SHOP_DATA_WORLD[0].DESCRIPTION = Resource.ChineseTxt["pack_desc_kuaiyong_2"];
};

var _Kakao_Android_Diamond = function()
{
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].NAME = Resource.ChineseTxt["diamond_kakao_android_1"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].COUNT = 1200;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].DISCOUNT = 92;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].DESCRIPTION = Resource.ChineseTxt["diamond_desc_store_1"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].TOTAL_PRICE = 1100;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].PAY.tstore = "0910016965";



    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].NAME = Resource.ChineseTxt["diamond_kakao_android_5"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].TOTAL_PRICE = 5500;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].COUNT = 6000;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].DISCOUNT = 85;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].PAY.tstore = "0910016964";


    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].NAME = Resource.ChineseTxt["diamond_kakao_android_6"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].TOTAL_PRICE = 11000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].COUNT = 12000;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].DISCOUNT = 80;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].PAY.tstore = "0910016963";


    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].NAME = Resource.ChineseTxt["diamond_kakao_android_7"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].TOTAL_PRICE = 22000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].COUNT = 24000;
//    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].DISCOUNT = 76;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].PAY.tstore = "0910016962";


    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].NAME = Resource.ChineseTxt["diamond_kakao_android_8"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].TOTAL_PRICE = 55000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].COUNT = 60000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].PAY.tstore = "0910016961";


    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].NAME = Resource.ChineseTxt["diamond_kakao_android_9"];
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].TOTAL_PRICE = 110000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].COUNT = 120000;
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].PAY.tstore = "0910016960";


    if(Defines.IS_KO)
    {
        GUI.SHOP_DATA.SHOP_DATA_DIAMOND[1].PAY.googleiap = "yourstar001200";
        GUI.SHOP_DATA.SHOP_DATA_DIAMOND[5].PAY.googleiap = "yourstar006000";
        GUI.SHOP_DATA.SHOP_DATA_DIAMOND[6].PAY.googleiap = "yourstar012000";
        GUI.SHOP_DATA.SHOP_DATA_DIAMOND[7].PAY.googleiap = "yourstar024000";
        GUI.SHOP_DATA.SHOP_DATA_DIAMOND[8].PAY.googleiap = "yourstar060000";
        GUI.SHOP_DATA.SHOP_DATA_DIAMOND[9].PAY.googleiap = "yourstar120000";
    }

    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(0, 1);
    GUI.SHOP_DATA.SHOP_DATA_DIAMOND.splice(1, 3);
};

var _Kakao_Android_Other = function()
{
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE = 3300;
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].PAY.tstore = "0910016979";


    GUI.SHOP_DATA.SHOP_DATA_PRESENT[0].TOTAL_PRICE = 9900;
    GUI.SHOP_DATA.SHOP_DATA_PRESENT[0].PAY.tstore = "0910018257";


    GUI.SHOP_DATA.SHOP_DATA_PRESENT[1].TOTAL_PRICE = 44000;
    GUI.SHOP_DATA.SHOP_DATA_PRESENT[1].PAY.tstore = "0910018258";


    GUI.SHOP_DATA.SHOP_DATA_PRESENT[2].TOTAL_PRICE = 99000;
    GUI.SHOP_DATA.SHOP_DATA_PRESENT[2].PAY.tstore = "0910018259";


    if(Defines.IS_KO)
    {
        GUI.SHOP_DATA.SHOP_DATA_NEW[0].PAY.googleiap = "yourstarbeginner";
        GUI.SHOP_DATA.SHOP_DATA_PRESENT[0].PAY.googleiap = "yourstarearth";
        GUI.SHOP_DATA.SHOP_DATA_PRESENT[1].PAY.googleiap = "yourstarvenus";
        GUI.SHOP_DATA.SHOP_DATA_PRESENT[2].PAY.googleiap = "yourstarmars";
        GUI.SHOP_DATA.SHOP_DATA_NEW[0].TOTAL_PRICE = 3300;
    }

    GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].TOTAL_PRICE = 5500;
    GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].ORI_PRICE = 9176;
    GUI.SHOP_DATA.SHOP_DATA_LOGIN_PUSH[0].MONEY_ICON = "general_korean.png";
    GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0].TOTAL_PRICE = 11000;
    GUI.SHOP_DATA.SHOP_DATA_FAILED_PUSH[0].MONEY_ICON = "general_korean.png";
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].PUSH = Resource.KoreanTxt["new_pack_andorid"];
    GUI.SHOP_DATA.SHOP_DATA_NEW[0].MONEY_ICON = "general_korean.png";

    GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0].TOTAL_PRICE = 1500;
    GUI.SHOP_DATA.SHOP_DATA_HEART_LIMIT[0].CURRENCY = GUI.ITEM_CELL_CURRENCY.CELL_CURRENCY_DIAMOND;

//    _addLoginItem();
};


//----------------------------------------------------------------------------------------------------------------------
(function()
{
    //
    var channelShop = {};
    channelShop._channelFunc = {};

    channelShop.registerChannelFunc = function(channel, func)
    {
        if (!channelShop._channelFunc[channel])
        {
            channelShop._channelFunc[channel] = [];
        }

        channelShop._channelFunc[channel].push(func);
    };

    channelShop.executeChannelFunc = function(channel)
    {
        var channelFunc = channelShop._channelFunc[channel];

        //其它一律按官网包处理
        if (!channelFunc)
        {
            channelFunc = channelShop._channelFunc["000000"];
        }

        channelFunc.forEach(
            function(a_func)
            {
                a_func();
            }
        );
    };

    //CM
    /*channelShop.registerChannelFunc("000266", _CM_Heart);
    channelShop.registerChannelFunc("000266", _CM_Item);*/
    channelShop.registerChannelFunc("000266", _CMMM_Diamond);
    channelShop.registerChannelFunc("000266", _Main_Heart);
    channelShop.registerChannelFunc("000266", _Main_Others);

    //CMMM
    channelShop.registerChannelFunc("000013", _CMMM_Diamond);
    channelShop.registerChannelFunc("000013", _Main_Heart);
    channelShop.registerChannelFunc("000013", _Main_Others);

    //CU
    channelShop.registerChannelFunc("000056", _CMMM_Diamond);
    channelShop.registerChannelFunc("000056", _Main_Heart);
    channelShop.registerChannelFunc("000056", _Main_Others);

    channelShop.registerChannelFunc("000175", _CMMM_Diamond);
    channelShop.registerChannelFunc("000175", _Main_Heart);
    channelShop.registerChannelFunc("000175", _Main_Others);

    //CT
    channelShop.registerChannelFunc("000032", _CT_Diamond);
    channelShop.registerChannelFunc("000032", _Main_Heart);
    channelShop.registerChannelFunc("000032", _Main_Others);

    //小米应用商店
    var miDiamond = (SMS_TYPE == 2) ? _CT_Diamond : _CMMM_Diamond;
    channelShop.registerChannelFunc("000066", miDiamond);
    channelShop.registerChannelFunc("000066", _Main_Heart);
    channelShop.registerChannelFunc("000066", _Main_Others);

    //华为应用商店
    var huaWeiDiamond = (SMS_TYPE == 2) ? _CT_Diamond : _CMMM_Diamond;
    channelShop.registerChannelFunc("000054", huaWeiDiamond);
    channelShop.registerChannelFunc("000054", _Main_Heart);
    channelShop.registerChannelFunc("000054", _Main_Others);

    //AppStore
    channelShop.registerChannelFunc("500026", _AppStore_Diamond);
    channelShop.registerChannelFunc("500026", _AppStore_Others);
 
    //KuaiYong
    channelShop.registerChannelFunc("500016", _KuaiYong_Diamond);
    channelShop.registerChannelFunc("500016", _KuaiYong_Others);

    //英文版
    channelShop.registerChannelFunc("000512", _AppStore_Diamond);
    channelShop.registerChannelFunc("000512", _AppStore_Others);

    //亚马逊
    channelShop.registerChannelFunc("000415", _Amazon_Diamond);
    channelShop.registerChannelFunc("000415", _Amazon_Others);
    //官网包
    channelShop.registerChannelFunc("000000", _Main_Heart);
    channelShop.registerChannelFunc("000000", _Main_Others);

    //kakao-google
    channelShop.registerChannelFunc("300004",_Kakao_Android_Diamond);
    channelShop.registerChannelFunc("300004",_Kakao_Android_Other);

    //kakao-tstore
    channelShop.registerChannelFunc("300005",_Kakao_Android_Diamond);
    channelShop.registerChannelFunc("300005",_Kakao_Android_Other);

    //
    channelShop.executeChannelFunc(CHANNEL);

})();

//----------------------------------------------------------------------------------------------------------------------
var _PayType_Condition_0 = function()
{
    return GUI.PAY_TYPE.SMS;
};

var _PayType_Condition_1 = function()
{
    return GUI.PAY_TYPE.OTHERS;
};

var _PayType_Condition_2 = function()
{
    if (SMS_TYPE == 2)
    {
        return GUI.PAY_TYPE.OTHERS;
    }

    return GUI.PAY_TYPE.ANY;
};


//看对应的函数例如_PayType_Condition_0 对应 var _PayType_Condition_0 ＝ function

var _Channel_PayType =
{
    "000266": _PayType_Condition_0,   /*CM*/
    "000013": _PayType_Condition_0,   /*CMMM*/
    "000056": _PayType_Condition_0,   /*CU*/
    "000175": _PayType_Condition_0,   //CU
    "000032": _PayType_Condition_0,   /*CT*/
    "500026": _PayType_Condition_1,   /*AppStore*/
    "500016": _PayType_Condition_1,   /*KuaiYong*/
    "000415": _PayType_Condition_0,   /*亚马逊*/
    "000512": _PayType_Condition_1,   /*GooglePlay/En*/
    "000066": _PayType_Condition_0,   /*小米应用商店*/
    "000054": _PayType_Condition_0,   /*华为应用商店*/
    "000550": _PayType_Condition_2,   /*腾讯应用宝*/
    "000909": _PayType_Condition_1,   /*小米网络版本*/
    "000913": _PayType_Condition_2    /*当乐公交*/
};

var _GetForcePayType = function()
{
    var payTypeFunc = _Channel_PayType[CHANNEL];
    if (payTypeFunc)
    {
        return payTypeFunc();
    }

    return GUI.PAY_TYPE.ANY;
};

//----------------------------------------------------------------------------------------------------------------------