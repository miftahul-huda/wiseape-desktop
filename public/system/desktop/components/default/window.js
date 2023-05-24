var Window = Class({

    constructor: function(title, icon, eventHandler, options, app)
    {
        this.className = "window";
        this.application = app;
        this.title = title
        this.icon = icon
        this.options = options
        this.eventHandler = eventHandler
        this.contentEventHandler = null
        this.id = "window_" + Util.makeId(10);
        this.uiProcessor = null;
        this.content = null;
        this.elements = null;
        this.winbox = null;
        this.winClosedCallbacks = [];

        if(this.options.width == null)
            this.options.width = '80%';
        if(this.options.height == null)
            this.options.height = '90%';

        /*
        let divIcon = "<div class='wiseape-window-icon' style='background-image: url(" + icon + ")'></div>";
        let divHeaderButtonMin = "<div class='wiseape-window-button wiseape-window-button-min'></div>";
        let divHeaderButtonMax = "<div class='wiseape-window-button wiseape-window-button-max'></div>";
        let divHeaderButtonClose = "<div class='wiseape-window-button wiseape-window-button-close'></div>";
        let divSep = "<div style='width: 0px'></div>";
        let divHeaderButtons = "<div class='wiseape-window-button-container'><div>" + divHeaderButtonMin  + divHeaderButtonMax  + divHeaderButtonClose + "</div></div>"
        let divHeader = "<div class='wiseape-window-header'>" + divIcon + "<div class='wiseape-window-title'>" + this.title + "</div>" + divHeaderButtons + "</div>";
        let divWindowContent = "<div class='loader'></div><div class='wiseape-window-content'></div>";

        let divWindow = "<div class='wiseape-window' id='" + this.id + "'>" + divHeader + divWindowContent + "</div>"

        this.dom = divWindow
        this.dom = $(this.dom)[0]

        if(options != null && options.width != null)
            $(this.dom).width(options.width)

        if(options != null && options.height != null)
            $(this.dom).height(options.height)
        */


    }
    ,
    max: function(){

        var me = this;
        this._saveSizePosition();
        
        let w =  $(GLOBAL.desktopDom).width(); 
        let h = $(GLOBAL.desktopDom).height(); 
        $(this.dom).width(w);
        $(this.dom).height("100%");
        $(this.dom).css("left", "5%");
        $(this.dom).css("top", "0%");

        $("#" + me.id + " .wiseape-window-button-max").css("background-image", "url(/images/winrestore.png)")
        $("#" + this.id + " .wiseape-window-button-max").unbind("click")
        $("#" + this.id + " .wiseape-window-button-max").on("click", function(){
                me.restore();
        });
    }
    ,
    restore: function(){ 
        var me = this;
        
        let w =  this.width; 
        let h = this.height; 
        $(this.dom).width(w);
        $(this.dom).height(h);
        $(this.dom).css("left", this.left);
        $(this.dom).css("top", this.top);

        $("#" + this.id + " .wiseape-window-button-max").css("background-image", "url(/images/winmax.png)")
        $("#" + this.id + " .wiseape-window-button-max").unbind("click")
        $("#" + this.id + " .wiseape-window-button-max").on("click", function(){
                me.max();
        });
    }
    ,
    _saveSizePosition: function()
    {
        this.height = $(this.dom).height();
        this.width = $(this.dom).width();
        this.left = $(this.dom).css("left");
        this.top = $(this.dom).css("top");
    }
    ,
    setIds: function(me, content)
    {
        content.root.children = me.changeIds(me, content.root.children)
        return content;
    }
    ,
    changeIds: function(me, children)
    {
        let newChildren = []
        if(children != null && children.length > 0)
        {
            children.forEach(function(child){

                if(child.id != null)
                {

                    child.id = me.id + "___" + child.id;
                }
                child.children = me.changeIds(me, child.children)
                newChildren.push(child)
            })
        }

        return newChildren;
    }
    ,
    showWindowAfter: function(me, content)
    {
        $(content).append("<div class='loader'></div>")
        $(content).prepend("<div class='notification-box'><div class='notification-text'></div><div style='width: 30px;'></div><div class='notification-icon'></div></div>")
        me.content = content

        let title = me.title;
        if(me.icon != null && me.icon.length > 0)
        {
            title = "<div style='display: inline-flex;'><div style='width:40px;height:40px;background: url(" + me.icon + ") no-repeat; background-size: auto 70%;background-position: center'></div><div class='window-title'>" + title + "</div></div>"
        }
        else
        {
            title = "<div style='display: inline-flex;'><div class='window-title'>" + title + "</div></div>"
        }

        let www = me.options.width + "";
        let lll = 0;
        let hhh = me.options.height + "";
        let ttt = 0;


        if(www.indexOf("%") > -1)
        {
            www = www.replace("%", "");
            www = parseFloat( me.options.viewPort.width) * parseFloat(www) / 100;   
        }
        else
        {
            www = www.replace("px", "");
        }

        lll = (this.options.viewPort.width - www) / 2;
        lll = lll + me.options.viewPort.left

        if(hhh.indexOf("%") > -1)
        {
            hhh = hhh.replace("%", "");
            hhh = parseFloat( me.options.viewPort.height) * parseFloat(hhh) / 100;   
        }
        else
        {
            hhh = hhh.replace("px", "");
        }

        ttt = (this.options.viewPort.height - hhh) / 2;
        ttt = ttt + me.options.viewPort.top;

        if(me.options.top != null)
            ttt = me.options.top;
        
        if(me.options.left != null)
        {
            lll = me.options.left;
        }
            
        

        let viewPort = me.options.viewPort;
        me.winbox = new WinBox({
            id: me.id,
            title: title,
            class: ["no-animation", "no-full"],
            html: content,
            root: $(".desktop-content")[0],
            top: viewPort.top,
            left: viewPort.left,
            right: viewPort.right,
            bottom: viewPort.bottom,
            width: me.options.width,
            height: me.options.height,
            //x: me.options.left + me.options.viewPort.left,
            x: lll,
            y: ttt,
            onresize: function(width, height){
                me.height = height
                me.width = width
                $(".wb-min").on("click",function(){
                    alert("mix")
                });
            }
            ,
            onfocus: function()
            {
            }
            ,
            onmove: function(x, y){
                me.left = x
                me.top = y
            }
            ,
            onMinimize: function()
            {
                
            }
            ,
            onclose: function(force)
            {
                $("#winTemp").css("width", $("#" + me.id).width() );
                $("#winTemp").css("height", $("#" + me.id).height() );
                $("#winTemp").css("left", me.winbox.x );
                $("#winTemp").css("top", me.winbox.y );
                //$("#winTemp").css("display", "block" );
        
                $("#winTemp").show();
                setTimeout(function(){
                    $("#winTemp").effect("scale", { percent: 50 }, 100, function(){
                        $("#winTemp").hide();
                    })
                }, 100)

                if(this.eventHandler != null)
                    this.eventHandler("onWindowClosed", me)

                if(me.contentEventHandler != null)
                    me.contentEventHandler( me, me.id, "onWindowClosed",  { data: me.options.parameter }    )

                if(me.winClosedCallbacks != null)
                {
                    me.winClosedCallbacks.map( (callback) => {
                        callback(me.returnValue);
                    })
                }
            }
        });

        $("#" + me.id).append("<div class='wb-footer'></div>")


        me.uiProcessor.initContent(me);

        if(me.contentEventHandler != null)
            me.contentEventHandler( me, me.id, "onLoad", { data: me.options.parameter })

        //me.uiProcessor.initContent(me);

        me.setWindowHeaderEvent();


        //$("#" + me.id).hide();

        /*
        setTimeout(function(){
            $("#" + me.id).effect( "slide", {}, 500, null );

        }, 100)
        */
    }
    ,
    setWindowHeaderEvent: function()
    {

        let me = this;
        let elm = $("#" + me.id + " > .wb-header > .wb-title");

        elm.off("click");
        elm.on("click", function(event){

            me.reloadWindow();
            
        })
    }
    ,
    showWindow: function(me, content)
    {

        let www = me.options.width + "";
        let lll = 0;
        let hhh = me.options.height + "";
        let ttt = 0;

        if(www.indexOf("%") > -1)
        {
            www = www.replace("%", "");
            www = parseFloat( me.options.viewPort.width) * parseFloat(www) / 100;   
        }
        else
        {
            www = www.replace("px", "");
        }

        lll = (this.options.viewPort.width - www) / 2;
        lll = lll + me.options.viewPort.left

        if(hhh.indexOf("%") > -1)
        {
            hhh = hhh.replace("%", "");
            hhh = parseFloat( me.options.viewPort.height) * parseFloat(hhh) / 100;   
        }
        else
        {
            hhh = hhh.replace("px", "");
        }

        ttt = (this.options.viewPort.height - hhh) / 2;
        ttt = ttt + me.options.viewPort.top;

        if(me.options.top != null)
            ttt = me.options.top;
        
        if(me.options.left != null)
        {
            lll = me.options.left;
        }

        $("#winTemp").css("height", hhh);
        $("#winTemp").css("width", www);
        $("#winTemp").css("left", lll);
        $("#winTemp").css("top", ttt);
        $("#winTemp").css("z-index", 1000000);

        //$("#winTemp").hide();
        $("#winTemp").show( "scale", { percent: 60 }, 100, function(){
            me.showWindowAfter(me, content);
            $("#winTemp").hide();
        } );

    }
    ,
    processContent: function(me, content)
    {
        me.content = content

        me._saveSizePosition();
        //$(GLOBAL.desktop).append(this.dom)

        $("#" + this.id + " .wiseape-window-content").append(content)
        me.uiProcessor.initContent(me);
        
        $("#" + this.id + "").fadeIn();

        $("#" + this.id + "").draggable({ handle: ".wiseape-window-header" })
        $("#" + this.id + "").resizable();

        $("#" + this.id + " .wiseape-window-button-close").on("click", function(){
            me.close();
        });

        $("#" + this.id + " .wiseape-window-button-min").on("click", function(){
            me.min();
        });

        $("#" + this.id + " .wiseape-window-button-max").on("click", function(){
            me.max();
        });

        $("#" + this.id + " .wiseape-window-header").on("click", function(){
            me._headerClick(me);
        });


        me.DRAG = false;
        $(".wiseape-window-header").on('mousedown', function(){
            me.DRAG = true;
            $(".wiseape-window-header").css("cursor", "move")
        })

        $(".wiseape-window-header").on('mouseup', function(){
            me.DRAG = false;
            $(".wiseape-window-header").css("cursor", "auto")
        })

        //$(this.dom).effect("slide")
        
        /*$(this.dom).dialog({
            show: {effect: 'slide', duration: 250},
            hide: {effect: 'fade', duration: 250},
            width: '95%',
            height: 300,
            position: ['100px',0]
        });*/

        if(me.contentEventHandler != null)
            me.contentEventHandler( me, me.id, "onLoad", {})
    }
    ,
    show: function(content, winClosedCallback)
    {
        var me =  this;
        me.__CONTENT = content;
        me.__WINCLOSEDCALLBACK = winClosedCallback;

        if(winClosedCallback != null)
        {
            me.winClosedCallbacks.push(winClosedCallback);
            me.modal  = true;
        }

        if( typeof content === 'object')
        {
            let uiProcessor = me.uiProcessor;
            content = me.setIds(me, content)
            me.elements = uiProcessor.createElement(content, me, function(elmId, event, param){
                elmId = elmId.split("___")
                elmId = elmId[elmId.length - 1]
                me.contentEventHandler(me, elmId, event, param)
            })
            content = me.createDom(me, me.elements)
            //me.processContent(me, content)
            me.showWindow(me, content)
        }
        else
        {
           
            let ss = content.split(".")
            if(ss[ss.length-1].toLowerCase() == "json")
            {
                $.getJSON(content, function(json){

                    let uiProcessor = me.uiProcessor;   
                    content = me.setIds(me, json)
                    me.elements = uiProcessor.createElement(content, me, function(elmId, event, param){
                        elmId = elmId.split("___")
                        elmId = elmId[elmId.length - 1]
                        me.contentEventHandler(me, elmId, event, param)
                    })
                    content = me.createDom(me, me.elements)
                    //me.processContent(me, content)
                    me.showWindow(me, content)
                })
            }
            else if(ss[ss.length-1].toLowerCase() == "html")
            {
 
                $.get(content, function(html){

                    //me.processContent(me, html)
                    me.showWindow(me, $(html)[0])
                })
            }
        }
    }
    ,
    createDom: function(me, root){

        let parentDom = document.createElement("div");
        $(parentDom).css("padding", "20px")
        $(parentDom).css("height", "100%")
        $(parentDom).css("overflow", "auto")

        parentDom = me.createDomStructure(me, parentDom, root.children)
        return parentDom;
    }
    ,
    createDomStructure: function(me, parentDom, elements)
    {
        if(elements != null && elements.length > 0)
        {
            elements.forEach(function(el){
                let dom = el.createDom();
                dom = me.createDomStructure(me, dom, el.children)
                $(parentDom).append(dom)
            })
        }

        return parentDom;
    }
    ,
    closeOld: function()
    {
        var me = this;
        me.winbox.close();
        $("#winTemp").show( "scale", { percent: 50 }, 500, function(){
            me.closeAfter(me);
            //$("#winTemp").hide();
        } );
        
    }
    ,
    close: function()
    {
        //var me = this;
        //alert(this.dom)

        
        this.winbox.close();
        //

        
        

        //$("#" + this.id).effect("explode", {}, 500)

        /*
        $(this.dom).fadeOut(function(){
            $("#" + this.id).remove()
            me.eventHandler("onWindowClosed", me)
            if(me.contentEventHandler != null)
            {
                me.contentEventHandler(me, me.id, "onWindowClosed")
            }
            
            if(me.winClosedCallbacks != null)
            {
                me.winClosedCallbacks.map( (callback) => {
                    callback(me.returnValue);
                })
            }
            
        });
        */
    }
    ,
    min: function()
    {
        var me =  this;
        $(this.dom).hide("fast", "swing", function(){
            me.eventHandler("onWindowMinimized", me)
        });
    }
    ,
    unhide: function()
    {
        var me =  this;
        $(this.dom).show("fast", "swing", function(){
        });
    }
    ,
    _headerClick: function(me)
    {
        me.eventHandler("onHeaderClick", me)
    }
    ,
    setZIndex: function(i)
    {
        this.zIndex = i;
        $("#" + this.id).css("z-index", i);
    }
    ,
    get: function(elmName)
    {
        let elm = this.findElementById(elmName, this.elements.children)
        if(elm == null)
            throw "Element " + elmName + "does not exist"
        return elm;
    }
    ,
    findElementById:function(elmName, children)
    {
        let elm = null;
        var me = this;
        if(children != null && children.length > 0)
        {
            children.forEach(function(el){
                let oName = me.id + "___" + elmName;
                if(el.id == oName)
                {
                    elm = el
                }
                else if(elm == null)
                    elm = me.findElementById(elmName, el.children) 
            })
        }
        return elm
    }
    ,
    fill: function(data)
    {
        this.fillWithData(this.elements.children, data);
    }
    ,
    fillWithData:function( children, data)
    {
        let elm = null;
        var me = this;
        if(children != null && children.length > 0)
        {
            children.forEach(function(el){
                let fieldname = el.data;
                if(fieldname != null)
                {
                    let value = null;
                    console.log(fieldname)  
                    eval("value = data." + fieldname + ";")                        

                    el.value(value);
                }
                me.fillWithData(el.children, data) 
            })
        }
    }
    ,
    getData: function()
    {
        let data = this.getDataDetail(this.elements.children, {});
        return data;
    }
    ,
    getDataDetail: function(children, data)
    {
        let elm = null;
        var me = this;
        if(children != null && children.length > 0)
        {
            children.forEach(function(el){
                let fieldname = el.data;
                if(fieldname != null)
                {
                    data[fieldname] = el.value();
                }
                me.getDataDetail(el.children, data) 
            })
        }  
        return data;
    }
    ,
    showProgress: function()
    {
        $(".loader").show();
    }
    ,
    hideProgress: function()
    {
        $(".loader").hide();
    }
    ,
    notify: function(title, content, theme="success", opt)
    {
        let me = this;
        $("#" + this.id + " .notification-text").html(content)


        $("#" + this.id + " .notification-icon").removeClass("notification-icon-success")
        $("#" + this.id + " .notification-icon").removeClass("notification-icon-error")
        $("#" + this.id + " .notification-icon").removeClass("notification-icon-warning")
        $("#" + this.id + " .notification-icon").removeClass("notification-icon-info")

        $("#" + this.id + " .notification-box").removeClass("notification-box-success")
        $("#" + this.id + " .notification-box").removeClass("notification-box-error")
        $("#" + this.id + " .notification-box").removeClass("notification-box-warning")
        $("#" + this.id + " .notification-box").removeClass("notification-box-info")



        if(theme == "success")
        {
            $("#" + this.id + " .notification-icon").addClass("notification-icon-success")
            $("#" + this.id + " .notification-box").addClass("notification-box-success")

        }
        else if(theme == "warning")
        {
            $("#" + this.id + " .notification-icon").addClass("notification-icon-warning")
            $("#" + this.id + " .notification-box").addClass("notification-box-warning")

        }
        else if(theme == "error")
        {
            $("#" + this.id + " .notification-icon").addClass("notification-icon-error")
            $("#" + this.id + " .notification-box").addClass("notification-box-error")

        }
        else if(theme == "info")
        {
            $("#" + this.id + " .notification-icon").addClass("notification-icon-info")
            $("#" + this.id + " .notification-box").addClass("notification-box-info")

        }

        if(opt != null && opt.left != null)
        {
            //$("#" + this.id + " .notification-box").css("position", "absolute");
            $("#" + this.id + " .notification-box").css("left", opt.left);
            $("#" + this.id + " .notification-box").css("top", opt.top);

            if(opt.width != null)
                $("#" + this.id + " .notification-box").css("width", opt.width);
            if(opt.height != null)
                $("#" + this.id + " .notification-box").css("width", opt.height);
        }

        $("#" + this.id + " .notification-box").show("fast");
        setTimeout(function(){
            if(theme == "error")
            {
                
                $("#" + me.id + " .notification-box").off("click");
                $("#" + me.id + " .notification-box").on("click", function(){
                    $("#" + me.id + " .notification-box").hide("fast");
                })
            }
            else 
            {
                $("#" + me.id + " .notification-box").hide("fast");
            }
                
        }, 2000)
    }
    ,
    setEventHandlerObject: function(file, className)
    {
        var me = this;
        
        me.contentEventHandler = function(win, id, event, param)
        {

            if(param != null)
                param.event = event;    
            if(win.windowHandlerObject == null)
            {
                $.getScript(file, function (){

                    win.windowHandlerObject = eval("new " + className + "(me.application)");
                    //win.windowHandlerObject.appConfig = appConfig;
                    //win.windowHandlerObject.run(win, id, event)
                    //alert(event)
                    if(event != null && event in win.windowHandlerObject)
                        eval("win.windowHandlerObject." + event + "(win, id, param)");
                })
            }
            else
            {
                //win.windowHandlerObject.appConfig = appConfig;    
                //me.windowHandlerObject.run(win, id, event)
     
                if(event != null && event in win.windowHandlerObject)
                    eval("win.windowHandlerObject." + event + "(win, id, param)");
            }
        }
    }
    ,
    reloadWindow: function()
    {
        let me = this;
        me.winbox.close();
        me.show(me.__CONTENT)
        
    }

})