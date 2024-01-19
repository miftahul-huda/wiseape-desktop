var ListOfMenuPage =  Class(DefaultListPage, {

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
    btnRefreshMenu_onClick: function(win, id)
    {
        this.refresh(win)
    }
    ,
    btnDetailMenu_onClick: function(win, id)
    {
        this.showDetail(win)
    }
    ,
    btnExportMenu_onClick: function(win, id)
    {
        this.export(win, "tableListOfMenu", "list-of-Menu")
    }
    ,
    btnPrintMenu_onClick: function(win, id)
    {
        this.print(win, "tableListOfMenu");
    }
    ,
    btnAddMenu_onClick: function(win, id)
    {
        this.showAddMenu(win);   
    }
    ,
    btnEditMenu_onClick: function(win, id)
    {
        this.showEditMenu(win);   
    }
    ,
    btnDeleteMenu_onClick: function(win, id)
    {
        let me = this;
        this.application.prompt("Confirmation", "Are you sure?", "YES|NO", function(result){
            if(result == "YES") 
                me.deleteMenu(win, id);

        });
    }
    ,
    btnFindMenu_onClick: function(win, id)
    {
        this.findMenu(win);   
    }
    ,
    btnAdvanceFindMenu_onClick: function(win, id)
    {
        let me = this;
        this.showAdvanceSearch(win, "tableListOfMenu", function(filter){
            console.log("filter");
            console.log(filter)

            if(filter != null)
            {
                let url = me.application.appConfig.BASE_API_URL + "/menu/find";
                me.loadAndDisplayData(win, "tableListOfMenu", url, null, {
                    filter: filter,
                    method: "POST"
                })
            }
        }, { height: '500px' });
    }
    ,
    btnPrintMenu_onClick: function(win, id)
    {
        this.print(win, "tableListOfMenu");
    }
    ,
    btnSendMenu_onClick: function(win, id, param)
    {
        this.showSendEmail(win, "tableListOfMenu", function(){

        });
    }
    ,
    btnEmailMenu_onClick: function(win, id, param)
    {
        let selectedItem = win.get("tableListOfMenu").getSelectedItem();
        let url = this.application.appConfig.BASE_API_URL + "/menu/get/" + selectedItem.id;
        let fieldInfos =
        [
            { "title": "Title" },
            { "description": "Description" },
            { "icon": "icon" },
            { "menuType": "Type" },
            { "parent.title": "Parent Menu" },
            { "application.appTitle": "Application" },
            { "appCommand": "Command" },
            { "createdAt": "Created At" }
        ];

        let options = { getItemUrl: url, fieldInfos: fieldInfos };
        this.showSendEmailItem(options, function(){})
    }
    ,
    tableListOfMenu_onRowDoubleClick: function(win, id, param)
    {
        this.showDetail(win);
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win, callback) {
        let url = this.application.appConfig.BASE_API_URL + "/menu";
        this.loadAndDisplayData(win, "tableListOfMenu", url, function(){
            if(callback != null)
                callback();
        }, { method: 'GET' })
    }
    ,
    showDetail: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfMenu").getSelectedItem();
        if(selectedItem != null)
        {
            let idMenu = selectedItem.id;
            this.application.run("detail", null, idMenu, function(item){
            })
        }
        else
        {
            win.notify("Error", "Please select an item to view", "error")
        }    
    }
    ,
    showAddMenu: function(win)
    {
        var me = this;
        this.application.run("add", null, null, function(item){
            me.refresh(win);
        })
    }
    ,
    showEditMenu: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfMenu").getSelectedItem();
        if(selectedItem != null)
        {
            let idMenu = selectedItem.id;
            this.application.run("edit", null, idMenu, function(item){
                me.refresh(win);
            })
        }
        else
        {
            win.notify("Error", "Please select an item to edit", "error")
        }

    }
    ,
    findMenu: function(win)
    {
        let me = this;
        win.get("tableListOfMenu").search(function(value){
            
            if(value != null && value.length > 0)
            {
                let url = me.application.appConfig.BASE_API_URL + "/menu/find/" + value;
                me.loadAndDisplayData(win, "tableListOfMenu", url, function(data){
    
                }, { method: 'GET' });
            }
        });
    }
    ,
    deleteMenu: function(win)
    {
        let me = this;
        let ids = "";
        let selectedData = win.get("tableListOfMenu").getSelectedData();
        if(selectedData.length > 0)
        {
            win.showProgress();
            me.application.run("deleteMenu", null, selectedData, function(result){
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
            let icon = rows[i].icon;
            if(rows[i].application != null)
                icon = rows[i].application.appRootPath + "/" + icon;
            rows[i].icon = icon;
        }

        return rows;
    }

})