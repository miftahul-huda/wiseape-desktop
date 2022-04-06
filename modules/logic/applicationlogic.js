const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");
const ApplicationModel = require("../models/applicationmodel")

class ApplicationLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/applicationmodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            appTitle : {
                [Op.like] : "%" + search + "%"
            } 
        }
        return where;
    }

    static getOrder()
    {
        let order = [['appTitle', 'DESC']];
        return order;
    }

    static async findByAppID(appID)
    {
        try {
            let result = await ApplicationModel.findOne({ where: {  appID: appID } } );
            return { success: true, payload: result }
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }
    }
}

module.exports = ApplicationLogic;