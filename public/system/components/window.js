var Window = Class({

    constructor: function(title, icon, eventHandler)
    {
        this.title = title
        this.icon = icon
        this.eventHandler =eventHandler
        this.id = "window_" + Util.makeId(10);
        
        let divIcon = "<div class='wiseape-window-icon' style='background-image: url(" + icon + ")'></div>";
        let divHeaderButtonMin = "<div class='wiseape-window-button wiseape-window-button-min'></div>";
        let divHeaderButtonMax = "<div class='wiseape-window-button wiseape-window-button-max'></div>";
        let divHeaderButtonClose = "<div class='wiseape-window-button wiseape-window-button-close'></div>";
        let divSep = "<div style='width: 0px'></div>";
        let divHeaderButtons = "<div class='wiseape-window-button-container'>" + divHeaderButtonMin + divSep + divHeaderButtonMax + divSep + divHeaderButtonClose + "</div>"
        let divHeader = "<div class='wiseape-window-header'>" + divIcon + "<div class='wiseape-window-title'>" + this.title + "</div>" + divHeaderButtons + "</div>";
        let divWindowContent = "<div class='wiseape-window-content'></div>";

        let divWindow = "<div class='wiseape-window' id='" + this.id + "'>" + divHeader + divWindowContent + "</div>"

        this.dom = divWindow
        this.dom = $(this.dom)[0]
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
    show: function(content)
    {
        var me =  this;

        if( typeof content === 'object')
        {
            let uiProcessor = new UIProcessor();
            content = uiProcessor.createDom(content)
        }

        me._saveSizePosition();
        //$(GLOBAL.desktop).append(this.dom)
        $("#" + this.id + " .wiseape-window-content").append(content)
        
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
        

    }
    ,
    close: function()
    {
        var me = this;
        $(this.dom).fadeOut(function(){
            $("#" + this.id).remove()
            me.eventHandler("onWindowClosed", me)
        });
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

})