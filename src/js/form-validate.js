import { getCartlistData, postOrder } from './getData-api';
import { renderCartlist } from './render';

const constraints = {
  姓名: {
    presence: { message: '不可留空' },
    length: {
      minimum: 3,
      message: '不能小於3個字',
    },
  },
  電話: {
    presence: { message: '不可留空' },
  },
  寄送地址: { presence: { message: '不可留空' } },
  Email: {
    presence: { message: '不可留空' },
    email: { message: '請確認信箱是否有效' },
  },
};

const bindFormEventListener = () => {
  const form = document.querySelector('form.orderInfo__form');
  const inputs = document.querySelectorAll(
    'input[type=text],input[type=tel],input[type=email]'
  );

  inputs.forEach((item) => {
    item.addEventListener('change', () => {
      if (!item.textContent) {
        item.nextElementSibling.textContent = '';
      }
      const errors = validate(form, constraints);
      if (errors) {
        console.log(Object.keys(errors)); //keys：屬性名
        Object.keys(errors).forEach((key) => {
          document.querySelector(`p[data-message="${key}"]`).textContent =
            errors[key];
        });
      }
      if (!errors) {
        const submit = document.querySelector('input[type=submit]');
        submit.removeAttribute('disabled');
        submit.classList.remove('disabled');
      }
    });
  });
  form.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();
      const name = document.querySelector('#customerName').value;
      const tel = document.querySelector('#customerPhone').value;
      const email = document.querySelector('#customerEmail').value;
      const address = document.querySelector('#customerEmail').value;
      const payment = document.querySelector('#tradeWay').value;
      const { data: res } = await getCartlistData();
      if (res.carts.length === 0) {
        return alert(`目前購物車是空的喔～`);
      }
      await postOrder(name, tel, email, address, payment);
      alert(`訂單建立成功🙌`);
      renderCartlist(res.carts, res);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  });
};
export default bindFormEventListener;
