var WiseMenuVerticalSeparator = Class(WiseElement, {

    init: function(json) {
        WiseMenuVerticalSeparator.$superp.init.call(this, json, "WiseMenuVerticalSeparator");
    }
    ,
    createDom: function()
    {
        let parentDiv = document.createElement("div")
        $(parentDiv).css("display", "flex")
        $(parentDiv).css("width", "20px")
        let leftDiv = document.createElement("div")
        $(leftDiv).css("width", "10px")
        let rightDiv = document.createElement("div")
        $(rightDiv).css("width", "10px")

        let div = document.createElement("div")
        $(div).addClass("wise-menu-verical-separator")
        div = this.defaultInit(div)

        $(parentDiv).append(leftDiv)
        $(parentDiv).append(div)
        $(parentDiv).append(rightDiv)

        this.dom = parentDiv;
        return parentDiv;
    }

})