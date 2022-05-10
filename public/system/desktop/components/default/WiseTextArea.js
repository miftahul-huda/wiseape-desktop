var WiseTextArea = Class(WiseElement, {
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
        if(this.type == null)   
            this.type = "text";
        this.placeholder = json.placeholder;
        WiseTextArea.$superp.init.call(this, json, "WiseTextArea");
    }
    ,
    createDom: function()
    {
        let me = this;
        let html = "<div class='form-group'>" +
                    "<label for='" + this.id + "'>" + this.label + "</label>" +
                    "<textarea class='form-control' rows='" + this.rows + "' cols='" + this.cols + "' id='" + this.id + "' placeholder='" + this.placeholder + "'></textarea>" +
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
            me.value = $(this).val();
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, "onKeyUp")
        })
        return dom;
    }
    ,
    value: function(val=null)
    {
        if(val == null)
            return this.value;
        else
        {
            $("#" + this.id).val(val)
        }
    }

})