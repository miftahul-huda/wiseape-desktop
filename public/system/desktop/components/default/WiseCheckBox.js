var WiseCheckBox = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.onkeyup = json.onkeyup;
        this.onkeydown = json.onkeydown;
        this.onkeypress = json.onkeypress;
        this.__value = json.value;
        this.icon = json.icon;
        this.text = json.text;
        this.__checked = json.checked;
        if(this.text == null)
            this.text = "";
        this.label = json.label;
        this.type = json.type;
        this.disabled = json.disabled;
        this.readOnly = json.readOnly;
        this.noLabel = json.noLabel;
        this.placeholder = json.placeholder;
        if(this.placeholder == null)
            this.placeholder = "";
        WiseCheckBox.$superp.init.call(this, json, "WiseCheckBox");
    }
    ,
    createDom: function()
    {
        let me = this;
        let html = "<div style='" + this.style + "' class='form-group clearfix wise-checkbox'><div class='icheck-primary'>" +
                    "<input $checked type='checkbox' value='" + this.__value + "' id='" + this.id + "' name='" + this.id + "'><label for='" + this.id + "'>" + this.text + "</label>" +
                    "</div></div>";

        if(this.__checked)
            html = html.replace("$checked", "checked")
        else
            html = html.replace("$checked", "")

        let dom = $(html)[0]
        return dom;
    }
    ,
    value: function(val=null)
    {
        if(val == null)
        {
            return $("#" + this.id).val()
        }
        else
        {
            $("#" + this.id).val(val);
        }
    }
    ,
    checked: function(val=null)
    {
        if(val == null)
        {
            let checked = $("#" + this.id).prop("checked");
            return checked;
        }
        else 
        {
            if(val)
            {
                $("#" + this.id).attr("checked", true);
            }
            else
            {
                $("#" + this.id).removeAttr("checked");
            }
        }
            
    }

})