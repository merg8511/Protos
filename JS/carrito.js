const cards = document.getElementById('cards')
const cards2 = document.getElementById('cards2')
const cards3 = document.getElementById('cards3')
const cards4 = document.getElementById('cards4')
const cards5 = document.getElementById('cards5')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
const fragment2 = document.createDocumentFragment()
const fragment3 = document.createDocumentFragment()
const fragment4 = document.createDocumentFragment()
const fragment5 = document.createDocumentFragment()
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

cards2.addEventListener('click', e => {
    addCarrito(e)
})

cards3.addEventListener('click', e => {
    addCarrito(e)
})

cards4.addEventListener('click', e => {
    addCarrito(e)
})

cards5.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e => {
    btnAccion(e)
})

const fetchData = async() => {
    try{
        const res = await fetch('json/productos.json')
        const data = await res.json()
        //console.log(data) 
        pintarCards(data)
    } catch(error) {
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        if(producto.categoria === 1) {
            templateCard.querySelector('h5').textContent = producto.title
            templateCard.querySelector('span').textContent = producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.imagen)
            templateCard.querySelector('.btn-dark').dataset.id = producto.id
            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        }
        if(producto.categoria === 2){ 
            templateCard.querySelector('h5').textContent = producto.title
            templateCard.querySelector('span').textContent = producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.imagen)
            templateCard.querySelector('.btn-dark').dataset.id = producto.id
            const clone = templateCard.cloneNode(true)
            fragment2.appendChild(clone)
        }
        if(producto.categoria === 3){ 
            templateCard.querySelector('h5').textContent = producto.title
            templateCard.querySelector('span').textContent = producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.imagen)
            templateCard.querySelector('.btn-dark').dataset.id = producto.id
            const clone = templateCard.cloneNode(true)
            fragment3.appendChild(clone)
        }
        if(producto.categoria === 4){ 
            templateCard.querySelector('h5').textContent = producto.title
            templateCard.querySelector('span').textContent = producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.imagen)
            templateCard.querySelector('.btn-dark').dataset.id = producto.id
            const clone = templateCard.cloneNode(true)
            fragment4.appendChild(clone)
        }
        if(producto.categoria === 5){ 
            templateCard.querySelector('h5').textContent = producto.title
            templateCard.querySelector('span').textContent = producto.precio
            templateCard.querySelector('img').setAttribute("src", producto.imagen)
            templateCard.querySelector('.btn-dark').dataset.id = producto.id
            const clone = templateCard.cloneNode(true)
            fragment5.appendChild(clone)
        }
        
    });
    cards.appendChild(fragment)
    cards2.appendChild(fragment2)
    cards3.appendChild(fragment3)
    cards4.appendChild(fragment4)
    cards5.appendChild(fragment5)
}

const addCarrito = e => {
    //console.log(e.target)
    //console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    //console.log(objeto)
    const producto  = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('span').textContent,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () => {
    //console.log(carrito)
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
        
    })
    
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){ 
        footer.innerHTML = '<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>'

        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio, 0)
    //console.log(nPrecio)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })
}

const btnAccion = e => {
    //console.log(e.target)
    if(e.target.classList.contains('btn-info')){
        //carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad = carrito[e.target.dataset.id].cantidad + 1
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    if(e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }

    e.stopPropagation()
}
