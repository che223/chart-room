const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('chart','czx','Czx200143',{
    host:'rm-bp12bn2l1swp5553ypo.mysql.rds.aliyuncs.com',
    dialect:'mysql',
    port:3306,
})
module.exports =sequelize