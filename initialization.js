//const LoggerModel  = require( './modules/models/loggermodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const process = require('process');
const MenuModel = require("./modules/models/menumodel");
const ApplicationModel = require("./modules/models/applicationmodel");
const UserModel = require("./modules/models/usermodel");
const GroupModel = require("./modules/models/groupmodel");
const GroupUserModel = require("./modules/models/groupusermodel");
const GroupAccessModel = require("./modules/models/groupaccessmodel");


const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBENGINE,
    logging: false
});


class Initialization {
    static async initializeDatabase(){

        let force = false;
        MenuModel.initialize(sequelize, force)
        ApplicationModel.initialize(sequelize, force)
        UserModel.initialize(sequelize, force)
        GroupModel.initialize(sequelize, force)
        GroupUserModel.initialize(sequelize, force)
        GroupAccessModel.initialize(sequelize, force)

        await sequelize.sync();
    }
}

module.exports = Initialization



