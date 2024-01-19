var DetailApplicationPage =  Class({

    constructor: function(app)
    {
        this.application = app;
        this.idApp = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idApp = param.data;
        this.loadAndDisplayApp(win);

    }
    ,
    loadAndDisplayApp: function(win)
    {
        win.showProgress();
        this.loadApp(this.idApp).then((response)=>{
            win.hideProgress();
            this.displayApp(win, response.payload)
        }).catch((err)=>{

            win.notify("Error", err.message, "error");
        })
    }
    ,
    displayApp: function(win, data)
    {
        console.log(data)
        win.fill(data);
    }
    ,
    loadApp: function(id)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = this.application.appConfig.BASE_API_URL + "/application/get/" + id; 
            console.log(url)
            
            AppUtil.get(url, function(response){
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