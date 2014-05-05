Meteor.users.after.insert(function (userId, doc) {
    Settings.insert({ownerId: this._id});
});