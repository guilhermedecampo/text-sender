Settings = new Meteor.Collection('settings', {
    schema: {
      sid: {
          type: String,
          label: "Account SID",
          max: 200,
          optional:true
      },
      token: {
          type: String,
          label: "Account TOKEN",
          optional:true
      },
      phoneTwilio: {
        type: String,
        label: "Account Phone Number",
        optional:true
      },
      message: {
        type: String,
        label: "Message",
        optional:true
      },
      ownerId: {
        type: String,
        label: "",
        optional:true
      },
    }
  });

/*
 * Add query methods like this:
 *  Settings.findPublic = function () {
 *    return Settings.find({is_public: true});
 *  }
 */
