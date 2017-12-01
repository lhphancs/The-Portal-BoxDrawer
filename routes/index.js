var express = require('express');
var router = express.Router();
var BoxModel = require('../models/BoxModel');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/r/:id', function(req, res, next) {
  var id = req.param("id")
  console.log(id);
  res.render('box', { id: id} );
});

router.post('/get-box', function(req, res, next) {
  var id = req.body.id;
  BoxModel.find({room_id: id}, function(err, data){
    res.send(data);
  });
  
});

module.exports = router;
