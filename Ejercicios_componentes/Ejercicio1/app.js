
// Registrar componente
AFRAME.registerComponent('cambiador', {
    init: function () {
        // this.el --> entidad actual a la que se le ha adjuntado el componente
        var el = this.el;
        var clickSound = document.getElementById('clickSound');
        el.addEventListener('click', () => {
            el.setAttribute('color', '#FF0000');  // Cambiar color a rojo
            if (clickSound) {
                clickSound.play();  // Reproducir sonido
            } else {
                console.error("Error: No se encontró ningún elemento de audio con el ID 'clickSound'.");
            }
        });
    }
});