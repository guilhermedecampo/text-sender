/*****************************************************************************/
/* Index: Event Handlers and Helpers */
/*****************************************************************************/
Template.Index.events({

  'click #submitCustomer': function(event, template) {
    event.preventDefault();
    var
      $firstName   = $('#firstName').val(),
      $lastName    = $('#lastName').val(),
      $company     = $('#company').val(),
      $phoneNumber = $('#phoneNumber').val(),
      status       = 'waiting',
      ownerId      = Meteor.userId()
    ;

    if ($firstName&&
        $phoneNumber) {

      Customers.insert({
        firstName: $firstName,
        lastName: $lastName,
        company: $company,
        phoneNumber: $phoneNumber,
        status: status,
        ownerId: ownerId
      });
    $('#formCustomer')[0].reset();
    } else {
      alert('You have to complete all fields -> remember phone is a number');
    }
  },

  'click .status': function(event, template) {
    var
      status = this.status
    ;
    if (status === 'waiting') {
      Customers.update(this._id, { $set: {
        status: 'canceled',
      }});
    } else {
      Customers.update(this._id, { $set: {
        status: 'waiting',
      }});
    }
  },

  'click #submitText': function(event, template) {
    var
      settings = Settings.findOne(),
      message = $('#message').val() || $('#messageEdit').val(),
      arrayCustomers = Customers.find().fetch(),
      arrayOnlyWaitingStatus = _.where(arrayCustomers, {status: 'waiting'})
    ;
    console.log(settings);
      if (message&&
          !_.isEmpty(arrayOnlyWaitingStatus)) {
        $('#submitText').addClass('disabled');
        $('#submitText').text('Sending...');

        Meteor.call('sendTextList',settings, arrayOnlyWaitingStatus, message, function(error, result) {
          if (error) {
            alert('Something went wrong');
            console.log(error);
            $('#submitText').removeClass('disabled');
            $('#submitText').text('Send Text');
          } else {
            $('#submitText').removeClass('disabled');
            $('#submitText').text('Send Text');
          }
        });
      } else {
        alert('There is no customers waiting text or no message');
      }
  },

  'focusout #sidEdit': function(event, template) {
    var sid = $('#sidEdit').val();

      Settings.update(this._id, { $set: {
        sid: sid,
        ownerId: Meteor.userId()
      }});
  },

  'focusout #tokenEdit': function(event, template) {
    var token = $('#tokenEdit').val();

      Settings.update(this._id, { $set: {
        token: token,
        ownerId: Meteor.userId()
      }});
  },

  'focusout #phoneTwilioEdit': function(event, template) {
    var phoneTwilio = $('#phoneTwilioEdit').val();

      Settings.update(this._id, { $set: {
        phoneTwilio: phoneTwilio,
        ownerId: Meteor.userId()
      }});
  },

  'focusout #messageEdit': function(event, template) {
    var message = $('#messageEdit').val();

      Settings.update(this._id, { $set: {
        message: message,
        ownerId: Meteor.userId()
      }});
  },

  'click .delete': function(event, template) {
    Customers.remove(this._id);
  },



});

Template.Index.helpers({
  /*
   * Example:
   *  items: function () {
   *    return Items.find();
   *  }
   */
  settings: function () {
    return Settings.find().fetch();
  },
  customers: function () {
    return Customers.find();
  },
});

/*****************************************************************************/
/* Index: Lifecycle Hooks */
/*****************************************************************************/
Template.Index.created = function () {
};

Template.Index.rendered = function () {
};

Template.Index.destroyed = function () {
};