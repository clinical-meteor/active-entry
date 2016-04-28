

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
  // Support for playing D&D: Roll 3d6 for dexterity
  Accounts.onCreateUser(function(options, user) {

    var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
    user.dexterity = d6() + d6() + d6();
    user.role = "user";

    // We still want the default hook's 'profile' behavior.
    if (options.profile){
      user.profile = options.profile;
    }

    return user;
  });

  // Validate login attempts
  Accounts.validateLoginAttempt(function(attempt) {
    // Check user exists
    var user = attempt.user;

    // Login failed if the user does not exist
    if (!user) {
      return false;
    }

    // Login failed if the profile is not found
    if (!user.profile) {
      return false;
    }

    // Login failed if the account is locked
    if (user.profile.isLocked) {
      throw new Meteor.Error(403, 'Your account has been locked. Please contact the admin.');
    }

    var loginFailedAttempt;
    var isLoginAllowed = false;
    var failedAttemptLimit = 5;

    loginFailedAttempt = user.profile.loginFailedAttempt;

    // Set loginFailedAttempt to 0 if it is not defined before
    if (loginFailedAttempt === undefined) {
      loginFailedAttempt = 0;
    }

    // Check error
    if (attempt.error && attempt.error.error == 403) {

      // Increase failed attempt
      loginFailedAttempt++;

      // Login is failed
      isLoginAllowed = false;
      if (loginFailedAttempt == failedAttemptLimit) {

        // Lock the account
        Meteor.users.update({_id: user._id}, {$set: {'profile.isLocked': true}});

        throw new Meteor.Error(403, 'Too many failed login attempts. Your account has been locked.');

      } else {

        // Update user data
        Meteor.users.update({_id: user._id}, {$set: {'profile.loginFailedAttempt': loginFailedAttempt}});

        // Set error text
        var remainingAttemptCount = failedAttemptLimit - loginFailedAttempt;
        var attemptText = remainingAttemptCount + ' attempts';
        if (remainingAttemptCount == 1) {
          attemptText = 'Last attempt';
        }

        throw new Meteor.Error(403, 'Login attempt failed. ' + attemptText + ' remaining.');
      }

    } else {
      // Reset failed attempts
      loginFailedAttempt = 0;

      // Update last and prior login date
      var priorLoginDate = user.profile.lastLoginDate;
      if (!priorLoginDate) {
        priorLoginDate = new Date();
      }

      // Update user's last login date, prior login date, login failed attempt count and isLocked attribute
      Meteor.users.update({_id: user._id},
          {$set: {
            'profile.loginFailedAttempt': loginFailedAttempt,
            'profile.lastLoginDate': new Date(),
            'profile.priorLoginDate': priorLoginDate,
            'profile.isLocked': false
          }
      });

      // Login successful
      isLoginAllowed = true;
    }

    return isLoginAllowed;
  });
}
