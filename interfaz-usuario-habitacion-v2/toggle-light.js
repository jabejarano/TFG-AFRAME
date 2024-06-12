AFRAME.registerComponent('toggle-light', {
    init: function () {
      this.bindMethods();
      this.cooldown = false; // enfriamiento
      this.el.addEventListener('pinchedstarted', this.toggleLight);
    },
  
    bindMethods: function () {
      this.toggleLight = this.toggleLight.bind(this);
    },
  
    toggleLight: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var roomLight = document.querySelector('#room-light');
      var lightOn = roomLight.getAttribute('light').intensity > 0;
  
      if (lightOn) {
        roomLight.setAttribute('light', 'intensity', 0);
      } else {
        roomLight.setAttribute('light', 'intensity', 0.85);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  