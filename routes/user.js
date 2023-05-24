const CrudRouter = require("./crudrouter");

class UserRouter extends CrudRouter{

    static getRouter(logic)
    {
        let router = super.getRouter(logic);
        let me = this;

        router.post('/login', async (req, res)=>{
            let login = req.body;

            logic.login(login.user, login.password).then((result)=>{
                console.log("result.payload")
                console.log(result.payload)
                req.session.user = result.payload;
                req.session.login = true;

                res.send(result);
            }).catch((e)=>{
                res.send(e);
            })
        });

        router.get('/logout', async (req, res)=>{
            let login = req.body;
            req.session.user = null;
            req.session.login = null;
            res.redirect("/")
        });

        return router;
    }
}

module.exports = UserRouter;