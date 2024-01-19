var UIProcessor = Class({

    gridTheme: 'energyblue',
    $statics :  
    {
        init: function(callback)
        {
            let css  = ["/system/desktop/components/default/ui-style.css", 
                "/system/desktop/components/default/css/wisedatatable.css", 
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
                "/system/desktop/components/default/jqwidgets/jqwidgets/styles/jqx.bootstrap.css",
                "/system/desktop/components/default/responsive-editor/editor.css",
                "/system/desktop/components/default/css/fontawesome-free-6.4.0-web/css/all.css",
                "/system/desktop/components/default/treeview/css/bootstrap-treeview.css",
                "/system/desktop/components/default/tabby/css/tabby-ui.css",
                "/system/desktop/components/default/flatpickr/flatpickr.min.css"
            ];

            let js = ["/system/desktop/components/default/window.js", 
                "/system/desktop/components/default/winbox.bundle.js", 
                "/system/desktop/components/default/notify/notify.js", 
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxcore.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdata.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxbuttons.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxscrollbar.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxmenu.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxcheckbox.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxlistbox.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdropdownlist.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdropdownbutton.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.sort.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.filter.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.pager.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.selection.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.edit.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.columnsresize.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.grouping.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.selection.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxdata.export.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxgrid.export.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxexport.js",
                "/system/desktop/components/default/jqwidgets/jqwidgets/jqxeditor.js",
                "/system/desktop/components/default/jqwidgets/scripts/jszip.min.js",
                "/system/applications/default/defaultapplication.js",
                "/system/applications/default/defaultpage.js",
                "/system/applications/default/defaultlistpage.js",
                "/system/desktop/components/default/WiseElement.js",
                "/system/desktop/components/default/WiseDataTable.js",
                "/system/desktop/components/default/WiseDiv.js",    
                "/system/desktop/components/default/WiseGroup.js",
                "/system/desktop/components/default/WiseButton.js",
                "/system/desktop/components/default/WiseLabel.js",
                "/system/desktop/components/default/WiseMenuButton.js",
                "/system/desktop/components/default/WiseOptionGroup.js",
                "/system/desktop/components/default/WiseMenuVerticalSeparator.js",
                "/system/desktop/components/default/WiseTextBox.js",
                "/system/desktop/components/default/WiseTextArea.js",
                "/system/desktop/components/default/WiseHtmlEditor.js",
                "/system/desktop/components/default/WiseComboBox.js",
                "/system/desktop/components/default/WiseText.js",
                "/system/desktop/components/default/WiseCheckBox.js",
                "/system/desktop/components/default/WiseDate.js",
                "/system/desktop/components/default/WiseWebClient.js",
                "/system/desktop/components/default/WiseImage.js",
                "/system/desktop/components/default/WiseTitle.js",
                "/system/desktop/components/default/responsive-editor/editor.js",
                "/system/desktop/components/default/treeview/js/bootstrap-treeview.js",
                "/system/desktop/components/default/WiseTreeView.js",
                "/system/desktop/components/default/WiseTabGroup.js",
                "/system/desktop/components/default/WiseTab.js",
                "/system/desktop/components/default/WiseContent.js",
                "/system/desktop/components/default/WiseTabContent.js",
                "/system/desktop/components/default/tabby/js/tabby.polyfills.js",
                "/system/desktop/components/default/flatpickr/flatpickr.js"
            ]

            UIProcessor.loadCss(css, 0, function(){
                UIProcessor.loadJs(js, 0, callback)
            })
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
    createWindow: function(title, icon, handler, options, app)
    {
        let newWin = new Window(title, icon, handler, options, app)
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
        this.application = win.application;
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
            elm.elementEventHandler = elementEventHandler;
            elm.window = me.window;
            elm.desktop = me.window.desktop;
            elm.application = me.window.application;

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
    initContent:function(win)
    {
        var me = this;
        me.initBootstrap(win);
        //me.initBootstrapCalendar(win);
        me.initEditor(win);
        me.initTabGroup(win);
        me.initDateControl(win);
        $(".notification-box").hide();

        console.log("Done initcontent")
    }
    ,
    initTabGroup: function(win)
    {
        /*
        $(".wisetabgroup").each((i, div)=>{
            
            let id = $(div).attr("id")
            $(div).wrap("<div id='tabgroupwrapper_" + id + "' class=\"wisetabgroupwrapper card card-primary card-outline card-outline-tabs\"><div class=\"card-header p-0 border-bottom-0\"></div></div>")
        })
        $(".wisetabgroupwrapper").append("<div class='card-body'></div>")
        */
        let dataTabs = $(document.body).find("[data-tabs")
        if(dataTabs.length > 0)
            var tabs = new Tabby('[data-tabs]');
    }
    ,
    initDateControl: function(win)
    {
        $("#" + win.id).find('.wise-date').flatpickr({ enableTime: false, altInput: true});
        $("#" + win.id).find('.wise-datetime').flatpickr({ enableTime: true, time_24hr: true});

        $("#" + win.id).find('.wise-daterange').flatpickr({ enableTime: false, mode: "range"});
        $("#" + win.id).find('.wise-datetimerange').flatpickr({ enableTime: true, time_24hr: true, mode: "range"});

        $("#" + win.id).find('.wise-date-button').off("click");
        $("#" + win.id).find('.wise-date-button').on("click", function(){
            $(this).parent().find("input").trigger('click');
        })
    }
    ,
    initBootstrap: function(win)
    {
        //Initialize Select2 Elements
        
        try{
            let selects = $("#" + win.id).find('select');
            if(selects.length > 0)
            {
                //$("#" + win.id).find('select').select2("destroy")
            }
        }
        catch(err)
        {

        }
        $("#" + win.id).find('select').select2()

        $("#" + win.id).find(".select2-container").css("width", "100%");
        //Initialize Select2 Elements
        $("#" + win.id).find('.select2bs4').select2({
            theme: 'bootstrap4'
        })


        console.log("Done initBootstrap")
    }
    ,
    initBootstrapCalendar: function(win)
    {
        
        //Date picker
        console.log("wisedate")
        console.log($("#" + win.id).find(".wise-date"));

        $("#" + win.id).find(".wise-date").datetimepicker({
            format: 'L'
        });

        /*
        //Date and time picker
        $("#" + win.id).find(".wise-datetime").datetimepicker({ icons: { time: 'far fa-clock' }, locale: {
            format: 'DD MMM YYYY hh:mm:ss'
        } });

        //Date range picker
        console.log(".wise-daterange")
        console.log($("#" + win.id).find(".wise-daterange"));
        $("#" + win.id).find(".wise-daterange").daterangepicker({
            locale: {
                format: 'DD MMM YYYY'
            }
        });

        //Date range picker with time picker
        $("#" + win.id).find(".wise-datetimerange").daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            locale: {
                format: 'DD MMM YYYY hh:mm:ss'
            }
        })
        */
    }
    ,
    initEditor: function(win)
    {

        
        let eds = $("#" + win.id).find(".wise-editor");
        if(eds.length > 0)
        {
           for(var i = 0; i < eds.length; i++)
           {
                let id = $(eds[i]).attr("id");
                let h = $(eds[i]).css("height");
                /*
                const editor = new toastui.Editor({
                    el: document.querySelector('#' + id),
                    height: '500px',
                    initialEditType: 'wysiwyg'
                });*/

                /*
                let editor = $("#" + id).wysiwyg();
                let elm = $("#" + id).parent().find(".editor-content");
                $(elm).css("height", h);
                */
                
                let editor = $("#" + id).Editor();
                $("#" + id).parent().find(".Editor-editor").css("height", h);
                //eds[i].editor = editor;
           }
        }
        

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