var ListStrategyPage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
    }
    ,
    //------   Event  handlers -------------
    onLoad: function(win, id)
    {
        this.refresh(win)
    }
    ,
    btnRefreshStrategy_onClick: function(win, id)
    {
        this.refresh(win)
    }
    ,
    btnDetailStrategy_onClick: function(win, id)
    {
        this.showDetail(win)
    }
    ,
    btnExportStrategy_onClick: function(win, id)
    {
        this.export(win, "tableListOfStrategy", "list-of-strategy")
    }
    ,
    btnPrintStrategy_onClick: function(win, id)
    {
        this.print(win, "tableListOfStrategy");
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win) {
        let url = this.application.appConfig.BASE_API_URL + "/strategy";
        this.loadAndDisplayData(win, "tableListOfStrategy", url, null)
    }
    ,
    showDetail: function(win)
    {
        this.application.run("detail")
    }
})