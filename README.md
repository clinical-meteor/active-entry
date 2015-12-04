## clinical:active-entry

Part of the ``clinical:multiactor`` package collection.  This package provides the SignIn, SignUp, and ForgotPassword pages.


===============================
#### Installation

````
meteor add clinical:active-entry
````

===============================
#### Routing API

````
/entrySignIn
/entrySignUp
/forgotPassword
````

===============================
#### Component API

````
{{> entrySignIn }}
{{> entrySignUp }}
{{> forgotPassword }}
````


===============================
#### ActiveEntry Configuration

````js

if(Meteor.isClient){
  ActiveEntry.configure({
    logo: {
      url: "/mini-circles.png",
      displayed: true
    },
    signIn: {
      displayFullName: true,
      destination: "/table/users"
    },
    signUp: {
      destination: "/table/users"
    },
    themeColors: {
      primary: ""
    }
  });
}

if(Meteor.isServer){
  Accounts.emailTemplates.siteName = "AwesomeSite";
  Accounts.emailTemplates.from = "AwesomeSite Admin <accounts@example.com>";
  Accounts.emailTemplates.enrollAccount.subject = function (user) {
      return "Welcome to Awesome Town, " + user.profile.name;
  };
  Accounts.emailTemplates.enrollAccount.text = function (user, url) {
     return "You have been selected to participate in building a better future!"
       + " To activate your account, simply click the link below:\n\n"
       + url;
  };  

  Meteor.startup(function(){
    process.env.MAIL_URL = 'smtp://sandboxid.mailgun.org:mypassword@smtp.mailgun.org:587';
  })  
}
````
Alternatively, you may want to set the ``MAIL_URL`` via an external environment variable, particularly if you're using a SaaS hosting provider.

````sh
MAIL_URL = 'smtp://sandboxid.mailgun.org:mypassword@smtp.mailgun.org:587' meteor
````

### Quality Assurance

<!-- - when new user fills out form and registers, new user should get created
- when user signs in with username and password, should redirect to home page
- newly created user record should have role
- newly created user record should have profile
- newly created user record should have full name, preferred name, and family name
- user object should return first name
- user object should return last name
- user should be able to request reset password email
- user should be able to request be able to create new account
- guest should be notified if username already exists
- guest should be notified if passwords do not match
- guest should be notified if email is not correctly formatted
- new user should be able to register on desktop
- new user should be able to register on tablet
- existing user should be able to sign in on desktop
- existing user should be able to sign in on tablet
- existing user should be able to sign in on phone
- company logo should display on sign-in page -->

===============================
### Licensing  

MIT. Use as you will. Disrupt the current system. It needs all the help it can get.
