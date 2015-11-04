//==================================================================================================
// ROUTER

Router.route('/entrySignUp', {
  template: 'entrySignUp',
  name: 'entrySignUp'
});

//==================================================================================================



Template.entrySignUp.helpers({
  getButtonText: function () {
    if (ActiveEntry.errorMessages.get('signInError')) {
      return ActiveEntry.errorMessages.get('signInError').message;
    } else {
      return "Sign In";
    }
  },
  getEmailStyling: function () {
    if (ActiveEntry.errorMessages.equals('email', "Email is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('email', "Email is poorly formatted")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('email', "Email present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getPasswordStyling: function () {
    if (ActiveEntry.errorMessages.equals('password', "Password is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('password', "Password is weak")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('password', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getConfirmPasswordStyling: function () {
    if (ActiveEntry.errorMessages.equals('confirm', "Password is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('confirm', "Password is weak")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('confirm', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getFullNameStyling: function () {
    if (ActiveEntry.errorMessages.equals('fullName', "Name is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('fullName', "Name is probably not complete")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('fullName', "Name present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  }
});

Template.entrySignUp.events({
  "click #signUpPageSignInButton": function () {
    Router.go('/entrySignIn');
  },
  'change, keyup #signUpPageEmailInput': function (event, template) {
    var email = template.$('[name="email"]').val();
    ActiveEntry.verifyEmail(email);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPagePasswordInput': function (event, template) {
    var password = template.$('[name="password"]').val();
    ActiveEntry.verifyPassword(password);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPagePasswordConfirmInput': function (event, template) {

    var password = template.$('[name="password"]').val();
    var confirmPassword = template.$('[name="confirm"]').val();

    ActiveEntry.verifyConfirmPassword(password, confirmPassword);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change, keyup #signUpPageFullNameInput': function (event, template) {
    var fullName = template.$('[name="fullName"]').val();

    ActiveEntry.verifyFullName(fullName);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  // TODO:  this is outdated, and should be changed to match the signature/pattern in entrySignIn
  'submit': function (event, template) {
    event.preventDefault();

    ActiveEntry.errorMessages.set('signInError', null);
    ActiveEntry.verifyPassword(event, template);

    var newUser = {
      fullName: template.$('[name="fullName"]').val(),
      email: template.$('[name="email"]').val(),
      password: template.$('[name="password"]').val(),
      confirm: template.$('[name="confirm"]').val()
    };


    ActiveEntry.verifyFullName(newUser.fullName);
    ActiveEntry.verifyEmail(newUser.email);
    ActiveEntry.verifyPassword(newUser.password);
    ActiveEntry.verifyConfirmPassword(newUser.password, newUser.confirm);

    console.log('newUser', newUser);

    Accounts.createUser({
      email: newUser.email,
      password: newUser.password,
      profile: {
        fullName: newUser.fullName
      }
    }, function (error, result) {
      if (error) {
        console.log('error', error);
        ActiveEntry.errorMessages.set('signInError', error);
      }
      if (result) {
        console.log('result', result);
      }

      var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
      Router.go(ActiveEntryConfig.signUp.destination);
      // Router.go('/table/users');
    });
  }
});
