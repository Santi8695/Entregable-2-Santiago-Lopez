const catalogo = [
    {
        imagen: "img/flowerBoy.jpg",
        nombreAlbum: "Flower Boy",
        autor: "Tyler, The Creator",
        precio: 27
    },
    {
        imagen: "img/blond.jpeg",
        nombreAlbum: "Blond",
        autor: "Frank Ocean",
        precio: 34
    },
    {
        imagen: "img/gkmc.jpg",
        nombreAlbum: "Good Kid, m.A.A.d city",
        autor: "Kendrick Lamar",
        precio: 32
    },
    {
        imagen: "img/TheMelodicBlueCover.jpeg",
        nombreAlbum: "Melodic Blue",
        autor: "Baby Keem",
        precio: 31
    }
];

let carrito = [];

function mostrarCatalogo(catalogo) {
    const contenedor = document.getElementById("contenedorCatalogo");

    for (const producto of catalogo) {
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
    }
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

    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((item) => {
        total += item.precio * item.cantidad;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombreAlbum} - ${item.autor} (x${item.cantidad}) - $${item.precio * item.cantidad}
            <button onclick="eliminarDelCarrito('${item.nombreAlbum}')">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = `Total: $${total}`;
}

function eliminarDelCarrito(nombreAlbum) {
    carrito = carrito.filter(item => item.nombreAlbum !== nombreAlbum);
    mostrarCarrito();
}

mostrarCatalogo(catalogo);
