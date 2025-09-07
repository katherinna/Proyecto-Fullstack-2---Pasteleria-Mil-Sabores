let cantidadProductos = 0;

document.addEventListener("DOMContentLoaded", function() {
    const contador = document.getElementById("contador");
    contador.textContent = cantidadProductos > 9 ? "9+" : cantidadProductos;
});

const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});
