Customers = new Meteor.Collection('customers', {
   schema: {
       firstName: {
           type: String,
           label: "First Name",
           max: 200
       },
       lastName: {
           type: String,
           label: "last Name",
           max: 200,
           optional:true
       },
       company: {
           type: String,
           label: "Company",
           optional:true
       },
       phoneNumber: {
           type: String,
           label: "Phone Number",
           optional:true
        },
       status: {
           type: String,
           label: "Status text",
       },
       ownerId: {
         type: String,
         label: "",
       },
   }
 });

/*
 * Add query methods like this:
 *  Customers.findPublic = function () {
 *    return Customers.find({is_public: true});
 *  }
 */