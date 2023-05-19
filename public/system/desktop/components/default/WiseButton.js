var WiseButton = Class(WiseElement, {
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
        //$(div).css("padding", "4px")

        let btn = $("<div class='wise-button-container'>" +
        "<button type=\"button\" class=\"btn btn-primary btn-block\"><i class=\"" + this.icon + "\"></i>" + this.text + "</button>" +
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