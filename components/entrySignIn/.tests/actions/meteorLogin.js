exports.command = function (email, password) {
  this
    .execute(function () {
      return Meteor.loginWithPassword(email, password);
    }).pause(1000);

  return this;
};
