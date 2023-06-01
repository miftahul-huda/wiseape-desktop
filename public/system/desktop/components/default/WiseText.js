var WiseText = Class(WiseElement, {
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
        if(this.type == null)
            this.type = "text";
        this.placeholder = json.placeholder;
        if(this.placeholder == null)
            this.placeholder = "";
        WiseTextBox.$superp.init.call(this, json, "WiseTextBox");
    }
    ,
    createDom: function()
    {
        let me = this;
        let html = "<div class='form-group'>" +
                    "<label for='" + this.id + "'>" + this.label + "</label>" +
                    "<div type='" + this.type + "' class='wise-text' id='" + this.id + "'></div>" +
                    "</div>";

        if(this.noLabel)
        {
            html = "<div class='form-group'>" +
                    "<div type='" + this.type + "' class='wise-text' id='" + this.id + "'></div>" +
                    "</div>";
        }
                    


        let dom = $(html)[0]
        return dom;
    }
    ,
    value: function(val=null)
    {
        if(val == null)
        {
            return $("#" + this.id).html()

        }
        else
        {
            $("#" + this.id).html(val)
        }
    }

})