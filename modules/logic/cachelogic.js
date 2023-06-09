const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class CacheLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/cachemodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            cacheData : {
                [Op.like] : "%" + search + "%"
            } 
        }
        return where;
    }

    static getOrder()
    {
        let order = [['cacheData', 'ASC']];
        return order;
    }
}

module.exports = CacheLogic;