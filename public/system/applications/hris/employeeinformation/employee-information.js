var EmployeeInformation = Class(DefaultApplication, {

    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-employees.js', className: 'ListOfEmployeesPage', contentFile: 'list-employees.json', title: "List of Employees", "icon" : "images/employee.png",  config: { width: '90%', height: '90%' }  };
        o["detail"]  = { jsfile: 'detail-employee.js', className: 'DetailEmployeePage', title:'Employee Detail Information', contentFile: 'detail-employee.json', config: { width: '50%', height: '95%' }  };
        o["add"]  = { jsfile: 'add-employee.js', className: 'AddEmployeePage', contentFile: 'add-employee.json', title: "Add Employee", config: { width: '60%', height: '95%' }  };
        o["edit"]  = { jsfile: 'add-employee.js', className: 'AddEmployeePage', contentFile: 'add-employee.json', title: "Edit Employee", config: { width: '60%', height: '95%' }  };

        return o;
    }
    ,
    deleteEmployee: function(appConfig, parameter, callback)
    {
        let me = this;
        let ids = "";
        let selectedData = parameter;

        if(selectedData.length > 0)
        {
            selectedData.map((row)=>{
                ids += row.id + ",";
            });

            if(ids.length > 0)
            {
                ids = ids.substr(0, ids.length - 1);
                let url = me.appConfig.BASE_API_URL + "/employee/" + ids;
                me.remoteDelete(url, function(response)
                {
                    if(callback != null)
                        callback(response);

                });
            }
        }
    }
    ,
    remoteDelete: function( url, callback)
    {
        var me = this;
        AppUtil.delete(url, function(response){
            if(callback != null)
                callback(response);

        },{user: me.session.user});

    }
    
})