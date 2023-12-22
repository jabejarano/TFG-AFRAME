// Registrar componente
AFRAME.registerComponent('crear', {
    schema: {
        color1: { type: 'color', default: '#FF0000' },
        color2: { type: 'color', default: '#0000FF' },
        color3: { type: 'color', default: '#4CC3D9' },
        tamanio: { type: 'number', default: 1.15 }  // Nuevo parámetro para controlar el tamaño de los cubos
    },
    init: function () {
        var tamanio = this.data.tamanio;

        // Crear el primer cubo con color y tamaño personalizados
        var cubo1 = document.createElement('a-box');
        cubo1.setAttribute('position', '0 ' + (0.75 * tamanio) + ' -3'); // Ajustar la posición según el tamaño
        cubo1.setAttribute('rotation', '0 45 0');
        cubo1.setAttribute('width', tamanio);
        cubo1.setAttribute('height', tamanio);
        cubo1.setAttribute('depth', tamanio);
        cubo1.setAttribute('color', this.data.color1);
        this.el.appendChild(cubo1);

        // Crear el segundo cubo encima del primero con color y tamaño personalizados
        var cubo2 = document.createElement('a-box');
        cubo2.setAttribute('position', '0 ' + (1.75 * tamanio) + ' -3');
        cubo2.setAttribute('rotation', '0 45 0');
        cubo2.setAttribute('width', tamanio);
        cubo2.setAttribute('height', tamanio);
        cubo2.setAttribute('depth', tamanio);
        cubo2.setAttribute('color', this.data.color2);
        this.el.appendChild(cubo2);

        // Crear el tercer cubo encima del segundo con color y tamaño personalizados
        var cubo3 = document.createElement('a-box');
        cubo3.setAttribute('position', '0 ' + (2.75 * tamanio) + ' -3');
        cubo3.setAttribute('rotation', '0 45 0');
        cubo3.setAttribute('width', tamanio);
        cubo3.setAttribute('height', tamanio);
        cubo3.setAttribute('depth', tamanio);
        cubo3.setAttribute('color', this.data.color3);
        this.el.appendChild(cubo3);
    }
});