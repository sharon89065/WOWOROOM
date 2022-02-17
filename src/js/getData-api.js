import { api_path } from './config';

export const getProductListData = () => {
  return axios.get(
    `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`
  );
};

export const getCartlistData = () => {
  return axios.get(
    `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
  );
};

export const addCartlistData = (id, num) => {
  return axios.post(
    `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
    {
      data: {
        productId: id,
        quantity: num,
      },
    }
  );
};

export const getDeleteCartList = () => {
  return axios.delete(
    `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
  );
};

export const getDeleteSpecCartList = (cartId) => {
  return axios.delete(
    `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${cartId}`
  );
};

export const postOrder = (name, tel, email, address, payment) => {
  return axios.post(
    `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`,
    {
      data: {
        user: {
          name: name,
          tel: tel,
          email: email,
          address: address,
          payment: payment,
        },
      },
    }
  );
};
