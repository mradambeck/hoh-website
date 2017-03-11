"use strict";
////////////
// HEADER //
////////////

var HEADER = (function () {

  var HDR = {};

  var navbar = document.getElementById('navbar');
  var navHeight = window.getComputedStyle(navbar, null).getPropertyValue("height").split('px')[0];
  navHeight = parseInt(navHeight);

  var scrollPosition;
  window.onscroll = getScrollPosition;

  function getScrollPosition(){
    scrollPosition = window.pageYOffset;

    if( scrollPosition > navHeight) {
      navbar.classList.remove('transparent');
    }

    if ( scrollPosition < navHeight) {
      navbar.classList.add('transparent');
    }
  }

  return HDR;

})();
