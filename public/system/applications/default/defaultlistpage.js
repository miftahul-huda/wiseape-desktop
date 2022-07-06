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

        me.displayData(win, tableID, url, offset, limit, sortColumn, sortDirection, search,  win.hideProgress );
        win.get(tableID).elementEventHandler = function(id, event, opt) { me.dataTableEventHandler(me, win, tableID, url, id, event, opt) } 
    }
    ,
    displayData: function(win, tableID,  url, offset, limit, sortColumn, sortDirection, search=null, callback)
    {
        console.log(url)
        $.get(url, function(response){
            win.get(tableID).loadData(response.payload.rows, response.payload.count);
            if(callback != null)
                callback()
        })
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

            url = url + "/" + offset + "/" + limit 

            if(sortColumn != null)
            {
                if(sortDirection == null)
                    sortDirection= "asc"

                url = url +  "/" + sortColumn + "/" + sortDirection
            }
            win.showProgress();
            console.log("Offset : " + offset + ", Limit : " + limit)
            me.displayData(win, tableID, url, offset, limit, sortColumn, sortDirection, null, win.hideProgress)
        }
    }
})