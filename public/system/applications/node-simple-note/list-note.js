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
    btnSendNote_onClick: function(win, id, param)
    {
        this.showSendEmail(win, "tableListOfNote", function(){

        });
    }
    ,
    btnAddNote_onClick: function(win, id)
    {
        this.showAddNote(win);   
    }
    ,
    btnEditNote_onClick: function(win, id)
    {
        this.showEditNote(win);   
    }
    ,
    btnDeleteNote_onClick: function(win, id)
    {
        let me = this;
        let selectedData = win.get("tableListOfNote").getSelectedData();
        if(selectedData.length > 0)
        {
            this.application.prompt("Confirmation", "You are going to delete " + selectedData.length + " data. Are you sure?", "YES|NO", function(result){
                if(result == "YES") 
                    me.deleteNote(win, id);
    
            });
        }

    }
    ,
    btnFindNote_onClick: function(win, id)
    {
        this.findNote(win);   
    }
    ,
    btnAdvanceFindNote_onClick: function(win, id)
    {
        let me = this;
        this.showAdvanceSearch(win, "tableListOfNote", function(filter){
            console.log("filter");
            console.log(filter)

            if(filter != null)
            {
                let url = me.application.appConfig.BASE_API_URL + "/notes/find";
                me.loadAndDisplayData(win, "tableListOfNote", url, null, {
                    filter: filter,
                    method: "POST"
                })
            }
        }, { width: '40%', height: '760px' });
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win, callback) {
        let url = this.application.appConfig.BASE_API_URL + "/notes";
        this.loadAndDisplayData(win, "tableListOfNote", url, callback, { method: 'GET' })
    }
    ,
    showDetail: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfNote").getSelectedItem();
        if(selectedItem != null)
        {
            let idNote = selectedItem.id;
            this.application.run("detail", null, idNote, function(item){
            })
        }
        else
        {
            win.notify("Error", "Please select an item to view", "error")
        }    
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
    showEditNote: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfNote").getSelectedItem();
        if(selectedItem != null)
        {
            let idNote = selectedItem.id;
            this.application.run("edit", null, idNote, function(item){
                me.refresh(win);
            })
        }
        else
        {
            win.notify("Error", "Please select an item to edit", "error")
        }

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
    
                }, { method: 'GET' });
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
                        win.notify("Deletion successfull","The data has been deleted!", "success")
                    });
                }
                else
                {
                    win.notify("Error","The deletion has failed! Reason: " + result.message, "error")
                }
            });
        }
        else 
        {
            win.notify("Error", "Please select items to delete", "error")
        }
    }
    

})