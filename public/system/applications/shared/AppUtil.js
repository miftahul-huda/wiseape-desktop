var AppUtil =
{
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
}