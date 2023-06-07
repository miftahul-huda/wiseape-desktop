var SendPage = Class({

    constructor: function() {
        this.keyword = null;
        this.appAccountManager = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        console.log("onLoad")
        console.log(param)

        this.getAccounts().then((accounts)=>{
            this.displayAccounts(win, accounts);
            this.displayData(win, param.data.content)
        })
    }
    ,
    onWindowClosed: function(win, id)
    {
        win.returnValue = null;
    }
    ,
    btnSend_Click: function(win, id)
    {
        this.sendEmail(win).then(()=>{
            win.notify("Notification", "Email sent successfully!", "success", null, function(){
                win.close();
            });
        }).catch((e)=>{
            win.notify("Error", "Email sending failed!", "error", null);
        })
    }
    ,
    btnCancel_Click: function(win, id)
    {
        win.close();
    }
    ,
    keyword_onKeyUp: function(win, id, param)
    {

        if(param.keyCode == 13)
        {
            this.keyword = win.get("keyword").value();
            win.close();
        }
        else if(param.keyCode == 27)
        {
            this.keyword = null;
            win.close();
        }
    }
    ,
    displayData: function(win, content)
    {
        win.get("content").value(content);
    }
    ,
    getAccounts: function()
    {
        let promise = new Promise((resolve, reject)=>{
            AppUtil.getApplication("appAccountManager").then((app)=>{
                this.appAccountManager = app;
                let appConfig = app.appConfig;
                let url = appConfig.BASE_API_URL + "/accounts";
                AppUtil.get(url, function(response){
                    if(response.success)
                    {
                        resolve(response.payload.rows);
                    }
                    else
                        reject(response);
    
                }, { user: this.application.session.user })
            })
        })

        return promise;
    }
    ,
    displayAccounts: function(win, accounts)
    {
        let options = AppUtil.data2Options(accounts, "email", "email", "Select email account");
        win.get("account").addItems(options);
    }
    ,
    sendEmail: function(win)
    {
        let promise = new Promise((resolve, reject)=>{
            let o = win.getData();
            AppUtil.sendEmail(o).then((response)=>{
                resolve(response);
            }).catch((e)=>{
                reject(e);
            })
            
        });
        return promise;
    }
})