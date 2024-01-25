var WiseInputTable = Class(WiseElement, {

    init: function(json)
    {
        this.columns = json.columns
        this.onrowdblclick = json.onrowdblclick;
        this.onAddButtonClick = json.onAddButtonClick;
        this.onEditButtonClick = json.onEditButtonClick;
        this.onDeleteButtonClick = json.onDeleteButtonClick;

        for(var i =0; i < this.columns.length; i++)
        {
            this.columns[i].editable = false;
        }
        
        //this.columns.unshift({ datafield: "selected",text: "", columntype: 'checkbox', editable: true });
        this.sorts = []
        this.rowsheight = json.rowsheight;
        WiseInputTable.$superp.init.call(this, json, "WiseInputTable");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        $(div).attr("element", "WiseInputTable")
        $(div).addClass("wise-tableinput")
        //$(div).addClass("element-container")

        $(div).attr("columns", JSON.stringify(this.columns))
        $(div).css("width", "100%")
        $(div).css("height", "100%")
        div = this.defaultInit( div)

        let tbl = this.createTable([]);
        $(div).append(tbl);

        let divWrapper = document.createElement('div')
        $(divWrapper).addClass("wise-tableinput-wrapper")

        let divGridButtons = document.createElement('div')
        $(divGridButtons).addClass("wise-tableinput-buttons")


        let divButtonAdd = $("<button class='wise-tableinput-button' id='" + this.id + "'>Add</button>")[0];
        this.handleEvents(divButtonAdd)

        $(divGridButtons).append(divButtonAdd);

        $(divWrapper).append(divGridButtons)
        $(divWrapper).append(div)


        return divWrapper;
    }
    ,
    handleEvents: function(btnAdd)
    {
        var me = this;
        $(btnAdd).off("click");
        $(btnAdd).on("click", function(){
            me.elementEventHandler(me.id, me.onAddButtonClick)
        })

    }
    ,
    createTable: function(data)
    {
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

                    data[rowidx]["formatted_" + col.datafield] = moment(data[rowidx][col.datafield]).format(format);
                }
            }

        }

        let tbl = document.createElement("table");
        $(tbl).attr("id", this.id + "_table");
        $(tbl).attr("style", "border: solid 1px #ccc; width: 100%;");
        let tr = document.createElement("tr")
        for(let colidx = 0; colidx < columns.length; colidx++)
        {
            let td = document.createElement("th")
            let col = columns[colidx];
            $(td).attr("field", col.datafield);
            $(td).html(col.label);
            $(td).attr("style", "padding: 10px; border: solid 1px #ccc")
            $(td).addClass("wise-inputtable-th")
            $(tr).append(td);
            //console.log("field : " + col.datafield + " : " + col.label)
        }

        td = document.createElement("th")
        $(td).attr("style", "padding: 10px; border: solid 1px #ccc")
        $(td).addClass("wise-inputtable-th")
        $(tr).append(td);

        td = document.createElement("th")
        $(td).attr("style", "padding: 10px; border: solid 1px #ccc")
        $(td).addClass("wise-inputtable-th")
        $(tr).append(td);


        $(tbl).append(tr);

        if(data.length == 0)
        {
            let tr = document.createElement("tr")
            let td = document.createElement("td")
            $(td).attr("colspan", columns.length + 2)
            $(td).html("No Items")
            $(td).attr("style", "padding: 10px; border: solid 1px #ccc; text-align: center")
            $(td).addClass("wise-inputtable-td")

            $(tr).append(td);
            $(tbl).append(tr);   
        }


        for(let rowidx = 0; rowidx < data.length; rowidx++)
        {
            let tr = document.createElement("tr");
            for(let colidx = 0; colidx < columns.length; colidx++)
            {
                let td = document.createElement("td")
                let col = columns[colidx]
                $(td).attr("style", "padding: 3px; padding-left: 10px; border: solid 1px #ccc")
                $(td).addClass("wise-inputtable-td")

                let datafield = col.datafield;
                let value = "";
                eval("value = data[rowidx]." + datafield + ";");
                $(td).html(value);
                $(tr).append(td);
            }

            let btnEdit = $("<button class='wise-tableinput-button'>...</button>")[0]
            let btnDelete = $("<button class='wise-tableinput-button'>x</button>")[0]

            $(btnEdit).attr("row", rowidx);
            $(btnDelete).attr("row", rowidx);


            let td = document.createElement("td")
            $(td).attr("style", "padding: 10px; border: solid 1px #ccc; text-align: center;")
            $(td).addClass("wise-inputtable-td")
            $(td).append(btnEdit)
            $(tr).append(td);

            td = document.createElement("td")
            $(td).attr("style", "padding: 10px; border: solid 1px #ccc; text-align: center;")
            $(td).addClass("wise-inputtable-td")
            $(td).append(btnDelete)
            $(tr).append(td);

            $(tbl).append(tr);

            this.itemButtonHandler(btnEdit, btnDelete)

        }

        return tbl;
    }
    ,
    itemButtonHandler: function(btnEdit, btnDelete)
    {
        let me = this;
        $(btnEdit).on("click", function(){
            let rowIdx = $(this).attr("row");
            let item = me.data[rowIdx];
            item.row = rowIdx;
            me.elementEventHandler(me.id, me.onEditButtonClick, item)
        })

        $(btnDelete).on("click", function(){
            let rowIdx = $(this).attr("row");
            me.data.splice(rowIdx, 1);
            me.loadData(me.data)
            //me.elementEventHandler(me.id, me.onEditButtonClick, item)
        })
    }
    ,
    loadData: function(data, totalData=null)
    {
        var me = this;
        this.data = data;

        let tbl = this.createTable(data);
        $("#" + this.id + "_table").replaceWith(tbl)
        //$("#" + this.id).append(tbl);

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
            else
            {
                columns[i].cellsrenderer =  this.genericRenderer

            }
        }

        return columns;
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
    addItem: function(item)
    {
        if(this.data == null)
            this.data = []
        this.data.push(item)
        this.loadData(this.data)
    }
    ,
    updateItem: function(row, item)
    {
        if(this.data != null)
        {
            this.data[row] = item;
            this.loadData(this.data)

        }
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
    imageRenderer: function (row, datafield, value, col) 
    {
        return $("<div style='margin-left: 5px; height: 100%; width: auto; background: url(" + value + ") no-repeat; background-size: auto 80%; background-position: center; '></div>")[0]; 
    }
    ,
    numberRenderer: function (row, datafield, value) 
    {
        const numberFormatter = Intl.NumberFormat('en-US');
        value = numberFormatter.format(value)
        return $("<div class=\"\" style=\"margin-top: 0px;\">" + value + "</div>")[0];
    }
    ,
    genericRenderer: function (row, datafield, value) 
    {

        return $("<div class=\"\" style=\"margin-top: 0px;\">" + value + "</div>")[0];
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
    rowHeight: function(height)
    {
        $("#" + this.id + " div[role='row']").css("height", height);
    }

})