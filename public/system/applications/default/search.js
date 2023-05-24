var SearchPage = Class({

    constructor: function() {
        this.keyword = null;
    }
    ,
    onLoad: function(win)
    {
        win.get("keyword").focus();
    }
    ,
    onWindowClosed: function(win, id)
    {
        win.returnValue = this.keyword;
    }
    ,
    btnOkSearch_Click: function(win, id)
    {
        this.keyword = win.get("keyword").value();
        win.close();
    }
    ,
    btnCancelSearch_Click: function(win, id)
    {
        this.keyword = null;
        win.close();
    }
    ,
    keyword_onKeyUp: function(win, id, param)
    {

        if(param.keyCode == 13)
        {
            this.keyword = win.get("keyword").value();
            win.close();
        }
        else if(param.keyCode == 27)
        {
            this.keyword = null;
            win.close();
        }
    }
})