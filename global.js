// Función global para actualizar la versión en el footer de cualquier HTML
async function actualizarVersionGlobal() {
    const spanVersion = document.getElementById('versionText');
    if (!spanVersion) return;

    // Intentamos leer del localStorage para que sea instantáneo
    let versionGuardada = localStorage.getItem('app_version');
    if (versionGuardada) {
        spanVersion.textContent = 'v' + versionGuardada;
    }

    // En segundo plano consultamos el novedades.json por si hubo una actualización
    try {
        const respuesta = await fetch('./novedades.json?t=' + new Date().getTime());
        const datos = await respuesta.json();
        if (datos.version) {
            spanVersion.textContent = 'v' + datos.version;
            localStorage.setItem('app_version', datos.version); // Guardamos globalmente
        }
    } catch (error) {
        console.error("No se pudo sincronizar la versión global:", error);
    }
}

// Se ejecuta automáticamente al cargar cualquier página que incluya este script
window.addEventListener('load', () => {
    actualizarVersionGlobal();
});