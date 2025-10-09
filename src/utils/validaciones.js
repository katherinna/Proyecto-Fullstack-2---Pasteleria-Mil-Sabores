// ---- VALIDACIÓN RUN ----
export function validarRun(run) {
    run = run.replace(/\s+/g, "").toUpperCase(); // limpiar espacios y mayúsculas
    if (!/^\d{7,8}[0-9K]$/.test(run)) return false; // debe tener 7-8 dígitos + DV
    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    let suma = 0;
    let multiplo = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i], 10) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    
    const resto = suma % 11;
    const dvEsperado = resto === 0 ? "0" : resto === 1 ? "K" : String(11 - resto);
    return dv === dvEsperado
}

// ---- VALIDACIÓN CORREO ----
export function validarCorreo(correo) {
    const regex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(correo);
}



export function mostrarProductos(categoria = "") {
    
    const contenedor = document.getElementById("contenedorProductos");
    if (!contenedor) return;
  
    contenedor.innerHTML = "";
    
    const filtrados = categoria
      ? productos.filter((prod) => prod.categoria === categoria)
      : productos;
      
      filtrados.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("col-md-3", "mb-4"); // 👈 ahora 4 por fila
        
        div.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="../img/${prod.img}" class="card-img-top" alt="${prod.nombre}" style="object-fit: cover; height: 200px;">
          <div class="card-body p-3 d-flex flex-column">
            <h5 class="card-title mb-2">${prod.nombre}</h5>
            <p class="card-text mb-2"><strong>$${prod.precio.toLocaleString()}</strong></p>
            <button type="button" class="btn btn-primary" onclick="window.location.href='detalle_product.html?id=${prod.codigo}'">Ver Detalles</button>
            <br>
            <button class="btn btn-primary mt-auto" onclick="alert('Agregaste ${prod.nombre} al carrito')">Agregar al carrito</button>
          </div>
        </div>
        `;
        
        contenedor.appendChild(div);
    });
}


//minicatalogo aleatorio
export function mostrarMiniCatalogo() {
    const contenedor = document.getElementById("contenedorMiniCatalogo");
    if (!contenedor) return;
  
    contenedor.innerHTML = "";
  
    // Copiamos el array para no modificar el original
    const productosCopia = [...productos];
  
    
    // Función para obtener N elementos aleatorios sin repetición
    function obtenerAleatorios(arr, n) {
        const resultado = [];
        const usado = new Set();
        while (resultado.length < n && resultado.length < arr.length) {
            const indice = Math.floor(Math.random() * arr.length);
            if (!usado.has(indice)) {
                usado.add(indice);
                resultado.push(arr[indice]);
            }
        }
        return resultado;
    }
    
    const aleatorios = obtenerAleatorios(productosCopia, 4);
    
    aleatorios.forEach((prod) => {
        const div = document.createElement("div");
        div.classList.add("col-md-3", "mb-4");
        
        div.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="../img/${prod.img}" class="card-img-top" alt="${prod.nombre}" style="object-fit: cover; height: 200px;">
          <div class="card-body p-3 d-flex flex-column">
            <h5 class="card-title mb-2">${prod.nombre}</h5>
            <p class="card-text mb-2"><strong>$${prod.precio.toLocaleString()}</strong></p>
            <button type="button" class="btn btn-primary" onclick="window.location.href='detalle_product.html?id=${prod.codigo}'">Ver Detalles</button>
            <br>
            <button class="btn btn-primary mt-auto" onclick="alert('Agregaste ${prod.nombre} al carrito')">Agregar al carrito</button>
          </div>
        </div>
        `;
  
      contenedor.appendChild(div);
    
    });
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarMiniCatalogo();
});

// Selecciona 3 productos aleatorios
export function obtenerProductosAleatorios() {
    
    const copia = [...productos];
    let seleccionados = [];
    for (let i = 0; i < 3; i++) {
        const index = Math.floor(Math.random() * copia.length);
        seleccionados.push(copia.splice(index, 1)[0]);
    }
    return seleccionados;
}

