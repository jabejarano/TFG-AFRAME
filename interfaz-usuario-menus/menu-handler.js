AFRAME.registerComponent('menu-handler', {
    schema: {
      menuId: { type: 'string' }
    },
  
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleMenu);
      this.cooldown = false; 
    },
  
    bindMethods: function () {
      this.toggleMenu = this.toggleMenu.bind(this);
    },
  
    toggleMenu: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
      
      var menuEl = document.querySelector(this.data.menuId);
      var isVisible = menuEl.getAttribute('visible');
      menuEl.setAttribute('visible', !isVisible);

      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  