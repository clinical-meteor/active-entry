

Template.registerHelper("getLogoUrl", function (argument){
  var config = Session.get('Photonic.ActiveEntry');
  if(config && config.logo && config.logo.url){
    return config.logo.url;
  }else{
    return "";
  }
});
