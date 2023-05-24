const { Sequelize, Model, DataTypes } = require('sequelize');
const { Op } = require("sequelize");

const CrudLogic = require("./crudlogic");

class UserLogic extends CrudLogic {

    static getModel()
    {
        const model = require("../models/usermodel");
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
        let order = [['firstname', 'ASC']];
        return order;
    }

    static login(username, password)
    {
        let promise = new Promise(async(resolve, reject)=>{
            let model = this.getModel();

            try 
            {
                let user = await model.findOne({
                    where: {
                        [Op.and] : {
                            username: username,
                            userPassword: password
                        }
                    }
                })



                if(user != null)
                {
                    user = JSON.stringify(user);
                    user = JSON.parse(user);
                    delete user.userPassword;
                    resolve({ success: true, payload: user  })

                }
                else 
                    reject({ success: false, error: null, message: "Invalid username or password" })
            }
            catch(e)
            {
                reject({ success: false, error: e, message: e.message })
            }
        });
        return promise;
    }

}

module.exports = UserLogic;