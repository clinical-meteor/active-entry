

ActiveEntry = {};
ActiveEntry.isAbc = function () {
  return "abc";
};



if (Meteor.isClient) {
  Session.setDefault('Photonic.ActiveEntry', {
    logo: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Photon-photon_scattering.png",
      displayed: true
    },
    signIn: {
      displayFullName: true,
      destination: "/"
    },
    signUp: {
      destination: "/"
    },
    themeColors: {
      primary: ""
    },
    passwordOptions: {
      requireStrongPassword: false,
      validationType: "regex"
    }
  });
}


if (Meteor.isClient) {
  ActiveEntry.errorMessages = new ReactiveDict('errorMessages');
  ActiveEntry.errorMessages.set('signInError', false);

  // Success messages
  ActiveEntry.successMessages = new ReactiveDict('successMessages');

  // Create validationStatus dictionary to store validation status and uiMessage of input values
  ActiveEntry.validationStatus = new ReactiveDict('validationStatus');
  // Assign validationStatus keys
  ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  ActiveEntry.validationStatus.set('email', {status: false, message: null});
  ActiveEntry.validationStatus.set('password', {status: false, message: null});
  ActiveEntry.validationStatus.set('confirm', {status: false, message: null});
  ActiveEntry.validationStatus.set('fullName', {status: false, message: null});

}


ActiveEntry.configure = function (configObject) {
  if (Meteor.isClient) {
    Session.set('Photonic.ActiveEntry', configObject);
  }
};

ActiveEntry.verifyPassword = function (password) {
  if (password.length === 0) {
    ActiveEntry.errorMessages.set('password', 'Password is required');
    ActiveEntry.successMessages.set('password', null);
    ActiveEntry.validationStatus.set('password', {status: false, message: 'Password is required'});
  } else if (checkPasswordValidation(password)) {
    ActiveEntry.errorMessages.set('password', null);
    ActiveEntry.successMessages.set('password', 'Password present');
    ActiveEntry.validationStatus.set('password', {status: true, message: 'Password present'});
  } else {
    ActiveEntry.errorMessages.set('password', 'Password is weak');
    ActiveEntry.successMessages.set('password', null);
    ActiveEntry.validationStatus.set('password', {status: false, message: 'Password is weak'});
  }
};

ActiveEntry.verifyConfirmPassword = function (password, confirmPassword) {
  if (confirmPassword === "") {
    ActiveEntry.errorMessages.set('confirm', 'Password is required');
    ActiveEntry.successMessages.set('confirm', null);
    ActiveEntry.validationStatus.set('confirm', {status: false, message: 'Password is required'});
  }else if (confirmPassword === password) {
    ActiveEntry.errorMessages.set('confirm', null);
    ActiveEntry.successMessages.set('confirm', 'Passwords match');
    ActiveEntry.validationStatus.set('confirm', {status: true, message: 'Passwords match'});
  } else {
    ActiveEntry.errorMessages.set('confirm', 'Passwords do not match');
    ActiveEntry.successMessages.set('confirm', null);
    ActiveEntry.validationStatus.set('confirm', {status: false, message: 'Passwords do not match'});
  }
};

ActiveEntry.verifyEmail = function (email) {
  if (email.length === 0) {
    ActiveEntry.errorMessages.set('email', 'Email is required');
    ActiveEntry.successMessages.set('email', null);
    ActiveEntry.validationStatus.set('email', {status: false, message: 'Email is required'});
  } else if (email.indexOf("@") === -1){
    ActiveEntry.errorMessages.set('email', 'Email is poorly formatted');
    ActiveEntry.successMessages.set('email', null);
    ActiveEntry.validationStatus.set('email', {status: false, message: 'Email is poorly formatted'});
  } else if (email.indexOf("@") >= 0){
    ActiveEntry.errorMessages.set('email', null);
    ActiveEntry.successMessages.set('email', 'Email present');
    ActiveEntry.validationStatus.set('email', {status: true, message: 'Email present'});
  }
};

