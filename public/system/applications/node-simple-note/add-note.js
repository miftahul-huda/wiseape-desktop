var AddNotePage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
        this.idNote = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idNote = param.data;

        let cmbProject = win.get("project");
        let cmbCategory = win.get("category");

        win.showProgress();

        this.getProjects().then((projects)=>{
            let optProjects = AppUtil.data2Options(projects, "id", "project_name", "Select project");
            cmbProject.addItems(optProjects);

            this.getCategories().then((categories)=>{
                let optcategories = AppUtil.data2Options(categories, "id", "category_name", "Select category");
                cmbCategory.addItems(optcategories);
                win.hideProgress();

                //cmbCategory.selectedIndex(-1);
                //cmbProject.selectedIndex(-1);

                if(this.idNote != null)
                {
                    this.loadAndDisplayNote(win);
                }


            })
        })
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
        win.fill(data);
    }
    ,
    loadNote: function(id)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = this.application.appConfig.BASE_API_URL + "/notes/" + id; 

            AppUtil.get(url, function(response){
                if(response.success)
                    resolve(response);
                else
                    reject(response);
            }, 
            { user: me.application.session.user })
        });
        return promise;
    }
    ,
    getProjects: function()
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/projects";
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;
    }
    ,
    getCategories: function()
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/categories";
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;
    }
    ,
    //------   Event  handlers -------------
    btnSave_onClick: function(win, id)
    {
        this.saveNote(win)
    }
    ,
    btnClose_onClick: function(win, id)
    {
        this.cancel(win)
    }
    ,
    //------- End of  event handlers ------------
    saveNote: function(win)
    {
        let me = this;
        let url = this.application.appConfig.BASE_API_URL + "/notes/create";
        let send = AppUtil.post;

        if(me.idNote != null)
        {
            url = this.application.appConfig.BASE_API_URL + "/notes/" + me.idNote;
            send = AppUtil.put;
        }
        let note = win.getData();

        if(note.user == null)
            note.user = me.application.session.user.username;
        else 
        {
            if(note.user.indexOf(me.application.session.user.username) == -1)
            {
                note.user += "," + me.application.session.user.username;
            }
        }

        win.showProgress();
        send(url, note, function(response){
            console.log(response)
            win.hideProgress();

            if(response.success)
            {
                me.idNote = response.payload.id;
                win.notify("Success", "Note is saved");
            }
            else 
            {
                win.notify("Fail", "Note can not be saved: " + response.message, "error");
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