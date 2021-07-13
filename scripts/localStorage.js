// Gitting data from JSON and parse it into array
export const getLocalStorage = function () {
  return JSON?.parse(localStorage.getItem('cart-lomoda')) || [];
};

// convert into JSON and pass into local storage
export const setLocalStorage = function (data) {
  localStorage.setItem('cart-lomoda', JSON.stringify(data));
};
