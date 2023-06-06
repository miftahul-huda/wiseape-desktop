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
            
            info.config.icon = icon;
            info.config.contentInfo = {
                contentSource: me.appRootPath + "/" + info.contentFile,
                contentHandlerFile: me.appRootPath + "/" + info.jsfile,
                contentHandlerClass: info.className
            }

            win = me.desktop.createWindow(info.title, info.config, me);
            win.show( function(returnValue){
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
        let exportOptionWin  = me.desktop.createWindow("Select file format", 
            { 
                width: 500, 
                height: 320, 
                top: '10%',
                contentInfo: {
                    contentSource: "/system/applications/default/exportoptions.json",
                    contentHandlerFile: "/system/applications/default/exportoptions.js",
                    contentHandlerClass:  "ExportOptionsPage"
                }
            }, me);
        exportOptionWin.show( function(returnValue){
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
    ,
    prompt: function(title, content, type="YES|NO", callback)
    {
        var me = this;
        let win = me.desktop.createWindow(title, 
            { 
                icon: null, 
                width: '30%', 
                height: '210px', 
                parameter: { type: type, content: content },
                contentInfo: {
                    contentSource: "/system/applications/default/prompt.json",
                    contentHandlerFile:"/system/applications/default/prompt.js",
                    contentHandlerClass:"PromptPage"
                }
            }, me);
        //win.setEventHandlerObject( "/system/applications/default/prompt.js", "PromptPage");
        win.show(function(returnValue){
            if(callback != null)
                callback(returnValue);
        });
    }
})