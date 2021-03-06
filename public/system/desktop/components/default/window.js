    var Window = Class({

    constructor: function(title, icon, eventHandler, options)
    {
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

       
        if(this.options.left == null)
            this.options.left = 40
        if(this.options.top == null)
            this.options.top = 20
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
    showWindow: function(me, content)
    {
        $(content).append("<div class='loader'></div>")
        me.content = content

        let title = me.title;
        if(me.icon != null)
        {
            title = "<div style='display: inline-flex;'><div style='width:30px;height:30px;background: url(" + me.icon + ") no-repeat; background-size: auto 70%;background-position: center'></div><div class='window-title'>" + title + "</div></div>"
        }

        let viewPort = me.options.viewPort;
        me.winbox = new WinBox({
            id: me.id,
            title: title,
            class: "modern",
            html: content,
            root: $(".desktop-content")[0],
            top: viewPort.top,
            left: viewPort.left,
            right: viewPort.right,
            bottom: viewPort.bottom,
            width: me.options.width,
            height: me.options.height,
            x: me.options.left + me.options.viewPort.left,
            y: me.options.top,
            onresize: function(width, height){
                me.height = height
                me.width = width
                console.log(this.min)
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
                if(this.eventHandler != null)
                    this.eventHandler("onWindowClosed", me)

                if(me.contentEventHandler != null)
                    me.contentEventHandler( me, me.id, "onWindowClosed")

                if(me.winClosedCallbacks != null)
                {
                    me.winClosedCallbacks.map( (callback) => {
                        callback(me.returnValue);
                    })
                }
            }
        });

        me.uiProcessor.initContent();
        if(me.contentEventHandler != null)
            me.contentEventHandler( me, me.id, "onLoad")
    }
    ,
    processContent: function(me, content)
    {
        me.content = content

        me._saveSizePosition();
        //$(GLOBAL.desktop).append(this.dom)

        $("#" + this.id + " .wiseape-window-content").append(content)
        me.uiProcessor.initContent();
        
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
            me.contentEventHandler( me, me.id, "onLoad")
    }
    ,
    show: function(content, winClosedCallback)
    {
        var me =  this;

        if(winClosedCallback != null)
        {
            me.winClosedCallbacks.push(winClosedCallback);
            me.modal  = true;
        }

        if( typeof content === 'object')
        {
            let uiProcessor = me.uiProcessor;
            content = me.setIds(me, content)
            me.elements = uiProcessor.createElement(content, me, function(elmId, event){
                elmId = elmId.split("___")
                elmId = elmId[elmId.length - 1]
                me.contentEventHandler(me, elmId, event)
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
                    me.elements = uiProcessor.createElement(content, me, function(elmId, event){
                        elmId = elmId.split("___")
                        elmId = elmId[elmId.length - 1]
                        me.contentEventHandler(me, elmId, event)
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
    close: function()
    {
        var me = this;
        //alert(this.dom)
        me.winbox.close();
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
    showProgress: function()
    {
        $(".loader").show();
    }
    ,
    hideProgress: function()
    {
        $(".loader").hide();
    }

})