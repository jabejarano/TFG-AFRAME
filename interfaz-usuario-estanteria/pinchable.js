/* global AFRAME, THREE */
AFRAME.registerComponent('pinchable', {
  schema: {
    pinchDistance: { default: 0.1 }
  },

  init: function () {
    var sceneEl = this.el.sceneEl;
    this.worldPosition = new THREE.Vector3();
    this.bindMethods();
    this.pinched = false;
    sceneEl.addEventListener('pinchstarted', this.onPinchStarted);
    sceneEl.addEventListener('pinchended', this.onPinchEnded);
    sceneEl.addEventListener('pinchmoved', this.onPinchMoved);
  },

  bindMethods: function () {
    this.onPinchStarted = this.onPinchStarted.bind(this);
    this.onPinchEnded = this.onPinchEnded.bind(this);
    this.onPinchMoved = this.onPinchMoved.bind(this);
  },

  onPinchStarted: function (evt) {
    var pinchDistance = this.calculatePinchDistance(evt.detail.position);
    if (pinchDistance < this.data.pinchDistance) {
      this.el.emit('pinchedstarted');
      this.pinched = true;
      this.el.setAttribute('animation', 'enabled', 'false'); 
    }
  },

  // Calcula la distancia entre la posición del pinch y la posición del objeto.
  calculatePinchDistance: function (pinchWorldPosition) {
    var el = this.el;
    var worldPosition = this.worldPosition;
    var pinchDistance;

    worldPosition.copy(el.object3D.position);
    el.object3D.parent.updateMatrixWorld();
    el.object3D.parent.localToWorld(worldPosition);

    pinchDistance = worldPosition.distanceTo(pinchWorldPosition);

    return pinchDistance;
  },

  // Maneja el evento cuando se termina un pinch, desactivando el modo pinched.
  onPinchEnded: function (evt) {
    if (this.pinched) {
      this.pinched = false;
      this.el.emit('pinchedended');
    }
  },

  // Maneja el evento cuando un pinch se mueve, actualizando la posición del objeto si está en modo pinched.  
  onPinchMoved: function (evt) {
    var el = this.el;
    var pinchDistance = this.calculatePinchDistance(evt.detail.position);
    if (!this.pinched) { return; }
    if (pinchDistance < this.data.pinchDistance) {
      el.emit('pinchedmoved', evt.detail);
    } else {
      this.pinched = false;
    }
  }
});
