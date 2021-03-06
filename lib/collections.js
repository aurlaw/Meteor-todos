Tasks = new Mongo.Collection("tasks");

Meteor.methods({
	addTask: function(text) {
		// ensure user is logged in
		if(!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		Tasks.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
	},
	deleteTask: function(taskId) {
		var task = Tasks.findOne(taskId);
		if(task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		Tasks.remove(taskId);
	},
	setChecked: function(taskId, setChecked) {
		var task = Tasks.findOne(taskId);
		if(task.private && task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		Tasks.update(taskId, {$set: {checked: setChecked}});
	},
	setPrivate: function(taskId, setToPrivate) {
		var task = Tasks.findOne(taskId);
		if(task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		Tasks.update(taskId, {$set: {private: setToPrivate}});
	},
	updateTask: function(taskId, text) {
		var task = Tasks.findOne(taskId);
		if(task.private  && task.owner !== Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}
		Tasks.update(taskId, {$set: {text: text}});

	}

});