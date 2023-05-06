window.onload = () => {
  let background = document.getElementById('ds-background');

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

  let buttons = document.querySelectorAll('._ds-form.select button');

  const toggleSelect = (event) => {
    let parentNode = event.target.closest('.select');
    let button = parentNode.querySelector('button');
    let select = parentNode.querySelector('select');
    let ul = parentNode.querySelector('ul');
    let value = event.target.getAttribute('data-value');
    
    if (value) {
      select.value = value;
      button.querySelector('.title').innerText = event.target.innerText;
    }

    background.classList.toggle('display');
    ul.classList.toggle('display');
    buttons.forEach((node) => {
      if (node.id != button.id) node.classList.toggle('z-index-medium');
    });
  }

  buttons.forEach((node) => {
    node.addEventListener('click', toggleSelect);
  });

  document.querySelectorAll('._ds-form.select li').forEach((node) => {
    node.addEventListener('click', toggleSelect);
  });
};
