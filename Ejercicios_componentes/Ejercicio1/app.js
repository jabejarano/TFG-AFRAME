
// Registrar componente
AFRAME.registerComponent('cambiador', {
    init: function () {
        this.el.addEventListener('click', () => {
            this.el.setAttribute('color', '#FF0000');  // Cambiar color a rojo
        });
    }
});