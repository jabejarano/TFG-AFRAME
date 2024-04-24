/* global AFRAME */
AFRAME.registerComponent('button', {
    schema: {
      label: {default: 'label'},
      width: {default: 0.11},
      toggleable: {default: false},
      soundSrc: {default: ''}
    },
    init: function () {
      var el = this.el;
      var labelEl = this.labelEl = document.createElement('a-entity');
  
      this.color = '#3a50c5';
      this.originalDepth = 0.04;

      el.setAttribute('geometry', {
        primitive: 'box',
        width: this.data.width,
        height: 0.05,
        depth: this.originalDepth
      });
  
      el.setAttribute('material', {color: this.color});
      el.setAttribute('pressable', '');
  
      labelEl.setAttribute('position', '0 0 0.02');
      labelEl.setAttribute('text', {
        value: this.data.label,
        color: 'white',
        align: 'center'
      });
  
      labelEl.setAttribute('scale', '0.75 0.75 0.75');
      this.el.appendChild(labelEl);
  
      this.bindMethods();
      this.el.addEventListener('stateadded', this.stateChanged);
      this.el.addEventListener('stateremoved', this.stateChanged);
      this.el.addEventListener('pressedstarted', this.onPressedStarted);
      this.el.addEventListener('pressedended', this.onPressedEnded);
    },
  
    bindMethods: function () {
      this.stateChanged = this.stateChanged.bind(this);
      this.onPressedStarted = this.onPressedStarted.bind(this);
      this.onPressedEnded = this.onPressedEnded.bind(this);
    },
  
    update: function (oldData) {
      if (oldData.label !== this.data.label) {
        this.labelEl.setAttribute('text', 'value', this.data.label);
      }
    },
  
    stateChanged: function () {
      var color = this.el.is('pressed') ? 'green' : this.color;
      this.el.setAttribute('material', {color: color});

      // Ajustar la profundidad del botón según su estado
      var depth = this.el.is('pressed') ? 0.02 : this.originalDepth;
      this.el.setAttribute('geometry', {depth: depth});
    },
  
    onPressedStarted: function () {
      var el = this.el;
      el.setAttribute('material', {color: 'green'});
      el.emit('click');
      if (this.data.toggleable) {
        if (el.is('pressed')) {
          el.removeState('pressed');
        } else {
          el.addState('pressed');
        }
      }

      // Disminuir la profundidad del botón cuando se presiona
      el.setAttribute('geometry', {
      depth: 0.02  // Disminuye la profundidad a 0.02 unidades
      });

      // Reproduce el sonido cuando se le da valor a la propiedad soundSrc
      if (this.data.soundSrc) {
        var sound = document.querySelector(this.data.soundSrc);
        if (sound) {
          sound.play();
        }
      }
    },
  
    onPressedEnded: function () {
      if (this.el.is('pressed')) { return; }
      this.el.setAttribute('material', {color: this.color});
      this.el.setAttribute('geometry', {depth: this.originalDepth});  // Devuelve la profundidad a su valor original de 0.04 unidades
    }
  });