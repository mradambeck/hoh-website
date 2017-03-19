
//////////////////////
// SCROLL TO HASHES //
//////////////////////

var RELOCATE = (function(){
  "use strict";

  var REL = {};

  // relocates user to hash location on reload
  REL.scrollToHash = function(hash){
    var target = document.querySelector(hash);
    target.scrollIntoView();
  };

  return REL;

})();

module.exports = RELOCATE;
