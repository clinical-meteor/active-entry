Package.describe({
  name: 'clinical:active-entry',
  version: '1.4.2',
  summary: 'SignIn, SignUp, and ForgotPassword pages for Clinical Framework.',
  git: 'https://github.com/clinical-meteor/clinical-active-entry',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  // api.use('photonic:glass-ui@0.2.4');

  api.use([
    'meteor-platform',
    'templating',
    'clinical:router@2.0.13',
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
    'clinical:router@2.0.13',
    'grove:less@0.1.1',
    'standard-app-packages'
  ], ['client']);

  api.use('tinytest');
  api.use('clinical:active-entry');
  api.use('clinical:verification');
  api.addFiles('tests/tinytest/clinical-entry-pages-tests.js');
});
