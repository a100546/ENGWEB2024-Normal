var Contrato = require('../models/contrato')

// Exemplo de registo
/*
 {
    "_id": "10424671",
    "nAnuncio": "",
    "tipoprocedimento": "Ajuste Direto Regime Geral",
    "objectoContrato": "Presta\u00e7\u00e3o de Servi\u00e7os - Realiza\u00e7\u00e3o de atividades e eventos, planeamento, cria\u00e7\u00e3o e execu\u00e7\u00e3o de suportes l\u00fadicos",
    "dataPublicacao": "02/01/2024",
    "dataCelebracaoContrato": "02/01/2024",
    "precoContratual": "19200",
    "prazoExecucao": "456",
    "NIPC_entidade_comunicante": "506676170",
    "entidade_comunicante": "Munic\u00edpio de Seia",
    "fundamentacao": "Artigo 20.\u00ba, n.\u00ba 1, al\u00ednea d) do C\u00f3digo dos Contratos P\u00fablicos"
}
*/

// * `GET /contratos`: devolve uma lista com todos os registos;
module.exports.list = () => {
    return Contrato
        .find()
        .exec();
}

// * `GET /contratos/:id`: devolve o registo com identificador `id`;
module.exports.findById = id => {
    return Contrato
      .findOne({ _id: id })
      .exec();
  }

// * `GET /contratos?entidade=EEEE`: devolve a lista dos registos correspondentes à entidade `EEEE`;
module.exports.getByEntidade = (nipc) => {
    return Contrato.find({"NIPC_entidade_comunicante": nipc})
    .exec();
}

// * `GET /contratos?implant=AAA`: devolve a lista dos contratos com tipo de procedimento igual a AAA;
module.exports.getByTipo = (pro) => {
    return Contrato.find({"tipoprocedimento": pro})
    .exec();
}

// * `GET /contratos/entidades: devolve a lista de entidades comunicantes ordenada alfabeticamente e sem repetições;
module.exports.distinctEntidades = () => {
    return Contrato.distinct("entidade_comunicante")
    .sort()
    .exec()
}

// * `GET /contratos/tipos: devolve a lista dos tipos de procedimento ordenada alfabeticamente e sem repetições;
module.exports.distinctTipos = () => {
    return Contrato.distinct("tipoprocedimento")
    .sort()
    .exec()
}

// * `POST /contratos`: acrescenta um registo novo à BD;
module.exports.addContrato = cont => {
    return Contrato.create(cont);
}

// * `DELETE /contratos/:id`: elimina da BD o registo com o identificador `id`.
module.exports.deleteContrato = id => {
    return Contrato.deleteOne({ _id: id });
}

// * `PUT /contratos/:id: altera o registo com o identificador id
module.exports.updateContrato = (id, cont) => {
    return Contrato.updateOne({ _id: id }, cont);
  }