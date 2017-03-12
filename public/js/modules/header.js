"use strict";
////////////
// HEADER //
////////////

var HEADER = (function () {
  var path = window.location.pathname;
  var navbar = document.getElementById('navbar');
  var navHeight = window.getComputedStyle(navbar, null).getPropertyValue("height").split('px')[0];
      navHeight = parseInt(navHeight);
  var scrollPosition;

  function getScrollPosition(){
    scrollPosition = window.pageYOffset;

    if( scrollPosition > navHeight) {
      navbar.classList.remove('transparent');
    }

    if ( scrollPosition < navHeight) {
      navbar.classList.add('transparent');
    }
  }

  if (path === "/"){
    window.onscroll = getScrollPosition;
  } else {
    navbar.classList.remove('transparent');
  }


})();
