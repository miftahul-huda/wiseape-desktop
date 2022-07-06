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
            if(me.windowHandlerObject == null)
            {
                $.getScript(file, function (){
                    me.windowHandlerObject = eval("new " + className + "(me)");
                    me.windowHandlerObject.appConfig = me.appConfig;
                    //me.windowHandlerObject.run(win, id, event)
                    eval("me.windowHandlerObject." + event + "(win, id)");
                })
            }
            else
            {
                me.windowHandlerObject.appConfig = me.appConfig;    
                //me.windowHandlerObject.run(win, id, event)
                eval("me.windowHandlerObject." + event + "(win, id)");
            }
        }
    }
    
})