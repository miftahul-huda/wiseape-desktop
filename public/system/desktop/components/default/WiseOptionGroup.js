var WiseOptionGroup = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.options = json.options;
        this.layout = json.layout;
        this.label = json.label;
        if(this.layout == null)
            this.layout = "vertical";

        if(this.options == null)
            this.options = [];
        WiseOptionGroup.$superp.init.call(this, json, "WiseOptionGroup");
    }
    ,
    createDom: function()
    {
        let me = this;
        let div = document.createElement("div")
        let divLabel = document.createElement("label")
        let divOptions = document.createElement("div")


        $(div).addClass("form-group clearfix  element-container")

        $(divLabel).attr("role", "label" )
        $(divLabel).html(this.label)

        $(divOptions).attr("role", "options")

        //console.log("this.options")
        //console.log(this.options)

        if(this.layout == "horizontal")
            $(divOptions).css("display", "flex");

        divOptions = this.addOptions(divOptions);

        $(div).append(divLabel)
        $(div).append(divOptions)
        
        this.dom= div;
        return div;
    }
    ,
    addOptions: function(div)
    {
        let counter = 0;
        let me = this;
        //console.log("this.options")
        //console.log(this.options)


        this.options.map((o)=>{
            let div2 = document.createElement("div")
            $(div2).addClass("radio icheck-silver");

            let label = document.createElement("label")
            $(label).attr("for",  me.id + "_" + counter)
            let labelText = o.label + "<br />";
            if(this.layout == "horizontal")
                labelText = "<span style='padding-right: 30px'>" + o.label + "</span>"
            $(label).html(labelText)
            
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
            $('input[name="' + this.id + '"][value="' + val + '"]').attr("checked", "true")
            //$("#" + this.id).val(val);
        }
    }
    ,
    addItems: function(items)
    {
        this.options = items;
        //console.log("this.dom")

        let containerDiv = document.createElement("div")
        $(containerDiv).addClass("form-group clearfix")

        let divOptions = $(this.dom).find("div[role=options]")[0]
        //console.log(this.divOptions)

        //$(divOptions).addClass("form-group clearfix")

        this.addOptions(divOptions);
    }

})