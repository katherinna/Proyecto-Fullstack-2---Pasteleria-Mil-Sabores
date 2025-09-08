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

/*Busqueda sin BDD
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
});*/

document.addEventListener("DOMContentLoaded", function() {
    const regiones = {
        "Arica y Parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
        "Tarapacá": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
        "Antofagasta": ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"],
        "Atacama": ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"],
        "Coquimbo": ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"],
        "Valparaíso": ["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"],
        "Metropolitana de Santiago": ["Alhué","Buin","Calera de Tango","Cerrillos","Cerro Navia","Colina","Conchalí","Curacaví","El Bosque","El Monte","Estación Central","Huechuraba","Independencia","Isla de Maipo","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Lampa","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","María Pinto","Melipilla","Ñuñoa","Padre Hurtado","Paine","Pedro Aguirre Cerda","Peñaflor","Peñalolén","Pirque","Providencia","Pudahuel","Puente Alto","Quilicura","Quinta Normal","Recoleta","Renca","San Bernardo","San Joaquín","San José de Maipo","San Miguel","San Pedro","San Ramón","Santiago","Talagante","Tiltil","Vitacura"],
        "O’Higgins": ["Chépica","Chimbarongo","Codegua","Coinco","Coltauco","Doñihue","Graneros","La Estrella","Las Cabras","Litueche","Lolol","Machalí","Malloa","Marchihue","Mostazal","Nancagua","Navidad","Olivar","Palmilla","Paredones","Peralillo","Peumo","Pichidegua","Pichilemu","Placilla","Pumanque","Quinta de Tilcoco","Rancagua","Rengo","Requínoa","San Fernando","San Vicente","Santa Cruz"],
        "Maule": ["Cauquenes","Chanco","Colbún","Constitución","Curepto","Curicó","Empedrado","Hualañé","Licantén","Linares","Longaví","Maule","Molina","Parral","Pelarco","Pelluhue","Pencahue","Rauco","Retiro","Río Claro","Romeral","Sagrada Familia","San Clemente","San Javier","San Rafael","Talca","Teno","Vichuquén","Villa Alegre","Yerbas Buenas"],
        "Ñuble": ["Bulnes","Chillán","Chillán Viejo","Cobquecura","Coelemu","Coihueco","El Carmen","Ninhue","Ñiquén","Pemuco","Pinto","Portezuelo","Quillón","Quirihue","Ránquil","San Carlos","San Fabián","San Ignacio","San Nicolás","Treguaco","Yungay"],
        "Biobío": ["Alto Biobío","Antuco","Arauco","Cabrero","Cañete","Chiguayante","Concepción","Contulmo","Coronel","Curanilahue","Florida","Hualpén","Hualqui","Laja","Lebu","Los Álamos","Los Ángeles","Lota","Mulchén","Nacimiento","Negrete","Penco","Quilaco","Quilleco","San Pedro de la Paz","San Rosendo","Santa Bárbara","Santa Juana","Talcahuano","Tirúa","Tomé","Tucapel","Yumbel"],
        "La Araucanía": ["Angol","Carahue","Cholchol","Collipulli","Cunco","Curacautín","Curarrehue","Ercilla","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Lonquimay","Los Sauces","Lumaco","Melipeuco","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Purén","Renaico","Saavedra","Temuco","Teodoro Schmidt","Toltén","Traiguén","Victoria","Vilcún","Villarrica"],
        "Los Ríos": ["Corral","Futrono","La Unión","Lago Ranco","Lanco","Los Lagos","Máfil","Mariquina","Paillaco","Panguipulli","Río Bueno","Valdivia"],
        "Los Lagos": ["Ancud","Calbuco","Castro","Chaitén","Chonchi","Cochamó","Curaco de Vélez","Dalcahue","Fresia","Frutillar","Futaleufú","Hualaihué","Llanquihue","Los Muermos","Maullín","Osorno","Palena","Puerto Montt","Puerto Octay","Puerto Varas","Puqueldón","Queilén","Quellón","Quemchi","Quinchao","Río Negro","San Juan de la Costa","San Pablo"],
        "Aysén": ["Aysén","Chile Chico","Cisnes","Cochrane","Coyhaique","Guaitecas","Lago Verde","O’Higgins","Río Ibáñez","Tortel"],
        "Magallanes y la Antártica": ["Antártica","Cabo de Hornos","Laguna Blanca","Natales","Porvenir","Primavera","Punta Arenas","Río Verde","San Gregorio","Timaukel","Torres del Paine"]
    };
    
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    const form = document.getElementById("formRegistro");

    if (regionSelect) {
        Object.keys(regiones).forEach(region => {
            const opt = document.createElement("option");
            opt.value = region;
            opt.textContent = region;
            regionSelect.appendChild(opt);
        });
    }
    
    if (regionSelect && comunaSelect) {
        regionSelect.addEventListener("change", function () {
            comunaSelect.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
            if (regiones[this.value]) {
                regiones[this.value].forEach(comuna => {
                    const opt = document.createElement("option");
                    opt.value = comuna;
                    opt.textContent = comuna;
                    comunaSelect.appendChild(opt);
                });
            }
        });
    }

    // --- CARGAR FORMULARIO GUARDADO ---
    const savedData = JSON.parse(localStorage.getItem("formRegistro")) || {};
    Object.keys(savedData).forEach(id => {
        if (document.getElementById(id)) {
            document.getElementById(id).value = savedData[id];
        }
    });

    // --- GUARDAR FORMULARIO AL ESCRIBIR ---
    form.addEventListener("input", () => {
        const data = {};
        [...form.elements].forEach(el => {
            if (el.id) data[el.id] = el.value;
        });
        localStorage.setItem("formRegistro", JSON.stringify(data));
    });

    // --- VALIDACIONES Y SUBMIT ---
    form.addEventListener("submit", function(e){
        e.preventDefault();
        // aquí va todo tu código de validación y guardado de usuario
    });

    // ---- VALIDACIÓN RUN ----
    function validarRun(run) {
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
        return dv === dvEsperado;
    }

    // ---- VALIDACIÓN CORREO ----
    function validarCorreo(correo) {
        const regex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
        return regex.test(correo);
    }

    // Cargar usuarios previos desde localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validación al enviar formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        const run = document.getElementById("run");
        const correo = document.getElementById("correo");
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirmPassword");

        // RUN
        if (!validarRun(run.value.trim())) {
            run.classList.add("is-invalid");
            valido = false;
        } else {
            run.classList.remove("is-invalid");
            run.classList.add("is-valid");
        }

        // Correo
        if (!validarCorreo(correo.value.trim())) {
            correo.classList.add("is-invalid");
            valido = false;
        } else {
            correo.classList.remove("is-invalid");
            correo.classList.add("is-valid");
        }

        // Contraseña
        if (password.value.length < 6) {
            password.classList.add("is-invalid");
            valido = false;
        } else {
            password.classList.remove("is-invalid");
            password.classList.add("is-valid");
        }

        // Confirmar contraseña
        if (password.value !== confirmPassword.value || confirmPassword.value === "") {
            confirmPassword.classList.add("is-invalid");
            valido = false;
        } else {
            confirmPassword.classList.remove("is-invalid");
            confirmPassword.classList.add("is-valid");
        }

        // Guardar usuario si todo ok
        if (valido) {
            const nuevoUsuario = {
                run: run.value.trim(),
                nombre: document.getElementById("nombre").value.trim(),
                apellidos: document.getElementById("apellidos").value.trim(),
                correo: correo.value.trim(),
                password: password.value, // ojo: en real debería guardarse encriptada
                fechaNacimiento: document.getElementById("fechaNacimiento").value,
                region: regionSelect.value,
                comuna: comunaSelect.value,
                direccion: document.getElementById("direccion").value.trim()
            };

            if (usuarios.some(u => u.correo === nuevoUsuario.correo)) {
                alert("⚠️ Ya existe un usuario con este correo.");
                return;
            }

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("✅ Usuario registrado correctamente!");
            form.reset();
            window.location.href = "index.html"; // <- Redirige al home
            document.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const togglePass = document.getElementById("togglePass");
    const passwordInput = document.getElementById("password");
    const formLogin = document.getElementById("formLogin");
    
    togglePass.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePass.textContent = "Ocultar";
        } else {
            passwordInput.type = "password";
            togglePass.textContent = "Mostrar";
        }
    });
    
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value;
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        const usuario = usuarios.find(u => u.correo === correo);
        
        if (!usuario) {
            document.getElementById("correo").classList.add("is-invalid");
            return;
        } else {
            document.getElementById("correo").classList.remove("is-invalid");
        }
        
        if (usuario.password !== password) {
            document.getElementById("password").classList.add("is-invalid");
            return;
        } else {
            document.getElementById("password").classList.remove("is-invalid");
        }
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert("✅ Sesión iniciada correctamente!");
        form.reset();
        window.location.href = "index.html";
    });
});

