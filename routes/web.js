const { config } = require("dotenv");
const CrudRouter = require("./crudrouter");

class WebRouter {

    static getConfig(session)
    {
        let config = {
            user: session.user
        };

        config = JSON.stringify(config)
        return config;
    }

    static getRouter(logic)
    {
        var express = require('express');
        var router = express.Router();
        const path = require('path');
        router.logic = logic;
        let me = this;

        router.get('', (req, res)=>{

            if(req.session.login)
            {
                var dir = __dirname;
                var p = path.resolve( dir, "../public/pages/", "index");
                res.render(p, { config: me.getConfig(req.session) } )
            }
            else
            {
                var dir = __dirname;
                var p = path.resolve( dir, "../public/pages/", "login");
                res.render(p, { config: me.getConfig(req.session) } )
            }

        });

        return router;
    }
}

module.exports = WebRouter;