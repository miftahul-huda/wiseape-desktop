const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");
const ApplicationModel = require('../models/applicationmodel');
const MenuModel = require('../models/menumodel');

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

    static async findByMenuType(menuType)
    {
        try {
            let result = await this.findAll({ menuType: menuType } );
            return result
        }
        catch(error)
        {
            throw { success: false, message: '', error: error };
        }
    }

    static getDefaultWhere()
    {
        return {
            parentMenuId: { 
                [Op.ne] : -1
            }
        }
    }

    static getModelIncludes()
    {
        return [{ model: ApplicationModel, as: "application" }, { model: MenuModel, as: "parent" }]
    }
}

module.exports = MenuLogic;