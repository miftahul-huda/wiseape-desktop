var Desktop = Class({

    constructor: function()
    {
        this.windows = []
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

        this.loadDesktop();
    }
    ,
    loadDesktop: function()
    {
        
        let div = "<div class='desktop'><div class='desktop-taskbar'></div><div class='desktop-content'></div></div><div class='desktop-menu-container'></div>"
        $(document.body).html(div);
        $(".desktop-menu-container").hide()
        GLOBAL.desktopDom =  $(".desktop-content")[0]
        this.loadTaskbar();
    }
    ,
    loadTaskbar: function()
    {
        let me = this;
        let divMenu = "<div class='taskbar-item taskbar-start-menu'></div>"
        $(".desktop-taskbar").append(divMenu);

        
        

        this.menuShown = false;
        $(".taskbar-start-menu").on("click", function(){
            
            me.getAllMenu().then((response)=>{
                me.menus = response.payload.rows;
                me.loadMenu(me);

                if(this.menuShown == false)
                {
                    $(".desktop-menu-container").show("fast", "swing")
                    this.menuShown = true;
                }
                else
                {
                    $(".desktop-menu-container").hide("fast", "swing")
                    this.menuShown = false;
                }
            })
            
        });
    }
    ,
    createWindow:function(title, icon)
    {
        let me = this;
        let newWin = new Window(title, icon, function handleWindow(evt, window){
                me.handleWindowNext(me, evt, window);
        });
        GLOBAL.desktopDom.append(newWin.dom)
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
        $.get(url, function(response){
            let menus = response.payload.rows;
            menus.map((item)=>{
                let menuItem = me.getMenuItem(item)
                $(".desktop-menu-container").append(menuItem)

            })

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

                        }, 500)
                        
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
        let url = "/application/get-by-appid/" + appID;
        $.get(url, function(app){
            console.log(app)
            let includes = app.payload.appInclude;
            includes = includes.split(",");
            me.includeApplicationFiles(me, includes, 0, function(){
                let newApp = null;
                eval("newApp = new " + app.payload.appEndPoint + "('" + app.payload.appTitle + "', '" + app.payload.appIcon + "', me)" )
                console.log(newApp)
                newApp.run(menu.appCommand);
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
        console.log(me.windows)
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
            console.log(ww)
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