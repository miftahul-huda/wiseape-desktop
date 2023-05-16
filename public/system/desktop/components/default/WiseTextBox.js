var WiseTextBox = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.icon = json.icon;
        this.text = json.text;
        this.label = json.label;
        this.type = json.type;
        this.disabled = json.disabled;
        this.readOnly = json.readOnly;
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
                    "<input type='" + this.type + "' class='form-control' id='" + this.id + "' placeholder='" + this.placeholder + "'>" +
                    "</div>"
                    
        if(this.icon != null)
        {
            html = "<div class='form-group'>" +
            "<label for='" + this.id + "'>" + this.label + "</label>" +
            "<div class='input-group'>" +
            "<div class='input-group-prepend'><div class='input-group-text'><i class='fas fa-envelope'></i></div>" +
            "<input type='" + this.type + "' class='form-control' id='" + this.id + "' placeholder='" + this.placeholder + "'>" +
            "</div>" + 
            "</div>"
            
        }

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