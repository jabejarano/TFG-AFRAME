AFRAME.registerComponent('create-box', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.toggleBox);
    this.cooldown = false;
    this.box = null; // Variable para almacenar la caja generada
  },

  bindMethods: function () {
    this.toggleBox = this.toggleBox.bind(this);
  },

  toggleBox: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    var sceneEl = this.el.sceneEl;

    // Eliminar la caja existente si ya hay una
    if (this.box) {
      sceneEl.removeChild(this.box);
      this.box = null;
    } else {
      var box = document.createElement('a-box');
      box.setAttribute('position', { x: 0, y: 1, z: -0.5 });
      box.setAttribute('width', 0.4);
      box.setAttribute('height', 0.4);
      box.setAttribute('depth', 0.4);
      box.setAttribute('material', 'color: #4CC3D9');

      sceneEl.appendChild(box);

      // Almacenar la referencia de la nueva caja generada
      this.box = box;
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
