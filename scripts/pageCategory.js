import getGoods from './service.js';

const goodsList = document.querySelector('.goods__list');

// create HTML
const createCards = ({ id, preview, cost, brand, sizes, name }) => {
  const li = document.createElement('li');
  li.classList.add('goods__item');
  li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                    ${
                      sizes
                        ? `                <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(
                            ' '
                          )}</span></p>`
                        : ``
                    }
                    <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                </div>
            </article>
        `;
  return li;
};

export default hash => {
  ///////////////////////////////////////////////////////////////////////
  // goods page
  try {
    const changeTitle = function () {
      document.querySelector('.goods__title').textContent =
        document.querySelector(`[href*="#${hash}"]`).textContent; // find element by hash
    };

    if (!goodsList) {
      throw 'This is not a goods page!';
    }

    // receives the list of array of data about goods, and from every element of data thtough loop creates HTML element
    const renderGoodsList = function (data) {
      goodsList.innerHTML = '';

      data.forEach(element => {
        const card = createCards(element);
        goodsList.append(card);
      });
    };

    changeTitle();
    getGoods(renderGoodsList, 'category', hash);

    // change window when hash is changed
    window.addEventListener('hashchange', function () {
      hash = location.hash.slice(1);
      // getGoods handle the data by renderGoodsList function
      getGoods(renderGoodsList, 'category', hash);
      changeTitle();
    });
  } catch (err) {
    console.warn(err);
  }
};
