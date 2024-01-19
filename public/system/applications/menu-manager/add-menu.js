var AddMenuPage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
        this.idMenu = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idMenu = param.data;

        this.loadAndDisplayMenuType(win);
        this.loadAndDisplayApplications(win).then(()=>{
            this.loadAndDisplayParentMenu(win).then(()=>{
                if(this.idMenu != null)
                {
                    this.loadAndDisplayMenu(win);
                }
            })
        })
    }
    ,
    loadParentMenus: function()
    {
        let me = this;
        let promise  = new Promise((resolve, reject)=>{
            try{
                let url = this.application.appConfig.BASE_API_URL + "/menu/type/GROUP"; 
                console.log(url)
                AppUtil.get(url, function(response){
                    if(response.success)
                        resolve(response.payload.rows);
                    else
                        reject(response);
                }, { user: me.application.session.user });

            }
            catch(e)
            {
                resolve(e)
            }
        });
        
        return promise;
    }    
    ,
    loadApplications: function()
    {
        let me = this;
        let promise  = new Promise((resolve, reject)=>{
            try{
                let url = this.application.appConfig.BASE_API_URL + "/application"; 
                AppUtil.get(url, function(response){
                    console.log(response)
                    if(response.success)
                        resolve(response.payload.rows);
                    else
                        reject(response);
                }, { user: me.application.session.user });

            }
            catch(e)
            {
                resolve(e)
            }
        });
        
        return promise;
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
    loadAndDisplayApplications: function(win)
    {
        let promise  = new Promise((resolve, reject)=>{
            win.showProgress();
            this.loadApplications().then((applications)=>{
                win.hideProgress();
                this.displayApplications(win, applications)
                resolve();
            }).catch((err)=>{
                reject(err)
            })
        });
        
        return promise;
    }
    ,
    loadAndDisplayMenuType: function(win)
    {
        let menuTypes = [
            { "menuType" : "ITEM"},
            { "menuType" : "GROUP"}
        ]

        this.displayMenuTypes(win, menuTypes)
    }
    ,
    loadAndDisplayParentMenu: function(win)
    {
        let promise  = new Promise((resolve, reject)=>{
            win.showProgress();
            this.loadParentMenus().then((menus)=>{

                win.hideProgress();
                console.log(menus)
                this.displayParentMenus(win, menus)
                resolve()
            }).catch((err)=>{
                reject(err);
            })
        });
        
        return promise;
    }
    ,
    displayMenuTypes: function(win, menuTypes)
    {
        let optMenuTypes = AppUtil.data2Options(menuTypes, "menuType", "menuType", "Select Menu Type");
        win.get("menuType").addItems(optMenuTypes);
    }
    ,
    displayParentMenus: function(win, parentMenus)
    {
        let optParentMenus = AppUtil.data2Options(parentMenus, "id", "title", "Select Parent Menu");
        win.get("parentMenuId").addItems(optParentMenus);
    }
    ,
    displayApplications: function(win, applications)
    {
        let optApps = AppUtil.data2Options(applications, "appID", "appTitle", "Select Application");
        win.get("appID").addItems(optApps);
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
        this.saveMenu(win)
    }
    ,
    btnClose_onClick: function(win, id)
    {
        this.cancel(win)
    }
    ,
    //------- End of  event handlers ------------
    saveMenu: function(win)
    {
        let me = this;
        let url = this.application.appConfig.BASE_API_URL + "/menu/create";
        let send = AppUtil.post;

        console.log("saveMenu")
        console.log(me.idMenu);
        if(me.idMenu != null)
        {
            console.log("saveMenu update")
            url = this.application.appConfig.BASE_API_URL + "/application/update/" + me.idMenu;
            console.log(url)
            send = AppUtil.post;
        }
        let menu = win.getData();

        console.log("url")
        console.log(url)

        console.log("menu")
        console.log(menu)

        win.showProgress();
        send(url, menu, function(response){
            console.log(response)
            win.hideProgress();

            if(response.success)
            {
                me.idMenu = response.payload.id;
                win.notify("Success", "Menu is saved");
            }
            else 
            {
                win.notify("Fail", "Menu can not be saved: " + response.message, "error");
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