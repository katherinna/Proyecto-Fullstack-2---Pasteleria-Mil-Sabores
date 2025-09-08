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
        "Arica y Parinacota": [
            "Arica",
            "Camarones",
            "General Lagos",
            "Putre"
        ]
    };
    
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    
    if (regionSelect && comunaSelect) {
        regionSelect.addEventListener("change", function () {
            const region = this.value;
            console.log("Cambiaste la región:", region); // Debug
            comunaSelect.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
            
            if (regiones[region]) {
                regiones[region].forEach(comuna => {
                    const option = document.createElement("option");
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const regiones = {
        "Arica y Parinacota": ["Arica", "Camarones", "General Lagos", "Putre"]
    };
    
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");
    const form = document.getElementById("formRegistro"); // <-- acá declaramos el form
    
    // Cargar comunas según región
    if (regionSelect && comunaSelect) {
        regionSelect.addEventListener("change", function () {
            const region = this.value;
            comunaSelect.innerHTML = '<option value="">-- Seleccione la comuna --</option>';
            
            if (regiones[region]) {
                regiones[region].forEach(comuna => {
                    const option = document.createElement("option");
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
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
        window.location.href = "index.html";
    });
});