//==========================================

Router.route('/forgotPassword', {
  name: "forgotPassword",
  template: "forgotPassword"
});



Template.forgotPassword.events({
  "submit": function (event, template) {
    event.preventDefault();

    console.log('send reminder!');
    Accounts.forgotPassword({email: $('#signInPageEmailInput').val()});
  }
});
