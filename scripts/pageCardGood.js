import getGoods from './service.js';
import { getLocalStorage } from './localStorage.js';
import { setLocalStorage } from './localStorage.js';
import { deleteItemCart } from './cart.js';
import { updateCountGoodsCart } from './index.js';

const cardGoodImage = document.querySelector('.card-good__image');
const cardGoodBrand = document.querySelector('.card-good__brand');
const cardGoodTitle = document.querySelector('.card-good__title');
const cardGoodPrice = document.querySelector('.card-good__price');
const cardGoodColor = document.querySelector('.card-good__color');
const cardGoodColorList = document.querySelector('.card-good__color-list');
const cardGoodSizes = document.querySelector('.card-good__sizes');
const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
const cardGoodBuy = document.querySelector('.card-good__buy');
const cardGoodSelectWrapper = document.querySelectorAll(
  '.card-good__select__wrapper'
);

export default hash => {
  ///////////////////////////////////////////////////////////////////////
  // Single page of the product
  try {
    if (!document.querySelector('.card-good')) {
      throw 'This is not a cart-good page';
    }

    const generateList = data =>
      data.reduce(
        (html, item, i) =>
          html +
          `<li class="card-good__select-item" data-id="${i}">${item}</li>`,
        ''
      );

    const renderCardGood = function ([
      { id, photo, cost, brand, color, sizes, name },
    ]) {
      const data = {
        brand,
        name,
        cost,
        id,
      };

      cardGoodBrand.textContent = brand;
      cardGoodTitle.textContent = name;
      cardGoodPrice.textContent = `${cost} ₽`;
      cardGoodImage.src = `goods-image/${photo}`;
      cardGoodImage.alt = `${brand} ${name}`;

      // some goods don't have color or sizes, we simply take away their buttons from pages
      if (color) {
        cardGoodColor.textContent = color[0];
        cardGoodColor.dataset.id = 0;
        cardGoodColorList.innerHTML = generateList(color);
      } else {
        cardGoodColor.style.display = 'none';
      }
      if (sizes) {
        cardGoodSizes.textContent = sizes[0];
        cardGoodSizes.dataset.id = 0;
        cardGoodSizesList.innerHTML = generateList(sizes);
      } else {
        cardGoodSizes.style.display = 'none';
      }

      if (getLocalStorage().some(item => item.id === id)) {
        cardGoodBuy.classList.add('delete');
        cardGoodBuy.textContent = 'Удалить из корзины';
      }

      // Putting data into the local storage by clicking on 'Добавить в корзину'
      cardGoodBuy.addEventListener('click', () => {
        if (cardGoodBuy.classList.contains('delete')) {
          deleteItemCart(id);
          cardGoodBuy.classList.remove('delete');
          cardGoodBuy.textContent = 'Добавить в корзину';
          return;
        }

        if (color) data.color = cardGoodColor.textContent;
        if (sizes) data.size = cardGoodSizes.textContent;

        cardGoodBuy.classList.add('delete');
        cardGoodBuy.textContent = 'Удалить из корзины';

        // take data from local storage, set new, put back to local storage
        const cardData = getLocalStorage();
        cardData.push(data);
        setLocalStorage(cardData);
        updateCountGoodsCart();
      });
    };

    // Selecting two buttons uses forEach; taking closest element of our target, that is a button class; adding class to this button
    cardGoodSelectWrapper.forEach(item => {
      item.addEventListener('click', function (e) {
        const target = e.target;

        if (target.closest('.card-good__select')) {
          target.classList.toggle('card-good__select__open');
        }

        // clicking on item in the list and closing the whole tab
        if (target.closest('.card-good__select-item')) {
          const cardGoodSelectItem = item.querySelector('.card-good__select');

          cardGoodSelectItem.textContent = target.textContent;
          cardGoodSelectItem.dataset.id = target.dataset.id;

          cardGoodSelectItem.classList.remove('card-good__select__open');
        }
      });
    });

    getGoods(renderCardGood, 'id', hash);
  } catch (err) {
    console.warn(err);
  }
};
