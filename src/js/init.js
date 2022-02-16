import menuAnimation from './menu-toggle';
import bindFormEventListener from './form-validate';
import { getProductListData } from './products-api';

import { filterCategory } from './filter-productlists';

const init = () => {
  menuAnimation();
  bindFormEventListener();
  getProductListData();
};

export default init;
