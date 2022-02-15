'use strict';
const Sequelize  = require('sequelize');

module.exports = (sequelize) => {

    class ChatApp extends Sequelize.Model{};

    ChatApp.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        username:{
            type: Sequelize.STRING,
            allowNull: false,

            validate:{
                notNull:{
                    msg:"Username cannot be null"
                },
                notEmpty:{
                    msg:"Username cannot be empty"
                }
            }
        },
        message:{
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                notNull:{
                    msg:"You can't send a null as message"
                },
                notEmpty:{
                    msg:"Message field cannot be empty"
                }
            }
        },
        time_sent:{
            type:Sequelize.DATE
        }
    },{
        sequelize,

        timestamps: true,

        createdAt: false,

        updatedAt: false,

        tableName: "messages_data"
    });

    return ChatApp;
}