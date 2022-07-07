var ExportOptionsPage = Class({

    constructor: function() {
        this.extension = null;
    }
    ,
    onWindowClosed: function(win, id)
    {
        win.returnValue = this.extension;
    }
    ,
    btnOkSelectExportOption_onClick: function(win, id)
    {
        this.extension = win.get("exportOptionGroup").value();
        win.close();
    }
    ,
    btnCancelSelectExportOption_onClick: function(win, id)
    {
        this.extension = null;
        win.close();
    }
})