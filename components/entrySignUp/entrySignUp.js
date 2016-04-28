//==================================================================================================
// ROUTER

Router.route('/entrySignUp', {
  template: 'entrySignUp',
  name: 'entrySignUp'
});
Router.route('/sign-up', {
  template: 'entrySignUp',
  name: 'signUpRoute'
});

//==================================================================================================



Template.entrySignUp.helpers({
  getSignUpMessageColor: function (){
    if (ActiveEntry.validationStatus.get('signInError').status) {
      return "color: #a94442; background-color: #f2dede; border-color: #ebccd1;";
    } else {
      return "color: black;";
    }
  },
  getSignUpMessage: function (){
    if (ActiveEntry.validationStatus.get('signInError').status) {
      return ActiveEntry.validationStatus.get('signInError').message;
    } else {
      return Session.get('defaultSignInMessage');
    }
  },
  getButtonText: function () {
    if (ActiveEntry.validationStatus.get('signInError').status) {
      return ActiveEntry.validationStatus.get('signInError').message;
    } else {
      return "Sign In";
    }
  },
  getEmailStyling: function () {
    if (ActiveEntry.validationStatus.get('email') === "Email is required") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('email') === "Email is poorly formatted") {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.validationStatus.get('email') === "Email present") {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getPasswordStyling: function () {
    if (ActiveEntry.validationStatus.get('password') === "Password is required") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('password') === "Password is weak") {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.validationStatus.get('password') === "Password present") {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },

  // TODO:  this needs to change
  // confirm password is all-or-nothing
  // so it shouldn't be checking for whether the password is weak
  getConfirmPasswordStyling: function () {
    if (ActiveEntry.validationStatus.get('confirm') === "Password is required") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('confirm') === "Passwords do not match") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('confirm') === "Password is weak") {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.validationStatus.get('confirm') === "Passwords match") {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getFullNameStyling: function () {
    if (ActiveEntry.validationStatus.get('fullName') === "Name is required") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('fullName') === "Name is probably not complete") {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.validationStatus.get('fullName') === "Name present") {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  signUpErrorMessage: function() {
    if (!ActiveEntry.validationStatus.get('fullName').status) {
      return ActiveEntry.validationStatus.get('fullName').message;
    }
    if (!ActiveEntry.validationStatus.get('email').status) {
      return ActiveEntry.validationStatus.get('email').message;
    }
    if (!ActiveEntry.validationStatus.get('password').status) {
      return ActiveEntry.validationStatus.get('password').message;
    }
    if (!ActiveEntry.validationStatus.get('confirm').status) {
      return ActiveEntry.validationStatus.get('confirm').message;
    }

    return;
  }
});

Template.entrySignUp.events({
  "click #signUpPageSignInButton": function (event) {
    event.preventDefault();
    Router.go('/entrySignIn');
  },
  'change, keyup #signUpPageEmailInput': function (event, template) {
    var email = $('[name="email"]').val();

    ActiveEntry.verifyEmail(email);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  'keyup #signUpPagePasswordInput': function (event, template) {
    var password = $('[name="password"]').val();

    ActiveEntry.verifyPassword(password);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  'keyup #signUpPagePasswordConfirmInput': function (event, template) {

    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();
    // var password = $('#signUpPagePasswordInput').val();
    // var confirmPassword = $('#signUpPagePasswordConfirmInput').val();

    ActiveEntry.verifyConfirmPassword(password, confirmPassword);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  'change, keyup #signUpPageFullNameInput': function (event, template) {
    var fullName = template.$('[name="fullName"]').val();

    ActiveEntry.verifyFullName(fullName);
    ActiveEntry.validationStatus.set('signInError', {status: false, message: null});
  },
  'click #signUpPageJoinNowButton': function (event, template) {

    ActiveEntry.signUp(
        $('#signUpPageEmailInput').val(),
        $('#signUpPagePasswordInput').val(),
        $('#signUpPagePasswordConfirmInput').val(),
        $('#signUpPageFullNameInput').val()
    );
  }
});
