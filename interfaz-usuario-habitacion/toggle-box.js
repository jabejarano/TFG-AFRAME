AFRAME.registerComponent('toggle-box', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.addBox);
    this.el.addEventListener('pinchedended', this.removeBox);
    this.cooldown = false; // Enfriamiento
    this.box = null; // Variable para almacenar la referencia de la caja creada
  },

  bindMethods: function () {
    this.addBox = this.addBox.bind(this);
    this.removeBox = this.removeBox.bind(this);
  },

  addBox: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    var sceneEl = this.el.sceneEl;
    this.box = document.createElement('a-box');
    this.box.setAttribute('position', { x: 0.6, y: 0.4, z: -1 });
    this.box.setAttribute('width', 0.4);
    this.box.setAttribute('height', 0.4);
    this.box.setAttribute('depth', 0.4);
    this.box.setAttribute('material', 'color', '#4CC3D9');
    sceneEl.appendChild(this.box);

    setTimeout(() => {
      this.cooldown = false;
    }, 100);
  },

  removeBox: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    if (this.box) {
      this.box.parentNode.removeChild(this.box);
      this.box = null;
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 100);
  }
});
