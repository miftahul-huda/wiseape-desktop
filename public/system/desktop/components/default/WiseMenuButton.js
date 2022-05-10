var WiseMenuButton = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.icon = json.icon;
        this.text = json.text;
        WiseMenuButton.$superp.init.call(this, json, "WiseMenuButton");
    }
    ,
    createDom: function()
    {
        let me = this;
        let div = document.createElement("div")
        $(div).addClass("wise-menu-button")
        div = this.defaultInit( div)
        $(div).css("background-image", "url(/system/applications/" + this.icon + ")")
        //$(div).attr("title", json.text)

        let divInfo = document.createElement("div")
        $(divInfo).addClass("wise-menu-button-info")
        $(divInfo).html(this.text)

        $(div).append(divInfo)
        $(div).on("mouseover", function()
        {
            $(div).attr("hover", "true")
            setTimeout(function(){
                if($(div).attr("hover") == "true")
                    $(divInfo).show()
            }, 1000)
            
        })

        $(div).on("mouseout", function()
        {
            $(div).attr("hover", "false")
            $(divInfo).hide()
        })


        $(div).on("click", function()
        {
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, "onClick")
        })

        return div;
    }

})