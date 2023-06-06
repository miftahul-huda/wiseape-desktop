var WiseGroup = Class(WiseElement, {

    init: function(json) {
        WiseGroup.$superp.init.call(this, json, "WiseGroup");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        $(div).addClass("wise-group")
        $(div).addClass("element-container")
        div = this.defaultInit(div)
        this.dom = div;
        return div;
    }

})