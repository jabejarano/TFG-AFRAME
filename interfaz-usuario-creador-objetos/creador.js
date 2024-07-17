AFRAME.registerComponent('creador', {
  schema: {
    type: { type: 'string' }
  },

  init: function () {
    this.bindMethods();
    this.cooldown = false;
    this.createdObject = null;
    this.el.addEventListener('pinchedstarted', this.createObject);
  },

  bindMethods: function () {
    this.createObject = this.createObject.bind(this);
  },

  createObject: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    var sceneEl = this.el.sceneEl;

    // Si ya existe un objeto creado, elimínalo
    if (window.currentCreatedObject) {
      window.currentCreatedObject.parentNode.removeChild(window.currentCreatedObject);
      window.currentCreatedObject = null;
    }

    // Crear el nuevo objeto
    var object = document.createElement('a-entity');
    object.setAttribute('geometry', `primitive: ${this.data.type}`);
    object.setAttribute('scale', '0.5 0.5 0.5');
    object.setAttribute('position', '0 1.2 -2');
    object.setAttribute('material', 'color: #4CC3D9');
    sceneEl.appendChild(object);

    // Guardar la referencia al objeto creado en la variable global
    window.currentCreatedObject = object;

    // Desactivar el cooldown después de 300 ms
    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
