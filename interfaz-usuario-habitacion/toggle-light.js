AFRAME.registerComponent('toggle-light', {
  init: function () {
      this.bindMethods();
      this.cooldown = false;
      this.el.addEventListener('pinchedstarted', this.toggleLightOff);
      this.el.addEventListener('pinchedended', this.toggleLightOn);
  },

  bindMethods: function () {
      this.toggleLightOff = this.toggleLightOff.bind(this);
      this.toggleLightOn = this.toggleLightOn.bind(this);
  },

  toggleLightOff: function () {
      if (this.cooldown) return;
      this.cooldown = true;

      var roomLight = document.querySelector('#room-light'); // Obtener la entidad de luz de la habitación
      var lightOn = roomLight.getAttribute('light').intensity > 0; // Comprobar si la luz está encendida.

      if (lightOn) {
          roomLight.setAttribute('light', 'intensity', 0);
      }

      setTimeout(() => {
          this.cooldown = false;
      }, 100);
  },

  toggleLightOn: function () {
      if (this.cooldown) return;
      this.cooldown = true;

      var roomLight = document.querySelector('#room-light'); // Obtener la entidad de luz de la habitación.
      var lightOn = roomLight.getAttribute('light').intensity > 0; // Comprobar si la luz está encendida.

      if (!lightOn) {
          roomLight.setAttribute('light', 'intensity', 0.85);
      }

      setTimeout(() => {
          this.cooldown = false;
      }, 100);
  }
});
