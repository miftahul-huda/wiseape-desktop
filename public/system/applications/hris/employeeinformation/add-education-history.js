var AddEducationHistoryPage = Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.educationHistory = param.data;
        if(param.data != null)
            this.row = param.data.row;

        win.showProgress();
        this.loadAndDisplayMasterDatas(win).then(()=>{

            if(this.educationHistory != null)
            {
                this.row = param.data.row;
                win.fill(this.educationHistory)

            }
            win.hideProgress();

        }).catch((e)=>{
            alert("error " + e.message)
            win.hideProgress();
        })
    }
    ,
    loadAndDisplayMasterDatas: function(win, id, param)
    {
        let promise  = new Promise((resolve, reject)=>{
            try{
                this.loadEducationLevel().then((educationLevels)=>{
                    console.log("edicatinlevels")
                    console.log(educationLevels)
                    this.displayEducationLevel(win, educationLevels);
                    resolve();
                })
                
            }
            catch(e)
            {
                reject(e)
            }
        });
        
        return promise;
    }
    ,
    loadEducationLevel: function(win)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/educationlevel";
            console.log(url)
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;  
    }
    ,
    displayEducationLevel: function(win, educationLevels)
    {
        let cmbEducationLevel = win.get("cmbEducationLevel");
        let options = AppUtil.data2Options(educationLevels, "code", "educationLevelName")
        cmbEducationLevel.addItems(options)
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
});