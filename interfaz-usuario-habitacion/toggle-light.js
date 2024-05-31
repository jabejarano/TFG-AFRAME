AFRAME.registerComponent('toggle-light', {
    init: function () {
      this.bindMethods();
      this.cooldown = false; // Añadir un flag de enfriamiento
      this.el.addEventListener('pinchedstarted', this.toggleLight);
    },
  
    bindMethods: function () {
      this.toggleLight = this.toggleLight.bind(this);
    },
  
    toggleLight: function () {
      if (this.cooldown) return; // Si está en enfriamiento, no hacer nada
      this.cooldown = true; // Activar el enfriamiento
  
      var roomLight = document.querySelector('#room-light');
      var lightOn = roomLight.getAttribute('light').intensity > 0;
  
      if (lightOn) {
        roomLight.setAttribute('light', 'intensity', 0);
      } else {
        roomLight.setAttribute('light', 'intensity', 0.85);
      }
  
      // Desactivar el enfriamiento después de 300 ms
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  