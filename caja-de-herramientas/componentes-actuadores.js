// Los 5 primeros componentes utilizan el evento "agarrar" y "soltar" para actuar
// Son los utilizados en el prototipo "La habitación de las interacciones"

// Componente cambiar color paredes
AFRAME.registerComponent('change-wall-color', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.changeToNewColor);
      this.el.addEventListener('pinchedended', this.changeToOriginalColor);
      this.cooldown = false; 
      this.originalColor = '#B0B0B0'; // Color original 
      this.newColor = '#00FFFF'; // azul cian
    },
  
    bindMethods: function () {
      this.changeToNewColor = this.changeToNewColor.bind(this);
      this.changeToOriginalColor = this.changeToOriginalColor.bind(this);
    },
  
    changeToNewColor: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
      walls.forEach(wall => {
        wall.setAttribute('material', 'color', this.newColor); // Cambiar el color a azul cian
      });
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    },
  
    changeToOriginalColor: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
      walls.forEach(wall => {
        wall.setAttribute('material', 'color', this.originalColor); // Cambiar el color a original
      });
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });

  

  //Componente quitar y poner techo
  AFRAME.registerComponent('remove-roof', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.hideRoof);
      this.el.addEventListener('pinchedended', this.showRoof);
      this.cooldown = false; 
    },
  
    bindMethods: function () {
      this.hideRoof = this.hideRoof.bind(this);
      this.showRoof = this.showRoof.bind(this);
    },
  
    hideRoof: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var ceiling = document.querySelector('#ceiling');
      if (ceiling) {
        ceiling.setAttribute('visible', false);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 100);
    },
  
    showRoof: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var ceiling = document.querySelector('#ceiling');
      if (ceiling) {
        ceiling.setAttribute('visible', true);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 100);
    }
  });

  

  //Componente activar y pausar sonido
  AFRAME.registerComponent('sound-effects', {
    init: function () {
      this.grabSound = document.querySelector('#grab-sound');
      this.bindMethods();
      this.cooldown = false; 
      this.el.addEventListener('pinchedstarted', this.toggleGrabSoundOn);
      this.el.addEventListener('pinchedended', this.toggleGrabSoundOff);
    },
  
    bindMethods: function () {
      this.toggleGrabSoundOn = this.toggleGrabSoundOn.bind(this);
      this.toggleGrabSoundOff = this.toggleGrabSoundOff.bind(this);
    },
  
    toggleGrabSoundOn: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      if (this.grabSound.paused) {
        this.grabSound.currentTime = 0; 
        this.grabSound.play();
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 100);
    },
  
    toggleGrabSoundOff: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      if (!this.grabSound.paused) {
        this.grabSound.pause();
        this.grabSound.currentTime = 0; 
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 100);
    }
  });

  

  //Componente crear y eliminar caja
  AFRAME.registerComponent('toggle-box', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.addBox);
      this.el.addEventListener('pinchedended', this.removeBox);
      this.cooldown = false; 
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

  

  //Componentes encender y apagar luyz
  AFRAME.registerComponent('toggle-light', {
    init: function () {
        this.bindMethods();
        this.cooldown = false;
        this.el.addEventListener('pinchedstarted', this.toggleLightOff);
        this.el.addEventListener('pinchedended', this.toggleLightOn);
    },
  
    bindMethods: function () {
        this.toggleLightOff = this.toggleLightOff.bind(this);
        this.toggleLightOn = this.toggleLightOn.bind(this);
    },
  
    toggleLightOff: function () {
        if (this.cooldown) return;
        this.cooldown = true;
  
        var roomLight = document.querySelector('#room-light'); // Obtener la entidad de luz de la habitación
        var lightOn = roomLight.getAttribute('light').intensity > 0; // Comprobar si la luz está encendida.
  
        if (lightOn) {
            roomLight.setAttribute('light', 'intensity', 0);
        }
  
        setTimeout(() => {
            this.cooldown = false;
        }, 100);
    },
  
    toggleLightOn: function () {
        if (this.cooldown) return;
        this.cooldown = true;
  
        var roomLight = document.querySelector('#room-light'); // Obtener la entidad de luz de la habitación.
        var lightOn = roomLight.getAttribute('light').intensity > 0; // Comprobar si la luz está encendida.
  
        if (!lightOn) {
            roomLight.setAttribute('light', 'intensity', 0.85);
        }
  
        setTimeout(() => {
            this.cooldown = false;
        }, 100);
    }
  });

  

  //A partir de aqui los componentes solo se activan agarrandolos están ordenados en grupos de tres
  //Cambiar color paredes
  AFRAME.registerComponent('change-wall-color-blue', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.changeColor);
      this.cooldown = false;
      this.color = '#00FFFF'; // Azul cian
    },
  
    bindMethods: function () {
      this.changeColor = this.changeColor.bind(this);
    },
  
    changeColor: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
  
      walls.forEach(wall => {
        wall.setAttribute('material', 'color', this.color); // Cambiar el color
      });
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });

  
  AFRAME.registerComponent('change-wall-color-green', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.changeColor);
      this.cooldown = false;
      this.color = '#00FF00'; // Verde suave
    },
  
    bindMethods: function () {
      this.changeColor = this.changeColor.bind(this);
    },
  
    changeColor: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
  
      walls.forEach(wall => {
        wall.setAttribute('material', 'color', this.color); // Cambiar el color
      });
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  

  AFRAME.registerComponent('change-wall-color-yellow', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.changeColor);
      this.cooldown = false;
      this.color = '#FFFF00'; // Amarillo suave
    },
  
    bindMethods: function () {
      this.changeColor = this.changeColor.bind(this);
    },
  
    changeColor: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var walls = document.querySelectorAll('#wall1, #wall2, #wall3, #wall4');
      
      walls.forEach(wall => {
        wall.setAttribute('material', 'color', this.color); // Cambiar el color
      });
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });  





  //Eliminar paredes
  AFRAME.registerComponent('remove-back-wall', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleWall);
      this.cooldown = false; //enfriamiento
    },
  
    bindMethods: function () {
      this.toggleWall = this.toggleWall.bind(this);
    },
  
    toggleWall: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var backWall = document.querySelector('#wall3');
      if (backWall) {
        var isVisible = backWall.getAttribute('visible');
        backWall.setAttribute('visible', !isVisible);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });

  
  AFRAME.registerComponent('remove-front-wall', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleFrontWall);
      this.cooldown = false;
    },
  
    bindMethods: function () {
      this.toggleFrontWall = this.toggleFrontWall.bind(this);
    },
  
    toggleFrontWall: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var frontWall = document.querySelector('#wall1');
      if (frontWall) {
        var isVisible = frontWall.getAttribute('visible');
        frontWall.setAttribute('visible', !isVisible);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  

  AFRAME.registerComponent('remove-roof', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleRoof);
      this.cooldown = false; //enfriamiento
    },
  
    bindMethods: function () {
      this.toggleRoof = this.toggleRoof.bind(this);
    },
  
    toggleRoof: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var ceiling = document.querySelector('#ceiling');
      if (ceiling) {
        var isVisible = ceiling.getAttribute('visible');
        ceiling.setAttribute('visible', !isVisible);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  



  //Sonidos
  AFRAME.registerComponent('sound-mario-bros', {
    init: function () {
      this.bindMethods();
      this.grabSound = document.querySelector('#mario-sound');
      this.el.addEventListener('pinchedstarted', this.toggleSound);
      this.cooldown = false; 
    },
  
    bindMethods: function () {
      this.toggleSound = this.toggleSound.bind(this);
    },
  
    toggleSound: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      if (this.grabSound.paused) {
        this.grabSound.currentTime = 0;
        this.grabSound.play();
      } else {
        this.grabSound.pause();
        this.grabSound.currentTime = 0;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  

  AFRAME.registerComponent('sound-mario-jump', {
    init: function () {
      this.bindMethods();
      this.grabSound = document.querySelector('#mario-jump-sound');
      this.el.addEventListener('pinchedstarted', this.toggleSound);
      this.cooldown = false; 
    },
  
    bindMethods: function () {
      this.toggleSound = this.toggleSound.bind(this);
    },
  
    toggleSound: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      if (this.grabSound.paused) {
        this.grabSound.currentTime = 0;
        this.grabSound.play();
      } else {
        this.grabSound.pause();
        this.grabSound.currentTime = 0;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  

  AFRAME.registerComponent('sound-stranger-things', {
    init: function () {
      this.bindMethods();
      this.grabSound = document.querySelector('#grab-sound');
      this.el.addEventListener('pinchedstarted', this.toggleSound);
      this.cooldown = false; 
    },
  
    bindMethods: function () {
      this.toggleSound = this.toggleSound.bind(this);
    },
  
    toggleSound: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      if (this.grabSound.paused) {
        this.grabSound.currentTime = 0;
        this.grabSound.play();
      } else {
        this.grabSound.pause();
        this.grabSound.currentTime = 0;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });

  
//Crear objetos
AFRAME.registerComponent('toggle-box', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleBox);
      this.cooldown = false; 
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

  
  AFRAME.registerComponent('toggle-cone', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleCone);
      this.cooldown = false; 
      this.cone = null; // Referencia al objeto cone
    },
  
    bindMethods: function () {
      this.toggleCone = this.toggleCone.bind(this);
    },
  
    toggleCone: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var sceneEl = this.el.sceneEl;
  
      if (this.cone) {
        sceneEl.removeChild(this.cone);
        this.cone = null;
      } else {
        var cone = document.createElement('a-cone');
        cone.setAttribute('position', { x: -1, y: 0.4, z: -2 });
        cone.setAttribute('radius-bottom', 0.4);
        cone.setAttribute('height', 0.8);
        cone.setAttribute('material', 'color', '#FF5733');
        sceneEl.appendChild(cone);
        this.cone = cone;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  

  AFRAME.registerComponent('toggle-cylinder', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleCylinder);
      this.cooldown = false;
      this.cylinder = null; // Referencia al objeto cylinder
    },
  
    bindMethods: function () {
      this.toggleCylinder = this.toggleCylinder.bind(this);
    },
  
    toggleCylinder: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var sceneEl = this.el.sceneEl;
  
      if (this.cylinder) {
        sceneEl.removeChild(this.cylinder);
        this.cylinder = null;
      } else {
        var cylinder = document.createElement('a-cylinder');
        cylinder.setAttribute('position', { x: 1, y: 0.4, z: -2 });
        cylinder.setAttribute('radius', 0.4);
        cylinder.setAttribute('height', 0.8);
        cylinder.setAttribute('material', 'color', '#33FF57');
        sceneEl.appendChild(cylinder);
        this.cylinder = cylinder;
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  



//Iluminación
AFRAME.registerComponent('toggle-light-intensity', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleIntensity);
      this.cooldown = false; 
    },
  
    bindMethods: function () {
      this.toggleIntensity = this.toggleIntensity.bind(this);
    },
  
    toggleIntensity: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var roomLight = document.querySelector('#room-light');
      var currentIntensity = roomLight.getAttribute('light').intensity;
  
      if (currentIntensity > 0.5) {
        roomLight.setAttribute('light', 'intensity', 0.5);
      } else {
        roomLight.setAttribute('light', 'intensity', 0.85);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  

  AFRAME.registerComponent('toggle-light', {
    init: function () {
      this.bindMethods();
      this.cooldown = false; 
      this.el.addEventListener('pinchedstarted', this.toggleLight);
    },
  
    bindMethods: function () {
      this.toggleLight = this.toggleLight.bind(this);
    },
  
    toggleLight: function () {
      if (this.cooldown) return; 
      this.cooldown = true; 
  
      var roomLight = document.querySelector('#room-light');
      var lightOn = roomLight.getAttribute('light').intensity > 0;
  
      if (lightOn) {
        roomLight.setAttribute('light', 'intensity', 0);
      } else {
        roomLight.setAttribute('light', 'intensity', 0.85);
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  

  AFRAME.registerComponent('toggle-red-light', {
    init: function () {
      this.bindMethods();
      this.el.addEventListener('pinchedstarted', this.toggleLight);
      this.cooldown = false; 
    },
  
    bindMethods: function () {
      this.toggleLight = this.toggleLight.bind(this);
    },
  
    toggleLight: function () {
      if (this.cooldown) return;
      this.cooldown = true;
  
      var roomLight = document.querySelector('#room-light');
      var isRed = roomLight.getAttribute('light').color === '#FF6666';
  
      if (isRed) {
        roomLight.setAttribute('light', 'color', '#FFFFFF');
      } else {
        roomLight.setAttribute('light', 'color', '#FF6666'); // Tono rojizo suave
      }
  
      setTimeout(() => {
        this.cooldown = false;
      }, 300);
    }
  });
  
