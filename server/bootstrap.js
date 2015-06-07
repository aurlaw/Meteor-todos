// if the database is empty on server start, create some sample data.
// Only publish tasks that are public or belong to the current user
Meteor.publish("tasks", function() {
	return Tasks.find({
		$or: [
			{private: {$ne: true}},
			{owner: this.userId}
		]
	});
});

Meteor.startup(function () {

});
