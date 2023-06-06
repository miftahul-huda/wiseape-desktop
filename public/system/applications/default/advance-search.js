var AdvanceSearchPage = Class({

    constructor: function() {
        this.filter = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        console.log("onLoad")
        let columns = param.data;
        this.columns = columns;
        let elmRoot = this.createControlsFromColumns(win, columns);
        win.get("searchContent").addElement(elmRoot);
        this.fillLookups(win, columns);
    }
    ,
    onWindowClosed: function(win, id)
    {
        win.returnValue = this.filter;
    }
    ,
    btnOkSearch_Click: function(win, id)
    {
        this.filter = this.getData(win, this.columns);
        win.close();
    }
    ,
    btnCancelSearch_Click: function(win, id)
    {
        this.filter = null;
        win.close();
    }
    ,
    keyword_onKeyUp: function(win, id, param)
    {

        if(param.keyCode == 13)
        {
            this.keyword = win.get("keyword").value();
            win.close();
        }
        else if(param.keyCode == 27)
        {
            this.keyword = null;
            win.close();
        }
    }
    ,
    createControlsFromColumns: function(win, columns)
    {
        let elemens = [];
        let elm = null;
        let root = {};
        root.children = [];

        columns.map((column)=>{
            if(column.search != false)
            {

                if(column.type == "text")
                {
                    console.log(column.text)
                    elm = new WiseTextBox();
                    elm.init({
                        label: column.text,
                        placeholder: column.placeholder,
                        data: column.datafield,
                        id: "ctrl_" + column.datafield
                    })
                }
                else if(column.type == "textarea")
                {
                    elm = new WiseTextArea();
                    elm.init({
                        label: column.text,
                        placeholder: column.placeholder,
                        data: column.datafield,
                        id: "ctrl_" + column.datafield
                    })
                }
                else if(column.type == "date")
                {
                    elm = new WiseDate();
                    elm.init({
                        label: column.text,
                        placeholder: column.placeholder,
                        data: column.datafield,
                        id: "ctrl_" + column.datafield,
                        type: "daterange"
                    })
                }
    
                else if(column.type == "lookup")
                {
                    elm = new WiseComboBox();
                    elm.init({
                        label: column.text,
                        placeholder: column.placeholder,
                        data: column.lookupfield,
                        id: "ctrl_" + column.datafield.replace(".", "_")
                    })
                }
    
                if(elm != null)
                {
    
                    let newElm = new WiseCheckBox();
                    newElm.init({
                        value: column.datafield,
                        id: column.datafield.replace(".", "_"),
                        checked: false
                    })
    
                    let div = new WiseDiv();
                    div.init({
                        style: "display: flex"
                    })
                    div.children = [];
    
                    let leftDiv = new WiseDiv();
                    leftDiv.init({
                        style: "width: 5%; padding-top: 3%;"
                    })
                    leftDiv.children = [];
    
                    let rightDiv = new WiseDiv();
                    rightDiv.init({
                        style: "width: 95%"
                    })
                    rightDiv.children = [];
    
                    leftDiv.children.push(newElm);
                    rightDiv.children.push(elm);
                    div.children.push(leftDiv);
                    div.children.push(rightDiv);
                    root.children.push(div);
                }
                elm = null;

            }
        })



        return root;

    }
    ,
    fillLookups: function(win, columns)
    {
        let me = this;
        columns.map((column)=>{
            if(column.type == "lookup")
            {
                let url = me.application.appConfig.BASE_API_URL + "" + column.lookupurl;
                console.log(url)
                AppUtil.get(url, function(response){
                    console.log(response)
                    let payload = response.payload.rows;
                    let items = [];
                    payload.map((item)=>{
                        items.push({ value: item[column.lookupvalue], label: item[column.lookuptext] })
                    })
                    win.get("ctrl_" + column.datafield.replace(".", "_")).addItems(items)
                })
            }
        });
    }
    ,
    getData: function(win, columns)
    {
        let me = this;
        let data = [];
        let field = {};
        columns.map((column)=>{
            if(column.search == false)
            {
                //Nothing to do
            }
            else
            {


                let elm = win.get(column.datafield.replace(".", "_"));
                let checked = elm.checked();

                if(checked)
                {
                    console.log("column")
                    console.log(column)

                    let value = win.get("ctrl_" + column.datafield.replace(".", "_")).value();
                    if(column.type == "text" || column.type == "textarea")
                    {
                        field = {
                            datafield: column.datafield,
                            operand: "like",
                            value: value
                        }
                    }
                    else if(column.type == "lookup")
                    {
                        console.log("here")
                        field = {
                            datafield: column.lookupfield,
                            operand: "equal",
                            value: value
                        }
                    }
                    else if(column.type == "date" || column.type == "datetime")
                    {
                        field = {
                            datafield: column.datafield,
                            operand: "between",
                            value: value
                        }
                    }
    
                    data.push(field);
                }
            }
        })

        return data;
    }
})