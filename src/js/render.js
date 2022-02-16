export const renderProductList = (dataArr) => {
  const productLists = document.querySelector('.productWrap');
  let str = '';
  dataArr.forEach((item) => {
    str += `<li class="product__card productCard">
        <h4 class="product__type">新品</h4>
        <img src="${item.images}" alt="${item.title}">
        <a href="#" class="product__add  addCardBtn" data-id="${item.id}">加入購物車</a>
        <h3>${item.title}</h3>
        <del class="product__price-origin  originPrice">${item.origin_price}</del>
        <p class="product__price-now nowPrice">${item.price}</p>
    </li>`;
  });
  productLists.innerHTML = str;
};
