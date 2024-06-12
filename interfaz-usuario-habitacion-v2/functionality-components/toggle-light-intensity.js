AFRAME.registerComponent('toggle-light-intensity', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleIntensity);
      this.cooldown = false; // enfriamiento
    },
  
    bindMethods: function () {
      this.toggleIntensity = this.toggleIntensity.bind(this);
    },
  
    toggleIntensity: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var roomLight = document.querySelector('#room-light');
      var currentIntensity = roomLight.getAttribute('light').intensity;
  
      if (currentIntensity > 0.5) {
        roomLight.setAttribute('light', 'intensity', 0.5);
      } else {
        roomLight.setAttribute('light', 'intensity', 0.85);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  