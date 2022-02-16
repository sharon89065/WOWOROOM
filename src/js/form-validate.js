import { api_path } from './config';
// import { getCartlist } from './all';
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
  //   const postOrder = (name, tel, email, address, payment) => {
  //     axios
  //       .post(
  //         `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`,
  //         {
  //           data: {
  //             user: {
  //               name: name,
  //               tel: tel,
  //               email: email,
  //               address: address,
  //               payment: payment,
  //             },
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         getCartlist();
  //       });
  //   };
  inputs.forEach((item) => {
    item.addEventListener('change', () => {
      if (!item.textContent) {
        item.nextElementSibling.textContent = '';
      }
      const errors = validate(form, constraints);
      //   console.log(`errors`, errors);
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#customerName').value;
    const tel = document.querySelector('#customerPhone').value;
    const email = document.querySelector('#customerEmail').value;
    const address = document.querySelector('#customerEmail').value;
    const payment = document.querySelector('#tradeWay').value;

    // postOrder(name, tel, email, address, payment);

    form.reset();
  });
};
export default bindFormEventListener;
