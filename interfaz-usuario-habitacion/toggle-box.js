AFRAME.registerComponent('toggle-box', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.addBox);
    this.cooldown = false; // Enfriamiento
  },

  bindMethods: function () {
    this.addBox = this.addBox.bind(this);
  },

  addBox: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    var sceneEl = this.el.sceneEl;
    var box = document.createElement('a-box');
    box.setAttribute('position', { x: 0, y: 1, z: -0.5 });
    box.setAttribute('width', 0.4);
    box.setAttribute('height', 0.4);
    box.setAttribute('depth', 0.4);
    box.setAttribute('material', 'color', '#4CC3D9');
    sceneEl.appendChild(box);

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
