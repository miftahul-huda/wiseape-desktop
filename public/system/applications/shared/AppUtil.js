var AppUtil =
{
    scripts: null,
    data2Options: function(items, valueCol, labelCol, placeholder)
    {
        let options = [];
        if(placeholder != null)
        {
            let opt = { value: -1, label: " ----- " + placeholder + " ----- " };
            options.push(opt);
        }
        items.map((item)=>{
            let opt = { value: item[valueCol], label: item[labelCol] };
            options.push(opt);
        })

        return options;
    }
    ,
    modifyHeader: function(header)
    {
        for (var prop in header) {
            if (Object.prototype.hasOwnProperty.call(header, prop)) {
                // do stuff
                if(typeof header[prop] == 'object')
                {
                    header[prop] = JSON.stringify(header[prop]);
                }
            }
        }

        return header;
    }
    ,
    get: function(url, callback, headers)
    {
        headers = AppUtil.modifyHeader(headers);

        $.ajax({
            url: url,
            method: 'GET',
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    post: function(url, param, callback, headers)
    {
        headers = AppUtil.modifyHeader(headers);

        param = JSON.stringify(param);
        $.ajax({
            url: url,
            method: 'POST',
            data: param,
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result, textStatus, jqXHR) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    put: function(url, param, callback, headers)
    {
        headers = AppUtil.modifyHeader(headers);

        param = JSON.stringify(param);
        $.ajax({    
            url: url,
            method: 'PUT',
            data: param,
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    delete: function(url, callback, headers)
    {
        headers = AppUtil.modifyHeader(headers);

        console.log("headers")
        console.log(headers)

        $.ajax({
            url: url,
            method: 'DELETE',
            contentType: 'application/json',
            headers: headers
            ,
            success: function(result) {
                // handle success
                if(callback != null)
                    callback(result)
            },
            fail: function(request,msg,error) {
                // handle failure
                if(callback != null)
                    callback({ success: false, error: error, message: msg })
            }
        });
    }
    ,
    getScript: function(url, callback)
    {
        if(AppUtil.scripts == null)
            AppUtil.scripts = [];
        
        if(AppUtil.scripts.indexOf(url) == -1)
        {
            AppUtil.scripts.push(url);
            $.getScript(url, callback);

        }
        else
        {
            if(callback != null)
                callback();
        }
    }

}