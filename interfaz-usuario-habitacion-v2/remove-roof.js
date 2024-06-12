AFRAME.registerComponent('remove-roof', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleRoof);
      this.cooldown = false; //enfriamiento
    },
  
    bindMethods: function () {
      this.toggleRoof = this.toggleRoof.bind(this);
    },
  
    toggleRoof: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var ceiling = document.querySelector('#ceiling');
      if (ceiling) {
        var isVisible = ceiling.getAttribute('visible');
        ceiling.setAttribute('visible', !isVisible);
      }
  

      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  