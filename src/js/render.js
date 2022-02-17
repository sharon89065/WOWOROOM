import { bindShoppingcartListener } from './shoppingcart-eventhandler';
import { bindAddCartListener } from './product-list';

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
  return bindAddCartListener();
};

export const renderCartlist = (dataArr, order) => {
  const shoppingCartTable = document.querySelector('.shoppingcartTable ');
  if (Array.isArray(dataArr) && dataArr.length === 0) {
    return (shoppingCartTable.innerHTML = `<div><p class="shoppingcart__info">目前購物車沒有東西</p></div>`);
  }
  let str = `  <tr>
  <th width="40%">品項</th>
  <th>單價</th>
  <th>數量</th>
  <th>金額</th>
  <th></th>
</tr>`;
  dataArr.forEach((item) => {
    str += ` <tr>
<td>
    <div class="shoppingcart__item">
        <img src="${item.product.images}" alt="${item.product.title}">
        <p>${item.product.title}</p>
    </div>
</td>
<td>NT$${item.product.price}</td>
<td> 
<div class="shoppingcart__amount">
<div class="shoppingcart__amount-btn decreaseBtn "data-productid="${
      item.product.id
    }" data-quantity="${item.quantity}" data-cartId="${item.id}"">-</div>
<input type="number" class="number numberInput" min="0" value="${
      item.quantity
    }" data-productid="${item.product.id}" data-quantity="${
      item.quantity
    }" data-cartId="${item.id}"/>
<div class="shoppingcart__amount-btn  increaseBtn"data-productid="${
      item.product.id
    }" value="Increase Value" data-quantity="${item.quantity}" data-cartId="${
      item.id
    }">+</div>
</div>
</td>
<td>NT$${item.product.price * item.quantity}</td>
<td class="shoppingcart__discardBtn discardBtn">
    <a href="#" class="material-icons " data-cartId="${
      item.id
    }" data-productid="${item.product.id}">
        clear
    </a>
</td>
</tr>`;
  });
  str += `  <tr>
  <td>
      <a href="#" class="shoppingcart__discardBtn-all discardAllBtn">刪除所有品項</a>
  </td>
  <td></td>
  <td></td>
  <td>
      <p>總金額</p>
  </td>
  <td>NT$${order.finalTotal}</td>
</tr>`;
  shoppingCartTable.innerHTML = str;
  return bindShoppingcartListener();
};
