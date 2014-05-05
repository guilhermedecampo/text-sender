/*
 * Add query methods like this:
 *  Customers.findPublic = function () {
 *    return Customers.find({is_public: true});
 *  }
 */

Customers.allow({
  insert: function (userId, doc) {
    return userId === doc.ownerId;
  },

  update: function (userId, doc, fieldNames, modifier) {
    return userId === doc.ownerId;
  },

  remove: function (userId, doc) {
    return userId === doc.ownerId;
  }
});

Customers.deny({
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
