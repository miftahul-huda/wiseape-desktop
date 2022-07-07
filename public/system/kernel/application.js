var Application = Class({
    constructor: function(title,  icon, desktop)
    {
        this.title = title;
        this.icon = icon;
        this.desktop = desktop;
        this.windowHandlerObject = null;
    }
    ,
    setWindowEventHandlerObject: function(win, file, className)
    {
        var me = this;
        
        win.contentEventHandler = function(win, id, event)
        {
            if(win.windowHandlerObject == null)
            {
                $.getScript(file, function (){
                    win.windowHandlerObject = eval("new " + className + "(me)");
                    win.windowHandlerObject.appConfig = me.appConfig;
                    //win.windowHandlerObject.run(win, id, event)
                    if(event != null && event in win.windowHandlerObject)
                        eval("win.windowHandlerObject." + event + "(win, id)");
                })
            }
            else
            {
                win.windowHandlerObject.appConfig = me.appConfig;    
                //me.windowHandlerObject.run(win, id, event)

                if(event != null && event in win.windowHandlerObject)
                    eval("win.windowHandlerObject." + event + "(win, id)");
            }
        }
    }
    
})