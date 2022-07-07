var PortfolioManagement = Class(DefaultApplication, {

    getDefaultApplicationWindowInfo: function()
    {
        let o = [];
        o["list"]  = { jsfile: 'list-strategy.js', className: 'ListStrategyPage', contentFile: 'list-strategy.json', title: "List of Strategy", "icon" : "images/strategy.png",  config: null };
        o["detail"]  = { jsfile: 'detail-strategy.js', className: 'DetailStrategyPage', contentFile: 'detail-strategy.html', config: { width: '50%', height: '70%' }  };
        return o;
    }
    
})