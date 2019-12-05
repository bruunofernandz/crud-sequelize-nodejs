module.exports = app => {

    const consumoController = require('../controllers/consumo_controller')

    const db = require('../config/db')

    const consumo = db.consumo

    let rotaPadrao = '/consumo';
    
    app.get(`${rotaPadrao}/get`, consumoController.findConsumo);

    app.put(`${rotaPadrao}/update/:idUser`, consumoController.updateConsumo)

    app.post(`${rotaPadrao}/post`,consumoController.create);

    app.delete(`${rotaPadrao}/delete/:idDelete`, consumoController.delete)
}