var DetailNotePage =  Class({

    constructor: function(app)
    {
        this.application = app;
        this.idNote = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idNote = param.data;
        this.loadAndDisplayNote(win);

    }
    ,
    loadAndDisplayNote: function(win)
    {
        this.loadNote(this.idNote).then((response)=>{
            this.displayNote(win, response.payload)
        }).catch((err)=>{

            win.notify("Error", err.message, "error");
        })
    }
    ,
    displayNote: function(win, data)
    {
        console.log(data)
        win.fill(data);
    }
    ,
    loadNote: function(id)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = this.application.appConfig.BASE_API_URL + "/notes/" + id; 
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