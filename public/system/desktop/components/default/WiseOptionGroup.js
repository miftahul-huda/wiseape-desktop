var WiseOptionGroup = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.options = json.options;
        WiseOptionGroup.$superp.init.call(this, json, "WiseOptionGroup");
    }
    ,
    createDom: function()
    {
        let me = this;
        let div = document.createElement("div")
        $(div).addClass("form-group clearfix  element-container")

        let counter = 0;
        this.options.map((o)=>{
            let div2 = document.createElement("div")
            $(div2).addClass("icheck-primary");

            let label = document.createElement("label")
            $(label).attr("for",  me.id + "_" + counter)
            $(label).html(o.label + "<br />")
            
            let opt = document.createElement("input")
            $(opt).attr("type", "radio");
            $(opt).attr("name", me.id);
            $(opt).attr("id", me.id + "_" + counter);
            $(opt).attr("value", o.value);

            if(o.selected != null)
                $(opt).attr("checked", "1")
            //$(opt).html(o.label + "<br />");s
            $(div2).append(opt);
            $(div2).append(label);

            $(div2).on("click", function()
            {
                me.selectedValue = o.value;
                if(me.elementEventHandler != null)
                    me.elementEventHandler(me.id, me.onclick)
            })
                
            $(div).append(div2)
            counter++;
        })

        
        this.dom= div;
        return div;
    }
    ,
    value: function(val)
    {
        if(val == null)
        {
            let vv = $('input[name="' + this.id + '"]:checked').val();   
            return vv;
        }
        else 
        {
            $("#" + this.id).val(val);
        }
    }

})