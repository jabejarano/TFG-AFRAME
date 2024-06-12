AFRAME.registerComponent('toggle-box', {
  init: function () {
    this.bindMethods();
    this.el.addEventListener('pinchedstarted', this.toggleBox);
    this.cooldown = false; // Enfriamiento
    this.box = null; // Referencia al objeto box
  },

  bindMethods: function () {
    this.toggleBox = this.toggleBox.bind(this);
  },

  toggleBox: function () {
    if (this.cooldown) return;
    this.cooldown = true;

    var sceneEl = this.el.sceneEl;

    if (this.box) {
      sceneEl.removeChild(this.box);
      this.box = null;
    } else {
      var box = document.createElement('a-box');
      box.setAttribute('position', { x: 0, y: 0.4, z: -2 });
      box.setAttribute('width', 0.4);
      box.setAttribute('height', 0.4);
      box.setAttribute('depth', 0.4);
      box.setAttribute('material', 'color', '#4CC3D9');
      sceneEl.appendChild(box);
      this.box = box;
    }

    setTimeout(() => {
      this.cooldown = false;
    }, 300);
  }
});
