var WiseTreeView = Class(WiseElement, {
    init: function(json) {
        this.onclick = json.onclick;
        this.icon = json.icon;
        this.text = json.text;
        this.label = json.label;
        this.type = json.type;
        this.disabled = json.disabled;
        this.readOnly = json.readOnly;
        this.rows = json.rows;
        this.cols = json.cols;
        this.height = json.height;
        this.width = json.width;

        if(this.type == null)   
            this.type = "text";
        this.placeholder = json.placeholder;

        if(this.placeholder == null)
            this.placeholder = "";

        this.onNodeSelected = json.onNodeSelected;
            
        WiseTreeView.$superp.init.call(this, json, "WiseTreeView");
    }
    ,
    createDom: function()
    {
        let me = this;
        let html = "<div class='element-container' style='height:" + this.height + ";width:" + this.width + "'>" +
                    "<div>"+
                    "" + this.label +
                    "</div>" +
                    "<div class='wise-treeview' id='" + this.id + "' style='" + this.style + "'></div>" +
                    "</div>"
        let dom = $(html)[0]

        this.dom = dom;
        return dom;
    }
    ,
    value: function(val=null)
    {
        let elm = $("#" + this.id)[0];
        if(val == null)
        {
            return $(elm).Editor("getHTML");  
        }
        else
        {
            let me = this;
            $(elm).treeview({ 
                data: val,
                levels: 5,
                onNodeSelected: function(event, data) {
                    if(me.elementEventHandler != null)
                        me.elementEventHandler(me.id, me.onNodeSelected, data)
                }
            });

        }
    }
    ,
    selectNodeIndex: function(idx)
    {
        let elm = $("#" + this.id)[0];
        $(elm).treeview("selectNode", [ idx ]);
    }

})