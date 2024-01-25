var TestingApp = Class(DefaultApplication, {
    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'testing.js', className: 'TestingPage', contentFile: 'testing.json', title: "List of Testing", "icon" : "images/icon.png",  config: { width: '70%', height: '90%' }  };

        return o;
    }


})