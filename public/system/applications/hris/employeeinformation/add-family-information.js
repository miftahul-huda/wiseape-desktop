var AddFamilyInformationPage = Class(DefaultListPage, {
    constructor: function(app)
    {
        this.application = app;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.familyInformation = param.data;
        if(param.data != null)
            this.row = param.data.row;

        win.showProgress();
        this.loadAndDisplayMasterData(win).then(()=>{
            if(this.familyInformation != null)
                win.fill(this.familyInformation)
            win.hideProgress();
        }).catch((e)=>{

            //alert(JSON.stringify(e));
        })
    }
    ,
    loadAndDisplayMasterData: function(win)
    {
        let promise  = new Promise((resolve, reject)=>{
            try{
                this.getRelationType().then((relationTypes)=>{
                    console.log(relationTypes)
                    this.displayRelationType(win, relationTypes)
                    this.getGender().then((genders)=>{
                        this.displayGender(win, genders);
                        resolve();
                    })
                }).catch((e)=>{
                    reject(e)
                })
            }
            catch(e)
            {
                reject(e);
            }
        });
        
        return promise;
    }
    ,
    getRelationType: function()
    {
        let promise  = new Promise((resolve, reject)=>{
            let url = this.application.appConfig.BASE_API_URL + "/master/familyrelationship"; 
            AppUtil.get(url, function(response){
                if(response.success)
                    resolve(response.payload.rows)
                else 
                    reject(response.error)
            })
        });
        
        return promise;
    }
    ,
    displayRelationType: function(win, relationTypes)
    {
        let options = AppUtil.data2Options(relationTypes, "code", "relationTypeName")
        win.get("cmbRelationType").addItems(options)
    }
    ,
    getGender: function()
    {
        let promise  = new Promise((resolve, reject)=>{
            let url = this.application.appConfig.BASE_API_URL + "/master/gender"; 
            AppUtil.get(url, function(response){
                if(response.success)
                    resolve(response.payload.rows)
                else 
                    reject(response.error)
            })
        });
        
        return promise;
    }
    ,
    displayGender: function(win, genders)
    {
        let options = AppUtil.data2Options(genders, "code", "genderName")
        win.get("cmbGender").addItems(options)
    }
    ,
    btnOk_onClick: function(win, id, param)
    {
        let data = win.getData();
        console.log("data")
        console.log(data)
        data.row = this.row;
        win.close(data);
    }
    ,
    btnCancel_onClick: function(win, id, param)
    {
        win.close(null);
    }
})