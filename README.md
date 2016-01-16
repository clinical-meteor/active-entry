## clinical:active-entry

This package provides the SignIn, SignUp, and ForgotPassword pages.  


===============================
#### Installation

````
meteor add clinical:active-entry
````

===============================
#### Entry Flowchart

The following diagram represents the entry workflow that is being implemented in this package.  This package is under active development, and is about half completed.  Pull requests which help implement the following workflow will be fast-tracked and accepted into the package.

![entry-workflow](https://raw.githubusercontent.com/clinical-meteor/clinical-active-entry/master/docs/Entry%20Workflow.png)



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

===============================
### Quality Assurance

````bash
starrynight fetch
starrynight autoconfig
starrynight run-tests --type verification
````

===============================
### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
