var WiseElement = Class({
    constructor:function(id)
    {
        this.id = id
        this.classes = []
        this.style = null
        this.tag = 'div'
        this.onClick = null;
        this.onMouseOut = null;
        this.onMouseDown = null;
        this.onMouseOver = null;
        this.onKeyDown = null;
        this.onKeyPress = null;
        this.onKeyUp = null;
        this.onChange = null;
        this.elementEventHandler = null;
    }
    ,
    init: function(json, tag)
    {
        if(json.id != null)
            this.id = json.id;
        if(json.class != null)
            this.classes.push(json.class)
        if(json.style != null)
           this.style = json.style
        
        if(json.onclick != null)
            this.onClickName = json.onclick

        this.tag = tag;

    }

    ,
    createDom: function(json)
    {
        let div = document.createElement("div")
        div = this.defaultInit(json, div)
        return div;
    }
    ,
    defaultInit: function (dom) {
        if(this.id != null)
            dom.id = this.id;
        if(this.classes != null)
        {
            this.classes.forEach(function (clas){
                $(dom).addClass(clas)
            })
        }
        if(this.style != null)
            $(dom).attr("style", this.style)
        return dom;
    }
})