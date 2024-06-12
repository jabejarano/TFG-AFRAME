/* global AFRAME */
// AFRAME.registerSystem: Es una función proporcionada por A-Frame que se utiliza para registrar sistemas personalizados en el framework.
AFRAME.registerSystem('super-hands', {
  init: function () {
    //this.superHands = []: Se inicializa una propiedad superHands como un array vacío. 
    //Esta propiedad se utiliza para almacenar los componentes SuperHands que se registran en el sistema.
    this.superHands = []
  },
  registerMe: function (comp) {
    // when second hand registers, store links
    if (this.superHands.length === 1) {
      this.superHands[0].otherSuperHand = comp
      comp.otherSuperHand = this.superHands[0]
    }
    this.superHands.push(comp)
  },
  unregisterMe: function (comp) {
    // Esta línea busca el índice del componente comp en el array this.superHands
    const index = this.superHands.indexOf(comp)
    if (index !== -1) {
      //Si el componente está presente en el array, esta línea elimina el componente del array utilizando el método splice
      this.superHands.splice(index, 1)
    }
    this.superHands.forEach(x => {
      if (x.otherSuperHand === comp) { x.otherSuperHand = null }
    })
  }
})
