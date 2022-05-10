var PortfolioManagement = Class(Application, {
    run: function(command)
    {
        var me = this;

        if(command == "list-strategy")
        {
            let win = me.desktop.createWindow(me.title, me.icon);
            win.contentEventHandler = function(win, id, event)
            {
                me.handleEvent(win, id, event)
            }
            win.show("/system/applications/portfolio-management/list-strategy.json")
        }
    }
    ,
    getBaseUrl: function()
    {
        return "http://localhost:8081";
    }
    ,
    handleEvent: function(win, id, event)
    {
        console.log(id)
        console.log(event)
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
        let url = this.getBaseUrl() + "/strategy";
        $.get(url, function(response){
            win.get("tableListOfStrategy").loadData(response.payload.rows)
        })


    }
})