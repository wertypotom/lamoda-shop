import { renderCart } from './cart.js';

// ------------------------ Scroll blocking -----------------------------

const disableScroll = () => {
  if (document.disableScroll) return;

  const widthScroll = window.innerWidth - document.body.offsetWidth; // getting width of the scroll
  document.disableScroll = true;
  document.body.dbScrollY = window.scrollY; // scol'ko pixeley otmotali

  document.body.style.cssText = `
          position: fixed;
          top: ${-window.scrollY}px;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          padding-right: ${widthScroll}px;
      `;
};

const enableScroll = () => {
  document.disableScroll = false;
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.dbScrollY,
  });
};

//------------------------- Modal window --------------------------------

export const cartModalOpen = function (overlay) {
  overlay.classList.add('cart-overlay-open');
  disableScroll();
  renderCart();
};

export const cartModalClose = function (overlay) {
  overlay.classList.remove('cart-overlay-open');
  enableScroll();
};