// Renderizar carrito
export function mostrarCarrito() {
    const itemsCarrito = document.getElementById("itemsCarrito");
    if (!itemsCarrito) return;

    const productosCarrito = obtenerProductosAleatorios();
    itemsCarrito.innerHTML = "";

    productosCarrito.forEach((prod, i) => {
        let div = document.createElement("div");
        div.classList.add("card", "mb-3", "shadow-sm");
        div.style.minHeight = "200px"; // 👈 altura mínima para uniformidad
        div.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="../img/${prod.img}" class="img-fluid rounded-start"
                         alt="${prod.nombre}" style="object-fit: cover; height: 100%; max-height: 200px; width: 100%;">
                </div>
                <div class="col-md-8 d-flex flex-column">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${prod.nombre}</h5>
                        <p class="card-text">Aquí va la descripción</p>
                        <p class="card-text"><strong>Precio: $${prod.precio.toLocaleString()}</strong></p>

                        <div class="mt-auto d-flex justify-content-end gap-3">
                            <a href="#" class="text-secondary d-flex align-items-center text-decoration-none">
                                <i class="bi bi-pencil-square me-1"></i> Editar
                            </a>
                            <a href="#" class="text-danger d-flex align-items-center text-decoration-none">
                                <i class="bi bi-trash3 me-1"></i> Eliminar
                            </a>
                        </div>

                        <div class="d-flex align-items-center gap-2 mt-auto">
                            <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${i}, -1)">-</button>
                            <input type="number" id="cantidad-${i}"
                                   class="form-control text-center" value="1" min="1" style="width:70px">
                            <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${i}, 1)">+</button>
                        </div>

                        <p class="mt-2">Subtotal:
                            <span id="subtotal-${i}">$${prod.precio.toLocaleString()}</span>
                        </p>
                    </div>
                </div>
            </div>
        `;
        itemsCarrito.appendChild(div);
    });

    // Guardamos en memoria global para acceder luego
    window.productosCarrito = productosCarrito;
    actualizarTotal();
}


// Cambiar cantidad con botones + -
export function cambiarCantidad(index, delta) {
    const input = document.getElementById(`cantidad-${index}`);
    let nuevaCantidad = parseInt(input.value) + delta;
    if (nuevaCantidad < 1) nuevaCantidad = 1;
    input.value = nuevaCantidad;
    actualizarSubtotal(index);
}

export function actualizarSubtotal(index) {
    const cantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
    const prod = window.productosCarrito[index];
    const subtotal = cantidad * prod.precio;
    document.getElementById(`subtotal-${index}`).textContent = `$${subtotal.toLocaleString()}`;
    actualizarTotal();
}

let descuentoActivo = 0;

// Actualizar subtotales y total
export function actualizarTotal() {
  let subtotal = 0;
  window.productosCarrito.forEach((prod, i) => {
    const cantidad = parseInt(document.getElementById(`cantidad-${i}`).value);
    subtotal += cantidad * prod.precio;
  });

  // mostrar subtotal
  document.getElementById("subtotalCarrito").textContent = `$${subtotal.toLocaleString()}`;
  document.getElementById("descuentoCarrito").textContent = `$${descuentoActivo.toLocaleString()}`;

  const total = subtotal - descuentoActivo;
  document.getElementById("totalCarrito").textContent = `$${total.toLocaleString()}`;
}

// Aplicar código de descuento
export function aplicarDescuento() {
  const codigo = document.getElementById("codigoDescuento").value.trim().toLowerCase();

  if (codigo === "pastelito10") {
    descuentoActivo = 5000; // monto fijo (ejemplo)
    alert("¡Código aplicado con éxito! 🎉");
  } else {
    descuentoActivo = 0;
    alert("Código no válido 😢");
  }

  actualizarTotal();
}

// Ejecutar al cargar carrito
document.addEventListener("DOMContentLoaded", mostrarCarrito);


//Contacto
//validar correo
export function validarCorreo(correo) {
    const regex = /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(correo);
}
