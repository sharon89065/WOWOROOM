import { renderProductList } from './render';

//篩選產品類別
const productList = JSON.parse(window.localStorage.getItem('productlist'));

const filterCategory = (dataArr, category) => {
  if (category === '全部') {
    return renderProductList(dataArr);
  }
  let result = dataArr.filter((item) => {
    return item.category === category;
  });
  return renderProductList(result);
};

const bindSelectListener = () => {
  const productSelected = document.querySelector('.productSelect');

  productSelected.addEventListener('change', (e) => {
    const category = e.target.value;
    const productList = JSON.parse(window.localStorage.getItem('productlist'));
    filterCategory(productList, category);
  });
};

export { filterCategory };
