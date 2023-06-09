var WiseTextBox = Class(WiseElement, {
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
        this.cache = json.cache;
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
        let html = "<div class='form-group' id='wise-textbox-container-" + this.id + "'>" +
                    "<label for='" + this.id + "'>" + this.label + "</label>" +
                    "<input type='" + this.type + "' class='form-control' id='" + this.id + "' placeholder='" + this.placeholder + "'>" +
                    "</div>"
                    
        if(this.icon != null)
        {
            html = "<div class='form-group'  id='wise-textbox-container-" + this.id + "'>" +
            "<label for='" + this.id + "'>" + this.label + "</label>" +
            "<div class='input-group'>" +
            "<div class='input-group-prepend'><div class='input-group-text'><i class='fas fa-envelope'></i></div>" +
            "<input type='" + this.type + "' class='form-control' id='" + this.id + "' placeholder='" + this.placeholder + "'>" +
            "</div>" + 
            "</div>"
            
        }

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

        let cacheTag = this.cache;

        if(cacheTag != null)
        {
            $( dom ).find('input')
            // don't navigate away from the field on tab when selecting an item
            .on( "keydown", function( event ) {
                if ( event.keyCode === $.ui.keyCode.TAB &&
                    $( this ).autocomplete( "instance" ).menu.active ) {
                    event.preventDefault();
                }
            })
            .autocomplete({
                minLength: 0,
                source: function( request, response ) {
                    // delegate back to autocomplete, but extract the last term
                    response( $.ui.autocomplete.filter(
                    AppUtil.getCaches(cacheTag), AppUtil.extractLast( request.term ) ) );
                },
                focus: function() {
                    // prevent value inserted on focus
                    return false;
                },
                select: function( event, ui ) {
                    var terms = AppUtil.splitCache( this.value );
                    // remove the current input
                    terms.pop();
                    // add the selected item
                    terms.push( ui.item.value );
                    // add placeholder to get the comma-and-space at the end
                    //terms.push( "" );
                    if(terms.length > 1)
                        this.value = terms.join(", "); //terms.join( ", " );
                    else
                        this.value = terms.join("");
                    
                    return false;
                }
            });

            $(dom).find("input").on("blur", function(){
                AppUtil.saveCache(cacheTag, me.value());
            })
        }

        
        me.dom = dom;
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
            $("#wise-textbox-container-" + this.id + "").css("display", "");
        else 
            $("#wise-textbox-container-" + this.id + "").css("display", "none");
    }

})