var MenuManager = Class(DefaultApplication, {

    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-menu.js', className: 'ListOfMenuPage', contentFile: 'list-menu.json', title: "List of Menus", "icon" : "images/icon.png",  config: { width: '80%', height: '90%' }  };
        o["detail"]  = { jsfile: 'detail-menu.js', className: 'DetailMenuPage', title:'Detail of Menu', contentFile: 'detail-menu.json', config: { width: '50%', height: '95%' }  };
        o["add"]  = { jsfile: 'add-menu.js', className: 'AddMenuPage', contentFile: 'add-menu.json', title: "Add Menu", config: { width: '50%', height: '65%' }  };
        o["edit"]  = { jsfile: 'add-menu.js', className: 'AddMenuPage', contentFile: 'add-menu.json', title: "Edit Menu", config: { width: '50%', height: '95%' }  };

        console.log("getDefaultMenuWindowInfo")
        console.log(o)
        return o;
    }
    ,
    deleteMenu: function(appConfig, parameter, callback)
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
                let url = me.appConfig.BASE_API_URL + "/menu/delete-items/" + ids;
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