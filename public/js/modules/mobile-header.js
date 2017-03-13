"use strict";
////////////
// HEADER //
////////////

var MOBILEHEADER = (function () {
  var menuToggle = document.getElementById('navbar--toggle--js'),
      nav = document.getElementById('navbar--js'),
      mainHeader = document.getElementById('navbar'),
      navLinks = document.getElementsByClassName('navbar--site-link'),
      overlay = document.getElementById('navbar--overlay'),
      closeables = [];

  for (var i=0; i<navLinks.length; i++){
    closeables.push(navLinks[i]);
  }
  closeables.push(menuToggle);
  closeables.push(overlay);

  function toggleMenu() {
    nav.classList.contains('active')? (nav.classList.remove('active')) : (nav.classList.add('active'));
    overlay.classList.contains('active')? (overlay.classList.remove('active')) : (overlay.classList.add('active'));

    if (window.pageYOffset < 50){
      mainHeader.classList.contains('transparent')? (mainHeader.classList.remove('transparent')) : (mainHeader.classList.add('transparent'));
    }
  }

  closeables.map(function(el){
    el.onclick = function(){
      toggleMenu();
    }
  });


  // for (var i=0; i<navLinks.length; i++) {
  //   navLink
  // }

})();
