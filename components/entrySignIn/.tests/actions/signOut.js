exports.command = function (fullname) {

  if (fullname) {
    this
      .verify.elementPresent("#usernameLink")
      .verify.containsText("#usernameLink", fullname);
  }

  this
    .verify.elementPresent("#logoutLink")
    .click("#logoutLink").pause(500);

  if (fullname) {
    this
      .verify.elementPresent("#usernameLink")
      .verify.containsText("#usernameLink", "Sign In");
  }

  return this;
};
