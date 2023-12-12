
// Registrar componente
AFRAME.registerComponent('crear', {
    init: function () {
        // Crear un elemento de caja
        // Crear el primer cubo
        var cubo1 = document.createElement('a-box');
        cubo1.setAttribute('position', '0 1.5 -3');
        cubo1.setAttribute('rotation', '0 45 0');
        cubo1.setAttribute('color', '#FF0000');
        this.el.appendChild(cubo1);

        // Crear el segundo cubo
        var cubo2 = document.createElement('a-box');
        cubo2.setAttribute('position', '2 1.5 -3');  // Ajusta la posición según sea necesario
        cubo2.setAttribute('rotation', '0 45 0');
        cubo2.setAttribute('color', '#0000FF');
        this.el.appendChild(cubo2);

        // Crear el tercer cubo
        var cubo3 = document.createElement('a-box');
        cubo3.setAttribute('position', '-2 1.5 -3');  // Ajusta la posición según sea necesario
        cubo3.setAttribute('rotation', '0 45 0');
        cubo3.setAttribute('color', '#4CC3D9');
        this.el.appendChild(cubo3);
    }
});