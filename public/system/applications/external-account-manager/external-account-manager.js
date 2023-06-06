var ExternalAccountManager = Class(DefaultApplication, {

    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-account.js', className: 'ListAccountPage', contentFile: 'list-account.json', title: "List of Accounts", "icon" : "images/identity-provider.png",  config: { width: '60%', height: '90%' }  };
        o["detail"]  = { jsfile: 'detail-account.js', className: 'DetailAccountPage', title:'Account Detail Information', contentFile: 'detail-account.json', config: { width: '50%', height: '95%' }  };
        o["add"]  = { jsfile: 'add-account.js', className: 'AddAccountPage', contentFile: 'add-account.json', title: "Add Account", config: { width: '50%', height: '65%' }  };
        o["edit"]  = { jsfile: 'add-account.js', className: 'AddAccountPage', contentFile: 'add-account.json', title: "Edit Account", config: { width: '50%', height: '95%' }  };

        return o;
    }
    ,
    deleteAccount: function(appConfig, parameter, callback)
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
                let url = me.appConfig.BASE_API_URL + "/accounts/" + ids;
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