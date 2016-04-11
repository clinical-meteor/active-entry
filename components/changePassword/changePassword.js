//==========================================

Router.route('/changePassword', {
  name: "changePassword",
  template: "changePassword"
});


Template.changePassword.helpers({
  getChangePasswordMessageColor: function (){
    if (ActiveEntry.errorMessages.get('changePasswordError')) {
      return "color: #a94442; background-color: #f2dede; border-color: #ebccd1;"
    } else {
      return "color: black;"
    }
  },
  getChangePasswordMessage: function (){
    if (ActiveEntry.errorMessages.get('changePasswordError')) {
      return ActiveEntry.errorMessages.get('changePasswordError');
    } else {
      return Session.get('defaultSignInMessage');
    }
  },
  getPasswordStyling: function () {
    if (ActiveEntry.errorMessages.equals('password', "Password is required")) {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.errorMessages.equals('password', "Password is weak")) {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.successMessages.equals('password', "Password present")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  getConfirmPasswordStyling: function () {
    if (ActiveEntry.errorMessages.equals('confirm', "Password is required")) {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.errorMessages.equals('confirm', "Passwords do not match")) {
      return "border: 1px solid #a94442";
    } else if (ActiveEntry.errorMessages.equals('confirm', "Password is weak")) {
      return "border: 1px solid #f2dede";
    } else if (ActiveEntry.successMessages.equals('confirm', "Passwords match")) {
      return "border: 1px solid green";
    } else {
      return "border: 1px solid gray";
    }
  },
  changePasswordErrorMessages: function() {
    if (ActiveEntry.errorMessages.get('password')) {
      return [ActiveEntry.errorMessages.get('password')];
    }

    if (ActiveEntry.errorMessages.get('confirm')) {
      return [ActiveEntry.errorMessages.get('confirm')];
    }

    return;
  }
});

Template.changePassword.events({
  'change, keyup #changePasswordPagePasswordInput': function (event, template) {
    var password = $('[name="password"]').val();

    ActiveEntry.verifyPassword(password);
    ActiveEntry.errorMessages.set('changePasswordError', null);
  },
  'change, keyup #changePasswordPagePasswordConfirmInput': function (event, template) {
    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();

    ActiveEntry.verifyConfirmPassword(password, confirmPassword);
    ActiveEntry.errorMessages.set('changePasswordError', null);
  },
  "submit": function (event, template) {
    var oldPassword = $('[name="oldPassword"]').val();
    var password = $('[name="password"]').val();
    var confirmPassword = $('[name="confirm"]').val();

    ActiveEntry.changePassword(oldPassword, password, confirmPassword);
    event.preventDefault();
  }
});
