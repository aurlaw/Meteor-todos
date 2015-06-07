  Template.task.helpers({
  		isOwner: function() {
  			return this.owner === Meteor.userId();
  		}
  });

  Template.task.events({
    "click .toggle-checked": function() {

      // Tasks.update(this._id, {$set:{checked: !this.checked}});
      Meteor.call("setChecked", this._id, !this.checked);
    },
    "click .delete": function() {
      // Tasks.remove(this._id);
      Meteor.call("deleteTask", this._id);
    },
    "click .toggle-private": function() {
    	Meteor.call("setPrivate", this._id, !this.private);
    }
  });