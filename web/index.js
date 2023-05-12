window.onload = () => {
  window.ds = window.ds || {};

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
      let handled = true;

      if (ds.formSelectHandler) handled = ds.formSelectHandler(event);

      if (handled) {
        select.value = value;
        button.querySelector('.title').innerText = event.target.innerText;
      }
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

  const clickLeftIcon = (row) => {
    let childrenSize = row.children[0].offsetWidth;
    row.scrollLeft = childrenSize * Math.floor(row.scrollLeft / (childrenSize + 1));
  }

  const clickRightIcon = (row) => {
    let childrenSize = row.children[0].offsetWidth;
    let maxScroll = row.scrollWidth - row.offsetWidth;
    let scroll = childrenSize * (Math.floor(row.scrollLeft / childrenSize) + 1);
    row.scrollLeft = scroll > maxScroll ? maxScroll : scroll;
  }

  const toggleLeftIcon = (icon, row) => {
    if (row.scrollLeft > 0) {
      if (icon.style.display != 'flex') icon.style.display = 'flex';
    } else {
      if (icon.style.display != 'none') icon.style.display = 'none';
    }
  }

  const toggleRightIcon = (icon, row) => {
    if (row.scrollLeft + row.offsetWidth >= row.scrollWidth) {
      if (icon.style.display != 'none') icon.style.display = 'none';
    } else {
      if (icon.style.display != 'flex') icon.style.display = 'flex';
    }
  }

  document.querySelectorAll('.ds-carousel-icons.icon-action-left').forEach((icon) => {
    let row = icon.parentNode.querySelector('.row');

    icon.addEventListener('click', () => {
      clickLeftIcon(row);
    });

    toggleLeftIcon(icon, row);
    row.addEventListener('scroll', () => {
      toggleLeftIcon(icon, row);
    });
    window.addEventListener('resize', () => {
      toggleLeftIcon(icon, row);
    });
  });

  document.querySelectorAll('.ds-carousel-icons.icon-action-right').forEach((icon) => {
    let row = icon.parentNode.querySelector('.row');

    icon.addEventListener('click', () => {
      clickRightIcon(row);
    });

    toggleRightIcon(icon, row);
    row.addEventListener('scroll', () => {
      toggleRightIcon(icon, row);
    });
    window.addEventListener('resize', () => {
      toggleRightIcon(icon, row);
    });
  });
};
