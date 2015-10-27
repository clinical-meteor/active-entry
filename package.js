Package.describe({
  name: 'clinical:active-entry',
  version: '1.3.1',
  // Brief, one-line summary of the package.
  summary: 'SignIn, SignUp, and ForgotPassword pages for Clinical Framework. ',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/clinical-meteor/clinical-active-entry',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  //api.addFiles('clinical-entry-pages.js');

  api.use('photonic:glass-ui@0.2.4');

  api.use([
    'templating',
    'iron:router@1.0.9',
    'grove:less@0.1.1',
    'session',
    'reactive-dict',
    'accounts-base',
    'accounts-password'
  ], ['client']);

  api.use([
    'accounts-base',
    'accounts-password'
  ], ['server']);

  api.addFiles([
    'lib/ActiveEntry.js',
    'lib/Accounts.js'
  ]);

  // api.use('iron:router@1.0.4');
  api.addFiles([
    'components/entryPages.js',
    'components/entryPages.less',

    'components/entrySignIn/entrySignIn.html',
    'components/entrySignIn/entrySignIn.js',
    'components/entrySignIn/entrySignIn.less',

    'components/entrySignUp/entrySignUp.html',
    'components/entrySignUp/entrySignUp.js',
    'components/entrySignUp/entrySignUp.less',

    'components/forgotPassword/forgotPassword.html',
    'components/forgotPassword/forgotPassword.js',
    'components/forgotPassword/forgotPassword.less',

  ], ['client']);




  api.export("ActiveEntry");

  api.export('entrySignIn');
  api.export('entrySignUp');

});


Package.onTest(function (api) {
  api.use([
    'templating',
    'iron:router@1.0.9',
    'grove:less@0.1.1',
    'standard-app-packages'
  ], ['client']);

  api.use('tinytest');
  api.use('clinical:active-entry');
  api.use('clinical:verification');
  api.addFiles('tests/tinytest/clinical-entry-pages-tests.js');
});
