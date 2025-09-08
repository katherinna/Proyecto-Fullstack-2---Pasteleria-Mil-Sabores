let cantidadProductos = 0;

document.addEventListener("DOMContentLoaded", function() {
    const contador = document.getElementById("contador");

    function actualizarContador() {
        contador.textContent = cantidadProductos > 9 ? "9+" : cantidadProductos;
    }

    actualizarContador();

    // Funciones opcionales para agregar/quitar productos
    // function agregarProducto() { cantidadProductos++; actualizarContador(); }
    // function quitarProducto() { if(cantidadProductos > 0) cantidadProductos--; actualizarContador(); }
});

document.addEventListener("DOMContentLoaded", function() {
    const textoUsuario = document.getElementById("textoUsuario");
    const btnIniciarSesion = document.getElementById("usuarioAccion");
    const btnCrearCuenta = document.querySelector(".btn-crear-cuenta");
    const logoutBtn = document.getElementById("logoutBtn");

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (isLoggedIn) {
        textoUsuario.textContent = "Mi perfil";
        btnIniciarSesion.textContent = "Ver perfil";
        btnIniciarSesion.onclick = () => window.location.href = "perfil.html";
        logoutBtn.style.display = "block";
    } else {
        textoUsuario.textContent = "Iniciar sesión";
        btnIniciarSesion.textContent = "Iniciar sesión";
        btnIniciarSesion.onclick = () => window.location.href = "inicio_sesion.html";
        logoutBtn.style.display = "none";
    }

    btnCrearCuenta.onclick = () => window.location.href = "registrar_usuario.html";

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        location.reload();
    });
});

/*Busqueda sin BDD*/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formBusqueda");
    const input = document.getElementById("inputBusqueda");

    // Ejemplo de productos
    const productos = ["Zapatos", "Remeras", "Pantalones", "Bolsos", "Sombreros"];

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recargar la página
        const query = input.value.toLowerCase();
        const resultados = productos.filter(p => p.toLowerCase().includes(query));
        alert(resultados.length ? "Resultados: " + resultados.join(", ") : "No se encontraron productos");
    });
});

