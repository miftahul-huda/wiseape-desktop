const { Model, DataTypes } = require('sequelize');

class UserModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            userID: DataTypes.STRING,
            username: DataTypes.STRING,
            userPassword: DataTypes.STRING,
            profilePicture: DataTypes.TEXT,
            email: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            phoneNumber: DataTypes.STRING
        }, 
        { sequelize, modelName: 'users', tableName: 'users', force: force });
    }
}

module.exports = UserModel;