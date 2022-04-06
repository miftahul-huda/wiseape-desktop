let ConfigurationManager = Class({
    load: function(url)
    {
        let promise = new Promise((resolve, reject)=> {
            $.getJSON(url, function(data){
                resolve(data);
            })
        })

        return promise;
        
    }
})