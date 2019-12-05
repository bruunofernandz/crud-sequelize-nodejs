const db = require("../config/db");

const consumo = db.consumo;

exports.findConsumo = async (req, res, next) => {
  let selectDB;

  try {
    selectDB = await findConsumo(req.body);

    res.send(selectDB);

    console.log(selectDB);
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }

  next();
};

exports.updateConsumo = async (req, res, next) => {
  let updateDB;

  try {
    updateDB = await updateConsumo(req.body, req.params.idUser);

    res.send(updateDB);

    console.log(updateDB);
  } catch (err) {
    return res.status(500).json({ error: `${err}` });
  }

  next();
};

exports.create = async (req, res, next) => {
    await consumo.create({
        id: req.body.id,
        json_value: req.body.valor
    }).then(created => {
        return created
    }).catch(err => {
        return res.status(500).json({ error: err })
    })
    next()
}

exports.delete = async (req, res, next) => {
    const id = req.params.idDelete
    await consumo.destroy({
        where: { id: id }
    }).then(created => {
        return created
    }).catch(err => {
        return res.status(500).json({ error: err })
    })
    next()
}

findConsumo = async hashUser => {
  return await consumo
    .findAll({ attributes: [`json_value`], where: { id: hashUser.hash } })
    .then(finded => {
      console.log("Its Finded");
      return finded;
    })
    .catch(err => {
      return Promise.reject(new Error(err));
    });
};

updateConsumo = async (data, idUser) => {
  return await consumo
    .update(
      {
        json_value: data
      },
      {
        returning: true,
        where: { id: idUser }
      }
    )
    .then(updated => {
      console.log("Dados Atualizados");
      return updated;
    })
    .catch(err => {
      return Promise.reject(new Error(err));
    });
};
