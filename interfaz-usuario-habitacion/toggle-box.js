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

    // Verificar si ya existe una caja y eliminarla
    if (this.box) {
      sceneEl.removeChild(this.box);
      this.box = null;
    }

    // Crear y añadir una nueva caja
    var box = document.createElement('a-box');
    box.setAttribute('position', { x: 0.6, y: 0.4, z: -1 });
    box.setAttribute('width', 0.4);
    box.setAttribute('height', 0.4);
    box.setAttribute('depth', 0.4);
    box.setAttribute('material', 'color', '#4CC3D9');
    sceneEl.appendChild(box);

    // Guardar la referencia de la nueva caja creada
    this.box = box;

    setTimeout(() => {
      this.cooldown = false;
    }, 300); // Tiempo de enfriamiento
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
    }, 300); // Tiempo de enfriamiento
  }
});
