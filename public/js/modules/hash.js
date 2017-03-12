"use strict";
////////////////
// HASH LINKS //
////////////////

var RELOCATE = (function(){
  // relocates user to has location on reload
  var hashish = window.location.hash;
  if (!!hashish){
    var target = document.querySelector(hashish);
    target.scrollIntoView();
  }

  // changes urls in navbar if not on the homepage
  var path = window.location.pathname;
  if (path !== "/"){
    var links = document.getElementsByClassName('navbar--site-link');
    for (var i = 0; i < links.length; i++) {
      links[i].href = "/" + links[i].hash;
    }
  }
})();
