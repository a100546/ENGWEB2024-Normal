var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:16000/contratos')
  .then((result) => {
    res.render('index', { title: 'Contratos' , contratos: result.data })
  }).catch((err) => {
    res.render('error', { error: err });
  });
});

router.get('/:id', function(req, res, next) {
  axios.get('http://localhost:16000/contratos/'+ req.params.id)
  .then((result) => {
    res.render('contrato', { title: 'Contrato '+req.params.id , contrato: result.data })
  }).catch((err) => {
    res.render('error', { error: err });
  });
});

router.get('/entidades/:id', function(req, res, next) {
  axios.get('http://localhost:16000/contratos?entidade='+ req.params.id)
  .then((result) => {
    res.render('entidade', { title: 'Entidade '+req.params.id , entidades: result.data })
  }).catch((err) => {
    res.render('error', { error: err });
  });
});

module.exports = router;