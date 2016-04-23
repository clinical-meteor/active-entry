
// REFACTOR:  Move to ActiveRecord object
Session.set("defaultSignInMessage", "Improve your clinical practice with checklists.");

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
  getSignInMessageColor: function (){
    if (ActiveEntry.validationStatus.get('signInError').status) {
      return "color: #a94442; background-color: #f2dede; border-color: #ebccd1;"
    } else {
      return "color: black;"
    }
  },
  getSignInMessage: function (){
    if (ActiveEntry.validationStatus.get('signInError').status) {
      return ActiveEntry.validationStatus.get('signInError').message;
    } else {
      return Session.get('defaultSignInMessage');
    }
  },
  getButtonText: function () {
    return "Sign In";
    // if (ActiveEntry.errorMessages.get('signInError')){
    //   return ActiveEntry.errorMessages.get('signInError');
    // } else {
    //   return "Sign In";
    // }
  },
  getEmailValidationStyling: function () {
    if (ActiveEntry.validationStatus.get('email').message === "Email is required") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('email').message === "Email is poorly formatted") {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.validationStatus.get('email').message === "Email present") {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getPasswordValidationStyling: function () {
    if (ActiveEntry.validationStatus.get('password').message === "Password is required") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('password').message === "Password is weak") {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.validationStatus.get('password').message === "Password present") {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  signInToAppButtonValidationStyling: function() {
    // Returns class name to enable/disable button
    if (ActiveEntry.validationStatus.get("email").status && ActiveEntry.validationStatus.get("password").status) {
      return 'btnEnable';
    }
    return 'btnDisable';
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
    ActiveEntry.reset();
    Router.go('/forgotPassword');
  },
  "click #needAnAccountButton": function (event) {
    event.preventDefault();
    ActiveEntry.reset();
    Router.go('/entrySignUp');
  },
  'keyup input[name="email"]': function (event, template) {
    var email = $('input[name="email"]').val();

    ActiveEntry.verifyEmail(email);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  'change input[name="email"]': function (event, template) {
    var email = $('input[name="email"]').val();

    ActiveEntry.verifyEmail(email);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  'keyup #signInPagePasswordInput': function (event, template) {
    var password = $('input[name="password"]').val();

    ActiveEntry.verifyPassword(password);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  'change #signInPagePasswordInput': function (event, template) {
    var password = $('input[name="password"]').val();

    ActiveEntry.verifyPassword(password);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  // 'submit': function (event, template) {
  //   event.preventDefault();
  //   var emailValue = template.$('[name=email]').val();
  //   var passwordValue = template.$('[name=password]').val();
  //
  //   ActiveEntry.signIn(emailValue, passwordValue);
  // },
  'click #signInToAppButton': function (event, template){
    console.log('click #signInToAppButton');
    // Reset validationStatus keys
    ActiveEntry.reset();
    var emailValue = template.$('#signInPageEmailInput').val();
    var passwordValue = template.$('#signInPagePasswordInput').val();

    ActiveEntry.signIn(emailValue, passwordValue);
    event.preventDefault();
  },

  // Catch enter press and trigger signIn event if input values are validated
  'keyup #entrySignIn': function(event, template) {
    if(event.keyCode == 13 &&
        ActiveEntry.validationStatus.get("email").status &&
        ActiveEntry.validationStatus.get("password").status) {
      $("#signInToAppButton").click();
    }
  }
});



//==================================================================================================
