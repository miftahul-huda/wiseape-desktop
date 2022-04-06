const { Model, DataTypes } = require('sequelize');

class ApplicationModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            appID: DataTypes.STRING,
            appTitle: DataTypes.STRING,
            appInclude: DataTypes.STRING,
            appEndPoint: DataTypes.STRING,
            appIcon: DataTypes.STRING,
            appInfo: DataTypes.STRING,
            appVersion: DataTypes.STRING,
            company: DataTypes.STRING,
            appWebsite: DataTypes.STRING,
        }, 
        { sequelize, modelName: 'application', tableName: 'application', force: force });
    }
}

module.exports = ApplicationModel;