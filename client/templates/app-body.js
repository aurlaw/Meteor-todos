  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt:-1}});
    }

  });

  Template.body.events({
    "submit .new-tasks" : function(event) {
      var text = event.target.text.value;
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      event.target.text.value = "";

      return false;

    }

  });
