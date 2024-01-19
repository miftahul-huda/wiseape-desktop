var WiseTabContent = Class(WiseElement, {
    init: function(json) {
        WiseContent.$superp.init.call(this, json, "WiseContent");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        div = this.defaultInit(div)
        $(div).addClass("wise-tab-content")
        this.dom = div;

        return div;
    }
    ,
    value: function(val)
    {
        if(val == null)
            return $("#" + this.id).html();
        else 
        {
            if(AppUtil.isDomElement(val))
            {
                $("#" + this.id).html(val);
            }
            else 
            {
                if(val.children != null)
                {
                    val.children.map((item)=>{
                        let dom = item.createDomWithChildren();
                        $("#" + this.id).append(dom);
                    })
                }
            }
        }
    }
})