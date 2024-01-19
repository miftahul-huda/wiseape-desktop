var WiseElement = Class({
    constructor:function(id)
    {
        this.id = id
        this.label = null
        this.attribute = null
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
        this.visible = true;
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

        if(json.data != null)
            this.data = json.data;

        if(json.label != null)
            this.label = json.label;

        if(json.attribute != null)
            this.attribute = json.attribute;

        this.tag = tag;

    }

    ,
    createDom: function(json)
    {
        let div = document.createElement("div")
        $(div).addClass("input-div");
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

        if(this.attribute != null)
        {
            let attrs = this.attribute;
            attrs = attrs.split(" ")
            attrs.map((attr)=>{
                let ats = attr.split("=")
                let attrname = "";
                let attrvalue = "";
                if(ats.length > 0)
                    attrname = ats[0]

                if(ats.length > 1)
                    attrvalue = ats[1].replace(/'/gi,"");

                if(ats.length > 0)
                    $(dom).attr(attrname, attrvalue)
            })
        }
        return dom;
    }
    ,
    show: function(value)
    {
        if(value == null)
            value = true;

        if(value)
            $("#" + this.id + "").parent(".element-container").css("display", "");
        else 
            $("#" + this.id + "").parent(".element-container").css("display", "none");
    }
    ,
    hide: function()
    {
       this.show(false)
    }
    ,
    createDomWithChildren: function(root)
    {
        let me = this;
        if(root == null)
            root = this;

        let dom = root.createDom();
        
        if(root.children != null && root.children.length > 0)
        {
            root.children.map((child)=>{
                let childDom = me.createDomWithChildren(child);
                $(dom).append(childDom);
            })
        }

        return dom;
    }
    ,
    addElement: function( elm)
    {
        if(this.id != null)
        {
            let id = this.id.split("___");
            id = id[id.length - 1]
    

            let content = {};
            content.root = elm;
            content = this.window.setIds(this.window, content);
            elm = content.root;

            this.window.addElement(id, elm);

            if(elm.children != null)
            {
                elm.children.map((item)=>{
                    let dom = item.createDomWithChildren();
                    $("#" + this.id).append(dom);
                })
            }
            this.window.initContent();
        }

    }
    ,
    css: function(attr, value)
    {
        $(this.dom).css(attr, value);
    }

})