var AddWorkingExperiencePage =  Class(DefaultListPage, {

    constructor: function(app)
    {
        this.application = app;
    }
    ,
    onLoad: function(win, id, param)
    {
        if(param.data != null)
        {
            win.fill(param.data)
            this.row = param.data.row;
        }
    }
    ,
    btnOk_onClick: function(win, id, param)
    {
        let data = win.getData();
        data.row = this.row;
        win.close(data);
    }
    ,
    btnCancel_onClick: function(win, id, param)
    {
        win.close(null);
    }
});