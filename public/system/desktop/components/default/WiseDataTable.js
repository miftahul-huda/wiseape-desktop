var WiseDataTable = Class(WiseElement, {

    init: function(json)
    {
        this.columns = json.columns
        this.gridTheme = "energyblue"
        this.displayPerPage = 10
        this.page = 1
        this.cmbPerPage = null
        this.cmbPage = null
        this.sorts = []
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
        $(cmbPerPage).width(100)
        $(cmbPerPage).append("<option value='10'>10</option>")
        $(cmbPerPage).append("<option value='50'>50</option>")
        $(cmbPerPage).append("<option value='100'>100</option>")
        $(cmbPerPage).append("<option value='200'>200</option>")
        $(cmbPerPage).append("<option value='200'>300</option>")
        $(cmbPerPage).append("<option value='200'>500</option>")
        $(cmbPerPage).append("<option value='200'>1000</option>")

        $(divCmbPerPage).append(cmbPerPage);

        let divCmbPageLabel = document.createElement("div")
        $(divCmbPageLabel).addClass("grid-button-text")
        $(divCmbPageLabel).html("Page")

        let divCmbPage = document.createElement('div')
        let cmbPage = document.createElement("select")
        $(cmbPage).width(70)

        $(divCmbPerPage).append(cmbPerPage);
        $(divCmbPage).append(cmbPage);

        $(divGridButtons).append(divCmbPerPageLabel)
        $(divGridButtons).append(divCmbPerPage)

        $(divGridButtons).append(divCmbPageLabel)
        $(divGridButtons).append(divCmbPage)

        $(divWrapper).append(divGridButtons)
        $(divWrapper).append(div)

        this.cmbPage = cmbPage
        this.cmbPerPage = cmbPerPage

        this.handleEvents(cmbPerPage, cmbPage)

        return divWrapper;
    }
    ,
    handleEvents: function(cmbPerPage, cmbPage)
    {
        var me = this;
        $(cmbPerPage).on("change", function(){
            $(cmbPage).prop("selectedIndex", 0)
            me.displayPerPage =  $(cmbPerPage).val()
            me.pageNo = 1
            me.elementEventHandler(me.id, "onDataFilterChanged", {  sort: { column: me.sortColumn, direction: me.sortDirection  }, displayPerPage: me.displayPerPage, page: $(cmbPage).val() })
        })

        $(cmbPage).on("change", function(){
            me.pageNo = $(cmbPage).val()
            me.elementEventHandler(me.id, "onDataFilterChanged", {  sort: { column: me.sortColumn, direction: me.sortDirection  }, displayPerPage: $(cmbPerPage).val(), page: me.pageNo })
        })
    }
    ,
    loadData: function(data, totalData=null)
    {
        var me = this;
        this.data = data;
        let id = this.id
        let columns = this.columns
        columns = this.setColumnsRenderer(columns)

        var source =
        {   
            localdata: data,
            datafields: this.columns2datafields(columns),
            sort: function ()
            {

            }
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        $("#" + id).jqxGrid(
        {
            width: '100%',
            height: '90%',
            theme: this.gridTheme,
            groupable: true,
            showcolumnlines: false,
            source: dataAdapter,
            columnsresize: true,
            sortable: true,
            sorttogglestates: 1,
            filterable: true,
            altrows: true,
            columns: columns
        });       

        $("#" + id).on('rowselect', function (event) 
        {
            // event arguments.
            var args = event.args;
            // row's bound index.
            var rowBoundIndex = args.rowindex;
            // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
            var rowData = args.row;
        });

        if(me.sortDone != true)
        {
            $("#" + id).on('sort', function (event) 
            {
                me.sortDone = true;
    
                var sortinformation = event.args.sortinformation;
                let sortColumn = sortinformation.sortcolumn
                //var sortdirection = sortinformation.sortdirection.ascending ? "asc" : "desc";
    
                var sortdirection = "desc";
                if( sortColumn in  me.sorts)
                {
                    sortdirection = me.sorts[sortColumn]
                }
    
                if(sortdirection == "asc")
                    sortdirection = "desc"
                else
                    sortdirection = "asc"
    
                me.sortDirection = sortdirection
                me.sortColumn = sortColumn
    
                me.sorts[sortColumn] = sortdirection
    
                me.elementEventHandler(me.id, "onDataFilterChanged", { sort: { column: me.sortColumn, direction: me.sortDirection  }, displayPerPage: $(me.cmbPerPage).val(), page: $(me.cmbPage).val() })
                
                var eventData = "Triggered 'sort' event <div>Column:" + sortinformation.sortcolumn + ", Direction: " + sortdirection + "</div>";
    
            });

        }
        this.setComboBoxes(totalData)
    }
    ,
    setColumnsRenderer: function(columns)
    {
        for(var i = 0; i < columns.length; i++)
        {
            if(columns[i].type == "image")
            {
                columns[i].cellsrenderer =  this.imageRenderer
            }

            else if(columns[i].type == "numeric")
            {
                columns[i].cellsrenderer =  this.numberRenderer
            }
        }

        return columns;
    }
    ,
    setComboBoxes: function(totalData)
    {
        let displayPerPage = $(this.cmbPerPage).val();
        //let page = $(this.cmbPage).val();

        let totalPage = Math.floor( totalData / displayPerPage ) + 1;
        if( totalData % displayPerPage == 0)
            totalPage = Math.floor( totalData / displayPerPage ) 
        
        $(this.cmbPage).html("");
        for(var i = 0; i < totalPage; i++)
        {
            let opt = document.createElement("option")
            $(opt).attr("value", (i+1))
            $(opt).html((i + 1))
            $(this.cmbPage).append(opt)
        }

        
        if(this.pageNo != null)
            $(this.cmbPage).val(this.pageNo);
    }
    ,
    columns2datafields: function(columns)
    {
        let datafields = [];
        columns.forEach(function(item){
            let type = "string"
            if(item.type == 'image')
                type = "string"

            if(item.datafield.indexOf(".") > -1)
            {
                let map = item.datafield.replace(/\./g, ">")
                let datafield = item.datafield.replace(/\./g, "_")
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
    ,
    imageRenderer: function (row, datafield, value) 
    {
        return '<img style="margin-left: 5px;" height="60" width="50" src="' + value + '"/>';
    }
    ,
    numberRenderer: function (row, datafield, value) 
    {
        const numberFormatter = Intl.NumberFormat('en-US');
        value = numberFormatter.format(value)
        return "<div class=\"jqx-grid-cell-left-align\" style=\"margin-top: 8px;\">" + value + "</div>";
    }
    ,
    getDataFilterOption: function()
    {
        var me = this;
        let page = $(me.cmbPage).val()
        if(page == null)
            page = 1
        let opt = { sort: { column: me.sortColumn, direction: me.sortDirection  }, displayPerPage: $(me.cmbPerPage).val(), page: page };
        return opt;
    }
})