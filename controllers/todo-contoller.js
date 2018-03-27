var mongoose = require('mongoose');
var todoModel = require('../models/todo-model');

var todoController = {} ;

todoController.list = function(req, res) {
	// body...
	todoModel.find({}).exec(function(err, todos){
		if(err){
			console.log("Error: "+ err);
		} else{
			res.render("../views/todo/index", {todos: todos});
		}
	});
};
todoController.show = function(req, res) {
	// body...
	todoModel.findOne({_id: req.params.id}).exec(function(err, todo){
		if(err){
			console.log("Error: "+ err);
		} else{
			res.render("../views/todo/show", {todo: todo});
		}
	});
};

todoController.create = function(req, res) {
	// body...
	res.render("../views/todo/create");
};

todoController.save = function(req, res) {
	var todo = new todoModel(req.body);

	todo.save(function(err){
		if(err){
			console.log(err);
			res.render("../views/todo/create");
		} else{
			console.log("Insert successful!!!");
			res.redirect("/todos/show/" + todo._id);
		}
	});
};

todoController.edit = function(req, res) {
	// body...
	todoModel.findOne({_id: req.params.id}).exec(function(err, todo){
		if(err){
			console.log("Error: "+ err);
		} else{
			res.render("../views/todo/edit", {todo: todo});
		}
	});
};

todoController.update = function(req, res) {
	// body...
	todoModel.findByIdAndUpdate(req.params.id,{ $set: {
		label: req.params.label,
		content: req.params.content,
		start: req.params.start,
		finish: req.params.finish
	}}, {new: true}, function(err, todo){
		if(err){
			console.log(err);
			res.render("../views/todo/edit", {todo: req.body});
		} else{
			res.redirect("/todos/show/" + todo._id);
		}
	})
};

todoController.delete = function(req, res) {
  todoModel.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("todoModel deleted!");
      res.redirect("/todos");
    }
  });
};

module.exports = todoController;
