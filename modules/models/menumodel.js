const { Model, DataTypes } = require('sequelize');

class MenuModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            icon: DataTypes.STRING,
            menuType: DataTypes.STRING,
            parentMenuId: DataTypes.INTEGER,
            appID: DataTypes.STRING,
            appCommand: DataTypes.STRING
        }, 
        { sequelize, modelName: 'menu', tableName: 'menu', force: force });
    }
}

module.exports = MenuModel;