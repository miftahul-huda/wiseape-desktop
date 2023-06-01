var WiseHtmlEditor = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.icon = json.icon;
        this.text = json.text;
        this.label = json.label;
        this.type = json.type;
        this.disabled = json.disabled;
        this.readOnly = json.readOnly;
        this.rows = json.rows;
        this.cols = json.cols;
        this.height = json.height;
        this.width = json.width;

        if(this.type == null)   
            this.type = "text";
        this.placeholder = json.placeholder;

        if(this.placeholder == null)
            this.placeholder = "";
            
        WiseHtmlEditor.$superp.init.call(this, json, "WiseHtmlEditor");
    }
    ,
    createDom: function()
    {
        let me = this;
        let html = "<div class='form-group'>" +
                    "<label for='" + this.id + "'>" + this.label + "</label>" +
                    "<textarea class='wise-editor' style='display:none;height:" + this.height + ";' id='" + this.id + "' placeholder='" + this.placeholder + "'></textarea>" +
                    "</div>"
        let dom = $(html)[0]

      
        return dom;
    }
    ,
    value: function(val=null)
    {
        let elm = $("#" + this.id)[0];
        if(val == null)
        {
            return $(elm).Editor("getHTML");  
        }
        else
        {
            //$(elm).val(val);
            $(elm).Editor("setHTML", val);
        }
    }

})