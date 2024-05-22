AFRAME.registerComponent('creador', {
  init: function () {
    this.bindMethods();
    this.sphereCount = 0; // Contador de modelos GLTF creados
    this.cubeCount = 0; // Contador de cubos creados
    this.cooldown = false; // Bandera para controlar el tiempo de espera
    this.el.addEventListener('pinchedstarted', this.createModel);
    this.el.addEventListener('pinchedended', this.createCube);
  },

  bindMethods: function () {
    this.createModel = this.createModel.bind(this);
    this.createCube = this.createCube.bind(this);
  },

  createModel: function () {
    if (this.cooldown) return; // Si está en cooldown, no crear otro modelo
    this.cooldown = true; // Activar el cooldown

    var sceneEl = this.el.sceneEl;
    var model = document.createElement('a-entity');
    var xPosition = this.sphereCount * 0.2; // Espacio entre modelos ajustado a 0.2
    model.setAttribute('gltf-model', '#figura1');
    model.setAttribute('scale', '0.2 0.2 0.2'); // Ajustar escala según sea necesario
    model.setAttribute('position', `${xPosition} 2 -0.5`);
    sceneEl.appendChild(model);
    this.sphereCount++; // Incrementar contador

    // Desactivar el cooldown después de 300 ms
    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  },

  createCube: function () {
    if (this.cooldown) return; // Si está en cooldown, no crear otro cubo
    this.cooldown = true; // Activar el cooldown

    var sceneEl = this.el.sceneEl;
    var box = document.createElement('a-box');
    var xPosition = this.cubeCount * 0.2; // Espacio entre cubos ajustado a 0.2
    box.setAttribute('position', `${xPosition} 1 -0.5`);
    box.setAttribute('depth', 0.2);
    box.setAttribute('height', 0.2);
    box.setAttribute('width', 0.2);
    box.setAttribute('color', '#4CC3D9');
    sceneEl.appendChild(box);
    this.cubeCount++; // Incrementar contador

    // Desactivar el cooldown después de 300 ms
    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
