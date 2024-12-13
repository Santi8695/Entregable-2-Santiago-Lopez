class Producto {
    constructor(imagen, nombreAlbum, autor, precio) {
        this.imagen = imagen;
        this.nombreAlbum = nombreAlbum;
        this.autor = autor;
        this.precio = precio;
    }
}

const catalogo = [

];

const producto1 = new Producto("img/flowerBoy.jpg", "Flower Boy", "Tyler, The Creator", 27);
const producto2 = new Producto("img/blond.jpeg", "Blond", "Frank Ocean", 34);
const producto3 = new Producto("img/gkmc.jpg", "Good Kid, m.A.A.d city", "Kendrick Lamar", 32);
const producto4 = new Producto("img/TheMelodicBlueCover.jpeg", "Melodic Blue", "Baby Keem", 31);
const producto5 = new Producto("img/CMIYGLTES.jpg", "Call Me If You Get Lost", "Tyler, The Creator", 30);
const producto6 = new Producto("img/CO.jpg", "channel, ORANGE", "Frank Ocean", 24);
const producto7 = new Producto("img/damn.jpg", "DAMN.", "Kendrick Lamar", 34);
const producto8 = new Producto("img/dieformybitch.jpg", "Die For My Bitch", "Baby Keem", 17);

catalogo.push(producto1);
catalogo.push(producto2);
catalogo.push(producto3);
catalogo.push(producto4);
catalogo.push(producto5);
catalogo.push(producto6);
catalogo.push(producto7);
catalogo.push(producto8);


let carrito = [];

function mostrarCatalogo(catalogo) {
    const contenedor = document.getElementById("contenedorCatalogo");

    catalogo.forEach(producto => {
        const tarjetaDisco = document.createElement("div");

        tarjetaDisco.innerHTML = `
					<img src="${producto.imagen}">
					<h4>${producto.nombreAlbum}</h4>
                    <h4>${producto.autor}</h4>
                    <h4>$${producto.precio}</h4>
					<button id="${producto.nombreAlbum}">Comprar</button>
                    `

        contenedor.appendChild(tarjetaDisco);

        const boton = document.getElementById(`${producto.nombreAlbum}`);
        boton.addEventListener("click", () => agregarAlCarrito(producto));
    });
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.nombreAlbum === producto.nombreAlbum);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    mostrarCarrito();
}

function mostrarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");
    const comprar = document.getElementById('btnCompra');

    listaCarrito.innerHTML = "";

    const tabla = document.createElement('table');

    tabla.innerHTML = `
        <tr>
            <th>DISCO</th>
            <th>ARTISTA</th>
            <th>CANTIDAD</th>
            <th>PRECIO</th>
            <th></th>
        </tr>
    `;

    let total = 0;

    carrito.forEach((item) => {
        total += item.precio * item.cantidad;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${item.nombreAlbum}</td>
            <td>${item.autor}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio * item.cantidad}</td>
            <td id="filaEliminar"><button onclick="eliminarDelCarrito('${item.nombreAlbum}')">Eliminar</button></td>
        `;

        tabla.appendChild(fila);

    });

    listaCarrito.appendChild(tabla);

    totalCarrito.innerText = `Total: $${total}`;   
}


function eliminarDelCarrito(nombreAlbum) {
    carrito = carrito.filter(item => item.nombreAlbum !== nombreAlbum);
    mostrarCarrito();
}

mostrarCatalogo(catalogo);