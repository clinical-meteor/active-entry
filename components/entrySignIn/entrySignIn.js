
//==================================================================================================
// ROUTER

Router.route('entrySignIn', {
  template: 'entrySignIn',
  name: 'entrySignIn'
});


//==================================================================================================
// COMPONENT OUTPUTS

Template.entrySignIn.helpers({
  getButtonText: function () {
    if (ActiveEntry.errorMessages.get('signInError')){
      return ActiveEntry.errorMessages.get('signInError').message;
    } else {
      return "Sign In";
    }
  },
  getEmailValidationStyling: function () {
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
  getPasswordValidationStyling: function () {
    if (ActiveEntry.errorMessages.equals('password', "Password is required")) {
      return "border: 1px solid red";
    } else if (ActiveEntry.errorMessages.equals('password', "Password is weak")) {
      return "border: 1px solid orange";
    } else if (ActiveEntry.errorMessages.equals('password', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  }
});


//==================================================================================================
// COMPONENT OUTPUTS

Template.entrySignIn.events({
  'click #logoutButton': function () {
    Meteor.logout();
  },
  'click #forgotPasswordButton': function () {
    Router.go('/forgotPassword');
  },
  "click #needAnAccountButton": function () {
    Router.go('/entrySignUp');
  },
  'change #signInPageEmailInput': function (event, template) {
    var email = template.$('[name="email"]').val();
    ActiveEntry.verifyEmail(email);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change #signInPagePasswordInput': function (event, template) {
    var password = template.$('[name="password"]').val();
    ActiveEntry.verifyPassword(password);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'submit': function (event, template) {
    event.preventDefault();

    var emailValue = template.$('[name=email]').val();
    var passwordValue = template.$('[name=password]').val();

    ActiveEntry.verifyPassword(passwordValue);
    ActiveEntry.verifyEmail(emailValue);

    Meteor.loginWithPassword({email: emailValue}, passwordValue, function (error, result) {
      if (error) {
        console.log('error', error);
        ActiveEntry.errorMessages.set('signInError', error);
      }
      if (result) {
        console.log('result', result);
        var ActiveEntryConfig = Session.get('Photonic.ActiveEntry');
        Router.go(ActiveEntryConfig.signIn.destination);
      }
    });
  }
});


//==================================================================================================
