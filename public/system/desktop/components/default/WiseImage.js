var WiseImage = Class(WiseElement, {
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
        this.noLabel = json.noLabel;
        this.options = json.options;
        if(this.type == null)
            this.type = "text";
        this.placeholder = json.placeholder;
        if(this.placeholder == null)
            this.placeholder = "";
        WiseImage.$superp.init.call(this, json, "WiseImage");
    }
    ,
    createDom: function()
    {
        let me = this;
    
        let html = "<div class='form-group  element-container'>" +
                    "<image class='wise-image' $src  style='" + this.style + "'  width='" + this.width + "'  height='" + this.height + "' id='" + this.id + "'></div>" +
                    "</div>";
                    
        if(this.source != null)
            html = html.replace("$src","src='" + this.source + "'");
        else 
            html = html.replace("$src", "");

        let dom = $(html)[0]
        this.dom = dom;
        return dom;
    }
    ,
    src: function(val=null)
    {
        if(val == null)
        {
            return $("#" + this.id).attr("src");

        }
        else
        {
            $("#" + this.id).attr("src", val);
        }
    }
    ,
    value: function(val=null)
    {
        if(val == null)
        {
            return $("#" + this.id).attr("src");

        }
        else
        {
            $("#" + this.id).attr("src", val);
        }
    }

})