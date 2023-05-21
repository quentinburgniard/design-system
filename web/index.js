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

  const toggleSelect = async (event) => {
    let parentNode = event.target.closest('.select');
    let button = parentNode.querySelector('button');
    let select = parentNode.querySelector('select');
    let ul = parentNode.querySelector('ul');
    let value = event.target.getAttribute('data-value');

    background.classList.toggle('display');
    ul.classList.toggle('display');
    buttons.forEach((node) => {
      if (node.getAttribute('data-name') != button.getAttribute('data-name')) node.classList.toggle('z-index-medium');
    });
    
    if (value) {
      let handled = true;
      if (ds.formSelectHandler) handled = await ds.formSelectHandler(event);
      if (handled) {
        select.value = value;
        button.querySelector('.title').innerText = event.target.innerText;
      }
    }
  }

  buttons.forEach((node) => {
    node.addEventListener('click', toggleSelect);
  });

  document.querySelectorAll('._ds-form.select li').forEach((node) => {
    node.addEventListener('click', toggleSelect);
  });

  const clickLeftIcon = (row) => {
    let childrenSize = row.children[0].offsetWidth;
    row.scrollLeft = childrenSize * Math.floor(row.scrollLeft / Math.ceil(childrenSize));
  }

  const clickRightIcon = (row) => {
    let childrenSize = row.children[0].offsetWidth;
    let maxScroll = row.scrollWidth - row.offsetWidth + 1;
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

  ds.newToast = (text, colClasses, icon) => {
    let row = document.querySelector('.ds-toasts .row');
    let col = document.createElement('div');
    col.className = colClasses ? colClasses : 'col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 offset-sm-4 offset-md-6 offset-lg-7 offset-xl-8';
    col.innerHTML = `<div role="status" class="toast animate__animated animate__fadeInDown">
      <div class="_ds-toast text">${text}</div>
      <div class="_ds-toast action-icon">
        <i class="bi ${icon ? icon : 'bi-x-lg'}"></i>
      </div>
    </div>`;
    row.appendChild(col);
    setTimeout(() => {
      col.remove()
    }, 3000);
  };
};
