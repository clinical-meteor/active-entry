// var nightwatch = require('nightwatch');

describe('clinical:entry', function () {
  var server = meteor();
  var client = browser(server);

  // before(function () {
  //   return server.promise(function (resolve){
  //     Meteor.users.find().forEach(function(user){
  //       Meteor.users.remove({_id: user._id});
  //     }, function(){
  //       resolve();
  //     });
  //   });
  // });

  // afterEach(function (){
  //   return client.promise(function (resolve){
  //     Meteor.logout(function(error, result){
  //       resolve();
  //     });
  //   });
  // });


  it("Entry object should be loaded on client and server", function () {
    return server.execute(function () {
      expect(Entry.isAbc()).to.equal('abc');
    }).then(function (data){
      return client.execute(function (a) {
        expect(Entry.isAbc()).to.equal('abc');
      });
    });
  });

  it("Error messages should be empty by default", function () {
    return client.execute(function () {
      expect(Entry.errorMessages.get('signInError')).to.equal(false);
    });
  });

  // Entry.verifyEmail
  it('Email validation confirms it is a properly formatted email.', function () {
    return client.execute(function (a) {
      Entry.verifyEmail('janedoe@somewhere.com');
      expect(Entry.errorMessages.get('email')).to.equal("Email present");

      Entry.verifyEmail('');
      expect(Entry.errorMessages.get('email')).to.equal("Email is required");

      Entry.verifyEmail('janedoe.somewhere.com');
      expect(Entry.errorMessages.get('email')).to.equal("Email is poorly formatted");
    });
  });


  // Entry.verifyPassword
  it('Password validation confirms it is a properly formatted password.', function () {
    return client.execute(function (a) {
      Entry.verifyPassword('');
      expect(Entry.errorMessages.get('password')).to.equal("Password is required");

      Entry.verifyPassword('kittens');
      expect(Entry.errorMessages.get('password')).to.equal("Password is weak");

      Entry.verifyPassword('kittens123');
      expect(Entry.errorMessages.get('password')).to.equal("Password present");
    });
  });

  // Entry.verifyConfirmPassword
  it('Password match confirms that two passwords are the same.', function () {
    return client.execute(function (a) {
      Entry.verifyConfirmPassword('kittens123', '');
      expect(Entry.errorMessages.get('confirm')).to.equal("Password is required");

      Entry.verifyConfirmPassword('kittens123', 'kittens');
      expect(Entry.errorMessages.get('confirm')).to.equal("Passwords do not match");

      Entry.verifyConfirmPassword('kittens123', 'kittens123');
      expect(Entry.errorMessages.get('confirm')).to.equal("Passwords match");
    });
  });

  // Entry.verifyFullName
  it('Fullname validation confirms that at least a first and last name are entered.', function () {
    return client.execute(function (a) {
      Entry.verifyFullName('');
      expect(Entry.errorMessages.get('fullName')).to.equal("Name is required");

      Entry.verifyFullName('Jane');
      expect(Entry.errorMessages.get('fullName')).to.equal("Name is probably not complete");

      Entry.verifyFullName('Jane Doe');
      expect(Entry.errorMessages.get('fullName')).to.equal("Name present");
    });
  });


  // Entry.signIn
  it('Newly created user record should have role, profile, and name set.', function () {
    return client.execute(function () {
      Entry.signUp('janedoe@test.org', 'janedoe123', 'janedoe123', 'Jane Doe');
      //expect(Entry.errorMessages.get('fullName')).to.equal("Name present");
    }).then(function (){
      return server.wait(300, 'until account is created on the server', function () {
        return Meteor.users.findOne({'emails.address': 'janedoe@test.org'});
      }).then(function (user){
        expect(user.role).to.equal('user');
        expect(user.profile.fullName).to.equal('Jane Doe');
      });
    });
  });



  it("Newly created user should have fullName(), preferredName(), and familyName() methods.", function () {
    return server.execute(function () {
      var user = Meteor.users.findOne({'emails.address': 'janedoe@test.org'});
      expect(user).to.be.ok;
      expect(user.fullName()).to.equal('Jane Doe');
      expect(user.givenName()).to.equal('Jane');
      expect(user.familyName()).to.equal('Doe');
    }).then(function(){
      // client.wait(500, "until user is logged out", function(){
      //   Meteor.logout();
      // });
      return client.promise(function (resolve){
        Meteor.logout(function(error, result){
          resolve();
        });
      });

    });
  });
  it("Newly created user can sign in to the application.", function () {
    return client.execute(function () {
      expect(Meteor.userId()).to.not.exist;
      Entry.signIn('janedoe@test.org', 'janedoe123');
    }).then(function (){
      client.wait(3000, "for user to sign in", function (){
        expect(Meteor.userId()).to.exist;
      });
    });
  });
  it("Newly created user can sign out of the application.", function () {
    return client.execute(function () {
      expect(Meteor.userId()).to.not.exist;
      Entry.signIn('janedoe@test.org', 'janedoe123');
    }).then(function (){
      client.wait(3000, "for user to sign in", function (){
        expect(Meteor.userId()).to.exist;
        Entry.signOut('janedoe@test.org');
      }).then(function (){
        expect(Meteor.userId()).to.not.exist;
      });
    });
  });



  // it("config should be able to change company logo", function () {
  //
  // });
  // it("config should be able to change entry message text", function () {
  //
  // });

  // it("new user should be able to register on desktop", function () {
  //   client.location = "/sign-in";
  //
  //   client.execute(function () {
  //     expect($('#entrySignIn')).to.exist();
  //     expect($('#signInPageEmailInput')).to.exist();
  //     expect($('#signInPagePasswordInput')).to.exist();
  //     expect($('#signInToAppButton')).to.exist();
  //   }).setValue('#signInPageEmailInput', 'house@test.org')
  //     .setValue('#signInPagePasswordInput', 'house@test.org')
  //     .click('#signInToAppButton').execute(function(){
  //       expect($('#entrySignIn')).to.exist();
  //       expect($('#signInPageEmailInput')).to.exist();
  //       expect($('#signInPagePasswordInput')).to.exist();
  //       expect($('#signInToAppButton')).to.exist();
  //       // expect($('#entrySignIn')).to.not.exist();
  //       // expect($('#signInPageEmailInput')).to.not.exist();
  //       // expect($('#signInPagePasswordInput')).to.not.exist();
  //       // expect($('#signInToAppButton')).to.not.exist();
  //     });
  //     // .then(function(data){
  //     //   return server.execute(3000, 'until the account is created', function () {
  //     //     expect(Meteor.users.find().count()).to.be.above(20);
  //     //   });
  //     // });
  // });


});
