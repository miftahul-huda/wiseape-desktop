var UIProcessor = Class({

    gridTheme: 'energyblue',
    $statics :  
    {
        init: function(callback)
        {
            let css  = ["/system/desktop/components/default/ui-style.css", 
                "/system/desktop/components/default/winbox.modern.min.css", 
                "/system/desktop/components/default/winbox.white.min.css", 
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.base.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.office.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.energyblue.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.flat.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.metro.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.fresh.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.glacier.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.material-green.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.blue.css",
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.bootstrap.css"
            ];
            let js = ["/system/desktop/components/default/window.js", 
                "/system/desktop/components/default/winbox.bundle.js", 
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxcore.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdata.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxbuttons.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxscrollbar.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxmenu.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxcheckbox.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxlistbox.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdropdownlist.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.sort.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.filter.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.pager.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.selection.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.edit.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.columnsresize.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.grouping.js",
                "/system/desktop/components/default/WiseElement.js",
                "/system/desktop/components/default/WiseDataTable.js",
                "/system/desktop/components/default/WiseDiv.js",    
                "/system/desktop/components/default/WiseGroup.js",
                "/system/desktop/components/default/WiseMenuButton.js",
                "/system/desktop/components/default/WiseMenuVerticalSeparator.js"
            ]

            UIProcessor.loadCss(css, 0, function(){
                UIProcessor.loadJs(js, 0, callback)
            })

            if(callback != null)
                    callback();
            
        }
        ,
        loadCss: function(csss, idx, callback)
        {
            let href = csss[idx]
            var stylesheet = $("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: href
            });
            stylesheet.appendTo("head");

            if(idx < csss.length - 1)
            {
                UIProcessor.loadCss(csss, idx  + 1, callback)
            }
            else
            {
                if(callback != null)
                    callback();
            }
        }
        ,
        loadJs: function(jsss, idx, callback)
        {
            let script = jsss[idx];
            $.getScript(jsss[idx], function (){
                if(idx < jsss.length - 1)
                {
                    UIProcessor.loadJs(jsss, idx  + 1, callback)
                }
                else
                {
                    if(callback != null)
                        callback();
                }
            })
        }
    }
    ,
    constructor: function () {

    }
    ,
    createWindow: function(title, icon, handler, options)
    {
        let newWin = new Window(title, icon, handler, options)
        newWin.uiProcessor = this;
        return  newWin;
    }
    ,
    createDom: function (json, win) {
        this.window = win;
        let root = json.root;
        let children = root.children;
        let parentDom = document.createElement("div")
        let dom = this.createElements(parentDom, children)
        return dom;
    }
    ,
    createElement: function(json, win, elementEventHandler)
    {
        this.window = win;
        let root = json.root;
        let children = root.children;
        
        let parentDom = { children: [] };
        let dom = this.createElements(parentDom, children, elementEventHandler)
        return dom;
    }
    ,
    attachEventToWindow: function(me, eventName, id)
    {
        if(me.window.eventHandler != null)
            me.window.eventHandler(eventName, id)
    }
    ,
    createElements: function (parentDom, elements, elementEventHandler)
    {
        var me = this;
        elements.map((el)=>{
            let elm = me.createNewElement(el)
            elm.elementEventHandler = elementEventHandler
            if(el.children != null && el.children.length > 0)
                elm = me.createElements(elm, el.children, elementEventHandler)

            if(parentDom.children == null)
                parentDom.children = []

            parentDom.children.push(elm);
        })
        return parentDom;
    }
    ,
    createNewElement: function(json)
    {
        let dom = this.createByObjectName(json)
        return dom;
    }
    ,
    defaultInit: function (json, dom) {
        if(json.id != null)
            dom.id = json.id;
        if(json.class != null)
            $(dom).addClass( json.class)
        if(json.style != null)
            $(dom).attr("style", json.style)
        return dom;
    }
    ,
    createDiv: function(json)
    {
        let element = new WiseDiv();
        element.init(json);
        return element;
    }
    ,
    createWiseMenuButton: function(json)
    {
        let element = new WiseMenuButton();
        element.init(json);
        return element;
    }
    ,
    createWiseMenuVerticalSeparator: function(json)
    {
        let element = new WiseMenuVerticalSeparator();
        element.init(json);
        return element;
    }
    ,
    createWiseGroup: function(json)
    {
        let element = new WiseGroup();
        element.init(json);
        return element;
    }
    ,
    createWiseDataTable: function(json)
    {
        let element = new WiseDataTable();
        element.init(json);
        return element;
    }
    ,
    createByObjectName: function(json)
    {
        let elmName = json.element;
        let element = {};
        eval("element = new " + elmName + "();");
        element.init(json);
        return element;
    }
    ,
    initContent:function()
    {
        var me = this;
        me.initBootStrap();
    }
    ,
    initBootStrap: function()
    {
        //Initialize Select2 Elements
        $('select').select2()

        //Initialize Select2 Elements
        $('.select2bs4').select2({
            theme: 'bootstrap4'
        })

    }
    ,
    columns2datafields: function(columns)
    {
        let datafields = [];
        columns.forEach(function(item){
            let type = "string"
            if(type == 'image')
                type = "string"
            datafields.push({ name: item.datafield, type: type })
        })
        return datafields;
    }


})