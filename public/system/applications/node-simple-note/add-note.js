var AddNotePage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
    }
    ,
    onLoad: function(win)
    {

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

                cmbCategory.selectedIndex(-1);
                cmbProject.selectedIndex(-1);



            })
        })



    }
    ,
    getProjects: function()
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/projects";
            console.log(url)
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
        console.log(win)
        let url = this.application.appConfig.BASE_API_URL + "/notes/create";
        let note = {};
        note.title = win.get("title").value();
        note.short_desc = win.get("shortDescription").value();
        note.category_id = win.get("category").value();
        note.project_id = win.get("project").value();
        note.user = "miftahul.huda@devoteam.com";
        note.content = win.get("content").value();
        console.log(note);
        win.showProgress();
        $.post(url, JSON.stringify(note), function(response){
            console.log(response)
            win.hideProgress();
            win.notify("Success", "Note is saved");
        })
    }
    ,
    cancel: function(win)
    {
        win.close();
    }
})