var NodeSimpleNote = Class(DefaultApplication, {

    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-note.js', className: 'ListNotePage', contentFile: 'list-note.json', title: "List of Notes", "icon" : "images/note.png",  config: null };
        o["detail"]  = { jsfile: 'detail-note.js', className: 'DetailNotePage', contentFile: 'detail-note.json', config: { width: '50%', height: '70%' }  };
        return o;
    }
    
})