// Lista de productos
const productos = [
  {codigo:"TC001", categoria:"Tortas Cuadradas", nombre:"Torta Cuadrada de Chocolate", precio:45000, img:"TC001.jpg"},
  {codigo:"TC002", categoria:"Tortas Cuadradas", nombre:"Torta Cuadrada de Frutas", precio:50000, img:"TC002.jpg"},
  {codigo:"TT001", categoria:"Tortas Circulares", nombre:"Torta Circular de Vainilla", precio:40000, img:"TT001.jpg"},
  {codigo:"TT002", categoria:"Tortas Circulares", nombre:"Torta Circular de Manjar", precio:42000, img:"TT002.jpg"},
  {codigo:"PI001", categoria:"Postres Individuales", nombre:"Mousse de Chocolate", precio:5000, img:"PI001.jpg"},
  {codigo:"PI002", categoria:"Postres Individuales", nombre:"Tiramisú Clásico", precio:5500, img:"PI002.jpg"},
  {codigo:"PSA001", categoria:"Productos Sin Azúcar", nombre:"Torta Sin Azúcar de Naranja", precio:48000, img:"PSA001.jpg"},
  {codigo:"PSA002", categoria:"Productos Sin Azúcar", nombre:"Cheesecake Sin Azúcar", precio:47000, img:"PSA002.jpg"},
  {codigo:"PT001", categoria:"Pastelería Tradicional", nombre:"Empanada de Manzana", precio:3000, img:"PT001.jpg"},
  {codigo:"PT002", categoria:"Pastelería Tradicional", nombre:"Tarta de Santiago", precio:6000, img:"PT002.jpg"},
  {codigo:"PG001", categoria:"Productos Sin Gluten", nombre:"Brownie Sin Gluten", precio:4000, img:"PG001.jpg"},
  {codigo:"PG002", categoria:"Productos Sin Gluten", nombre:"Pan Sin Gluten", precio:3500, img:"PG002.jpg"},
  {codigo:"PV001", categoria:"Productos Vegana", nombre:"Torta Vegana de Chocolate", precio:50000, img:"PV001.jpeg"},
  {codigo:"PV002", categoria:"Productos Vegana", nombre:"Galletas Veganas de Avena", precio:4500, img:"PV002.jpg"},
  {codigo:"TE001", categoria:"Tortas Especiales", nombre:"Torta Especial de Cumpleaños", precio:55000, img:"TE001.jpg"},
  {codigo:"TE002", categoria:"Tortas Especiales", nombre:"Torta Especial de Boda", precio:60000, img:"TE002.jpg"}
];

