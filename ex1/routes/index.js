var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contrato')


/* GET home page. */
router.get('/contratos', function(req, res, next) {
  if(Object.keys(req.query).length > 0){
    if(req.query.entidade){
      Contrato.getByEntidade(req.query.entidade)
      .then((result) => {
        res.jsonp(result)
      }).catch((err) => {
        res.jsonp(err)
      });
    }
    else if(req.query.tipo){
      Contrato.getByTipo(req.query.tipo)
      .then((result) => {
        res.jsonp(result)
      }).catch((err) => {
        res.jsonp(err)
      });
    }
    else{
      res.jsonp({erro: 'Query inválida'})
    }
  }
  else{
    Contrato.list()
    .then((result) => {
      res.jsonp(result)
    }).catch((err) => {
      res.jsonp(err)
    });
  }
});

router.get('/contratos/entidades', function(req, res, next) {
  Contrato.distinctEntidades()
  .then((result) => {
    res.jsonp(result)
  }).catch((err) => {
    res.jsonp(err)
  });
})


router.get('/contratos/tipos', function(req, res, next) {
  Contrato.distinctTipos()
  .then((result) => {
    res.jsonp(result)
  }).catch((err) => {
    res.jsonp(err)
  });
})

router.get('/contratos/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
  .then((result) => {
    res.jsonp(result)
  }).catch((err) => {
    res.jsonp(err)
  });
})

router.post('/contratos', function(req, res, next) {
  Contrato.addContrato(req.body)
  .then((result) => {
    res.jsonp(result)
  }).catch((err) => {
    res.jsonp(err)
  });
})

router.delete('/contratos/:id', function(req, res, next) {
  Contrato.deleteContrato(req.params.id)
  .then((result) => {
    res.jsonp(result)
  }).catch((err) => {
    res.jsonp(err)
  });

})

router.put('/contratos/:id', function(req, res, next) {
  Aluno.updateContrato(req.params.id, req.body)
  .then((result) => {
    res.jsonp(result)
  }).catch((err) => {
    res.jsonp(err)
  });
})


module.exports = router;