import { cartModalOpen, cartModalClose } from './model.js';
import pageCategory from './pageCategory.js';
import pageCardGood from './pageCardGood.js';
import { getLocalStorage } from './localStorage.js';

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');
const headerCityButton = document.querySelector('.header__city-button');
export let hash = location.hash.slice(1);

// Склонение слова
const declOfNum = (n, titles) => {
  return (
    n +
    ' ' +
    titles[
      n % 10 === 1 && n % 100 !== 11
        ? 0
        : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
    ]
  );
};

pageCategory(hash);
pageCardGood(hash);

// Обновить склонение слова в зависимости от числа
export const updateCountGoodsCart = function () {
  if (getLocalStorage().length) {
    subheaderCart.textContent = declOfNum(getLocalStorage().length, [
      'товар',
      'товара',
      'товаров',
    ]);
  } else {
    subheaderCart.textContent = 'Корзина';
  }
};
updateCountGoodsCart();

export const updateLocation = function () {
  headerCityButton.textContent =
    localStorage.getItem('lomodaLocation') || 'Ваш город?';
};

cartOverlay.addEventListener('click', event => {
  const target = event.target;

  if (
    target.classList.contains('cart__btn-close') ||
    target.classList.contains('cart-overlay')
  ) {
    cartModalClose(cartOverlay);
  }
});

subheaderCart.addEventListener('click', cartModalOpen.bind(null, cartOverlay));

headerCityButton.addEventListener('click', () => {
  const city = prompt('What is your city ?');
  if (city !== null) {
    localStorage.setItem('lomodaLocation', city);
  }
  updateLocation();
});
updateLocation();

document.addEventListener('keydown', function (event) {
  if (
    event.key === 'Escape' &&
    cartOverlay.classList.contains('cart-overlay-open')
  ) {
    cartModalClose();
  }
});
