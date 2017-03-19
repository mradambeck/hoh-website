////////////
// HEADER //
////////////

var HEADER = (function(){
  "use strict";
  var HDR = {};

  var navbar = document.getElementById('navbar'),
      mobileNav = document.getElementById('navbar--js'),
      scrollPosition,
      navHeight = window.getComputedStyle(navbar, null).getPropertyValue("height").split('px')[0],
      menuToggle = document.getElementById('navbar--toggle--js'),
      navLinks = document.getElementsByClassName('navbar--site-link'),
      overlay = document.getElementById('navbar--overlay'),
      closeables = [];

      navHeight = parseInt(navHeight);


  function getScrollPosition(){
    scrollPosition = window.pageYOffset;
    if( scrollPosition > navHeight) {
      navbar.classList.remove('transparent');
    }
    if ( scrollPosition < navHeight && !(mobileNav.classList.contains('active')) ) {
      navbar.classList.add('transparent');
    }
  }


  HDR.init = function(path){
    if (path === "/"){
      window.onscroll = getScrollPosition;
    } else {
      navbar.classList.remove('transparent');
    }
  };


  function toggleMobileMenu() {
    mobileNav.classList.contains('active')? (mobileNav.classList.remove('active')) : (mobileNav.classList.add('active'));
    overlay.classList.contains('active')? (overlay.classList.remove('active')) : (overlay.classList.add('active'));

    if (window.pageYOffset < 50){
      navbar.classList.contains('transparent')? (navbar.classList.remove('transparent')) : (navbar.classList.add('transparent'));
    }
  }

  // Setup mobile menu toggle JS
  HDR.initMobile = function(){
    for (var i=0; i<navLinks.length; i++){
      closeables.push(navLinks[i]);
    }
    closeables.push(menuToggle);
    closeables.push(overlay);

    closeables.map(function(el){
      el.addEventListener("click", function(){
        toggleMobileMenu();
      });
    });
  };

  // changes urls in navbar if not on the homepage
  HDR.rebuildLinks = function(){
    var links = document.getElementsByClassName('navbar--site-link');
    for (var i = 0; i < links.length; i++) {
      links[i].href = "/" + links[i].hash;
    }
  };

  return HDR;
})();

module.exports = HEADER;
