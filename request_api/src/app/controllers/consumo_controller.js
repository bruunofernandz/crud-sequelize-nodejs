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


exports.insertConsumo = async (req, res, next) => {
  let insertDB;

  try {
    insertDB = await insertConsumo(req.body);

    return res.send(insertDB);
  } catch (err) {
    return res.status(500).send({ success: false, error: `${err}` });
  }
  next();
};
exports.deleteConsumo = async (req, res, next) => {
  let deleteDB;

  try {
    deleteDB = await deleteConsumo(req.body);

    return res.send(`Dados deletados com sucesso: ${deleteDB}`);
  } catch (err) {
    return res.status(500).json({ success: false, error: `${err}` });
  }

  next();
};

deleteConsumo = async data => {
  const { id } = await data;

  return await consumo
    .destroy({
      where: { id: id }
    })
    .then(del => {
      if(del)
        return del
    })
    .catch(err => {
      return Promise.reject(new Error(err));
    });
};

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

insertConsumo = async data => {
  const { id, json_value } = await data;

  return await consumo
    .create({
      id,
      json_value
    })
    .then(created => {
      return created;
    })
    .catch(e => {
      return Promise.reject(new Error(e));
    });
};
