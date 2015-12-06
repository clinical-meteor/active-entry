

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
