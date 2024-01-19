var ListOfEmployeesPage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.orgCode = null;
        this.application = app;
    }
    ,
    //------   Event  handlers -------------
    onLoad: function(win, id)
    {
        this.refresh(win)
        
    }
    ,
    btnRefreshEmployee_onClick: function(win, id)
    {
        this.refresh(win)
    }
    ,
    btnDetailEmployee_onClick: function(win, id)
    {
        //this.showDetail(win)
    }
    ,
    btnExportEmployee_onClick: function(win, id)
    {
        this.export(win, "tableListOfEmployee", "list-of-Employee")
    }
    ,
    btnPrintEmployee_onClick: function(win, id)
    {
        this.print(win, "tableListOfEmployee");
    }
    ,
    btnAddEmployee_onClick: function(win, id)
    {
        this.showAddEmployee(win);   
    }
    ,
    btnEditEmployee_onClick: function(win, id)
    {
        this.showEditEmployee(win);   
    }
    ,
    btnDeleteEmployee_onClick: function(win, id)
    {
        let me = this;
        this.application.prompt("Confirmation", "Are you sure?", "YES|NO", function(result){
            if(result == "YES") 
                me.deleteEmployee(win, id);

        });
    }
    ,
    btnFindEmployee_onClick: function(win, id)
    {
        this.findEmployee(win);   
    }
    ,
    btnAdvanceFindEmployee_onClick: function(win, id)
    {
        let me = this;
        this.showAdvanceSearch(win, "tableListOfEmployee", function(filter){
            console.log("filter");
            console.log(filter)

            if(filter != null)
            {
                let url = me.application.appConfig.BASE_API_URL + "/Employees/find";
                me.loadAndDisplayData(win, "tableListOfEmployee", url, null, {
                    filter: filter,
                    method: "POST"
                })
            }
        }, { height: '500px' });
    }
    ,
    treePanel_nodeSelected: function(win, id, data)
    {
        console.log("treePanel_nodeSelected")
        console.log(data)

        if(data.parentOrganizationCode == null)
            this.orgCode = null;
        else
            this.orgCode = data.code;

        this.loadAndDisplayEmployees(win, null);
    }
    //------- End of  event handlers ------------
    ,
    refresh: function(win, callback) {

        this.loadAndDisplayOrganizations(win).then(()=>{
            //this.loadAndDisplayEmployees(win, callback);
        })
    }
    ,
    loadAndDisplayEmployees: function(win, callback)
    {
        console.log(this.orgCode)
        let url = this.application.appConfig.BASE_API_URL + "/employee/find-by-org/" + this.orgCode;
        if(this.orgCode == null)
            url = this.application.appConfig.BASE_API_URL + "/employee";

        this.loadAndDisplayData(win, "tableListOfEmployee", url, function(){
            if(callback != null)
                callback();
        }, { method: 'GET' })
    }
    ,
    loadAndDisplayOrganizations: function(win)
    {
        let promise  = new Promise((resolve, reject)=>{
            this.loadOrganizations(win).then((organizations)=>{
                console.log(organizations)
                if(organizations.length > 0)
                {
                    //this.orgCode = organizations[0].code;
                    this.displayOrganizations(win, organizations);

                }
                resolve();
            })
        });
        
        return promise;
    }
    ,
    displayOrganizations: function(win, organizations)
    {
        let orgTree = AppUtil.items2tree(organizations, "organizationName", "parentOrganizationCode", "code")
        console.log(orgTree)
        win.get("treePanel").value(orgTree);
        win.get("treePanel").selectNodeIndex(0);
    }
    ,
    loadOrganizations: function(win)
    {
        let promise  = new Promise((resolve, reject)=>{
            try{
                let url = this.application.appConfig.BASE_API_URL + "/organization";
                AppUtil.get(url, function(response){
                    if(response.success)
                        resolve(response.payload.rows)
                    else
                        reject(response)
                })
            }
            catch(e)
            {
                reject(e);
            }
        });
        
        return promise;
    }
    ,
    showDetail: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfEmployee").getSelectedItem();
        if(selectedItem != null)
        {
            let idEmployee = selectedItem.id;
            this.application.run("detail", null, idEmployee, function(item){
            })
        }
        else
        {
            win.notify("Error", "Please select an item to view", "error")
        }    
    }
    ,
    showAddEmployee: function(win)
    {
        var me = this;
        this.application.run("add", null, null, function(item){
            me.refresh(win);
        })
    }
    ,
    showEditEmployee: function(win)
    {
        var me = this;
        let selectedItem = win.get("tableListOfEmployee").getSelectedItem();
        if(selectedItem != null)
        {
            let idEmployee = selectedItem.id;
            this.application.run("edit", null, idEmployee, function(item){
                me.refresh(win);
            })
        }
        else
        {
            win.notify("Error", "Please select an item to edit", "error")
        }

    }
    ,
    findEmployee: function(win)
    {
        let me = this;
        win.get("tableListOfEmployee").search(function(value){
            
            if(value != null && value.length > 0)
            {
                let url = me.application.appConfig.BASE_API_URL + "/Employees/find/" + value;
                me.loadAndDisplayData(win, "tableListOfEmployee", url, function(data){
    
                }, { method: 'GET' });
            }
        });
    }
    ,
    deleteEmployee: function(win)
    {
        let me = this;
        let ids = "";
        let selectedData = win.get("tableListOfEmployee").getSelectedData();
        if(selectedData.length > 0)
        {
            win.showProgress();
            me.application.run("deleteEmployee", null, selectedData, function(result){
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