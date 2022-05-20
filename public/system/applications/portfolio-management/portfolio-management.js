var PortfolioManagement = Class(Application, {
    run: function(command, appConfig)
    {
        var me = this;

        console.log("appConfig")
        console.log(appConfig)
        me.appConfig = appConfig;

        if(command == "list-strategy")
        {
            let win = me.desktop.createWindow(me.title, me.icon);
            win.contentEventHandler = function(win, id, event)
            {
                me.handleEvent(win, id, event)
            }
            win.show("/system/applications/portfolio-management/list-strategy.json")
           
        }

        if(command == "detail-strategy")
        {
            let win = me.desktop.createWindow("Strategy Info", me.icon, { width: '50%', height: '70%' });
            win.contentEventHandler = function(win, id, event)
            {
                //me.handleEvent(win, id, event)
            }
            win.show("/system/applications/portfolio-management/detail-strategy.html")
        }
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
        if(event == "btnRefreshStrategy_onClick")
        {
            this.onLoad(win)
        }
        if(event == "btnDetailStrategy_onClick")
        {
            this.showDetail(win)
        }
    }
    ,
    onLoad: function(win)
    {
        var me = this;
        win.showProgress();
        let dataFilterOpt = win.get("tableListOfStrategy").getDataFilterOption();
        let offset = dataFilterOpt.displayPerPage * (dataFilterOpt.page - 1)
        let limit = dataFilterOpt.displayPerPage

        me.displayData(win, offset, limit, null, null, null,  win.hideProgress )
        win.get("tableListOfStrategy").elementEventHandler = function(id, event, opt) { me.dataTableEventHandler(me, win, id, event, opt) } 
    }
    ,
    displayData: function(win, offset, limit, sortColumn, sortDirection, search=null, callback)
    {
        let url = this.appConfig.BASE_API_URL + "/strategy";
        if(search != null)
            url = url + "/find/" + encodeURIComponent( search);

        url = url + "/" + offset + "/" + limit 

        if(sortColumn != null)
        {
            if(sortDirection == null)
                sortDirection= "asc"

            url = url +  "/" + sortColumn + "/" + sortDirection
        }

        console.log(url)
        $.get(url, function(response){
            win.get("tableListOfStrategy").loadData(response.payload.rows, response.payload.count);
            if(callback != null)
                callback()
        })
    }
    ,
    showDetail: function(win)
    {
        this.run("detail-strategy", this.appConfig)
    }
    ,
    dataTableEventHandler: function(me, win, id, event, opt)
    {
        if(event == "onDataFilterChanged")
        {
            let offset = opt.displayPerPage * (opt.page - 1)
            let limit = opt.displayPerPage
            let sortColumn = opt.sort.column;
            let sortDirection = opt.sort.direction;
            win.showProgress();
            me.displayData(win, offset, limit, sortColumn, sortDirection, null, win.hideProgress)
        }
    }
})