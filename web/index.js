window.onload = () => {
  let hamburger = document.getElementById('ds-hamburger');
  let menu = document.getElementById('ds-menu');

  const toggleMenu = () => {
    menu.classList.toggle('display');
  }

  if (hamburger && menu) {
    hamburger.onclick = () => toggleMenu();
    menu.onclick = (event) => {
      if (event.target.id == 'ds-menu') toggleMenu();
    };
  }

  let icons = document.querySelectorAll('._ds-form.select .icons');
  icons.forEach((node) => {
    let select = node.parentNode.querySelector('select');
    if (node.children[1]) {
      select.style.paddingLeft = `${23 + node.children[1].offsetWidth}px`;
    }
    select.style.paddingRight = `${23 + node.children[0].offsetWidth}px`;
  });
};
