AFRAME.registerComponent('change-wall-color', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.changeToNewColor);
    this.el.addEventListener('pinchedended', this.changeToOriginalColor);
    this.cooldown = false; 
    this.originalColor = '#B0B0B0'; // Color original 
    this.newColor = '#00FFFF'; // azul cian
  },

  bindMethods: function () {
    this.changeToNewColor = this.changeToNewColor.bind(this);
    this.changeToOriginalColor = this.changeToOriginalColor.bind(this);
  },

  changeToNewColor: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
    walls.forEach(wall => {
      wall.setAttribute('material', 'color', this.newColor); // Cambiar el color a azul cian
    });

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  },

  changeToOriginalColor: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
    walls.forEach(wall => {
      wall.setAttribute('material', 'color', this.originalColor); // Cambiar el color a original
    });

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
