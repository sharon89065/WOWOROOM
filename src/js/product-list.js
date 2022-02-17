import {
  getProductListData,
  addCartlistData,
  getCartlistData,
} from './getData-api';
import { renderProductList, renderCartlist } from './render';

let productListData;

const filterCategory = (category) => {
  if (category === '全部') {
    return renderProductList(productListData);
  }
  let result = productListData.filter((item) => {
    return item.category === category;
  });
  return renderProductList(result);
};

const bindFilterListener = () => {
  const productSelected = document.querySelector('.productSelect');
  productSelected.addEventListener('change', (e) => {
    const category = e.target.value;
    filterCategory(category);
  });
};

export const bindAddCartListener = async () => {
  window.cartproductIdArr = [];
  const { data: res } = await getCartlistData();
  res.carts.forEach((item) => {
    window.cartproductIdArr.push(item.product.id);
  });
  const addCartBtns = document.querySelectorAll('.addCardBtn');
  addCartBtns.forEach((addCartBtn) => {
    let productNum;
    addCartBtn.addEventListener('click', async (e) => {
      const currentProductId = e.target.getAttribute('data-id');
      e.preventDefault();
      if (window.cartproductIdArr.includes(currentProductId)) {
        return alert(`購物車已存在此商品`);
      }
      window.cartproductIdArr.push(currentProductId);
      productNum = 1;
      const { data: res } = await addCartlistData(currentProductId, productNum);
      renderCartlist(res.carts, res);
      return alert('已成功加入購物車💖');
    });
  });
};

const initProductList = async () => {
  try {
    // 1.call API獲取productList
    const { data } = await getProductListData();
    productListData = data.products;
    // 2. 渲染初始頁面上全部的products
    renderProductList(productListData);
    // 3. 綁定filter事件監聽
    bindFilterListener();
  } catch (error) {
    console.error(error);
  }
};

export default initProductList;
