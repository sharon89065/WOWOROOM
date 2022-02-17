import {
  addCartlistData,
  getDeleteSpecCartList,
  getDeleteCartList,
} from './getData-api';

import { renderCartlist } from './render';

const increaseEventHandler = (elements) => {
  Array.from(elements).forEach((element) => {
    element.addEventListener('click', async (e) => {
      const productId = e.currentTarget.getAttribute('data-productid');

      let quantity = e.currentTarget.getAttribute('data-quantity');

      const input = document.querySelector(
        `input[data-productid="${productId}"]`
      );
      quantity++;
      input.value = quantity;
      const { data: res } = await addCartlistData(productId, quantity);
      renderCartlist(res.carts, res);
      return alert('商品新增成功👏');
    });
  });
};

const decreaseEventHandler = (elements) => {
  Array.from(elements).forEach((element) => {
    element.addEventListener('click', async (e) => {
      const cartId = e.currentTarget.getAttribute('data-cartId');
      const productId = e.currentTarget.getAttribute('data-productid');
      let quantity = e.currentTarget.getAttribute('data-quantity');
      const input = document.querySelector(
        `input[data-productid="${productId}"]`
      );
      quantity--;
      input.value = quantity;
      if (quantity === 0) {
        if (confirm(`確定刪除這個商品嗎，有點可惜噎🥺`) === true) {
          const { data: res } = await getDeleteSpecCartList(cartId);
          window.cartproductIdArr.splice(
            window.cartproductIdArr.indexOf('productId'),
            1
          );
          return renderCartlist(res.carts, res);
        }
      }
      const { data: res } = await addCartlistData(productId, quantity);
      renderCartlist(res.carts, res);
      return alert('更改商品數量成功👏');
    });
  });
};

const inputChangeEventHandler = (elements) => {
  Array.from(elements).forEach((element) => {
    element.addEventListener('change', async (e) => {
      let productId = e.currentTarget.getAttribute('data-productid');
      console.log(productId);
      let quantity = Number(e.currentTarget.value);
      if (confirm(`確定更改此商品數量嗎⁉️`) === true) {
        if (quantity < 1) {
          quantity = 1;
          e.currentTarget.value = quantity;
          return alert(`數量不能小於1喔～～`);
        }
        const { data: res } = await addCartlistData(productId, quantity);
        return renderCartlist(res.carts, res);
      }
      return;
    });
  });
};

//綁上刪除全部事件
const addDeletAllEventHandler = (element) => {
  element.addEventListener('click', async (e) => {
    e.preventDefault();
    const { data: res } = await getDeleteCartList();
    renderCartlist(res.carts, res);
    window.cartproductIdArr = [];
    return alert('購物車已清空');
  });
};

//刪除特定資料
const addDeletSpecEventHandler = (elements) => {
  elements.forEach((element) => {
    element.addEventListener('click', async (e) => {
      e.preventDefault();
      const cartId = e.target.getAttribute('data-cartid');
      const productId = e.currentTarget.getAttribute('data-productid');
      const { data: res } = await getDeleteSpecCartList(cartId);
      window.cartproductIdArr.splice(
        window.cartproductIdArr.indexOf(productId),
        1
      );
      return renderCartlist(res.carts, res);
    });
  });
};

export const bindShoppingcartListener = () => {
  const disSpecCartBtn = document.querySelectorAll('.discardBtn a');
  addDeletSpecEventHandler(disSpecCartBtn);
  const discardAllBtn = document.querySelector('.discardAllBtn');
  addDeletAllEventHandler(discardAllBtn);
  const numberInputs = document.querySelectorAll('.numberInput');
  inputChangeEventHandler(numberInputs);
  const increaseBtns = document.querySelectorAll('.increaseBtn');
  increaseEventHandler(increaseBtns);
  const decreaseBtns = document.querySelectorAll('.decreaseBtn');
  decreaseEventHandler(decreaseBtns);
};
