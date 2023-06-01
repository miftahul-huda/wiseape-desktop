var DefaultPage = Class({

    prompt: function(title, content, type="YES|NO", callback)
    {
        let win = this.desktop.createWindow(title, 
            { 
                width: '10%', 
                height: '10%', 
                parameter: { type: type, content: content },
                contentInfo:
                {
                    contentSource: "/system/applications/default/prompt.json",
                    contentHandlerFile: "/system/applications/default/prompt.js",
                    contentHandlerClass: "PromptPage"
                }
            }, 
        this.application);
        win.show(function(returnValue){
            if(callback != null)
                callback(returnValue);
        });
    }

})