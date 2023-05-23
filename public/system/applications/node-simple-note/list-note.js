var ListNotePage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        console.log("ListNotePage.constructor")
        console.log(app);
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
    ,
    btnDeleteNote_onClick: function(win, id)
    {
        this.deleteNote(win, id);
    }
    ,
    btnFindNote_onClick: function(win, id)
    {
        this.findNote(win);   
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win, callback) {
        console.log(this.application)
        let url = this.application.appConfig.BASE_API_URL + "/notes";
        console.log("refresh")
        this.loadAndDisplayData(win, "tableListOfNote", url, callback)
    }
    ,
    showDetail: function(win)
    {
        this.application.run("detail")
    }
    ,
    showAddNote: function(win)
    {
        var me = this;
        this.application.run("add", null, null, function(item){
            me.refresh(win);
        })
    }
    ,
    findNote: function(win)
    {
        let me = this;
        win.get("tableListOfNote").search(function(value){
            
            if(value != null && value.length > 0)
            {
                let url = me.application.appConfig.BASE_API_URL + "/notes/find/" + value;
                me.loadAndDisplayData(win, "tableListOfNote", url, function(data){
    
                });
            }
        });
    }
    ,
    deleteNote: function(win)
    {
        let me = this;
        let ids = "";
        let selectedData = win.get("tableListOfNote").getSelectedData();
        if(selectedData.length > 0)
        {
            win.showProgress();
            me.application.run("deleteNote", null, selectedData, function(result){
                win.hideProgress();
                if(result.success)
                {
                    me.refresh(win, function(data){
                        win.notify("Deletion successfull","The data has been deleted!", "success", {
                            left: '5%',
                            top: '40%',
                            width: '90%'
                        })
                    });
                }
                else
                {
                    win.notify("Error","The deletion has failed! Reason: " + result.message, "error", {
                        left: '5%',
                        top: '40%',
                        width: '90%'
                    })
                }
            });
        }
    }

})