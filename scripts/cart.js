import { getLocalStorage, setLocalStorage } from './localStorage.js';
import { updateCountGoodsCart } from './index.js';

const cartListGoods = document.querySelector('.cart__list-goods');
const cartTotalCost = document.querySelector('.cart__total-cost');

// rendering cart with the data, taken from localstorage, from cardGoodBuy button
export const renderCart = () => {
  cartListGoods.textContent = '';

  let totalCost = 0;
  const cartItems = getLocalStorage();
  cartItems.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${i + 1}</td>
        <td>${item.brand} ${item.name}</td>
        ${item.color ? `<td>${item.color}</td>` : `<td>-</td>`}
        ${item.size ? `<td>${item.size}</td>` : `<td>-</td>`}
        <td>${item.cost} &#8381;</td>
        <td><button class="btn-delete" data-id="${
          item.id
        }">&times;</button></td>
      `;
    totalCost += item.cost;
    cartListGoods.append(tr);
  });

  cartTotalCost.textContent = `${totalCost} ₽`;
};

export const deleteItemCart = id => {
  const cartItems = getLocalStorage();
  const newCartItems = cartItems.filter(item => item.id !== id);
  setLocalStorage(newCartItems);
  updateCountGoodsCart();
};

cartListGoods.addEventListener('click', function (e) {
  if (e.target.matches('.btn-delete')) {
    deleteItemCart(e.target.dataset.id); // bcs this function takes id as an argument
    renderCart();
  }
});

document.addEventListener('keydown', function (event) {
  if (
    event.key === 'Escape' &&
    cartOverlay.classList.contains('cart-overlay-open')
  ) {
    cartModalClose();
  }
});

const newFeature = function (word) {
  console.log(word);
};
newFeature('name');
