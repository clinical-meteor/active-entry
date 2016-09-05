Package.describe({
  name: 'clinical:entry',
  version: '1.6.0',
  summary: 'SignIn, SignUp, and ForgotPassword methods for Clinical Framework.',
  git: 'https://github.com/clinical-meteor/entry',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'accounts-base',
    'accounts-password'
  ]);

  api.use([
    'meteor-platform',
    'session',
    'reactive-dict'
  ], ['client']);

  api.addFiles([
    'lib/Entry.js',
    'lib/Accounts.js'
  ]);

  api.imply('accounts-base');
  api.imply('accounts-password');


  api.export("Entry");

  // backwards compatibility with API
  api.export("ActiveEntry");
});
