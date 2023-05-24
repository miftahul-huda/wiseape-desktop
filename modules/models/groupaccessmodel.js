const { Model, DataTypes } = require('sequelize');

class GroupAccessModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            groupID: DataTypes.STRING,
            appID: DataTypes.STRING,
            accessList: DataTypes.STRING
        }, 
        { sequelize, modelName: 'groupaccess', tableName: 'groupaccess', force: force });
    }
}

module.exports = GroupAccessModel;