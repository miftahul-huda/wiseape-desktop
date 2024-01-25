var AddEmployeePage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
        this.idEmployee = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        this.idEmployee = param.data;

        win.showProgress();
        this.loadAndDisplayMasterDatas(win).then(()=>{
            win.hideProgress();
        })
        
    }
    ,
    loadAndDisplayMasterDatas: function(win)
    {
        let promise  = new Promise((resolve, reject)=>{

            this.getIdentityTypes().then((identityTypes)=>{
                this.displayIdentityType(win, identityTypes)
            })

            this.loadAndDisplayProvince(win).then((provinces)=>{
                if(provinces.length > 0)
                {
                    let provinceCode = provinces[0].code;
                    this.loadAndDisplayCity(win, provinceCode).then((cities)=>{
                        if(cities.length > 0)
                        {
                            let cityCode = cities[0].code;
                            this.loadAndDisplayDistricts(win, cityCode).then((districts)=>{
                                if(districts.length > 0)
                                {
                                    let districtCode = districts[0].code;
                                    this.loadAndDisplaySubDistricts(win, districtCode);
                                    resolve();
                                }
                                else
                                    resolve();
                            })
                        }
                        else 
                            resolve();
                    })
                }        
                else
                    resolve();        
            })

        });
        
        return promise;
    }
    ,
    loadAndDisplayProvince: function(win)
    {
        let promise  = new Promise((resolve, reject)=>{
            this.getProvinces().then((provinces)=>{
                this.displayProvinces(win, provinces);
                resolve(provinces);
            }).catch((err)=>{
                reject(err);
            })
        });
        
        return promise;
    }
    ,
    loadAndDisplayCity: function(win, provinceCode)
    {
        let promise  = new Promise((resolve, reject)=>{
            this.getCities(provinceCode).then((cities)=>{
                this.displayCities(win, cities);
                resolve(cities);
            }).catch((err)=>{
                reject(err);
            })
        });
        
        return promise;
    }
    ,
    loadAndDisplayDistricts: function(win, cityCode)
    {
        let promise  = new Promise((resolve, reject)=>{
            this.getDistricts(cityCode).then((districts)=>{
                this.displayDistricts(win, districts);
                resolve(districts);
            }).catch((err)=>{
                reject(err);
            })
        });
        
        return promise;
    }
    ,
    loadAndDisplaySubDistricts: function(win, districtCode)
    {
        let promise  = new Promise((resolve, reject)=>{
            this.getSubDistricts(districtCode).then((subDistricts)=>{
                this.displaySubDistricts(win, subDistricts);
                resolve(subDistricts);
            }).catch((err)=>{
                reject(err);
            })
        });
        
        return promise;
    }
    ,
    displayIdentityType: function(win, identityTypes)
    {
        let cmbIdentityType = win.get("identityTypeCode");
        let options = AppUtil.data2Options(identityTypes, "code", "identityTypeName")
        cmbIdentityType.addItems(options)
    }
    ,
    displayProvinces: function(win, provinces)
    {
        let cmb = win.get("cmbProvince");
        let options = AppUtil.data2Options(provinces, "code", "province")
        cmb.addItems(options)
    }
    ,
    displayCities: function(win, cities)
    {
        let cmb = win.get("cmbCity");
        let options = AppUtil.data2Options(cities, "code", "city")
        cmb.addItems(options)
    }
    ,
    displayDistricts: function(win, districts)
    {
        let cmb = win.get("cmbDistrict");
        let options = AppUtil.data2Options(districts, "code", "district")
        cmb.addItems(options)
    }
    ,
    displaySubDistricts: function(win, subdistricts)
    {
        //let cmb = win.get("subDistrictCode");
        //let options = AppUtil.data2Options(districts, "code", "subDistrict")
        //cmb.addItems(options)
    }
    ,
    loadAndDisplayEmployee: function(win)
    {
        this.loadEmployee(this.idEmployee).then((response)=>{
            this.displayEmployee(win, response.payload)
        }).catch((err)=>{
            win.notify("Error", err.message, "error");
        })
    }
    ,
    displayEmployee: function(win, data)
    {
        win.fill(data);
    }
    ,
    loadEmployee: function(id)
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
    getProvinces: function()
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/province";
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;
    }
    ,
    getCities: function(provinceCode)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/city/find-by-province/" + provinceCode;
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;
    }
    ,
    getDistricts: function(cityCode)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/district/find-by-city/" + cityCode;
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;
    }
    ,
    getSubDistricts: function(districtCode)
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/subdistrict/find-by-district/" + districtCode;
            $.get(url, function(response){
                resolve(response.payload.rows)
            })

        });
        return promise;
    }
    ,
    getIdentityTypes: function()
    {
        let me = this;
        let promise = new Promise((resolve, reject)=>{
            let url = me.application.appConfig.BASE_API_URL + "/master/identitytype";
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
        this.saveEmployee(win)
    }
    ,
    btnClose_onClick: function(win, id)
    {
        this.cancel(win)
    }
    ,
    cmbProvince_onChange: function(win, id)
    {
        let provinceCode = win.get(id).value();
        this.loadAndDisplayCity(win, provinceCode).then((cities)=>{
            if(cities.length > 0)
            {
                let cityCode = cities[0].code;
                win.get("cmbCity").value(cityCode);
            }
        })
    }
    ,
    cmbCity_onChange: function(win, id)
    {
        let cityCode = win.get(id).value();
        this.loadAndDisplayDistricts(win, cityCode).then((districts)=>{
            if(districts.length > 0)
            {
                let districtCode = districts[0].code;
                win.get("cmbDistrict").value(districtCode);
            }
        })
    }
    ,
    showAddWorkingExperience: function(win, id, param)
    {
        let me = this;
        let win2 = this.application.desktop.createWindow("Add working experience", 
            { 
                width: '50%', 
                height: '50%', 
                parameter: param,
                contentInfo:
                {
                    contentSource: this.application.appRootPath + "/add-working-experience.json",
                    contentHandlerFile: this.application.appRootPath + "/add-working-experience.js",
                    contentHandlerClass: "AddWorkingExperiencePage"
                }
            }, 
        this.application);
        
        this.editWorkingExperience = false;
        if(param != null)
            this.editWorkingExperience = true;

        
        win2.show(function(returnValue){
            if(returnValue != null && me.editWorkingExperience == false)
                me.addItemToWorkingExperienceTable(win, returnValue)
            else if(returnValue != null && me.editWorkingExperience)
                me.updateItemToWorkingExperienceTable(win, returnValue)

        });
    }
    ,
    addItemToWorkingExperienceTable: function(win, item)
    {
        win.get("tblWorkingExperiences").addItem(item);
    }
    ,
    updateItemToWorkingExperienceTable: function(win, item)
    {
        win.get("tblWorkingExperiences").updateItem(item.row, item);
    }
    ,
    showAddSkill: function(win, id, param)
    {
        let me = this;
        let win2 = this.application.desktop.createWindow("Add skill", 
            { 
                width: '50%', 
                height: '50%', 
                parameter: param,
                contentInfo:
                {
                    contentSource: this.application.appRootPath + "/add-skill.json",
                    contentHandlerFile: this.application.appRootPath + "/add-skill.js",
                    contentHandlerClass: "AddSkillPage"
                }
            }, 
        this.application);
        
        this.editSkill = false;
        if(param != null)
            this.editSkill = true;

        
        win2.show(function(returnValue){
            if(returnValue != null && me.editSkill == false)
                me.addItemToSkillTable(win, returnValue)
            else if(returnValue != null && me.editSkill)
                me.updateItemToSkillTable(win, returnValue)

        });
    }
    ,
    addItemToSkillTable: function(win, item)
    {
        console.log("returnVAlue")
        console.log(item)
        win.get("tblSkill").addItem(item);
    }
    ,
    updateItemToSkillTable: function(win, item)
    {
        win.get("tblSkill").updateItem(item.row, item);
    }
    ,
    showAddEducationHistory: function(win, id, param)
    {
        let me = this;
        let win2 = this.application.desktop.createWindow("Add Education History", 
            { 
                width: '50%', 
                height: '50%', 
                parameter: param,
                contentInfo:
                {
                    contentSource: this.application.appRootPath + "/add-education-history.json",
                    contentHandlerFile: this.application.appRootPath + "/add-education-history.js",
                    contentHandlerClass: "AddEducationHistoryPage"
                }
            }, 
        this.application);
        
        this.editSkill = false;
        if(param != null)
            this.editSkill = true;

        
        win2.show(function(returnValue){
            if(returnValue != null && me.editSkill == false)
                me.addItemToEducationHistoryTable(win, returnValue)
            else if(returnValue != null && me.editSkill)
                me.updateItemToEducationHistoryTable(win, returnValue)

        });
    }
    ,
    addItemToEducationHistoryTable: function(win, item)
    {
        win.get("tblEducationHistory").addItem(item);
    }
    ,
    updateItemToEducationHistoryTable: function(win, item)
    {
        win.get("tblEducationHistory").updateItem(item.row, item);
    }
    ,
    showAddFamilyInformation: function(win, id, param)
    {
        let me = this;
        let win2 = this.application.desktop.createWindow("Add Family Information", 
            { 
                width: '50%', 
                height: '50%', 
                parameter: param,
                contentInfo:
                {
                    contentSource: this.application.appRootPath + "/add-family-information.json",
                    contentHandlerFile: this.application.appRootPath + "/add-family-information.js",
                    contentHandlerClass: "AddFamilyInformation"
                }
            }, 
        this.application);
        
        this.addFamilyInformation = false;
        if(param != null)
            this.addFamilyInformation = true;

        
        win2.show(function(returnValue){
            if(returnValue != null && me.editSkill == false)
                me.addItemToFamilyInformationTable(win, returnValue)
            else if(returnValue != null && me.editSkill)
                me.updateItemToFamilyInformationTable(win, returnValue)

        });
    }
    ,
    addItemToFamilyInformationTable: function(win, item)
    {
        win.get("tblFamilyInformation").addItem(item);
    }
    ,
    updateItemToFamilyInformationTable: function(win, item)
    {
        win.get("tblFamilyInformation").updateItem(item.row, item);
    }
    ,
    //------- End of  event handlers ------------
    saveEmployee: function(win)
    {
        let me = this;
        let url = this.application.appConfig.BASE_API_URL + "/notes/create";
        let send = AppUtil.post;

        if(me.idEmployee != null)
        {
            url = this.application.appConfig.BASE_API_URL + "/notes/" + me.idEmployee;
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
            win.hideProgress();

            if(response.success)
            {
                me.idEmployee = response.payload.id;
                win.notify("Success", "Employee is saved");
            }
            else 
            {
                win.notify("Fail", "Employee can not be saved: " + response.message, "error");
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