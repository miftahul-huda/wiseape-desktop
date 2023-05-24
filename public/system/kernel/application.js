var Application = Class({
    constructor: function(title,  icon, desktop)
    {
        this.title = title;
        this.icon = icon;
        this.desktop = desktop;
        this.windowHandlerObject = null;
        this.session = desktop.session;

        console.log("application")
        console.log(this)
    
    }
    
})