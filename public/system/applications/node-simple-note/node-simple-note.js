var NodeSimpleNote = Class(DefaultApplication, {

    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-note.js', className: 'ListNotePage', contentFile: 'list-note.json', title: "List of Notes", "icon" : "images/note.png",  config: { width: '90%', height: '90%' }  };
        o["detail"]  = { jsfile: 'detail-note.js', className: 'DetailNotePage', title:'Note Detail Information', contentFile: 'detail-note.json', config: { width: '50%', height: '95%' }  };
        o["add"]  = { jsfile: 'add-note.js', className: 'AddNotePage', contentFile: 'add-note.json', title: "Add Note", config: { width: '50%', height: '95%' }  };
        o["edit"]  = { jsfile: 'add-note.js', className: 'AddNotePage', contentFile: 'add-note.json', title: "Edit Note", config: { width: '50%', height: '95%' }  };

        return o;
    }
    ,
    deleteNote: function(appConfig, parameter, callback)
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
                let url = me.appConfig.BASE_API_URL + "/notes/" + ids;
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