import { api_path, token } from './config';
import { renderProductList } from './render';
//1. 運用window.property儲存api回來的結果
//2. 如果window.property已經有值就不call api
//3. 判斷該變數是否已經有值，有的話不call api

const productList = JSON.parse(window.localStorage.getItem('productlist'));

const getProductListData = () => {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`
    )
    .then((res) => {
      const results = res.data.products;
      window.localStorage.setItem('productlist', JSON.stringify(results));
      renderProductList(results);
    });
};
renderProductList(productList);

export { getProductListData };
