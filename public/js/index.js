var userLocation = window.location.pathname;
var hash = window.location.hash;

var HEADER = require("./modules/header.js");

HEADER.init(userLocation);
HEADER.initMobile();

// HOMEPAGE ONLY
if (userLocation === "/"){
  var ZENSCROLL =   require("./modules/zenscroll.js");
  var SPLASH =      require("./modules/splash.js");
  var RELOCATE =    require("./modules/relocate.js");


  SPLASH.init();

  // If there's a hash link in the URL:
  if (!!hash){
    RELOCATE.scrollToHash(hash);
  }

} else {

  HEADER.rebuildLinks();

}
