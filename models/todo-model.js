var mongoose = require('mongoose');

var todoSchema  = new  mongoose.Schema({
	label: String,
	content: String,
	start: Date,
	finish: Date
});

module.exports = mongoose.model('TodoModel', todoSchema);
