const { Model, DataTypes } = require('sequelize');

class GroupUserModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            groupID: DataTypes.STRING,
            userID: DataTypes.STRING,
        }, 
        { sequelize, modelName: 'groupusers', tableName: 'groupusers', force: force });
    }
}

module.exports = GroupUserModel;