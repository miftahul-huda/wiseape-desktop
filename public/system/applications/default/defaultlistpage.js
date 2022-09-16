var DefaultListPage = Class({
    loadAndDisplayData: function(win, tableID, url, search=null, sortColumn, sortDirection)
    {
        var me = this;
        win.showProgress();
        let dataFilterOpt = win.get(tableID).getDataFilterOption();
        let offset = dataFilterOpt.displayPerPage * (dataFilterOpt.page - 1);
        let limit = dataFilterOpt.displayPerPage;
        
        if(search != null)
            url = url + "/find/" + encodeURIComponent( search);

        me.displayData(me, win, tableID, url, offset, limit, sortColumn, sortDirection, search,  win.hideProgress );
        win.get(tableID).elementEventHandler = function(id, event, opt) { me.dataTableEventHandler(me, win, tableID, url, id, event, opt) } 
    }
    ,
    displayData: function(me, win, tableID,  url, offset, limit, sortColumn, sortDirection, search=null, callback)
    {
        url = url + "?offset=" + offset + "&limit=" + limit 
        if(sortColumn != null)
        {
            if(sortDirection == null)
                sortDirection= "asc"

            url = url +  "&sort=" + sortColumn + "," + sortDirection
        }

        console.log(url)
        $.get(url, function(response){
            let rows = response.payload.rows;
            rows = me.initRows(rows, offset, limit, sortColumn, sortDirection)
            win.get(tableID).loadData(rows, response.payload.count);
            if(callback != null)
                callback()
        })
    }
    ,
    initRows: function(rows, offset, limit, sortColumn, sortDirection)
    {
        let no = offset + 1;
        rows.map((row)=>{
            row.no = no + ". ";
            no++;
        })

        return rows;
    }
    ,
    dataTableEventHandler: function(me, win, tableID, url, id, event, opt)
    {
        if(event == "onDataFilterChanged")
        {
            console.log(opt)
            let offset = opt.displayPerPage * (opt.page - 1)
            let limit = opt.displayPerPage
            let sortColumn = opt.sort.column;
            let sortDirection = opt.sort.direction;

            
            win.showProgress();
            console.log("Offset : " + offset + ", Limit : " + limit)
            me.displayData(me, win, tableID, url, offset, limit, sortColumn, sortDirection, null, win.hideProgress)
        }
    }
    ,
    export: function(win, id, filename)
    {
        this.application.showExportOptions(function(ext){
            if(ext != null)
            {
                filename = filename  + "." + ext;
                win.get(id).export(filename)
            }
            
        });
    }
    ,
    print: function(win, id)
    {
        win.get(id).print()
    }
})