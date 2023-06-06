var WiseDiv = Class(WiseElement, {
    init: function(json) {
        WiseGroup.$superp.init.call(this, json, "div");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        div = this.defaultInit(div)
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