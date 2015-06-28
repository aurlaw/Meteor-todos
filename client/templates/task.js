var EDITING_KEY = 'EDITING_TODO_ID';


  Template.task.helpers({
  		isOwner: function() {
  			return this.owner === Meteor.userId();
  		},
      editingClass: function() {
        return Session.equals(EDITING_KEY, this._id) && 'editing';
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
    },
    // editing
    'focus input[type=text]': function(event) {
      Session.set(EDITING_KEY, this._id);
    },
    
    'blur input[type=text]': function(event) {
      if (Session.equals(EDITING_KEY, this._id))
        Session.set(EDITING_KEY, null);
    },
  
    'keydown input[type=text]': function(event) {
      // ESC or ENTER
      if (event.which === 27 || event.which === 13) {
        event.preventDefault();
        event.target.blur();
      }
    },
    // update the text of the item on keypress but throttle the event to ensure
    // we don't flood the server with updates (handles the event at most once 
    // every 300ms)
    'keyup input[type=text]': _.throttle(function(event) {
      // Todos.update(this._id, {$set: {text: event.target.value}});
      console.log(this._id);
      console.log(event.target.value);
      //TODO
    }, 300),

  });