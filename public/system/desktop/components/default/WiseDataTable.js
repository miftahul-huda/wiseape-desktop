var WiseDataTable = Class(WiseElement, {

    init: function(json)
    {
        this.columns = json.columns
        this.gridTheme = "energyblue"
        WiseDataTable.$superp.init.call(this, json, "WiseDataTable");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        $(div).attr("element", "WiseDataTable")
        $(div).addClass("wise-datatable")
        $(div).attr("columns", JSON.stringify(this.columns))
        $(div).css("width", "100%")
        $(div).css("height", "100%")
        div = this.defaultInit( div)

        let divWrapper = document.createElement('div')
        $(divWrapper).addClass("wise-datatable-wrapper")

        let divGridButtons = document.createElement('div')
        $(divGridButtons).addClass("wise-grid-buttons")

        let divCmbPerPageLabel = document.createElement("div")
        $(divCmbPerPageLabel).addClass("grid-button-text")
        $(divCmbPerPageLabel).html("Display/page")

        let divCmbPerPage = document.createElement('div')
        let cmbPerPage = document.createElement("select")
        $(cmbPerPage).append("<option value='10'>10</option>")
        $(cmbPerPage).append("<option value='50'>50</option>")
        $(cmbPerPage).append("<option value='100'>100</option>")
        $(cmbPerPage).append("<option value='200'>200</option>")

        $(divCmbPerPage).append(cmbPerPage);

        let divCmbPageLabel = document.createElement("div")
        $(divCmbPageLabel).addClass("grid-button-text")
        $(divCmbPageLabel).html("Page")

        let divCmbPage = document.createElement('div')
        let cmbPage = document.createElement("select")

        $(divCmbPerPage).append(cmbPerPage);
        $(divCmbPage).append(cmbPage);

        $(divGridButtons).append(divCmbPerPageLabel)
        $(divGridButtons).append(divCmbPerPage)

        $(divGridButtons).append(divCmbPageLabel)
        $(divGridButtons).append(divCmbPage)

        $(divWrapper).append(divGridButtons)
        $(divWrapper).append(div)

        this.handleEvents(cmbPerPage, cmbPage)

        return divWrapper;
    }
    ,
    handleEvents: function(cmbPerPage, cmbPage)
    {
        var me = this;
        $(cmbPerPage).on("change", function(){
            me.elementEventHandler(me.id, "onDataFilterChanged")
        })

        $(cmbPage).on("change", function(){
            me.elementEventHandler(me.id, "onDataFilterChanged")
        })
    }
    ,
    loadData: function(data)
    {
        this.data = data;
        let id = this.id
        let columns = this.columns

        console.log(data)
        var source =
        {   
            localdata: data,
            datafields: this.columns2datafields(columns)
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#" + id).jqxGrid(
        {
            width: '100%',
            height: '95%',
            theme: this.gridTheme,
            groupable: true,
            showcolumnlines: false,
            source: dataAdapter,
            columnsresize: true,
            columns: columns
        });        
    }
    ,
    columns2datafields: function(columns)
    {
        let datafields = [];
        columns.forEach(function(item){
            let type = "string"
            if(type == 'image')
                type = "string"

            if(item.datafield.indexOf(".") > -1)
            {
                let map = item.datafield.replace(/\./g, ">")
                let datafield = item.datafield.replace(/\./g, "_")
                console.log(datafield)
                console.log(map)
                datafields.push({ name: item.datafield, map: map,  type: type })
            }
            else {
                datafields.push({ name: item.datafield, type: type })
            }
            
        })
        return datafields;
    }
    ,
    data: function()
    {
        return this.data;
    }

})