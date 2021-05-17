// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const header = document.querySelector("header");
const h1 = header.querySelector("h1");
const img = header.querySelector("img");

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js', { scope: '/Lab7/' }).then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let entryVal = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        const entryConst = entryVal;
        newPost.addEventListener("click", () => {
          window.history.pushState({state:"entry", number:entryConst, entry:newPost.entry}, "","/Lab7/#entry" + entryConst);
          setState({state:"entry", number:entryConst, entry:newPost.entry});
        })
        entryVal += 1;
      });
    });
});

h1.addEventListener("click", () => {
    window.history.pushState({state:"journal-entry"}, "", "/Lab7/");
    setState({state:"journal-entry"});
});

img.addEventListener("click", () => {
  let strArrHash = window.location.href.split("#");

  if (strArrHash.length == 1 || strArrHash[1] != "settings")
  {
    window.history.pushState({state:"settings"}, "", "/Lab7/#settings");
    setState({state:"settings"});
  }
});

window.onpopstate = function(event) {
  let strArrHash = event.srcElement.window.location.href.split("#");
  let currentPage = strArrHash[1];
  setState({state:currentPage})
}