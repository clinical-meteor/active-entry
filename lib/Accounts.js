

if (Meteor.isClient) {


  Accounts.onResetPasswordLink(function (token, done){
    console.log('Accounts.onResearchPasswordLink');
    console.log('Sending reset password email...');
    console.log('NOT IMPLEMENTED YET.  PLEASE LOG AN ISSUE');
    console.log('token: ' + token);
    done();
  });


  Accounts.onEnrollmentLink(function (token, done){
    console.log('Accounts.onResearchPasswordLink');
    console.log('Sending enrollment email...');
    console.log('NOT IMPLEMENTED YET.  PLEASE LOG AN ISSUE');
    console.log('token: ' + token);
    done();
  });

  Accounts.onEmailVerificationLink(function (token, done){
    console.log('Accounts.onEmailVerificationLink');
    console.log('Sending verification email...');
    console.log('NOT IMPLEMENTED YET.  PLEASE LOG AN ISSUE');
    console.log('token: ' + token);
    done();
  });
}


if (Meteor.isServer){

  if (process.env.INITIALIZE_USER_PROFILE) {

    // Support for playing D&D: Roll 3d6 for dexterity
    Accounts.onCreateUser(function(options, user) {

      // We still want the default hook's 'profile' behavior.
      if (options.profile){
        user.profile = options.profile;

        var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
        user.profile.attributes ={
          string: d6() + d6() + d6(),
          endurance: d6() + d6() + d6(),
          dexterity: d6() + d6() + d6(),
          intelligence: d6() + d6() + d6(),
          charisma: d6() + d6() + d6(),
          wisdom: d6() + d6() + d6()
        }

      }

      // if ( options.emails ) {
      //     user.emails = options.emails;
      // }

      // user.role = "user";

      return user;
    });
  }
}
