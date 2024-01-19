var ApplicationManager = Class(DefaultApplication, {
    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-application.js', className: 'ListOfApplicationPage', contentFile: 'list-application.json', title: "List of Applications", "icon" : "images/icon.png",  config: { width: '70%', height: '90%' }  };
        o["detail"]  = { jsfile: 'detail-application.js', className: 'DetailApplicationPage', title:'Detail of Application', contentFile: 'detail-application.json', config: { width: '50%', height: '95%' }  };
        o["add"]  = { jsfile: 'add-application.js', className: 'AddApplicationPage', contentFile: 'add-application.json', title: "Add Application", config: { width: '50%', height: '65%' }  };
        o["edit"]  = { jsfile: 'add-application.js', className: 'AddApplicationPage', contentFile: 'add-application.json', title: "Edit Application", config: { width: '50%', height: '95%' }  };

        return o;
    }
    ,
    deleteApplication: function(appConfig, parameter, callback)
    {
        let me = this;
        let ids = "";
        let selectedData = parameter;
        console.log("selectedData")
        console.log(selectedData)

        if(selectedData.length > 0)
        {
            selectedData.map((row)=>{
                ids += row.id + ",";
            });

            if(ids.length > 0)
            {
                ids = ids.substr(0, ids.length - 1);
                let url = me.appConfig.BASE_API_URL + "/application/delete-items/" + ids;
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
        AppUtil.get(url, function(response){
            if(callback != null)
                callback(response);

        },{user: me.session.user});

    }

})