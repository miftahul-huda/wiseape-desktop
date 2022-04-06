const CrudRouter = require("./crudrouter");

class ApplicationRouter extends CrudRouter{

    static getRouter(logic)
    {
        let router = super.getRouter(logic);
        let me = this;

        router.get('/get-by-appid/:appID', async (req, res)=>{
            let appID = req.params.appID;
            let result = await logic.findByAppID(appID);
            res.send(result);
        });

        return router;
    }
}

module.exports = ApplicationRouter;