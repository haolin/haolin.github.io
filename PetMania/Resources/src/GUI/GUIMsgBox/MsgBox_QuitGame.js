var MsgBox_QuitGame = IMsgBox.extend ({

    //------------------------------------------------------------------------------------------------------------------
    ctor: function()
    {
        this._super(
            true,
            true,
            false,
            this.getContent()
        );
    },

    //------------------------------------------------------------------------------------------------------------------
    getContent: function()
    {
        return Resource.ChineseTxt["msg_22"];
    },

    //------------------------------------------------------------------------------------------------------------------
    handleConfirm: function(guiWindow)
    {
        //
        guiWindow.closeWindow();
        cc.AudioMng.getInstance().playButtonSound(true);

		_SystemLoadingControl(true);

		cc.log("joyCommon.getInstance().unregister");
		
		var serverUnreCallback = function(result, flag)
		{
			cc.log("注销用户账号 结果 = " + result);
			
			if (result)
            {
                cc.log("注销用户账号 " + flag);
				
				
//				cc.NodeSelf.getInstance().cleanUp();
				_SystemLoadingControl(false);
				if (!(cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu))
				{
					cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
				}
//				showMessageToast("注销用户账号 成功");
            }
            else
            {
                cc.log("注销用户账号 " + flag);
                _SystemLoadingControl(false);
                if (!(cc.Director.getInstance().getRunningScene() instanceof Scene_MainMenu))
                {
                    cc.Director.getInstance().replaceScene(Scene_MainMenu.create(false, true));
                }
            }
		};
		
        joyCommon.getInstance().unregister(
            function()
            {
				cc.log("注销成功");


                cc.NodeSelf.getInstance().logout();

//                cc.DataMng.getInstance().init();
                cc.DataMng.getInstance().cleanUpDataForUnRegister();

//                MailMng.getInstance().notifyLogout();
//                FriendsMng.getInstance().notifyLogout();
//
//                //清除了照片
//                PhotoLoad.getInstance().cleanUpLocalData();
//                cc.NodeSelf.getInstance().setSelfPhoto("");
//
				cc.NodeSelf.getInstance().LogOffAccount(serverUnreCallback);

            },
            function()
            {
                //
                cc.log("注销失败");
            }
        );

        return this;
    },

    //------------------------------------------------------------------------------------------------------------------
    handleCancel: function(guiWindow)
    {
        this._super(guiWindow);
        return this;
    }

    //------------------------------------------------------------------------------------------------------------------

});

