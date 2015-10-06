// Write your tests here!
// Here is an example.



// Tinytest.add('EntrySignIn - No errors should display by default.', function (test) {
//   test.equal(Session.get("signinErrors"), {});
// });
// Tinytest.add('My First Test', function (test) {
//   test.equal(true, true);
// });


// Tinytest.add('Entry Pages Client Test', function (test) {
//   if(Meteor.isClient){
//     test.equal("fizzle!", Template.entrySignIn.__helpers.get('foo')());
//   }
// });



describe('Photonic:ActiveEntry', function () {
  describe('ActiveEntry - isAbc()', function () {
    it.client('returns Abc on client', function () {
      expect(ActiveEntry.isAbc()).to.equal("abc");
    });
    it.server('returns Abc on server', function () {
      expect(ActiveEntry.isAbc()).to.equal("abc");
    });
  });

  describe('Account - onResetPasswordLink()', function () {
    it.client('returns Abc on client', function () {
      expect(true).to.be.true;
    });
  });
  describe('Account - onEnrollmentLink()', function () {
    it.client('returns Abc on client', function () {
      expect(true).to.be.true;
    });
  });
  describe('Account - onEmailVerificationLink()', function () {
    it.client('returns Abc on client', function () {
      expect(true).to.be.true;
    });
  });
});