ActiveEntry.verifyFullName = function (fullName) {
  if (fullName.length === 0) {
    ActiveEntry.errorMessages.set('fullName', 'Name is required');
    ActiveEntry.successMessages.set('fullName', null);
    ActiveEntry.validationStatus.set('fullName', {status: false, message: 'Name is required'});
  } else if (fullName.indexOf(" ") === -1){
    ActiveEntry.errorMessages.set('fullName', 'Name is probably not complete');
    ActiveEntry.successMessages.set('fullName', null);
    ActiveEntry.validationStatus.set('fullName', {status: false, message: 'Name is probably not complete'});
  } else if (fullName.indexOf(" ") >= 0){
    ActiveEntry.errorMessages.set('fullName', null);
    ActiveEntry.successMessages.set('fullName', 'Name present');
    ActiveEntry.validationStatus.set('fullName', {status: true, message: 'Name present'});
  }
};

// Sign In
ActiveEntry.signIn = function (emailValue, passwordValue){
  // Reset status values
  ActiveEntry.reset();

  Meteor.loginWithPassword({email: emailValue}, passwordValue, function (error, result) {
    if (error) {
      ActiveEntry.validationStatus.set('signInError', {status: true, message: error.message});
    } else {
      console.log('result', result);
      var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
      Router.go(ActiveEntryConfig.signIn.destination);
    }
  });
};

// Sign Up
ActiveEntry.signUp = function (emailValue, passwordValue, confirmPassword, fullName){
  ActiveEntry.verifyEmail(emailValue);
  ActiveEntry.verifyPassword(passwordValue);
  ActiveEntry.verifyConfirmPassword(passwordValue, confirmPassword);
  ActiveEntry.verifyFullName(fullName);
  ActiveEntry.errorMessages.set('signInError', null);

  // Check if error is found
  if (ActiveEntry.errorMessages.get("email") ||
      ActiveEntry.errorMessages.get("password") ||
      ActiveEntry.errorMessages.get("confirm") ||
      ActiveEntry.errorMessages.get("fullName")) {
    return;
  }

  // Capitalize fullName
  fullName = fullName.toLowerCase().capitalize();

  Accounts.createUser({
    email: emailValue,
    password: passwordValue,
    profile: {
      fullName: fullName
    }
  }, function (error, result) {
    if (error) {
      console.log(error);
      ActiveEntry.errorMessages.set('signInError', error.message);
    } else {
      var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
      Router.go(ActiveEntryConfig.signUp.destination);
    }
  });


  // Meteor.loginWithPassword({email: emailValue}, passwordValue, function (error, result) {
  //   if (error) {
  //     console.log(error);
  //     Session.set('errorMessage', error);
  //   }
  //
  //   if (result) {
  //     console.log('result', result);
  //   }
  //   var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
  //   console.log('ActiveEntryConfig', JSON.stringify(ActiveEntryConfig));
  //   Router.go(ActiveEntryConfig.signIn.destination);
  // });
};

// Change Password
ActiveEntry.changePassword = function(oldPasswordValue, newPasswordValue, confirmPasswordValue) {

  // Check if inputs are not validated
  if (!ActiveEntry.validationStatus.get("password").status ||
      !ActiveEntry.validationStatus.get("confirm").status) {
    return;
  }
  // Reset status values
  ActiveEntry.reset();

  Accounts.changePassword(oldPasswordValue, confirmPasswordValue, function(error) {
    if (error) {
      console.warn(error);
      ActiveEntry.validationStatus.set('changePasswordError', {status: true, message: error.message});
      return;
    }
    // Sign out
    ActiveEntry.signOut();
    // Go to Sign In page
    var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
    Router.go(ActiveEntryConfig.signIn.destination);
  });
};

// Sign Out
ActiveEntry.signOut = function (email){
  Meteor.logout();
};

// Resets validationStatus key values
ActiveEntry.reset = function (){
  ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  ActiveEntry.validationStatus.set('fullName', {status: false, message: null});
  ActiveEntry.validationStatus.set('email', {status: false, message: null});
  ActiveEntry.validationStatus.set('password', {status: false, message: null});
  ActiveEntry.validationStatus.set('confirm', {status: false, message: null});

  ActiveEntry.validationStatus.set('changePasswordError', {status: false, message: null});

};

ActiveEntry.logoIsDisplayed = function (){
  var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
  return ActiveEntryConfig.logo.displayed;
};
