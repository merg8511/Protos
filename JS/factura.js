/*const boton = document.getElementById('prueba')

boton.addEventListener('click', e => {
    meto(e)
})

meto = e => {
    boton.style.display = "none"
    window.print()
    if(boton.style.display = "none"){
        console.log("Aquí un botón") //boton ir a inicio
    }
}
//Despues de imprimir borrar localstorage
*/

const items = document.getElementById('items')
const templateDetalle = document.getElementById('template-detalle').content
const foot = document.getElementById('footer')
const templateFoot = document.getElementById('template-footer').content
const limpiar = document.getElementById('limpiar')
const iniciar = document.getElementById('iniciar')
const fragment = document.createDocumentFragment()
let carrito = {}
let factura = {}

iniciar.addEventListener('click', e => {
    if(localStorage.getItem('carrito')){
        localStorage.removeItem('carrito')
    }
    if(localStorage.getItem('factura')){
        localStorage.removeItem('factura')
    }
    e.stopPropagation()
})

limpiar.addEventListener('click', e => {
    limpiar.style.display = "none"
    window.print()

    e.stopPropagation()
})

document.addEventListener('DOMContentLoaded', () =>{
    carrito = JSON.parse(localStorage.getItem('carrito'))
    factura = JSON.parse(localStorage.getItem('factura'))

    llenarEncabezado()
    pintarDetalle()
})

const llenarEncabezado  = () =>{
        document.getElementById('factura').value = factura.ope
        document.getElementById('cliente').value = factura.cli   
}

const pintarDetalle = () =>{
    items.innerHTML = ''
    Object.values(carrito).forEach(prod => {
        templateDetalle.querySelectorAll('td')[0].textContent = prod.title
        templateDetalle.querySelectorAll('td')[1].textContent = prod.cantidad
        templateDetalle.querySelector('span').textContent = prod.cantidad * prod.precio
        
        const clone = templateDetalle.cloneNode(true)
        fragment.appendChild(clone)
    })

    items.appendChild(fragment)
    pintarFoot()
}

const pintarFoot = () => {
    const nCant = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nTot = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)

    templateFoot.querySelectorAll('td')[0].textContent = nCant
    templateFoot.querySelector('span').textContent = nTot

    const clone = templateFoot.cloneNode(true)
    fragment.appendChild(clone)
    foot.appendChild(fragment)
}
