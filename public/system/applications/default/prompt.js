var PromptPage = Class(DefaultPage, {

    constructor: function(app) {
        this.content = null;
        this.clickedButton = null;
    }
    ,
    onLoad: function(win, id, param)
    {
        console.log("param")
        console.log(param)
        this.content = param.data.content;
        this.type = param.data.type;
        win.get("content").value(this.content);

        win.get("btnOk").show(false);
        win.get("btnCancel").show(false);
        win.get("btnYes").show(false);
        win.get("btnNo").show(false);

        if(this.type.indexOf("YES") > -1)
        {
            win.get("btnYes").show(true);
        }
        if(this.type.indexOf("OK") > -1)
        {
            win.get("btnOk").show(true);
        }
        if(this.type.indexOf("NO") > -1)
        {
            win.get("btnNo").show(true);
        }
        if(this.type.indexOf("CANCEL") > -1)
        {
            win.get("btnCancel").show(true);
        }
    }
    ,
    onWindowClosed: function(win, id)
    {
        win.returnValue = this.clickedButton;
    }
    ,
    btnOk_Click: function(win, id)
    {
        this.clickedButton = "OK";
        win.close();
    }
    ,
    btnCancel_Click: function(win, id)
    {
        this.clickedButton = "CANCEL";
        win.close();
    }
    ,
    btnYes_Click: function(win, id)
    {
        this.clickedButton = "YES";
        win.close();
    }
    ,
    btnNo_Click: function(win, id)
    {
        this.clickedButton = "NO";
        win.close();
    }
})