module.exports = (sequelize, Sequelize) => {
    const data = sequelize.define("consumo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrements: true
        },

        json_value: {
            type: Sequelize.JSON,
            allowNull: false,
        }
    }, { timestamps: true, schema: "public" })

    return data
}