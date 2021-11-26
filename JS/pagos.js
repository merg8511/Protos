const guardar = document.getElementById('boton-pago')
const c = document.getElementById('cliente')
var nPrecio
var operacion
var direccion
var cliente
let objeto = {}
const det = []
const cant = []
var i = 0

guardar.addEventListener('click', e => {
    guardarInfo(e)
})


document.addEventListener('DOMContentLoaded', () => {
    
    objeto = JSON.parse(localStorage.getItem('carrito'))
     
    Object.values(objeto).forEach(producto =>{
        det[i] = producto.title
        cant[i] = producto.cantidad
        i++
    })  
    //console.log(det)
    //document.getElementById('productos').value = producto.title
    
    document.getElementById('productos').value = det
    nPrecio = Object.values(objeto).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    document.getElementById('tPagar').value = nPrecio    
      
})


const guardarInfo = e => {
    operacion = document.getElementById('operacion').value
    direccion = document.getElementById('direccion').value
    cliente = document.getElementById('cliente').value
    const factura = {
        cli : cliente,
        ope : operacion,
        dire : direccion
    }
    
    localStorage.setItem('factura', JSON.stringify(factura))
    console.log(factura)

    e.stopPropagation()
}

