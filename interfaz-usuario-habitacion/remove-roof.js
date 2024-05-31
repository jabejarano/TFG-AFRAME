AFRAME.registerComponent('remove-roof', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleRoof);
      this.cooldown = false; // Flag de enfriamiento
    },
  
    bindMethods: function () {
      this.toggleRoof = this.toggleRoof.bind(this);
    },
  
    toggleRoof: function () {
      if (this.cooldown) return; // Si está en enfriamiento, no hacer nada
      this.cooldown = true; // Activar el enfriamiento
  
      var ceiling = document.querySelector('#ceiling');
      if (ceiling) {
        var isVisible = ceiling.getAttribute('visible');
        ceiling.setAttribute('visible', !isVisible);
      }
  
      // Desactivar el enfriamiento después de 1 segundo (1000 ms)
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  