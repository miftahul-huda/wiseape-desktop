var NodeSimpleNote = Class(DefaultApplication, {

    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-note.js', className: 'ListNotePage', contentFile: 'list-note.json', title: "List of Notes", "icon" : "images/note.png",  config: { width: '90%', height: '90%' }  };
        o["detail"]  = { jsfile: 'detail-note.js', className: 'DetailNotePage', contentFile: 'detail-note.json', config: { width: '50%', height: '70%' }  };
        o["add"]  = { jsfile: 'add-note.js', className: 'AddNotePage', contentFile: 'add-note.json', title: "Add Note", config: { width: '80%', height: '90%' }  };

        return o;
    }
    
})