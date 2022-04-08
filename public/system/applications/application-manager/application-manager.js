var ApplicationManager = Class(Application, {
    run: function(command)
    {
        var me = this;
        $.getJSON("/system/applications/application-manager/list-application.json", function(json){
            console.log(json)
            let win = me.desktop.createWindow(me.title, me.icon);
            win.show(json)
        })

    }
})