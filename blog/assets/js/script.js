'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * search bar toggle
 */

const searchBar = document.querySelector("[data-search-bar]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleSearchBar = function () {
  searchBar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

// <-----------------JOin now button------------------>

addEventOnElem(searchTogglers, "click", toggleSearchBar);

const joinBtn    = document.querySelector('.btn');
const modalEl    = document.getElementById('join-modal');
const closeModal = () => modalEl.classList.add('hidden');
joinBtn.addEventListener('click', ()=> modalEl.classList.remove('hidden'));
modalEl.querySelector('.modal-close').addEventListener('click', closeModal);

document.getElementById('join-form').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    name:  e.target.name.value,
    email: e.target.email.value
  };
  const res = await fetch('https://script.google.com/macros/s/AKfycbygYh_hNrNBaS-nUY7joUaojb5X_pbw4aV84nL4rYxw59UVOwNo4wuiIIXYVpWwMpnc/exec', {
    method: 'POST',
    body:   JSON.stringify(data)
  });
  if (res.ok) {
    document.getElementById('join-msg').innerText = 'Thanks for joining!';
    setTimeout(closeModal, 2000);
    e.target.reset();
  } else {
    document.getElementById('join-msg').innerText = 'Oops, try again.';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const joinBtn    = document.querySelector('.btn');
  const modalEl    = document.getElementById('join-modal');
  const pageWrap   = document.querySelector('.page-content');
  const form       = document.getElementById('join-form');
  const closeBtn   = modalEl.querySelector('.modal-close');
  const msgEl      = document.getElementById('join-msg');
  const submitBtn  = form.querySelector('button[type="submit"]');
  let autoTimer;

  function openModal() {
    if (sessionStorage.getItem('modalClosed')) return;
    pageWrap.classList.add('blurred');   // blur page
    modalEl.classList.remove('hidden');  // show modal
  }

  function closeModal() {
    sessionStorage.setItem('modalClosed', '1');
    pageWrap.classList.remove('blurred');
    modalEl.classList.add('hidden');
  }

  // 1) Click Join
  joinBtn.addEventListener('click', openModal);

  // 2) Click ✕
  closeBtn.addEventListener('click', closeModal);

  // 3) Auto-show after 1 minute
  autoTimer = setTimeout(openModal, 60 * 1000);

  // 4) Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing…';

    // TODO: replace this with your real fetch() to Google Apps Script
    await new Promise(r => setTimeout(r, 800));

    // on success
    submitBtn.textContent = 'Subscribed';
    msgEl.textContent = 'Thank you!';

    // hide after 0.5 seconds
    setTimeout(closeModal, 500);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // grab hero form + its email field
  const heroForm        = document.querySelector('.newsletter-form');
  const heroEmailInput  = heroForm.querySelector('input[name="email_address"]');

  

  // grab the modal’s email field + the success message element
  const modalEmailInput = document
    .getElementById('join-form')
    .querySelector('input[name="email"]');
  const joinMsgEl       = document.getElementById('join-msg');

  // on hero‑form submit → prefill modal + open it
  heroForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = heroEmailInput.value.trim();
    if (!email) return;
    modalEmailInput.value = email;
    document.querySelector('.btn').click();
  });

  // watch for any text in #join-msg, then clear the hero email input
  if (joinMsgEl && heroEmailInput) {
    const observer = new MutationObserver((mutations, obs) => {
      if (joinMsgEl.textContent.trim() !== '') {
        heroEmailInput.value = '';   // <-- clear the value, don’t remove the element
        obs.disconnect();
      }
    });
    observer.observe(joinMsgEl, { childList: true, subtree: true });
  }
});



