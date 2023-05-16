var Desktop = Class({

    constructor: function()
    {
        this.windows = []
        this.uiProcessor = null
    }
    ,
    start: function(config)
    {
        let theme = config.desktop.theme;
        // dynamically add bootstrap library
        let href = "/system/theme/" + theme +  "/style.css"
        var stylesheet = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: href
        });
        stylesheet.appendTo("head");

        var me = this;
        this.loadUILibraries(me,  config, function(){
            me.loadDesktop();
        })
        

    }
    ,
    loadUILibraries: function(me, config, callback)
    {
        $.getScript(config.desktop.ui_processor[0], function (){
            let o = null;
            eval("o = " + config.desktop.ui_processor[1] + ";")
            eval("me.uiProcessor = new " + config.desktop.ui_processor[1] + "();")
            o.init(callback)
            
        })
    }
    ,
    initRipple: function()
    {
        try {
            $('.desktop').ripples({
                resolution: 128,
                dropRadius: 60, //px
                perturbance: 0.004,
                interactive: true
            });
        }
        catch (e) {
            $('.error').show().text(e);
        }

        var $el = $('.desktop');
        var x = Math.random() * $el.outerWidth();
        var y = Math.random() * $el.outerHeight();
        var dropRadius = 60;
        var strength = 0.1; // 0.04 + Math.random() * 0.04;

        /*
        $el.ripples('drop', x, y, dropRadius, strength);
        console.log("drop")


            // Automatic drops
        setInterval(function() {
            var $el = $('.desktop');
            var x = Math.random() * $el.outerWidth();
            var y = Math.random() * $el.outerHeight();
            var dropRadius = 60;
            var strength = 0.1; // 0.04 + Math.random() * 0.04;

            $el.ripples('drop', x, y, dropRadius, strength);
            console.log("drop")
        }, 10000);
        */
            
    }
    ,
    loadDesktop: function()
    {
        
        let div = "<div id='mydesktop' class='desktop'><div class='desktop-taskbar'></div><div class='desktop-content'></div></div><div class='desktop-menu-container'></div>"
        //let div = "<div class='desktop' style='background-image: url(/images/ocean.jpg)'></div>"
        $(document.body).html(div);
        $(".desktop-menu-container").hide()
        GLOBAL.desktopDom =  $(".desktop-content")[0]
        this.loadTaskbar();

        //this.initRipple();
        
    }
    ,
    loadTaskbar: function()
    {
        let me = this;
        let divMenu = "<div class='taskbar-item taskbar-start-menu'></div>"
        $(".desktop-taskbar").append(divMenu);

        me.menuShown = false;
        $(".taskbar-start-menu").on("click", function(){

            if(me.menuShown == false)
            {
                $(".taskbar-start-menu").css("opacity", 0.5)
                me.getAllMenu().then((response)=>{
                    $(".taskbar-start-menu").css("opacity", 1)
                    me.menus = response.payload.rows;
                    me.loadMenu(me);
                    $(".desktop-menu-container").show("fast", "swing")
                    me.menuShown = true;
                })
                
            }
            else
            {
                $(".desktop-menu-container").hide("fast", "swing")
                me.menuShown = false;
            }
        });
    }
    ,
    createWindow:function(title, icon, options)
    {
        let me = this;

        if(options == null)
            options = {};
        let viewPort = {}
        viewPort.top = 0;
        viewPort.right = 0;
        viewPort.left = $(".desktop-taskbar").width();
        viewPort.bottom = 0;
        viewPort.width = $(".desktop-content").width();
        viewPort.height = $(".desktop-content").height();

        options.viewPort = viewPort;

        let newWin = me.uiProcessor.createWindow(title, icon, function handleWindow(evt, window){
            me.handleWindowNext(me, evt, window);
        }, options)
    
        //GLOBAL.desktopDom.append(newWin.dom)
        me.onHeaderClick(me, newWin)
        me.windows.push(newWin)

        return newWin;
    }
    ,
    getAllMenu:function(me)
    {
        let url=  "/menu";
        let promise  =  new Promise((resolve, reject)=>{
            $.get(url, function(response){
                resolve(response);
            })
        })
        return promise;   
    }
    ,
    loadMenu: function(me, parentId=0)
    {
        this.parentId = parentId;
        $(".desktop-menu-container").html("")
        let url = "/menu/parent/" + parentId;
        $(".desktop-menu-container").hide();
        $.get(url, function(response){
            let menus = response.payload.rows;
            menus.map((item)=>{
                let menuItem = me.getMenuItem(item)
                $(".desktop-menu-container").append(menuItem)

            })
            $(".desktop-menu-container").show("fast");
            me.menuShown = true;
            if(parentId != 0)
            {
                let backMenuItem  = me.getBackMenuItem();
                $(".desktop-menu-container").append(backMenuItem)
            }

            $("div[menu-item-id]").on("click", function(){
                let id = $(this).attr("menu-item-id")
                let mm = me.getMenuById(me, id);
                if(mm != null)
                {
                    if(mm.menuType == "GROUP")
                        me.loadMenu(me, id)
                    else
                    {
                        me.loadApplication(me, mm)
                        setTimeout(function(){
                            $(".desktop-menu-container").hide();
                            me.menuShown = false;

                        }, 100)
                        
                    }
                }
                else
                {
                    mm  = me.getMenuById(me, me.parentId);
                    if(mm != null)
                    {
                        me.loadMenu(me, mm.parentMenuId)
                    }
                }
                
            })
        });
    }
    ,
    getMenuById:function(me, id)
    {
        let menu = null;
        me.menus.map((item)=>{
            if(item.id ==  id)
                menu = item;
        })

        return menu;
    }
    ,
    getMenuItem: function(item)
    {
        let html = "<div class='desktop-menu-group'></div>"
        if(item.menuType != "GROUP")
        {
            let style = "background-image: url(" + item.icon + ");";
            html = "<div class='desktop-menu-item' style='" + style + "'></div>"
        }
        html = "<div menu-item-id='" + item.id + "' class='desktop-menu-item-container'>" + html + "<div class='desktop-menu-text'>" + item.title + "</div></div>"
        return $(html)[0];
    }

    ,
    getBackMenuItem: function()
    {
        let style = "background-image: url(/images/back-arrow.png);";
        let html = "<div class='desktop-menu-item' style='" + style + "'></div>"
        
        html = "<div menu-item-id='-1' class='desktop-menu-item-container'>" + html + "<div class='desktop-menu-text'>Back</div></div>"
        return $(html)[0];
    }
    ,
    loadApplication: function(me, menu)
    {
        let appID = menu.appID;
        let appCommand = menu.appCommand;
        let url = "/application/get-by-appid/" + appID;
        $.get(url, function(app){

            let appConfig = app.payload.appConfig;
            appConfig = JSON.parse(appConfig)
            let includes = app.payload.appInclude;
            includes = includes.split(",");

            for(var i = 0; i < includes.length; i++)
            {
                includes[i] = app.payload.appRootPath + "/" + includes[i]; 
            }

            me.includeApplicationFiles(me, includes, 0, function(){
                let newApp = null;
                eval("newApp = new " + app.payload.appEndPoint + "('" + app.payload.appTitle + "', '" + app.payload.appRootPath + "/" + app.payload.appIcon + "', me)" )
                newApp.appRootPath = app.payload.appRootPath;
                newApp.run(menu.appCommand, appConfig);
            })
        })
    }
    ,
    includeApplicationFiles:function(me, files, idx = 0, callback)
    {
        $.getScript(files[idx], function(){
            if(idx < files.length  - 1)
                me.includeApplicationFiles(me, files, idx++)
            else
            {
                if(callback != null)
                    callback()
            }
        })
    }
    ,
    handleWindowNext: function(me, event, window)
    {
        if(event == "onWindowClosed")
        {
            me.removeWindowById(me, window.id)
        }
        if(event == "onWindowMinimized")
        {
            me.onWindowMinimized(me, window)
        }
        if(event == "onHeaderClick")
        {
            me.onHeaderClick(me, window)
        }
    }
    ,
    removeWindowById: function(me, id)
    {
        me.windows.splice(me.windows.findIndex(item => item.id === id), 1)
    }
    ,
    getWindowById: function(me, id)
    {
        let idx =  me.windows.findIndex(item => item.id === id);
        if(idx > -1)
            return me.windows[idx];
        else 
            return null;
    }
    ,
    onWindowMinimized: function(me, window)
    {
        let taskbarid = "taskbarItem_" + window.id
        me.addTaskbarItem( taskbarid, window.icon, function(){
            let ww = me.getWindowById( me, window.id)

            ww.unhide()
            me.onHeaderClick(me, window)
            me.removeTaskbarItem(taskbarid)
        })
    }
    ,
    onHeaderClick: function(me, window)
    {
        let i = 1;
        let highestZindex = me.findTheHighestZIndex(me);
        if(highestZindex == -1)
            highestZindex = 1;
        window.setZIndex(highestZindex + 1)
    }
    ,
    addTaskbarItem: function(id, icon, onClick)
    {
        let divMenu = "<div id='" + id + "' class='taskbar-item' style='background-image: url(" + icon + ");'></div>"
        $(".desktop-taskbar").append(divMenu);

        $("#"  + id).on('click', function(){

            onClick();
        })
    }
    ,
    removeTaskbarItem: function(id)
    {
        $("#"  + id).remove();
    }

    ,
    findTheHighestZIndex: function(me)
    {
        let mx  = -1;
        me.windows.forEach((item)=>{
            if(item.zIndex > mx)
                mx = item.zIndex;
        })

        return mx;
    }
})