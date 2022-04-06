//const LoggerModel  = require( './modules/models/loggermodel')

const { Sequelize, Model, DataTypes } = require('sequelize');
const process = require('process');
const MenuModel = require("./modules/models/menumodel");
const ApplicationModel = require("./modules/models/applicationmodel");

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBENGINE  
});


class Initialization {
    static async initializeDatabase(){

        let force = false;
        MenuModel.initialize(sequelize, force)
        ApplicationModel.initialize(sequelize, force)
        await sequelize.sync();
    }
}

module.exports = Initialization



