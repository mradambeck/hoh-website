////////////
// SPLASH //
////////////

var SPLASH = (function () {
  "use strict";
  var SPLASH = {};

  SPLASH.init = function(){
    document.addEventListener("DOMContentLoaded", function() {
      var splashModule = document.querySelector(".module-splash");
      splashModule.classList.add("active");
    });
  };

  return SPLASH;

})();

module.exports = SPLASH;
