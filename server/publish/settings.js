/*****************************************************************************/
/* Settings Publish Functions
/*****************************************************************************/

Meteor.publish('settings', function () {
  if (this.userId) {
    return Settings.find({ownerId:this.userId});
  } else {
    // you can remove this if you return a cursor
    this.ready();
  }
});
