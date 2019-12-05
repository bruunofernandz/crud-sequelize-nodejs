const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        timestamps: false,
        port: process.env.DB_PORT,
        define: {
            timestamps: true,
            freezeTableName: true,
        },

        pool: {
            max: 5,
            min: 0,
            adquire: 30000,
            idle: 10000
        }
    }
);

sequelize.authenticate().then(() => {
    console.log('Database connected sucessfull');
}).catch((err) => {
    setTimeout(() => {
        process.kill(process.pid, 'SIGTERM')
    }, 300)
    console.log(process.env.DB_DATABASE)
    console.log(process.env.DB_PORT)
    return Promise.reject(`Erro ao conectar ao banco de dados: ${err}`)
})

let db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize

db.consumo = require('../models/consumo_model.js')(sequelize, Sequelize)

module.exports = db