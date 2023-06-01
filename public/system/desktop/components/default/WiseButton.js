var WiseButton = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.icon = json.icon;
        this.text = json.text;
        WiseButton.$superp.init.call(this, json, "WiseButton");
    }
    ,
    createDom: function()
    {
        let me = this;

        let div = document.createElement("div")
        //$(div).css("padding", "4px")

        let visibleCss = "";

        if(me.visible == false)
        {
            visibleCss = "style='display: none'";
        }

        let btn = $("<div " + visibleCss + " class='wise-button-container element-container'>" +
        "<button id='" + this.id + "' type=\"button\" class=\"btn btn-primary btn-block\"><div class=\"btn-icon " + this.icon + "\"></div><div class='btn-text'>" + this.text + "</div></button>" +
        "</div>");

        $(btn).on("click", function()
        {
            if(me.elementEventHandler != null)
                me.elementEventHandler(me.id, me.onclick)
        })

        //$(div).append(btn)
        return btn;
    }

})