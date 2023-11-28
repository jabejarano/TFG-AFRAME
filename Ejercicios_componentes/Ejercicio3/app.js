
// Registrar componente
AFRAME.registerComponent('cambiador', {
    schema:{
      color: { type: 'color', default: ''},
      timeout: {type: 'int', default: 0}  
    },
    init: function () {
        this.el.addEventListener('click', () => {
            setTimeout(() => {
                this.el.setAttribute('color', this.data.color);
            }, this.data.timeout);
        });
    }
});