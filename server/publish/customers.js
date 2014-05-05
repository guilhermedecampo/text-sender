/*****************************************************************************/
/* Customers Publish Functions
/*****************************************************************************/

Meteor.publish('customers', function () {
  if (this.userId) {
    return Customers.find({ownerId:this.userId});
  } else {
    // you can remove this if you return a cursor
    this.ready();
  }
});
