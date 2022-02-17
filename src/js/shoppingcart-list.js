import { getCartlistData } from './getData-api';
import { renderCartlist } from './render';

const initShoppingcart = async () => {
  const { data: response } = await getCartlistData();
  renderCartlist(response.carts, response);
};

export default initShoppingcart;
