import menuAnimation from './menu-toggle';
import bindFormEventListener from './form-validate';
import initProductList from './product-list';
import initShoppingcart from './shoppingcart-list';

const init = () => {
  menuAnimation();
  bindFormEventListener();
  initProductList();
  initShoppingcart();
};

export default init;
