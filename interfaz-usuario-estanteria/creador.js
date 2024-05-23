AFRAME.registerComponent('creador', {
  init: function () {
    this.bindMethods();
    this.sphereCount = 0; 
    this.cubeCount = 0; 
    this.cooldown = false; 
    this.el.addEventListener('pinchedstarted', this.createModel);
    this.el.addEventListener('pinchedended', this.createCube);
  },

  bindMethods: function () {
    this.createModel = this.createModel.bind(this);
    this.createCube = this.createCube.bind(this);
  },
  
  // Crea un nuevo modelo GLTF en la escena cuando se inicia un pinch.
  createModel: function () {
    if (this.cooldown) return; 
    this.cooldown = true; 

    var sceneEl = this.el.sceneEl;
    var model = document.createElement('a-entity');
    var xPosition = this.sphereCount * 0.2; 
    model.setAttribute('gltf-model', '#figura1');
    model.setAttribute('scale', '0.2 0.2 0.2'); 
    model.setAttribute('position', `${xPosition} 2 -0.5`);
    sceneEl.appendChild(model);
    this.sphereCount++; 

    // Desactivar el cooldown después de 300 ms
    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  },
  // Crea un nuevo cubo en la escena cuando se termina un pinch.
  createCube: function () {
    if (this.cooldown) return; // Si está en cooldown, no crear otro cubo
    this.cooldown = true; 

    var sceneEl = this.el.sceneEl;
    var box = document.createElement('a-box');
    var xPosition = this.cubeCount * 0.2; 
    box.setAttribute('position', `${xPosition} 1 -0.5`);
    box.setAttribute('depth', 0.2);
    box.setAttribute('height', 0.2);
    box.setAttribute('width', 0.2);
    box.setAttribute('color', '#4CC3D9');
    sceneEl.appendChild(box);
    this.cubeCount++; 

    // Desactivar el cooldown después de 300 ms
    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
