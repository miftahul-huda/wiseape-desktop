var DefaultListPage = Class({
    loadAndDisplayData: function(win, tableID, url, callback)
    {
        var me = this;
        win.showProgress();
        let dataFilterOpt = win.get(tableID).getDataFilterOption();
        let offset = dataFilterOpt.displayPerPage * (dataFilterOpt.page - 1);
        let limit = dataFilterOpt.displayPerPage;
        let sortColumn = null;
        let sortDirection = null;
        
        
        //if(search != null)
        //    url = url + "/find/" + encodeURIComponent( search);

        me.displayData(me, win, tableID, url, offset, limit, sortColumn, sortDirection,  function(data){
            if(callback != null)
                callback(data)
        } );
        win.get(tableID).elementEventHandler = function(id, event, opt) { me.dataTableEventHandler(me, win, tableID, url, id, event, opt) } 

    }
    ,
    displayData: function(me, win, tableID,  url, offset, limit, sortColumn, sortDirection, callback)
    {
        url = url + "?offset=" + offset + "&limit=" + limit 
        if(sortColumn != null)
        {
            if(sortDirection == null)
                sortDirection= "asc"

            url = url +  "&sort=" + sortColumn + "," + sortDirection
        }
        win.showProgress();
        let headers = {
            user: me.application.session.user
        }

        console.log(headers)
        AppUtil.get(url, function(response){
            win.hideProgress();
            let rows = response.payload.rows;
            rows = me.initRows(rows, offset, limit, sortColumn, sortDirection)
            win.get(tableID).loadData(rows, response.payload.count);
            if(callback != null)
                callback(rows)
        }, headers )
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
            let offset = opt.displayPerPage * (opt.page - 1)
            let limit = opt.displayPerPage
            let sortColumn = opt.sort.column;
            let sortDirection = opt.sort.direction;

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