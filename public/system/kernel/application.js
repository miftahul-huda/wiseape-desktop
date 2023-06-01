var Application = Class({
    constructor: function(title,  icon, desktop)
    {
        this.title = title;
        this.icon = icon;
        this.desktop = desktop;
        this.windowHandlerObject = null;

        if(desktop == null)
            desktop = GLOBAL.desktop;

        this.session = desktop.session;
        GLOBAL.activeApp = this;

        console.log("application")
        console.log(this)
    
    }
    
})