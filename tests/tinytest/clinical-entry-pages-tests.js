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



describe('clinical:active-entry', function () {

  describe('user interface', function () {
    it.client('displays a sign-in page on /sign-in route', function () {

    });
    it.client('displays a sign-up page on /sign-up route', function () {

    });
    it.client('displays a forgot-password page on /forgot-password route', function () {

    });
  });

  describe('server functionality', function () {
    it.client('creates a new user when signing up', function () {

    });

    it.client('creates a user profile for a new user', function () {

    });
  });
});
