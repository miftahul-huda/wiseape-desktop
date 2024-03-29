var WiseDataTable = Class(WiseElement, {

    init: function(json)
    {
        this.columns = json.columns
        this.onrowdblclick = json.onrowdblclick;

        for(var i =0; i < this.columns.length; i++)
        {
            this.columns[i].editable = false;
        }
        
        //this.columns.unshift({ datafield: "selected",text: "", columntype: 'checkbox', editable: true });

        this.gridTheme = "energyblue"
        this.displayPerPage = 10
        this.page = 1
        this.cmbPerPage = null
        this.cmbPage = null
        this.sorts = []
        this.rowsheight = json.rowsheight;
        WiseDataTable.$superp.init.call(this, json, "WiseDataTable");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        $(div).attr("element", "WiseDataTable")
        $(div).addClass("wise-datatable")
        $(div).addClass("element-container")

        $(div).attr("columns", JSON.stringify(this.columns))
        $(div).css("width", "100%")
        $(div).css("height", "100%")
        div = this.defaultInit( div)

        let divWrapper = document.createElement('div')
        $(divWrapper).addClass("wise-datatable-wrapper")

        let divGridButtons = document.createElement('div')
        $(divGridButtons).addClass("wise-grid-buttons")

        let firstDiv = document.createElement("div")
        $(firstDiv).css("width", "80%");


        let selectAllDiv = this.getSelectAllDom();
        $(firstDiv).append(selectAllDiv);

        $(divGridButtons).append(firstDiv);

        let res = this.getPaginationDom();

        let divPagination = res.div;
        let cmbPage = res.cmbPage;
        let cmbPerPage = res.cmbPerPage;

        $(divGridButtons).append(divPagination)

        $(divWrapper).append(divGridButtons)
        $(divWrapper).append(div)

        this.cmbPage = cmbPage
        this.cmbPerPage = cmbPerPage

        this.handleEvents(cmbPerPage, cmbPage)

        return divWrapper;
    }
    ,
    getPaginationDom: function()
    {
        let div = document.createElement("div");
        $(div).css("height", "100%");
        $(div).css("display", "flex");
        $(div).css("align-items", "center");

        let divCmbPerPageLabel = document.createElement("div")
        $(divCmbPerPageLabel).addClass("grid-button-text")
        $(divCmbPerPageLabel).html("Display/page")

        $(div).append(divCmbPerPageLabel);

        let divSep = document.createElement("div");
        $(divSep).css("width", "60px");
        $(div).append(divSep);

        let cmbPerPage = document.createElement("select")
        $(cmbPerPage).width(100)
        $(cmbPerPage).append("<option value='10'>10</option>")
        $(cmbPerPage).append("<option selected value='50'>50</option>")
        $(cmbPerPage).append("<option value='100'>100</option>")
        $(cmbPerPage).append("<option value='200'>200</option>")
        $(cmbPerPage).append("<option value='200'>300</option>")
        $(cmbPerPage).append("<option value='200'>500</option>")
        $(cmbPerPage).append("<option value='200'>1000</option>")
        $(div).append(cmbPerPage);

        divSep = document.createElement("div");
        $(divSep).css("width", "60px");
        $(div).append(divSep);

        let divCmbPageLabel = document.createElement("div")
        $(divCmbPageLabel).addClass("grid-button-text")
        $(divCmbPageLabel).html("Page")
        $(div).append(divCmbPageLabel);

        divSep = document.createElement("div");
        $(divSep).css("width", "60px");
        $(div).append(divSep);

        let cmbPage = document.createElement("select")
        $(cmbPage).width(70)
        $(div).append(cmbPage);

        return {div: div, cmbPage: cmbPage, cmbPerPage: cmbPerPage};

    }
    ,
    getSelectAllDom: function()
    {
        var me = this;
        let div = document.createElement("div");
        $(div).css("display", "flex");
        $(div).css("align-items", "center");
        $(div).css("height", "100%");


        let divCheck = document.createElement("div");
        $(divCheck).addClass("selectAll");

        let divCheckText = document.createElement("div");
        $(divCheckText).addClass("selectAllText");
        $(divCheckText).html("Select All");

        let divSeprator = document.createElement("div");
        $(divSeprator).css("width", "20px");


        let divUnCheck = document.createElement("div");
        $(divUnCheck).addClass("deSelectAll");

        let divUnCheckText = document.createElement("div");
        $(divUnCheckText).addClass("selectAllText");
        $(divUnCheckText).html("Deselect All");

        $(div).append(divCheck);
        $(div).append(divCheckText);
        $(div).append(divSeprator);
        $(div).append(divUnCheck);
        $(div).append(divUnCheckText);

        $(divCheck).on("click", function(){
            me.selectAll();
        })
        $(divCheckText).on("click", function(){
            me.selectAll();
        })

        $(divUnCheck).on("click", function(){
            me.deselectAll();
        })
        $(divUnCheckText).on("click", function(){
            me.deselectAll();
        })

        return div;
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

        for(var i=0; i < data.length; i++)
        {
            data[i].selected = false;
        }

        for(let colidx = 0; colidx < columns.length; colidx++)
        {
            let col = columns[colidx];
            if(col.type != null && col.type.indexOf("date") > -1)
            {
                for(let rowidx = 0; rowidx < data.length; rowidx++)
                {
                    let format = "DD MMM YYYY";
                    if(col.type.indexOf("time") > -1)
                        format = "DD MMM YYYY hh:mm:ss";

                    data[rowidx][col.datafield] = moment(data[rowidx][col.datafield]).format(format);
                }
            }

        }


        var source =
        {   
            localdata: data,
            datafields: this.columns2datafields(columns),
            sort: function ()
            {

            }
        };

        var dataAdapter = new $.jqx.dataAdapter(source);
        let ooppt =
        {
            width: '100%',
            height: '95%',
            theme: this.gridTheme,
            selectionmode: 'multiplerowsadvanced',
            groupable: true,
            showcolumnlines: false,
            source: dataAdapter,
            columnsresize: true,
            sortable: true,
            sorttogglestates: 1,
            filterable: true,
            altrows: true,
            columns: columns,
            editable: false        
        }

        //alert(me.rowsheight)
        if(me.rowsheight != null)
            ooppt.rowsheight = parseFloat(me.rowsheight);

        $("#" + id).jqxGrid(ooppt);       


        let ii = 0;
        me.data.map((item)=>{
            $("#" + this.id).jqxGrid('unselectrow', ii);
            ii++;
        })

        $("#" + id).on('rowselect', function (event) 
        {
            // event arguments.
            var args = event.args;
            // row's bound index.
            var rowBoundIndex = args.rowindex;
            // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
            var rowData = args.row;
        });

        $("#" + id).on('cellendedit', function (event) 
        {
            // event arguments.
            var args = event.args;
            // column data field.
            var dataField = event.args.datafield;
            // row's bound index.
            var rowBoundIndex = args.rowindex;
            // row's data. The row's data object or null(when all rows are being selected or unselected with a single action). If you have a datafield called "firstName", to access the row's firstName, use var firstName = rowData.firstName;
            var rowData = args.row;

            me.data[args.rowindex][dataField] = args.value;
        });

        $("#" + id).bind('rowselect', function (event) {
            var selectedRowIndex = event.args.rowindex;
            me.data[selectedRowIndex].selected = true;
        });
        $("#" + id).bind('rowunselect', function (event) {
            var unselectedRowIndex = event.args.rowindex;
            if(unselectedRowIndex in me.data)
                me.data[unselectedRowIndex].selected = false;
        });
        

        $("#" + id).off('rowdoubleclick');
        $("#" + id).on('rowdoubleclick', function (event) 
        { 
            var args = event.args;
            // row's bound index.
            var boundIndex = args.rowindex;
            // row's visible index.
            var visibleIndex = args.visibleindex;
            // right click.
            var rightclick = args.rightclick; 
            // original event.
            var ev = args.originalEvent;

            if(me.onrowdblclick != null )
            {
                console.log(me.elementEventHandler)
                me.elementEventHandler(me.id, me.onrowdblclick, {
                    rowIndex: boundIndex, 
                    item: me.data[boundIndex]
                });

            }
            
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
        let me = this;
        for(var i = 0; i < columns.length; i++)
        {
            if(columns[i].type == "image")
            {
                columns[i].cellsrenderer =  function(row, datafield, value)
                {
                    return me.imageRenderer(row, datafield, value)
                }
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

        if(totalPage == 0)
        {
            let opt = document.createElement("option")
            $(opt).attr("value", 1)
            $(opt).html(1)
            $(this.cmbPage).append(opt)
        }

        if(this.pageNo == null)
            this.pageNo = 1;
        
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
    getData: function()
    {
        return this.data;
    }
    ,
    getSelectedData: function()
    {
        var rowindexes = $("#" + this.id).jqxGrid('getselectedrowindexes');

        let selectedData = [];
        for(let i = 0; i < rowindexes.length; i++)
        {
            let rowIdx = rowindexes[i]
            selectedData.push(this.data[rowIdx]);
            
        }
        return selectedData;
    }
    ,
    getSelectedItem: function()
    {
        var rowindex = $("#" + this.id).jqxGrid('getselectedrowindex');
        return this.data[rowindex];
    }
    ,
    getSelectedRowIndex: function()
    {
        var rowindex = $("#" + this.id).jqxGrid('getselectedrowindex');
        return rowindex;
    }
    ,
    selectAll: function()
    {
        for(let i = 0; i < this.data.length; i++)
        {
            this.data[i].selected = true;
        }        
        this.refresh();
    }
    ,
    deselectAll: function()
    {
        for(let i = 0; i < this.data.length; i++)
        {
            this.data[i].selected = false;
        }        
        this.refresh();
    }
    ,
    refresh: function()
    {
        $("#" + this.id).jqxGrid("updatebounddata");
        let i = 0;
        this.data.map((item)=>{
            if(item.selected)
            {
                $("#" + this.id).jqxGrid('selectrow', i);
            }
            else
            {
                $("#" + this.id).jqxGrid('unselectrow', i);
            }
            i++;
        })
    }
    ,
    imageRenderer: function (row, datafield, value, col) 
    {
        return "<div style='margin-left: 5px; height: 100%; width: auto; background: url(" + value + ") no-repeat; background-size: auto 80%; background-position: center; '></div>"; 
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
    ,
    getHtml: function()
    {
        var gridContent = $("#" + this.id).jqxGrid('exportdata', 'html');
        let dom = document.createElement("div");
        $(dom).html(gridContent);
        $(dom).find("th").css("font-size", "12pt")
        $(dom).find("th").css("color", "#fff")
        $(dom).find("th").css("font-weight", "bold")

        let i = 0;
        $(dom).find("tr").map((idx, tr)=>{
            console.log(tr)
            if(idx % 2 != 0)
            {
                $(tr).css("background-color", "#eee")
            }
        });

        $(dom).find("td").css("font-family", "Tahoma")
        $(dom).find("td").css("font-size", "10pt")
        $(dom).find("td").css("padding", "6px")

        gridContent = $(dom).html();
        return gridContent;
    }
    ,
    export: function(fileName)
    {
        let ext = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
        if(ext.trim().length == 0)
            ext = "xls";
        
        fileName = fileName.replace("."  + ext, "")
        $("#" + this.id).jqxGrid('exportdata', ext, fileName);
    }
    ,
    print:  function()
    {
        var gridContent = $("#" + this.id).jqxGrid('exportdata', 'html');
        var newWindow = window.open('', '', 'width=800, height=500'),
        document = newWindow.document.open(),
        pageContent =
            '<!DOCTYPE html>\n' +
            '<html>\n' +
            '<head>\n' +
            '<meta charset="utf-8" />\n' +
            '<title>jQWidgets Grid</title>\n' +
            '</head>\n' +
            '<body>\n' + gridContent + '\n</body>\n</html>';
        document.write(pageContent);
        document.close();
        newWindow.print();
    }
    ,
    search: function(callback)
    {
        var me =  this;
        let searchWin  = me.desktop.createWindow("Search by keyword", 
            { 
                width: 480, 
                height: 240, 
                top:'10%' ,
                contentInfo: {
                    contentHandlerFile:"/system/applications/default/search.js",
                    contentHandlerClass:"SearchPage",
                    contentSource: "/system/applications/default/search.json"
                }
            });
        searchWin.show( function(returnValue){
            if(callback != null)
                callback(returnValue);
        });
    }
    ,
    advanceSearch: function(callback, opt)
    {
        var me =  this;
        let searchWin  = me.desktop.createWindow("Filter Data", 
            { 
                width: (opt != null && opt.width) ? opt.width: "40%", 
                height: (opt != null && opt.height) ? opt.height: "80%", 
                top:'10%' ,
                contentInfo: {
                    contentHandlerFile:"/system/applications/default/advance-search.js",
                    contentHandlerClass:"AdvanceSearchPage",
                    contentSource: "/system/applications/default/advance-search.json"
                }
                ,
                parameter: me.columns
            });
        searchWin.show(function(returnValue){
            if(callback != null)
                callback(returnValue);
        });
    }
    ,
    rowHeight: function(height)
    {
        $("#" + this.id + " div[role='row']").css("height", height);
    }

})