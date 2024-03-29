var WiseDate = Class(WiseElement, {
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
        if(this.type == null)
            this.type = "date";
        this.placeholder = json.placeholder;
        if(this.placeholder == null)
            this.placeholder = "";
        WiseDate.$superp.init.call(this, json, "WiseDate");
    }
    ,
    createDom: function()
    {
        let me = this;
        let id = me.id;
        let label = me.label;
        let dtClass = "wise-date"
        if(me.type == "datetime")
            dtClass = "wise-datetime";
        else if(me.type == "daterange")
            dtClass = "wise-daterange";
        else if(me.type == "datetimerange")
            dtClass = "wise-datetimerange";

        let html = "<div class=\"form-group element-container\" id='wise-calendar-container-"+me.id+"'>" +
        "<label>" + me.label + "</label>" +
        "<div class=\"input-group date\" data-target-input=\"nearest\">" +
        "<input id=\"" + me.id + "\" type=\"text\" class=\"form-control datetimepicker-input " + dtClass + "\" placeholder=\"" + me.placeholder + "\"/>" +
        "<div class=\"input-group-append wise-date-button\" data-target=\"#"+ me.id +"\">" +
        "<div class=\"input-group-text \"><i class=\"fa fa-calendar\"></i></div>" +
        "</div>" +
        "</div>" +
        "</div>";

                    
        let dom = $(html)[0]

        /*
        
        $(dom).find("input").off("keypress");
        $(dom).find("input").on("keypress", function(event){
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, me.onkeypress, event);
        })

        $(dom).find("input").off("keydown");
        $(dom).find("input").on("keydown", function(event){
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, me.onkeydown, event)
        })

        $(dom).find("input").off("keyup");
        $(dom).find("input").on("keyup", function(event){
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, me.onkeyup, event)
        })
        */
        this.dom = dom;
        return dom;
    }
    ,
    value: function(val=null)
    {
        
        if(val == null)
        {
            let dt = $("#" + this.id).val();
            let format = "YYYY-MM-DD";
            if(this.type.indexOf("time") > -1)
            {
                format = "YYYY-MM-DD hh:mm:ss"
            }

            dt = moment(dt).format(format);

            //console.log("ID : " + this.id);
            //console.log(dt);

            return dt;
        }
        else
        {
            $("#" + this.id).val(val);

            let format = "DD MMM YYYY";
            if(this.type.indexOf("time") > -1)
            {
                format = "DD MMM YYYY hh:mm:ss"
            }

            let displayDate = moment(val).format(format);
            $("#" + this.id).parent().find(".datetimepicker-input").val(displayDate)
        }
        
    }
    ,
    focus: function()
    {
        let elm = $("#" + this.id);
        $(elm).focus();
    }
    ,
    show: function(value)
    {
        if(value)
            $("wise-calendar-container-" + this.id + "").css("display", "");
        else 
            $("wise-calendar-container-" + this.id + "").css("display", "none");
    }

})