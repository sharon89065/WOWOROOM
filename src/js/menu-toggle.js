// menu 切換
const menuAnimation = () => {
  const menuOpenBtn = document.querySelector('.menuToggle');
  const linkBtn = document.querySelectorAll('.topBarMenu a');
  const menu = document.querySelector('.topBarMenu');

  const determineMenuDisplay = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      menu.classList.add('is-hidden');
    } else {
      menu.classList.remove('is-hidden');
    }
  };
  determineMenuDisplay();
  window.addEventListener('resize', determineMenuDisplay);
  const toggleMenu = () => {
    if (menu.classList.contains('is-hidden')) {
      menu.classList.remove('is-hidden');
    } else {
      menu.classList.add('is-hidden');
    }
  };
  menuOpenBtn.addEventListener('click', toggleMenu);
  linkBtn.forEach((item) => {
    item.addEventListener('click', toggleMenu);
  });
};

export default menuAnimation;
