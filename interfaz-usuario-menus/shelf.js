AFRAME.registerComponent('shelf', {
  schema: {
    objects: { type: 'array' },
    names: { type: 'array' }
  },

  init: function () {
    var objects = this.data.objects;
    var names = this.data.names;
    var el = this.el;

    if (objects.length !== names.length) {
      console.error('La cantidad de objetos y nombres no coincide');
      return;
    }

    // Almacena las figuras permitidas en el elemento shelf para acceso global
    this.el.setAttribute('allowed-objects', objects.join(','));
  }
});
