

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
    }
  });
}


if (Meteor.isClient) {
  ActiveEntry.errorMessages = new ReactiveDict('errorMessages');
}


ActiveEntry.configure = function (configObject) {
  if (Meteor.isClient) {
    Session.set('Photonic.ActiveEntry', configObject);
  }
};




ActiveEntry.verifyPassword = function (password) {
  if (password.length === 0) {
    ActiveEntry.errorMessages.set('password', 'Password is required');
  } else if (password.length < 8) {
    ActiveEntry.errorMessages.set('password', 'Password is weak');
  } else if (password.length >= 8) {
    ActiveEntry.errorMessages.set('password', 'Password present');
  }
};
ActiveEntry.verifyConfirmPassword = function (password, confirmPassword) {
  if (confirmPassword.length === 0) {
    ActiveEntry.errorMessages.set('confirm', 'Password is required');
  } else if (confirmPassword.length < 8) {
    ActiveEntry.errorMessages.set('confirm', 'Password is weak');
  }

  if (confirmPassword === password) {
    ActiveEntry.errorMessages.set('confirm', 'Password present');
  }
};
ActiveEntry.verifyEmail = function (email) {
  if (email.length === 0) {
    ActiveEntry.errorMessages.set('email', 'Email is required');
  } else if (email.indexOf("@") === -1){
    ActiveEntry.errorMessages.set('email', 'Email is poorly formatted');
  } else if (email.indexOf("@") >= 0){
    ActiveEntry.errorMessages.set('email', 'Email present');
  }
};
ActiveEntry.verifyFullName = function (fullName) {
  if (fullName.length === 0) {
    ActiveEntry.errorMessages.set('fullName', 'Name is required');
  } else if (fullName.indexOf(" ") === -1){
    ActiveEntry.errorMessages.set('fullName', 'Name is probably not complete');
  } else if (fullName.indexOf(" ") >= 0){
    ActiveEntry.errorMessages.set('fullName', 'Name present');
  }
};

ActiveEntry.signIn = function (emailValue, passwordValue){
  ActiveEntry.verifyPassword(passwordValue);
  ActiveEntry.verifyEmail(emailValue);

  Meteor.loginWithPassword({email: emailValue}, passwordValue, function (error, result) {
    if (error) {
      console.log('error', error);
      ActiveEntry.errorMessages.set('signInError', error);
    }
    if (result) {
      console.log('result', result);
    }
    var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
    console.log('ActiveEntryConfig', JSON.stringify(ActiveEntryConfig));
    Router.go(ActiveEntryConfig.signIn.destination);
  });
};
