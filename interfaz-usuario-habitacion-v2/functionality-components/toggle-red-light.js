AFRAME.registerComponent('toggle-red-light', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleLight);
      this.cooldown = false; // enfriamiento
    },
  
    bindMethods: function () {
      this.toggleLight = this.toggleLight.bind(this);
    },
  
    toggleLight: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var roomLight = document.querySelector('#room-light');
      var isRed = roomLight.getAttribute('light').color === '#FF6666';
  
      if (isRed) {
        roomLight.setAttribute('light', 'color', '#FFFFFF');
      } else {
        roomLight.setAttribute('light', 'color', '#FF6666'); // Tono rojizo suave
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  