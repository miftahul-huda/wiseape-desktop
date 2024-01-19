var WiseTabGroup = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.onkeyup = json.onkeyup;
        this.onkeydown = json.onkeydown;
        this.onkeypress = json.onkeypress;
        
        this.icon = json.icon;
        this.text = json.text;
        this.label = json.label;
        this.type = json.type;
        this.disabled = json.disabled;
        this.readOnly = json.readOnly;
        this.cache = json.cache;
        if(this.type == null)
            this.type = "text";
        this.placeholder = json.placeholder;
        if(this.placeholder == null)
            this.placeholder = "";
        WiseTabGroup.$superp.init.call(this, json, "WiseTabGroup");
    }
    ,
    createDom: function()
    {
        let me = this;
        /*let header = "<div class=\"card card-primary card-outline card-outline-tabs\"><div class=\"card-header p-0 border-bottom-0\">";

        let html = "<ul id=\"" + this.id + "\" class='wisetabgroup nav nav-tabs'  role=\"tablist\"></ul>";
        */

        let html = "<ul data-tabs></ul>";
        let dom = $(html)[0]
        
        me.dom = dom;
        return dom;
    }
    ,
    show: function(value)
    {
        if(value)
            $("#wise-textbox-container-" + this.id + "").css("display", "");
        else 
            $("#wise-textbox-container-" + this.id + "").css("display", "none");
    }

})