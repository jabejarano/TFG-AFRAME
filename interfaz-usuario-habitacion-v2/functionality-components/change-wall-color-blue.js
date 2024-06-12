AFRAME.registerComponent('change-wall-color-blue', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.changeColor);
    this.cooldown = false;
    this.color = '#00FFFF'; // Azul cian
  },

  bindMethods: function () {
    this.changeColor = this.changeColor.bind(this);
  },

  changeColor: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');

    walls.forEach(wall => {
      wall.setAttribute('material', 'color', this.color); // Cambiar el color
    });

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
