var WiseLabel = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.text = json.text;
        WiseLabel.$superp.init.call(this, json, "WiseLabel");
    }
    ,
    createDom: function()
    {
        let me = this;

        let div = document.createElement("div")
        $(div).addClass("wise-label")
        $(div).html(this.text)
        this.dom = div;
        return div;
    }

})