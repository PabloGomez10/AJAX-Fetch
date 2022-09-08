const sAlert = () => {

  Swal.fire({
    title: "Agregado al carrito"
  })

}

let componentes = []

let backend = async ()=>{
  await fetch("backend.json")
   .then((responsive) => responsive.json() )
   .then((datos) => {
    console.log (datos)
    componentes = {
      nombre,
      precio,
      id,
      imagenes
    } = datos;
    crearCards()
    return componentes
   })
}
backend();

 
// console.log(nombre, precio, id, imagenes);

const containerDiv = document.querySelector(".container");
const carritoDiv = document.querySelector(".carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function crearCards() {
  componentes.forEach((prod) => {
    containerDiv.innerHTML += `
    
    <div class="card col-6" style="width: 18rem;">
            <img src="${prod.imagenes}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4>${prod.nombre}</h4>
        <p>$${prod.precio}</p>
        <button class="btnCarrito btn btn-primary" id="btn-agregar${prod.id}">Agregar</button>
            </div>
  
   `;
   
  });

  agregarFuncionalidad();
}

function agregarFuncionalidad() {
  componentes.forEach((prod) => {
    document
      .querySelector(`#btn-agregar${prod.id}`)
      .addEventListener("click", () => {
        console.log(prod);
        agregarAlCarrito(prod);
      });
  });
}

function agregarAlCarrito(prod) {
  let existe = carrito.some((productoSome) => productoSome.id === prod.id);
  if (existe === false) {
    prod.cantidad = 1;
    carrito.push(prod);
  } else {
    let prodFind = carrito.find((productoFind) => productoFind.id === prod.id);
    prodFind.cantidad++;

  }

  console.log(carrito);
  renderizarCarrito();
}

function renderizarCarrito() {
  carritoDiv.innerHTML = "";
  carrito.forEach((prod) => {
    carritoDiv.innerHTML += `<div style="padding: 20px; background-color:#ebe3cc; border: 2px solid black;">
        <h4>${prod.nombre}</h4>
        <p>CANTIDAD: ${prod.cantidad}</p>
        <button class="btn btn-primary btnCarrito" id="btn-borrar${prod.id}">Borrar</button>
        <button class="btn btn-primary btnCarrito" id="btn-menos${prod.id}">-</button>
        </div>`;
  });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  borrarProducto();
}

function borrarProducto() {
  carrito.forEach((prod) => {
    document
      .querySelector(`#btn-borrar${prod.id}`)
      .addEventListener("click", () => {
        carrito = carrito.filter(
          (productoFilter) => productoFilter.id !== prod.id
        );
        renderizarCarrito();
      });
  });
}

crearCards();
renderizarCarrito();
/*const btnCarrito = document.querySelector(".btnCarrito")
btnCarrito.addEventListener("click", () => {
  sAlert()
})*/