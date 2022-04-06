const CrudRouter = require("./crudrouter");

class MenuRouter extends CrudRouter{

    static getRouter(logic)
    {
        let router = super.getRouter(logic);
        let me = this;

        router.get('/parent/:parentId', async (req, res)=>{
            let parentId = req.params.parentId;
            let result = await logic.findByParent(parentId);
            res.send(result);
        });

        return router;
    }
}

module.exports = MenuRouter;