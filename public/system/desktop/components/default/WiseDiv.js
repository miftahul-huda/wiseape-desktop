var WiseDiv = Class(WiseElement, {
    init: function(json) {
        WiseGroup.$superp.init.call(this, json, "div");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        div = this.defaultInit(div)
        return div;
    }
})