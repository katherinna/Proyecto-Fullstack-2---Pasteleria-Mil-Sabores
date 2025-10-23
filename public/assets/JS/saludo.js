document.addEventListener("DOMContentLoaded", () => {
    const bienvenido = document.getElementById("bienvenido");
    if (!bienvenido) return;

    // Leer usuario desde localStorage para mostrar el nombre de bienvenida desde el perfil de Admin o Cliente que esta en React
    const usuarioStr = localStorage.getItem("usuario");
    if (!usuarioStr) {
        bienvenido.innerText = "Bienvenido!";
        return;
    }

    const usuario = JSON.parse(usuarioStr);
    bienvenido.innerText = `Bienvenido ${usuario.nombre}!`;
});
