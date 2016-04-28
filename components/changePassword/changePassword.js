//==========================================

Router.route('/changePassword', {
  name: "changePassword",
  template: "changePassword",
  /*onBeforeAction: function() {
    if(!Meteor.loggingIn() && !Meteor.user()) {
      this.redirect('entrySignIn');
    } else {
      this.next();
    }
  }*/
})


Template.changePassword.helpers({
  getChangePasswordMessageColor: function (){
    if (ActiveEntry.validationStatus.get('changePasswordError').status) {
      return "color: #a94442; background-color: #f2dede; border-color: #ebccd1;"
    } else {
      return "color: black;"
    }
  },
  getChangePasswordMessage: function (){
    if (ActiveEntry.validationStatus.get('changePasswordError').status) {
      return ActiveEntry.validationStatus.get('changePasswordError').message;
    } else {
      return Session.get('defaultSignInMessage');
    }
  },
  getPasswordStyling: function () {
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
  getConfirmPasswordStyling: function () {
    if (ActiveEntry.validationStatus.get('confirm').message === "Password is required") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('confirm').message === "Passwords do not match") {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.validationStatus.get('confirm').message === "Password is weak") {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.validationStatus.get('confirm').message === "Passwords match") {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  changePasswordErrorMessages: function() {
    if (!ActiveEntry.validationStatus.get('password').status) {
      return ActiveEntry.validationStatus.get('password').message;
    }

    if (!ActiveEntry.validationStatus.get('confirm').status) {
      return ActiveEntry.validationStatus.get('confirm').message;
    }

    return;
  }
});

Template.changePassword.events({
  'change, keyup #changePasswordPagePasswordInput': function (event, template) {
    var password = $('[name="password"]').val();

    ActiveEntry.verifyPassword(password);
    ActiveEntry.validationStatus.set('changePasswordError', {status: false, message: null});
  },
  'change, keyup #changePasswordPagePasswordConfirmInput': function (event, template) {
    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();

    ActiveEntry.verifyConfirmPassword(password, confirmPassword);
    ActiveEntry.validationStatus.set('changePasswordError', {status: false, message: null});
  },
  "submit": function (event, template) {
    var oldPassword = $('[name="oldPassword"]').val();
    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();

    ActiveEntry.changePassword(oldPassword, password, confirmPassword);
    event.preventDefault();
  }
});
