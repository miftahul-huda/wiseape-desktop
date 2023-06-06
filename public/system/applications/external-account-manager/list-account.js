var ListAccountPage =  Class(DefaultListPage, {

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
    btnRefreshAccount_onClick: function(win, id)
    {
        this.refresh(win)
    }
    ,
    btnDetailAccount_onClick: function(win, id)
    {
        this.showDetail(win)
    }
    ,
    btnExportAccount_onClick: function(win, id)
    {
        this.export(win, "tableListOfAccount", "list-of-Account")
    }
    ,
    btnPrintAccount_onClick: function(win, id)
    {
        this.print(win, "tableListOfAccount");
    }
    ,
    btnAddAccount_onClick: function(win, id)
    {
        this.showAddAccount(win);   
    }
    ,
    btnEditAccount_onClick: function(win, id)
    {
        this.showEditAccount(win);   
    }
    ,
    btnDeleteAccount_onClick: function(win, id)
    {
        let me = this;
        this.application.prompt("Confirmation", "Are you sure?", "YES|NO", function(result){
            if(result == "YES") 
                me.deleteAccount(win, id);

        });
    }
    ,
    btnFindAccount_onClick: function(win, id)
    {
        this.findAccount(win);   
    }
    ,
    btnAdvanceFindAccount_onClick: function(win, id)
    {
        let me = this;
        this.showAdvanceSearch(win, "tableListOfAccount", function(filter){
            console.log("filter");
            console.log(filter)

            if(filter != null)
            {
                let url = me.application.appConfig.BASE_API_URL + "/Accounts/find";
                me.loadAndDisplayData(win, "tableListOfAccount", url, null, {
                    filter: filter,
                    method: "POST"
                })
            }
        });
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win, callback) {
        let url = this.application.appConfig.BASE_API_URL + "/accounts";
        this.loadAndDisplayData(win, "tableListOfAccount", url, function(){
            if(callback != null)
                callback();
        }, { method: 'GET' })
    }
    ,
    showDetail: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfAccount").getSelectedItem();
        if(selectedItem != null)
        {
            let idAccount = selectedItem.id;
            this.application.run("detail", null, idAccount, function(item){
            })
        }
        else
        {
            win.notify("Error", "Please select an item to view", "error")
        }    
    }
    ,
    showAddAccount: function(win)
    {
        var me = this;
        this.application.run("add", null, null, function(item){
            me.refresh(win);
        })
    }
    ,
    showEditAccount: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfAccount").getSelectedItem();
        if(selectedItem != null)
        {
            let idAccount = selectedItem.id;
            this.application.run("edit", null, idAccount, function(item){
                me.refresh(win);
            })
        }
        else
        {
            win.notify("Error", "Please select an item to edit", "error")
        }

    }
    ,
    findAccount: function(win)
    {
        let me = this;
        win.get("tableListOfAccount").search(function(value){
            
            if(value != null && value.length > 0)
            {
                let url = me.application.appConfig.BASE_API_URL + "/Accounts/find/" + value;
                me.loadAndDisplayData(win, "tableListOfAccount", url, function(data){
    
                }, { method: 'GET' });
            }
        });
    }
    ,
    deleteAccount: function(win)
    {
        let me = this;
        let ids = "";
        let selectedData = win.get("tableListOfAccount").getSelectedData();
        if(selectedData.length > 0)
        {
            win.showProgress();
            me.application.run("deleteAccount", null, selectedData, function(result){
                win.hideProgress();
                if(result.success)
                {
                    me.refresh(win, function(data){
                        win.notify("Deletion successfull","The data has been deleted!", "success")
                    });
                }
                else
                {
                    console.log(result)
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