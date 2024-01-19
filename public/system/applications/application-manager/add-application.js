var AddApplicationPage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
        this.idApplication = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idApplication = param.data;
        if(this.idApplication != null)
        {
            this.loadAndDisplayApp(win);
        }
    }
    ,
    loadAndDisplayApp: function(win)
    {
        win.showProgress();
        this.loadApp(this.idApplication).then((response)=>{
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
    btnSave_onClick: function(win, id)
    {
        this.saveApplication(win)
    }
    ,
    btnClose_onClick: function(win, id)
    {
        this.cancel(win)
    }
    ,
    //------- End of  event handlers ------------
    saveApplication: function(win)
    {
        let me = this;
        let url = this.application.appConfig.BASE_API_URL + "/application/create";
        let send = AppUtil.post;

        console.log("saveApplication")
        console.log(me.idApplication);
        if(me.idApplication != null)
        {
            console.log("saveApplication update")
            url = this.application.appConfig.BASE_API_URL + "/application/update/" + me.idApplication;
            console.log(url)
            send = AppUtil.post;
        }
        let application = win.getData();

        console.log("url")
        console.log(url)

        console.log("app")
        console.log(application)

        win.showProgress();
        send(url, application, function(response){
            console.log(response)
            win.hideProgress();

            if(response.success)
            {
                me.idApplication = response.payload.id;
                win.notify("Success", "Application is saved");
            }
            else 
            {
                win.notify("Fail", "Application can not be saved: " + response.message, "error");
            }
        }, {
            user: me.application.session.user
        })
    }
    ,
    cancel: function(win)
    {
        win.close();
    }
})