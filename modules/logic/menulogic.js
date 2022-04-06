const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class MenuLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/menumodel");
        return model;
    }

    static getPk(){
        return "id";
    }

    static getWhere(search)
    {
        let where = {
            title : {
                [Op.like] : "%" + search + "%"
            } 
        }
        return where;
    }

    static getOrder()
    {
        let order = [['title', 'DESC']];
        return order;
    }

    static async findByParent(parentId)
    {
        try {
            let result = await this.findAll({ parentMenuId:parentId } );
            return result
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }
    }
}

module.exports = MenuLogic;