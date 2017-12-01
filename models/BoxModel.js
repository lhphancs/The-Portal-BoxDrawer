var mongoose = require('mongoose');

var boxSchema = mongoose.Schema({
  room_id: String,
  coordinate: String,
  color: String
});

module.exports = mongoose.model('Box', boxSchema);