var ApplicationManager = Class(Application, {
    run: function(command)
    {
        var me = this;
        let win = me.desktop.createWindow(me.title, me.icon);
        win.contentEventHandler = function(win, id, event)
        {
            me.handleEvent(win, id, event)
        }
        win.show("/system/applications/application-manager/list-application.json")
        

    }
    ,
    handleEvent: function(win, id, event)
    {
        if(event == "onLoad")
        {
            this.onLoad(win)
        }
        if(event == "btnRefreshApplication_onClick")
        {
            this.onLoad(win)
        }
    }
    ,
    onLoad: function(win)
    {
        win.get("tableListApplication").loadData([
            { id: "1", appTitle: "Application Manager", appIcon: "Hello" },
            { id: "2", appTitle: "Project Management App", appIcon: "Hello" },
            { id: "3", appTitle: "Simple Note", appIcon: "Hello" }
        ])
    }
})