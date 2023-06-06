var WiseWebClient = Class(WiseElement, {
    init: function(json) {

        this.width = json.width;
        this.height = json.height;
        if(this.width == null)
            this.width = "90%";
        if(this.height == null)
            this.height = "90%";

        this.__url = json.url;
        WiseWebClient.$superp.init.call(this, json, "WiseWebClient");
    }
    ,
    createDom: function()
    {
        let div = document.createElement("div")
        let iframe = document.createElement("iframe");
        iframe = this.defaultInit(iframe);

        $(iframe).attr("id",this.id);
        $(iframe).css("width", this.width);
        $(iframe).css("height", this.height);

        if(this.__url != null)
            $(iframe).css("src", this.__url);

        $(div).append(iframe);

        this.dom = div;
        return div;
    }
    ,
    url: function(url)
    {
        if(url == null)
            return $("#" + this.id).attr("src");
        else 
        {
            $("#" + this.id).attr("src", url);
        }
    }
})