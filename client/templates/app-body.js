var SHOW_CONNECTION_ISSUE_KEY = 'showConnectionIssue';
Session.setDefault(SHOW_CONNECTION_ISSUE_KEY, false);

var CONNECTION_ISSUE_TIMEOUT = 5000;

Meteor.startup(function () {

  // Only show the connection error box if it has been 5 seconds since
  // the app started
  setTimeout(function () {
    // Launch screen handle created in lib/router.js
    // dataReadyHold.release();

    // Show the connection error box
    Session.set(SHOW_CONNECTION_ISSUE_KEY, true);
  }, CONNECTION_ISSUE_TIMEOUT);
});

Meteor.subscribe("tasks");

  Template.body.helpers({
    tasks: function() {
      if(Session.get('hideCompleted')) {
        return Tasks.find({checked:{$ne:true}}, {sort: {createdAt:-1}});
      } else {
        return Tasks.find({}, {sort: {createdAt:-1}});

      }
    },
    hideCompleted: function() {
      return Session.get('hideCompleted');
    },
    incompleteCount: function() {
      return Tasks.find({checked: {$ne: true}}).count();
    },
    connected: function() {
      if (Session.get(SHOW_CONNECTION_ISSUE_KEY)) {
        // console.log(Meteor.status().connected);
        return Meteor.status().connected;
      } else {
        // console.log(true);
        return true;
      }
    }


  });

  Template.body.events({
    "submit .new-tasks" : function(event) {
      var text = event.target.text.value;
      // Tasks.insert({
      //   text: text,
      //   createdAt: new Date(),
      //   owner: Meteor.userId(),
      //   username: Meteor.user().username
      // });
      Meteor.call("addTask", text);

      event.target.text.value = "";

      return false;

    },
    "change .hide-completed input" : function(event) {
        Session.set("hideCompleted", event.target.checked);
    }

  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
