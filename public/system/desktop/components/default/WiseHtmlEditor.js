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
                    "<textarea class='form-control wise-editor' height='" + this.height + "' id='" + this.id + "' placeholder='" + this.placeholder + "'></textarea>" +
                    "</div>"
        let dom = $(html)[0]

        $(dom).on("keypress", function(){
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, "onKeyPress")
        })

        $(dom).on("keydown", function(){
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, "onKeyDown")
        })

        $(dom).on("keyup", function(){
            //me._value = $(this).val();
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, "onKeyUp")
        })
        return dom;
    }
    ,
    value: function(val=null)
    {
        if(val == null)
            return $("#" + this.id).val()
        else
        {
            $("#" + this.id).val(val)
        }
    }

})