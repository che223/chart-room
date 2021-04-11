const sequelize = require('./db');
const {DataTypes} = require('sequelize')
const ChartUser = sequelize.define('ChartUser',{
    loginName:{
       type: DataTypes.STRING,
       allowNull:false,
    },
    loginPwd:{
        type: DataTypes.STRING,
        allowNull:false,
    },
},{
    createdAt:false,
    updatedAt:false,
    paranoid:true
})
module.exports = ChartUser