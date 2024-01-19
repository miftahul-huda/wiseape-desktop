var WiseTitle = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.text = json.text;
        WiseTitle.$superp.init.call(this, json, "WiseTitle");
    }
    ,
    createDom: function()
    {
        let me = this;

        let div = document.createElement("div")
        $(div).addClass("wise-title")
        $(div).html("<div style='display: flex;height: 40px'><div style='height: 100%; width: 30%; vertical-align: center; font-size: 16pt' class='wise-title-text'>" + this.text + "</div><div style='width: 70%'><hr/></div></div>")
        this.dom = div;
        return div;
    }

})