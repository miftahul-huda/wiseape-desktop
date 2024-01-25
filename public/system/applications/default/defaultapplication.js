var DefaultApplication = Class(Application, {
    run: function(command, appConfig, parameter, callback)
    {
        var me = this;
        let win = null;

        if(appConfig != null)
            me.appConfig = appConfig;
        
        let appInfo = me.getDefaultApplicationWindowInfo();

        console.log("appInfo")
        console.log(appInfo)

        if(command in appInfo)
        {
            console.log("command")
            console.log(command)
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
            console.log("creating window")
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
    ,
    showSendEmail: function(content, callback)
    {
        var me = this;
        let win = me.desktop.createWindow("Send", 
            { 
                icon: null, 
                width: '50%', 
                height: '80%', 
                parameter: { content: content },
                contentInfo: {
                    contentSource: "/system/applications/default/send.json",
                    contentHandlerFile:"/system/applications/default/send.js",
                    contentHandlerClass:"SendPage"
                }
            }, me);
        win.show(function(returnValue){
            if(callback != null)
                callback(returnValue);
        });        
    }
    ,
    showSendEmailItem: function(options, callback)
    {
        let me = this;
        let getItemUrl = options.getItemUrl;
        let fieldInfos = options.fieldInfos;
        this.getDetailItem(getItemUrl, fieldInfos, function(htmlTable){
            me.showSendEmail(htmlTable, callback)
        })
    }
    ,
    getDetailItem: function(url, fieldInfos, callback)
    {
        let me = this;
        AppUtil.get(url, function(response){

            if(response.success)
            {
                console.log(response.payload)
                let dom = me.composeDetailHtml(fieldInfos, response.payload);
                let htmlTable = $(dom).html();
                if(callback != null)
                    callback(htmlTable)
            }

        }, { user: this.session.user })
    }
    ,
    composeDetailHtml: function(fieldInfos, item)
    {
        let table = document.createElement("table");
        $(table).css("border", "solid 1px #eee")
        $(table).css("border-spacing", "0px")
        $(table).css("border-padding", "0px")


        let dom = document.createElement("div")
        fieldInfos.map((field)=>{
            let keys = Object.keys(field);
            let keyName = keys[0]

            let label = field[keyName];
            let value = item[keyName];

            if(keyName.indexOf(".") > -1)
            {
                eval("value = item." + keyName + ";");                
            }

            let tr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");

            $(td1).css("width", "200px")
            $(td1).css("vertical-align", "top")
            $(td1).css("border", "solid 1px #eee")
            $(td2).css("border", "solid 1px #eee")

            $(td1).css("padding", "6px")
            $(td2).css("padding", "6px")

            $(td1).css("font-family", "Tahoma")
            $(td2).css("font-family", "Tahoma")


            $(td1).html(label);
            $(td2).html(value);

            $(tr).append(td1)
            $(tr).append(td2)
            $(table).append(tr)
        })

        $(dom).append(table);
        return dom;
    }
    
})