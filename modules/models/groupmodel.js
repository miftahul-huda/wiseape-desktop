const { Model, DataTypes } = require('sequelize');

class GroupModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            groupID: DataTypes.STRING,
            groupName: DataTypes.STRING,
            groupInfo: DataTypes.STRING,
            groupPicture: DataTypes.TEXT,
            groupEmail: DataTypes.STRING
        }, 
        { sequelize, modelName: 'groups', tableName: 'groups', force: force });
    }
}

module.exports = GroupModel;