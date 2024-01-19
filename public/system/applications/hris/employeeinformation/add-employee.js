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
            console.log(url)
            $.get(url, function(response){
                console.log(response)
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
    //------- End of  event handlers ------------
    saveEmployee: function(win)
    {
        let me = this;
        let url = this.application.appConfig.BASE_API_URL + "/notes/create";
        let send = AppUtil.post;

        console.log("saveEmployee")
        console.log(me.idEmployee);
        if(me.idEmployee != null)
        {
            console.log("saveEmployee update")
            url = this.application.appConfig.BASE_API_URL + "/notes/" + me.idEmployee;
            console.log(url)
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