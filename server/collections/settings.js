/*
 * Add query methods like this:
 *  Settings.findPublic = function () {
 *    return Settings.find({is_public: true});
 *  }
 */

Settings.allow({
  insert: function (userId, doc) {
    if (Settings.find().count() === 0) {
      return userId === doc.ownerId;
    }
  },

  update: function (userId, doc, fieldNames, modifier) {
    return userId === doc.ownerId;
  },

  remove: function (userId, doc) {
    return false;
  }
});

Settings.deny({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});
