var UIProcessor = Class({
    constructor: function () {

    }
    ,
    createDom: function (json) {
        let root = json.root;
        let children = root.children;
        let parentDom = document.createElement("div")
        let dom = this.createElements(parentDom, children)
        return dom;
    }
    ,
    createElements: function (parentDom, elements)
    {
        var me = this;
        elements.map((el)=>{
            let elm = me.createElement(el)
            if(el.children != null && el.children.length > 0)
                elm = me.createElements(elm, el.children)

            $(parentDom).append(elm);
        })
        return parentDom;
    }
    ,
    createElement: function(json)
    {
        let dom = null;
        switch (json.element)
        {
            case "div":
                dom = this.createDiv(json)
                break;
            case "WiseMenuButton":
                dom = this.createWiseMenuButton(json)
                break;
            case "WiseMenuVerticalSeparator":
                dom = this.createWiseMenuVerticalSeparator(json)
                break;
            default:
                dom = this.createDiv(json)
                break;
        }
        return dom;
    }
    ,
    defaultInit: function (json, dom) {
        if(json.id != null)
            dom.id = json.id;
        if(json.class != null)
            $(dom).addClass( json.class)
        if(json.style != null)
            $(dom).attr("style", json.style)
        return dom;
    }
    ,
    createDiv: function(json)
    {
        let div = document.createElement("div")
        div = this.defaultInit(json, div)
        return div;
    }
    ,
    createWiseMenuButton: function(json)
    {
        let div = document.createElement("div")
        $(div).addClass("wise-menu-button")
        div = this.defaultInit(json, div)
        $(div).css("background-image", "url(/system/applications/" + json.icon + ")")
        //$(div).attr("title", json.text)

        let divInfo = document.createElement("div")
        $(divInfo).addClass("wise-menu-button-info")
        $(divInfo).html(json.text)

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

        return div;
    }
    ,
    createWiseMenuVerticalSeparator: function(json)
    {
        let div = document.createElement("div")
        $(div).addClass("wise-menu-verical-separator")
        div = this.defaultInit(json, div)
        return div;
    }


})