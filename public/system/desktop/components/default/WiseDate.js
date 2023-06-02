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

        let html = "<div class=\"form-group\" id='wise-calendar-container-"+me.id+"'>" +
        "<label>" + me.label + "</label>" +
        "<div class=\"input-group date\" id=\"" + me.id + "\" data-target-input=\"nearest\">" +
        "<input type=\"text\" class=\"form-control datetimepicker-input " + dtClass + "\" data-target=\"#" + me.id + "\" />" +
        "<div class=\"input-group-append\" data-target=\"#"+ me.id +"\" data-toggle=\"datetimepicker\">" +
        "<div class=\"input-group-text\"><i class=\"fa fa-calendar\"></i></div>" +
        "</div>" +
        "</div>" +
        "</div>";

        if(me.type == "daterange")
        {

            html = `
                <div class="form-group">
                    <label>${label}</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="far fa-calendar-alt"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control float-right wise-daterange" id="${id}">
                    </div>
                </div>
            `
        }
        else if(me.type == "datetimerange")
        [
            html = `
                <div class="form-group">
                    <label>${label}</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <i class="far fa-clock"></i>
                            </span>
                        </div>
                        <input type="text" class="form-control float-right wise-datetimerange" id="${id}">
                    </div>
                </div>
            `
        ]

                    
        let dom = $(html)[0]

        
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
            $("#" + this.id).val(val)
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