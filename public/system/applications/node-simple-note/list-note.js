var ListNotePage =  Class(DefaultListPage, {

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
    btnRefreshNote_onClick: function(win, id)
    {
        this.refresh(win)
    }
    ,
    btnDetailNote_onClick: function(win, id)
    {
        this.showDetail(win)
    }
    ,
    btnExportNote_onClick: function(win, id)
    {
        this.export(win, "tableListOfNote", "list-of-note")
    }
    ,
    btnPrintNote_onClick: function(win, id)
    {
        this.print(win, "tableListOfNote");
    }
    ,
    btnAddNote_onClick: function(win, id)
    {
        this.showAddNote(win);   
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win) {
        let url = this.application.appConfig.BASE_API_URL + "/notes";
        console.log("refresh")
        this.loadAndDisplayData(win, "tableListOfNote", url, null)
    }
    ,
    showDetail: function(win)
    {
        this.application.run("detail")
    }
    ,
    showAddNote: function(win)
    {
        this.application.run("add")
    }
})