var DefaultApplication = Class(Application, {
    run: function(command, appConfig)
    {
        var me = this;
        let win = null;

        console.log("appConfig")
        console.log(appConfig)

        console.log("command")
        console.log(command)

        if(appConfig != null)
            me.appConfig = appConfig;
        
        let appInfo = me.getDefaultApplicationInfo();
        if(command in appInfo)
        {
            let info = appInfo[command];
            win = me.desktop.createWindow(info.title, me.icon, info.config);
            me.setWindowEventHandlerObject(win, me.appRootPath + "/" + info.jsfile, info.className)
            win.show(me.appRootPath + "/" + info.contentFile)
        }
        else
        {
            me.execute(command, appConfig)
        }

    }
    ,
    getDefaultApplicationInfo: function()
    {
        let o = [];
        o["list"]  = { title: "", jsfile: '', className: '', contentFile: '' };
        o["detail"]  = { title: "", jsfile: '', className: '', contentFile: '' };
        return o;
    }
})