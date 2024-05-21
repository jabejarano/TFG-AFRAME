/* global AFRAME, THREE */
AFRAME.registerComponent('shelf', {
  schema: {
    objects: { type: 'array' },
    names: { type: 'array' }
  },

  init: function () {
    var objects = this.data.objects;
    var names = this.data.names;
    var el = this.el;

    // Verificar si la cantidad de objetos y nombres coincide
    if (objects.length !== names.length) {
      console.error('La cantidad de objetos y nombres no coincide');
      return;
    }

    // Buscar el contenedor dentro del componente shelf
    var container = el.querySelector('a-box');

  }
});
