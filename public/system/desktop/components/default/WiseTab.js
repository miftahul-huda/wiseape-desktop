var WiseTab = Class(WiseElement, {
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
        this.linkid = json.linkid;
        this.active = json.active;

        if(this.type == null)
            this.type = "text";
        this.placeholder = json.placeholder;
        if(this.placeholder == null)
            this.placeholder = "";

        
        
        WiseTab.$superp.init.call(this, json, "WiseTab");
    }
    ,
    createDom: function()
    {
        let me = this;
        let active = this.active;
        if(active == null)
            active = "";
        else 
        {
            if(active == "true")
                active = "data-tabby-default"
        }

        /*let html = "<li class='wisetab-" + me.id + " nav-item'>" + 
        "\t<a class=\"nav-link " + active + "\" data-toggle=\"pill\" href=\"#" + this.linkid + "\" role=\"tab\" aria-controls=\"" + this.link + "\" aria-selected=\"true\">" + me.label + "</a>" +
        "</li>";*/

        let html = "<li><a " + active + " class='wise-tab-link' href=\"#" + this.linkid + "\">" + me.label + "</a></li>";

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
    ,
    activate: function()
    {
        $(".wisetab-" + this.id).removeClass("active");
        $(".wisetab-" + this.id).attr("aria-selected", "false");

        this.dom.addClass("active");
        this.dom.attr("aria-selected", "true");

    }

})