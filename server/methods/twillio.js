/*****************************************************************************/
/* Twillio Methods */
/*****************************************************************************/


Meteor.startup(function () {

Meteor.methods({
  sendTextList:function (settings, listCustomers, message) {
    console.log(settings);
    sid = settings.sid;
    token = settings.token;
    phoneTwilio = settings.phoneTwilio;
    twilio = Twilio(sid, token);
    console.log(twilio, sid, token, phoneTwilio, message);

    this.message = message;
    var outsite = this;




    _.each(listCustomers, function(customer, index, list){

      //Calling future
      Future = Npm.require('fibers/future');
      // Set up a future
      var fut = new Future();
      message = outsite.message.match(/user/g) ? outsite.message.replace(/user/g, customer.firstName) : outsite.message;
      console.log(customer.phoneNumber);
      twilio.sendSms({
          to: '+' + customer.phoneNumber, // Any number Twilio can deliver to
          from: '+' + phoneTwilio, // A number you bought from Twilio and can use for outbound communication
          body: message // body of the SMS message
        }, function(error, response) { //this function is executed when a response is received from Twilio
          if (error) {
            fut.return(error);
          } else {
            fut.return(response); // "err" is an error received during the request, if any // outputs "+14506667788"
          }
        }
      );

      result = fut.wait();

        if (result&&
            result.body) {
          Customers.update(customer._id, { $set: {
            status: 'sent'
          }});
          console.log(result);
        } else {
          Customers.update(customer._id, { $set: {
            status: 'error ' + result.message,
          }});
          console.log(result);
        }

    });

  },

});

});