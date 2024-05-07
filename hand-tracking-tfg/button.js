/* global AFRAME */
AFRAME.registerComponent('button', {
  // propiedades texto, ancho, alternante (booleano),audio
    schema: {
      label: {default: 'label'},
      width: {default: 0.16},
      soundSrc: {default: ''}
    },
    init: function () {
      var el = this.el;
      //Crea entidad representa el texto del botón
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
      // Añade al botón el componente pressable que el componente responda a eventos de pulsación
      el.setAttribute('pressable', '');
  
      labelEl.setAttribute('position', '0 0 0.02');
      labelEl.setAttribute('text', {
        value: this.data.label,
        color: 'white',
        align: 'center'
      });
  
      labelEl.setAttribute('scale', '0.75 0.75 0.75');
      this.el.appendChild(labelEl);
      
      // Se vinculan los métodos a 'this' (el componente 'button')
      this.bindMethods();
      // Se agregan escuchadores de eventos para cambiar el estado del botón
      this.el.addEventListener('stateadded', this.stateChanged);
      this.el.addEventListener('stateremoved', this.stateChanged);
      this.el.addEventListener('pressedstarted', this.onPressedStarted);
      this.el.addEventListener('pressedended', this.onPressedEnded);

    },
    
    // Método para vincular métodos al componente 'button'
    bindMethods: function () {
      this.stateChanged = this.stateChanged.bind(this);
      this.onPressedStarted = this.onPressedStarted.bind(this);
      this.onPressedEnded = this.onPressedEnded.bind(this);
    },
    
    
    // Actualiza el estado visual del botón (operador ternario)
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