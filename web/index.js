(() => {
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
})();
