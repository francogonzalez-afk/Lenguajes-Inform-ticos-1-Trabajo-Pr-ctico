const CLAVE_TEMA = "valiandar-theme";

function leerTemaGuardado() {
    try {
        return localStorage.getItem(CLAVE_TEMA);
    } catch (e) {
        return null;
    }
}

function guardarTema(tema) {
    try {
        localStorage.setItem(CLAVE_TEMA, tema);
    } catch (e) {
        /* si el navegador bloquea localStorage, el tema igual cambia en esta página */
    }
}

function aplicarTema(tema) {
    document.documentElement.dataset.theme = tema;
    const interruptor = document.getElementById("boton-tema");
    if (interruptor) {
        interruptor.checked = tema === "oscuro";
    }
}

// Se aplica enseguida (el script está en el <head>) para evitar el "parpadeo" de tema claro al cargar.
aplicarTema(leerTemaGuardado() === "oscuro" ? "oscuro" : "claro");

// El botón recién existe cuando el HTML terminó de cargar.
document.addEventListener("DOMContentLoaded", () => {
    const interruptor = document.getElementById("boton-tema");
    if (!interruptor) return;

    interruptor.checked = document.documentElement.dataset.theme === "oscuro";

    interruptor.addEventListener("change", () => {
        const tema = interruptor.checked ? "oscuro" : "claro";
        aplicarTema(tema);
        guardarTema(tema);
    });
});
