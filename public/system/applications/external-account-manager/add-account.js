var AddAccountPage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
        this.account = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idAccount = param.data;
        win.get("firstName").hide();
        win.get("lastName").hide();
        win.get("profilePicture").hide();
        win.get("email").hide();
        win.get("btnOkUser").hide();


        let cmbProvider = win.get("identityProvider");
        win.showProgress();
        this.getProviders().then((providers)=>{
            let optProviders = AppUtil.data2Options(providers, "providerID", "name", "Select provider");
            cmbProvider.addItems(optProviders);
            win.hideProgress();
        })
    }
    ,
    identityProvider_OnChange: function(win, id, param)
    {
        console.log("identityProvider_OnChange")
        let providerID = win.get("identityProvider").value();
        let url = this.application.appConfig.BASE_API_URL + "/accounts/auth?provider=" + providerID;
        let authSessionID = AppUtil.randomString(10);
        url += "&sessionID=" + authSessionID;
        console.log(url);
        win.get("webClient").url(url);

        let me = this;
        this.getAccount(this, authSessionID, function(response){
            console.log(response)
            win.fill(response.payload)
            me.account = response.payload;

            win.get("firstName").show();
            win.get("lastName").show();
            win.get("profilePicture").show();
            win.get("email").show();
            win.get("btnOkUser").show();
            
        });
        
    }
    ,
    getAccount: function(me, authSessionID, callback)
    {
        let url2 = me.application.appConfig.BASE_API_URL + "/accounts/find-by-session?session=" + authSessionID;
        console.log(url2)
        AppUtil.get(url2, function(response){
            if(response.success)
            {
                if(callback != null)
                    callback(response)
            }
            else
            {
                setTimeout(function(){
                    me.getAccount(me, authSessionID, callback);
                }, 3000)
                
            }
        })
    }
    ,
    loadAndDisplayAccount: function(win)
    {
        this.loadAccount(this.idAccount).then((response)=>{
            this.displayAccount(win, response.payload)
        }).catch((err)=>{
            win.notify("Error", err.message, "error");
        })
    }
    ,
    
    getProviders: function()
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/identity-providers";
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;
    }
    ,
    //------   Event  handlers -------------
    btnOkUser_Click: function(win, id)
    {
        this.saveAccount(win)
    }
    ,
    btnCancelUser_Click: function(win, id)
    {
        this.cancel(win)
    }
    ,
    //------- End of  event handlers ------------
    saveAccount: function(win)
    {
        let me = this;
        me.account.isActive = 1;
        me.account.user = me.application.session.user.username;

        console.log(me.account)
        let url = this.application.appConfig.BASE_API_URL + "/accounts/" + me.account.id;
        win.showProgress();

        let send = AppUtil.put(url, { isActive:1, user: me.application.session.user.username }, function(response){
            win.hideProgress();
            win.notify("Success", "Account is saved", "success", null ,  function(){
                win.close();
            });
        } );

        
    }
    ,
    cancel: function(win)
    {
        win.close();
    }
})