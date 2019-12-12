module.exports = (sequelize, Sequelize) => {
    const data = sequelize.define("consumo", {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        json_value: {
            type: Sequelize.JSON,
        }
    }, { timestamps: true, schema: "public" })

    return data
}