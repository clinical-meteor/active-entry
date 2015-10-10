Package.describe({
  name: 'clinical:active-entry',
  version: '0.2.3',
  // Brief, one-line summary of the package.
  summary: 'SignIn, SignUp, and ForgotPassword pages for Clinical Framework. ',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/awatson1978/clinical-entry-pages',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');
  //api.addFiles('clinical-entry-pages.js');

  api.use('photonic:glass-ui');

  api.use([
    'templating',
    'iron:router@1.0.4',
    'grove:less@0.1.0',
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
    'iron:router@1.0.4',
    'grove:less',
    'standard-app-packages'
  ], ['client']);

  api.use('tinytest');
  api.use('photonic:active-entry');
  api.use('clinical:verification');
  api.addFiles('tests/tinytest/clinical-entry-pages-tests.js');
});