// Contenedor
const contenedor = document.getElementById("contenedorProductos");
const titulo = document.getElementById("tituloCategoria");

// Obtener categoría de localStorage (cuando se hizo click en dropdown)
let categoriaSeleccionada = localStorage.getItem("categoriaSeleccionada");

// Función para renderizar productos
function mostrarProductos(categoria = null) {
  contenedor.innerHTML = "";
  let filtrados = categoria ? productos.filter(p => p.categoria === categoria) : productos;

  titulo.textContent = categoria ? categoria : "Todos los productos";

  filtrados.forEach(prod => {
    let card = document.createElement("div");
    card.classList.add("col-md-3");
    card.innerHTML = `
      <div class="card h-100">
        <img src="../img/${prod.img}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text">$${prod.precio.toLocaleString()} CLP</p>
          <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito('${prod.codigo}')">Añadir al carrito</button>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}

// Función añadir al carrito
function agregarAlCarrito(codigo) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(codigo);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido al carrito!");
}

// Inicializar
mostrarProductos(categoriaSeleccionada);
localStorage.removeItem("categoriaSeleccionada");

// Capturar clicks en el dropdown del header
document.querySelectorAll(".categoria-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    let cat = e.target.dataset.categoria;
    localStorage.setItem("categoriaSeleccionada", cat);
    window.location.href = "productos.html";
  });
});