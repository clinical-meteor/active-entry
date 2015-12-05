
//==================================================================================================
// ROUTER

Router.route('/entrySignIn', {
  template: 'entrySignIn',
  name: 'entrySignIn'
});
Router.route('/sign-in', {
  template: 'entrySignIn',
  name: 'signInRoute'
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
  'click #forgotPasswordButton': function (event) {
    event.preventDefault();
    Router.go('/forgotPassword');
  },
  "click #needAnAccountButton": function () {
    event.preventDefault();
    Router.go('/entrySignUp');
  },
  'keyup input[name="email"]': function (event, template) {
    var email = $('input[name="email"]').val();

    ActiveEntry.verifyEmail(email);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change input[name="email"]': function (event, template) {
    var email = $('input[name="email"]').val();

    ActiveEntry.verifyEmail(email);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'keyup #signInPagePasswordInput': function (event, template) {
    var password = $('input[name="password"]').val();

    ActiveEntry.verifyPassword(password);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'change #signInPagePasswordInput': function (event, template) {
    var password = $('input[name="password"]').val();

    ActiveEntry.verifyPassword(password);
    ActiveEntry.errorMessages.set('signInError', null);
  },
  'submit': function (event, template) {
    event.preventDefault();
    var emailValue = template.$('[name=email]').val();
    var passwordValue = template.$('[name=password]').val();

    ActiveEntry.signIn(emailValue, passwordValue);
  },
  'click #signInToAppButton': function (event, template){
    var emailValue = template.$('[name=email]').val();
    var passwordValue = template.$('[name=password]').val();

    ActiveEntry.signIn(emailValue, passwordValue);
  }
});



//==================================================================================================
