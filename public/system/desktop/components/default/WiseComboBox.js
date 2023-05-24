var WiseComboBox = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.icon = json.icon;
        this.text = json.text;
        this.label = json.label;
        this.disabled = json.disabled;
        this.readOnly = json.readOnly;
        if(this.type == null)
            this.type = "text";
        this.placeholder = json.placeholder;
        if(this.placeholder == null)
            this.placeholder = "";
        WiseTextBox.$superp.init.call(this, json, "WiseComboBox");
    }
    ,
    createDom: function()
    {
        let me = this;
        let html = "<div class='form-group'>" +
                    "<label for='" + this.id + "'>" + this.label + "</label>" +
                    "<select class='form-control' id='" + this.id + "' placeholder='" + this.placeholder + "'>" +
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
        });

        me.dom = dom;
        return dom;
    }
    ,
    addItems: function(items)
    {
        items.map((item)=>{
            let opt = document.createElement("option");
            $(opt).attr("value", item.value);
            $(opt).html(item.label);
            $("#" + this.id).append(opt);
        })
    }
    ,
    selectedIndex: function(idx)
    {
        let opts = $("#" + this.id).find("option");
        for(var i = 0; i < opts.length; i++)
        {
            let opt = opts[i];
            $(opt).removeAttr("selected");
            if(i == idx)
            {
                $(opt).attr("selected", true);
                break;
            }
        }
    }
    ,
    value: function(val=null)
    {
        if(val == null)
            return $("#" + this.id).val()
        else
        {
            $("#" + this.id).val(val).trigger("change")
        }
    }

})