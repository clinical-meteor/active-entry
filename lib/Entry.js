

Entry = {};
Entry.isAbc = function () {
  return "abc";
};



if (Meteor.isClient) {
  Session.setDefault('Photonic.Entry', {
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
  Entry.errorMessages = new ReactiveDict('errorMessages');
  Entry.errorMessages.set('signInError', false);

}


Entry.configure = function (configObject) {
  if (Meteor.isClient) {
    Session.set('Photonic.Entry', configObject);
  }
};




Entry.verifyPassword = function (password) {
  if (password.length === 0) {
    Entry.errorMessages.set('password', 'Password is required');
  } else if (password.length < 8) {
    Entry.errorMessages.set('password', 'Password is weak');
  } else if (password.length >= 8) {
    Entry.errorMessages.set('password', 'Password present');
  }
};
Entry.verifyConfirmPassword = function (password, confirmPassword) {
  // we have two different logic checks happening in this function
  // would be reasonable to separate them out into separate functions

  if (confirmPassword === password) {
    Entry.errorMessages.set('confirm', 'Passwords match');
  } else {
    Entry.errorMessages.set('confirm', 'Passwords do not match');
  }

  if (confirmPassword === "") {
    Entry.errorMessages.set('confirm', 'Password is required');
  }
};
Entry.verifyEmail = function (email) {
  console.log('Entry.verifyEmail', email);
  if (email.length === 0) {
    Entry.errorMessages.set('email', 'Email is required');
  } else if (email.indexOf("@") === -1){
    Entry.errorMessages.set('email', 'Email is poorly formatted');
  } else if (email.indexOf("@") >= 0){
    Entry.errorMessages.set('email', 'Email present');
  }
};
Entry.verifyFullName = function (fullName) {
  if (fullName.length === 0) {
    Entry.errorMessages.set('fullName', 'Name is required');
  } else if (fullName.indexOf(" ") === -1){
    Entry.errorMessages.set('fullName', 'Name is probably not complete');
  } else if (fullName.indexOf(" ") >= 0){
    Entry.errorMessages.set('fullName', 'Name present');
  }
};

Entry.signIn = function (emailValue, passwordValue, redirectUri){
  console.log('redirectUri', redirectUri);

  Entry.verifyPassword(passwordValue);
  Entry.verifyEmail(emailValue);

  Meteor.loginWithPassword({email: emailValue}, passwordValue, function (error, result) {
    if (error) {
      Entry.errorMessages.set('signInError', error.message);
    } else {
      //console.log('result', result);
      var EntryConfig = Session.get('Photonic.Entry');
      //console.log('EntryConfig', JSON.stringify(EntryConfig));
      if (redirectUri) {
        Router.go('/generateAccessTokens');
        // Router.go(redirectUri);
      } else {
        Router.go(EntryConfig.signIn.destination);
      }
    }
  });
};

Entry.signUp = function (emailValue, passwordValue, confirmPassword, fullName){
  Entry.verifyEmail(emailValue);
  Entry.verifyPassword(passwordValue);
  Entry.verifyConfirmPassword(passwordValue, confirmPassword);
  Entry.verifyFullName(fullName);

  Accounts.createUser({
    email: emailValue,
    password: passwordValue,
    profile: {
      fullName: fullName
    }
  }, function (error, result) {
    if (error) {
      console.log(error);
      Entry.errorMessages.set('signInError', error.message);
    } else {
      var EntryConfig = Session.get('Photonic.Entry');
      Router.go(EntryConfig.signUp.destination);
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
  //   var EntryConfig = Session.get('Photonic.Entry');
  //   console.log('EntryConfig', JSON.stringify(EntryConfig));
  //   Router.go(EntryConfig.signIn.destination);
  // });
};
Entry.signOut = function (){
  Meteor.logout();
};

Entry.reset = function (){
  Entry.errorMessages.set('fullName', false);
  Entry.errorMessages.set('email', false);
  Entry.errorMessages.set('confirm', false);
  Entry.errorMessages.set('password', false);
};
Entry.logoIsDisplayed = function (){
  var EntryConfig = Session.get('Photonic.Entry');
  return EntryConfig.logo.displayed;
};

// Backwards compatibility
// We want to support older versions of the API.
ActiveEntry = Entry;
