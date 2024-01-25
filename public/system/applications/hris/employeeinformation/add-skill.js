var AddSkillPage = Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.skill = param.data;
        if(param.data != null)
            this.row = param.data.row;

        win.showProgress();
        this.loadAndDisplayMasterDatas(win).then(()=>{

            if(this.skill != null)
            {
                this.row = param.data.row;
                win.fill(this.skill)

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
                this.loadSkillLevel().then((skillLevels)=>{
                    this.displaySkillLevel(win, skillLevels);
        
                    this.loadSkillGroup().then((skillGroups)=>{
                        this.displaySkillGroup(win, skillGroups)
                        resolve();
                    })
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
    loadSkillLevel: function(win)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/skilllevel";
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;  
    }
    ,
    displaySkillLevel: function(win, skillLevels)
    {
        let cmbSkillLevel = win.get("cmbSkillLevel");
        let options = AppUtil.data2Options(skillLevels, "code", "skillLevel")
        cmbSkillLevel.addItems(options)
    }
    ,
    loadSkillGroup: function(win)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/skillgroup";
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;  
    }
    ,
    displaySkillGroup: function(win, skillGroups)
    {
        let cmbSkillGroup = win.get("cmbSkillGroup");
        let options = AppUtil.data2Options(skillGroups, "code", "skillGroup")
        cmbSkillGroup.addItems(options)    
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