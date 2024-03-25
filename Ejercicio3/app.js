// Registrar componente
AFRAME.registerComponent('crear', {
    schema: {
        color1: { type: 'color', default: '#FF0000' },
        color2: { type: 'color', default: '#0000FF' },
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

        var cubo2 = document.createElement('a-box');
        cubo2.setAttribute('position', '0 ' + 2.013 + ' -3');
        cubo2.setAttribute('rotation', '0 45 0');
        cubo2.setAttribute('width', tamanio);
        cubo2.setAttribute('height', tamanio);
        cubo2.setAttribute('depth', tamanio);
        cubo2.setAttribute('color', this.data.color2);
        this.el.appendChild(cubo2);

       // Variable para comprobar si la esfera está creada
       var esferaCreada1 = false;

       cubo1.addEventListener('click', () => {
           if (!esferaCreada1) {
               // Si la esfera no está creada, la creo
               var hijoDeCubo1 = document.createElement('a-sphere');
               hijoDeCubo1.setAttribute('position', '0.920 0 0.920'); 
               hijoDeCubo1.setAttribute('radius', '0.5');
               hijoDeCubo1.setAttribute('color', '#FF00FF');
               cubo1.appendChild(hijoDeCubo1);
               
               esferaCreada1 = true;
           } else {
               // Si la esfera está creada, la elimino
               var esfera = cubo1.querySelector('a-sphere');
               if (esfera) {
                   cubo1.removeChild(esfera);
               }
               esferaCreada1 = false;
           }
       });

       // Variable para comprobar si la esfera está creada
       var esferaCreada2 = false;

       cubo2.addEventListener('click', () => {
        if (!esferaCreada2) {
            // Si la esfera no está creada, la creo
            var hijoDeCubo2 = document.createElement('a-sphere');
            hijoDeCubo2.setAttribute('position', '0.920 0 0.920'); 
            hijoDeCubo2.setAttribute('radius', '0.5');
            hijoDeCubo2.setAttribute('color', '#FF00FF');
            cubo2.appendChild(hijoDeCubo2);
            
            esferaCreada2 = true;
        } else {
            // Si la esfera está creada, la elimino
            var esfera = cubo2.querySelector('a-sphere');
            if (esfera) {
                cubo2.removeChild(esfera);
            }
            esferaCreada2 = false;
        }
    });
   }
});