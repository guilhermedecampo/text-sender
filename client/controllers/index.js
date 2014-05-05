IndexController = RouteController.extend({
  waitOn: function () {
    return [
      Meteor.subscribe('customers'),
      Meteor.subscribe('settings')
    ];
  },

  data: function () {
  },

  action: function () {
    this.render();
  }
});
