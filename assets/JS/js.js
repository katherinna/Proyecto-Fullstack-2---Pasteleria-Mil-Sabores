const productos = {
    "TC001": {
        categoria: "Tortas Cuadradas",
        nombre: "Torta Cuadrada de Chocolate",
        precio: "$45.000 CLP",
        descripcion: "Deliciosa torta con capas de ganache y avellanas, ideal para celebraciones.",
        imagen: "../img/TC001.jpg"
    },
    "TC002": {
        categoria: "Tortas Cuadradas",
        nombre: "Torta Cuadrada de Frutas",
        precio: "$50.000 CLP",
        descripcion: "Bizcocho de vainilla con crema chantilly y frutas frescas de temporada.",
        imagen: "../img/TC002.jpg"
    },
    "TT001": {
        categoria: "Tortas Circulares",
        nombre: "Torta Circular de Vainilla",
        precio: "$40.000 CLP",
        descripcion: "Esponjosa torta circular de vainilla con decoración de crema.",
        imagen: "../img/TT001.jpg"
    },
    "TT002": {
        categoria: "Tortas Circulares",
        nombre: "Torta Circular de Manjar",
        precio: "$42.000 CLP",
        descripcion: "Torta circular rellena de manjar y decorada con almendras.",
        imagen: "../img/TT002.jpg"
    },
    "PI001": {
        categoria: "Postres Individuales",
        nombre: "Mousse de Chocolate",
        precio: "$5.000 CLP",
        descripcion: "Mousse de chocolate suave y cremoso, servido en porción individual.",
        imagen: "../img/PI001.jpg"
    },
    "PI002": {
        categoria: "Postres Individuales",
        nombre: "Tiramisú Clásico",
        precio: "$5.500 CLP",
        descripcion: "Postre italiano con capas de bizcocho, café y crema de mascarpone.",
        imagen: "../img/PI002.jpg"
    },
    "PSA001": {
        categoria: "Productos Sin Azúcar",
        nombre: "Torta Sin Azúcar de Naranja",
        precio: "$48.000 CLP",
        descripcion: "Torta saludable de naranja, libre de azúcar añadido.",
        imagen: "../img/PSA001.jpg"
    },
    "PSA002": {
        categoria: "Productos Sin Azúcar",
        nombre: "Cheesecake Sin Azúcar",
        precio: "$47.000 CLP",
        descripcion: "Delicioso cheesecake libre de azúcar, cremoso y ligero.",
        imagen: "../img/PSA002.jpg"
    },
    "PT001": {
        categoria: "Pastelería Tradicional",
        nombre: "Empanada de Manzana",
        precio: "$3.000 CLP",
        descripcion: "Empanada clásica de manzana con toque de canela.",
        imagen: "../img/PT001.jpg"
    },
    "PT002": {
        categoria: "Pastelería Tradicional",
        nombre: "Tarta de Santiago",
        precio: "$6.000 CLP",
        descripcion: "Tarta tradicional española con almendras y azúcar glas.",
        imagen: "../img/PT002.jpg"
    },
    "PG001": {
        categoria: "Productos Sin Gluten",
        nombre: "Brownie Sin Gluten",
        precio: "$4.000 CLP",
        descripcion: "Brownie de chocolate, esponjoso y sin gluten.",
        imagen: "../img/PG001.jpg"
    },
    "PG002": {
        categoria: "Productos Sin Gluten",
        nombre: "Pan Sin Gluten",
        precio: "$3.500 CLP",
        descripcion: "Pan fresco, esponjoso y libre de gluten, ideal para el desayuno.",
        imagen: "../img/PG002.jpg"
    },
    "PV001": {
        categoria: "Productos Vegana",
        nombre: "Torta Vegana de Chocolate",
        precio: "$50.000 CLP",
        descripcion: "Torta 100% vegana, rica en sabor y con ingredientes naturales.",
        imagen: "../img/PV001.jpg"
    },
    "PV002": {
        categoria: "Productos Vegana",
        nombre: "Galletas Veganas de Avena",
        precio: "$4.500 CLP",
        descripcion: "Galletas saludables de avena, 100% veganas y deliciosas.",
        imagen: "../img/PV002.jpg"
    },
    "TE001": {
        categoria: "Tortas Especiales",
        nombre: "Torta Especial de Cumpleaños",
        precio: "$55.000 CLP",
        descripcion: "Torta personalizada para cumpleaños, decorada a pedido.",
        imagen: "../img/TE001.jpg"
    },
    "TE002": {
        categoria: "Tortas Especiales",
        nombre: "Torta Especial de Boda",
        precio: "$60.000 CLP",
        descripcion: "Elegante torta de boda, con diseño exclusivo y sabor delicado.",
        imagen: "../img/TE002.jpg"
    }
};



// Obtener el id desde la URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Mostrar datos en la página
if (productos[id]) {
    document.getElementById("categoria").textContent=productos[id].categoria;
    document.getElementById("nombre").textContent = productos[id].nombre;
    document.getElementById("precio").textContent = productos[id].precio;
    document.getElementById("descripcion").textContent = productos[id].descripcion;
    document.getElementById("img").src = productos[id].imagen;
    document.getElementById("img").alt = productos[id].nombre;
    document.title = productos[id].nombre + " - Pastelería Mil Sabores";
} else {
    document.querySelector(".producto").innerHTML =
        "<h2>Producto no encontrado</h2><a href='catalogo.html'>Volver al catálogo</a>";
}