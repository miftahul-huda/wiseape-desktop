var DetailMenuPage =  Class({

    constructor: function(app)
    {
        this.application = app;
        this.idMenu = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idMenu = param.data;
        this.loadAndDisplayMenu(win);

    }
    ,
    loadAndDisplayMenu: function(win)
    {
        win.showProgress();
        this.loadMenu(this.idMenu).then((response)=>{
            win.hideProgress();
            this.displayMenu(win, response.payload)
        }).catch((err)=>{

            win.notify("Error", err.message, "error");
        })
    }
    ,
    displayMenu: function(win, data)
    {
        console.log(data)
        win.fill(data);
    }
    ,
    loadMenu: function(id)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = this.application.appConfig.BASE_API_URL + "/menu/get/" + id;
            
            console.log("-----------")
            console.log(url)
            
            AppUtil.get(url, function(response){

                console.log("response")
                console.log(response)
                if(response.success)
                    resolve(response);
                else
                    reject(response);
            }, { user: me.application.session.user })
        });
        return promise;
    }
    ,
    //------   Event  handlers -------------
    btnClose_onClick: function(win, id)
    {
        this.cancel(win)
    }
    ,
    //------- End of  event handlers ------------
    cancel: function(win)
    {
        win.close();
    }
})