var WiseTextArea = Class(WiseElement, {
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
        this.rows = json.rows;
        this.cols = json.cols;
        if(this.type == null)   
            this.type = "text";
        this.placeholder = json.placeholder;

        if(this.placeholder == null)
            this.placeholder = "";

        WiseTextArea.$superp.init.call(this, json, "WiseTextArea");
    }
    ,
    createDom: function()
    {
        let me = this;
        let html = "<div class='form-group element-container'>" +
                    "<label for='" + this.id + "'>" + this.label + "</label>" +
                    "<textarea class='form-control' rows='" + this.rows + "' cols='" + this.cols + "' id='" + this.id + "' placeholder=\"" + this.placeholder + "\"></textarea>" +
                    "</div>"
        let dom = $(html)[0]

        if(me.elementEventHandler != null)
        {
            $(dom).off("keypress");
            $(dom).on("keypress", function(){
                me.elementEventHandler(me.id, "onKeyPress")
            })
    
            $(dom).off("keydown");
            $(dom).on("keydown", function(){
                me.elementEventHandler(me.id, "onKeyDown")
            })
    
            $(dom).off("keyup");
            $(dom).on("keyup", function(){
                //me._value = $(this).val();
                me.elementEventHandler(me.id, "onKeyUp")
            })
        }


        me.dom = dom;
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