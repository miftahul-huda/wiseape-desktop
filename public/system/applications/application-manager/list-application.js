var ListOfApplicationPage =  Class(DefaultListPage, {

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
    btnRefreshApplication_onClick: function(win, id)
    {
        this.refresh(win)
    }
    ,
    btnDetailApplication_onClick: function(win, id)
    {
        this.showDetail(win)
    }
    ,
    btnExportApplication_onClick: function(win, id)
    {
        this.export(win, "tableListOfApplication", "list-of-Application")
    }
    ,
    btnPrintApplication_onClick: function(win, id)
    {
        this.print(win, "tableListOfApplication");
    }
    ,
    btnAddApplication_onClick: function(win, id)
    {
        this.showAddApplication(win);   
    }
    ,
    btnEditApplication_onClick: function(win, id)
    {
        this.showEditApplication(win);   
    }
    ,
    btnDeleteApplication_onClick: function(win, id)
    {
        let me = this;
        this.application.prompt("Confirmation", "Are you sure?", "YES|NO", function(result){
            if(result == "YES") 
                me.deleteApplication(win, id);

        });
    }
    ,
    btnFindApplication_onClick: function(win, id)
    {
        this.findApplication(win);   
    }
    ,
    btnAdvanceFindApplication_onClick: function(win, id)
    {
        let me = this;
        this.showAdvanceSearch(win, "tableListOfApplication", function(filter){
            console.log("filter");
            console.log(filter)

            if(filter != null)
            {
                let url = me.application.appConfig.BASE_API_URL + "/application/find";
                me.loadAndDisplayData(win, "tableListOfApplication", url, null, {
                    filter: filter,
                    method: "POST"
                })
            }
        }, { height: '500px' });
    }
    ,
    btnPrintApplication_onClick: function(win, id)
    {
        this.print(win, "tableListOfApplication");
    }
    ,
    btnSendApplication_onClick: function(win, id, param)
    {
        this.showSendEmail(win, "tableListOfApplication", function(){

        });
    }
    ,
    btnEmailApplication_onClick: function(win, id, param)
    {
        let selectedItem = win.get("tableListOfApplication").getSelectedItem();
        let url = this.application.appConfig.BASE_API_URL + "/application/get/" + selectedItem.id;
        let fieldInfos =
        [
            { "appID": "App ID" },
            { "appTitle": "App Title" },
            { "appInclude": "Includes" },
            { "appEndPoint": "Endpoint" },
            { "appIcon": "Icon" },
            { "appInfo": "Info" },
            { "appVersion": "Version" },
            { "company": "Company" },
            { "appWebsite": "Website" },
            { "appConfig": "Config" },
            { "appRootPath": "Root Path" },
            { "createdAt": "Created At" }
        ];

        let options = { getItemUrl: url, fieldInfos: fieldInfos };
        this.showSendEmailItem(options, function(){})
    }
    ,
    tableListOfApplication_onRowDoubleClick: function(win, id, param)
    {
        this.showDetail(win);
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win, callback) {
        let url = this.application.appConfig.BASE_API_URL + "/application";
        this.loadAndDisplayData(win, "tableListOfApplication", url, function(){
            if(callback != null)
                callback();
        }, { method: 'GET' })
    }
    ,
    showDetail: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfApplication").getSelectedItem();
        if(selectedItem != null)
        {
            let idApplication = selectedItem.id;
            this.application.run("detail", null, idApplication, function(item){
            })
        }
        else
        {
            win.notify("Error", "Please select an item to view", "error")
        }    
    }
    ,
    showAddApplication: function(win)
    {
        var me = this;
        this.application.run("add", null, null, function(item){
            me.refresh(win);
        })
    }
    ,
    showEditApplication: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfApplication").getSelectedItem();
        if(selectedItem != null)
        {
            let idApplication = selectedItem.id;
            this.application.run("edit", null, idApplication, function(item){
                me.refresh(win);
            })
        }
        else
        {
            win.notify("Error", "Please select an item to edit", "error")
        }

    }
    ,
    findApplication: function(win)
    {
        let me = this;
        win.get("tableListOfApplication").search(function(value){
            
            if(value != null && value.length > 0)
            {
                let url = me.application.appConfig.BASE_API_URL + "/applications/find/" + value;
                me.loadAndDisplayData(win, "tableListOfApplication", url, function(data){
    
                }, { method: 'GET' });
            }
        });
    }
    ,
    deleteApplication: function(win)
    {
        let me = this;
        let ids = "";
        let selectedData = win.get("tableListOfApplication").getSelectedData();
        if(selectedData.length > 0)
        {
            win.showProgress();
            me.application.run("deleteApplication", null, selectedData, function(result){
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
    ,
    initializeRows: function(rows)
    {
        for(let i = 0; i < rows.length; i++)
        {
            rows[i].appIcon = rows[i].appRootPath + "/" + rows[i].appIcon;
        }

        return rows;
    }

})