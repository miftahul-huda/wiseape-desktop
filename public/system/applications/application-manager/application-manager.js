var ApplicationManager = Class(Application, {
    run: function(command)
    {
        let win = this.desktop.createWindow(this.title, this.icon);
        win.show("Hello world")
    }
})