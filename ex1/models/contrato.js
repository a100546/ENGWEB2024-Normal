const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  _id: Number,
  nAnuncio: String,
  tipoprocedimento: String,
  objectoContrato: String,
  dataPublicacao: Date,
  dataCelebracaoContrato: Date,
  precoContratual: Number,
  prazoExecucao: Number,
  NIPC_entidade_comunicante: String,
  entidade_comunicante: String,
  fundamentacao: String
}, { versionKey: false });

module.exports = mongoose.model('contratos', contratoSchema);