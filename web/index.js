(() => {
  let hamburger = document.getElementById('ds-hamburger');
  let menu = document.getElementById('ds-menu');
  if (hamburger && menu) {
    hamburger.onclick = () => {
      menu.classList.toggle('display');
    };  
  }
})();
