const { Model, DataTypes } = require('sequelize');

class CacheModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            appID: DataTypes.STRING,
            cacheData: DataTypes.TEXT,
            cacheName: DataTypes.STRING
        }, 
        { sequelize, modelName: 'cache', tableName: 'cache', force: force });
    }
}

module.exports = CacheModel;