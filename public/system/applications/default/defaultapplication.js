var DefaultApplication = Class(Application, {
    run: function(command, appConfig, parameter, callback)
    {
        var me = this;
        let win = null;

        if(appConfig != null)
            me.appConfig = appConfig;
        
        let appInfo = me.getDefaultApplicationWindowInfo();
        if(command in appInfo)
        {
            let info = appInfo[command];
            if(info.config == null)
                info.config = {};
            info.config.parameter = parameter;
            let icon = me.appRootPath + "/" + info.icon;
            if(info.icon == null)
                icon = null;
            win = me.desktop.createWindow(info.title, icon, info.config, me);
            //me.setWindowEventHandlerObject(win, me.appRootPath + "/" + info.jsfile, info.className)
            win.setEventHandlerObject( me.appRootPath + "/" + info.jsfile, info.className)
            win.show(me.appRootPath + "/" + info.contentFile, function(returnValue){
                if(callback != null)
                    callback(returnValue);
            });
        }
        else
        {
            me.execute(command, appConfig, parameter, callback)
        }

    }
    ,
    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { title: "", jsfile: '', className: '', contentFile: '' };
        o["detail"]  = { title: "", jsfile: '', className: '', contentFile: '' };
        return o;
    }
    ,
    showExportOptions: function(callback)
    {
        var me =  this;
        let exportOptionWin  = me.desktop.createWindow("Select file format", null, { width: 500, height: 320, top: '10%' }, me);
        exportOptionWin.setEventHandlerObject("/system/applications/default/exportoptions.js", "ExportOptionsPage");
        exportOptionWin.show("/system/applications/default/exportoptions.json", function(returnValue){
            if(callback != null)
                callback(returnValue);
        });
    }
    ,
    execute: function(command, appConfig, parameter, callback)
    {
        var me = this;
        eval("me." + command + "(appConfig, parameter, callback);")
    }
})