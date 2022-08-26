const {Sequelize} = require('sequelize')

const database = process.env.MYSQL_DATABASE 
const username= process.env.MYSQL_USERNAME
const password= process.env.MYSQL_PASSWORD
const host= process.env.MYSQL_HOST

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect :"mysql"

    }
    
)
const  dbConnectionMysql = async (db) => {
    
    try {
        await sequelize.authenticate()
        console.log("Mysql coneccion correcta!!")
    } catch (e ) {
    
        console.log("error de coneccion "+e)
    }
}
module.exports = {sequelize, dbConnectionMysql}