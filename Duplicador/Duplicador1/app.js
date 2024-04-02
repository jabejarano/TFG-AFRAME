AFRAME.registerComponent('duplicador', {
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            // Crear una nueva entidad de caja
            var nuevaCaja = document.createElement('a-box');
            nuevaCaja.setAttribute('color', '#FFC65D');
            nuevaCaja.setAttribute('position', {x: 1, y: 0, z: 1});
            nuevaCaja.setAttribute('rotation', {x: 0, y: 0, z: 0});
            // Agregar la nueva caja al escenario
            el.appendChild(nuevaCaja);
        });
    }
});