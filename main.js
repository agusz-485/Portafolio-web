document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización de Typed.js (Efecto de escritura)
    if (document.getElementById('typed-text-output')) {
        var typed = new Typed('#typed-text-output', {
            stringsElement: '#typed-strings', // ID del contenedor con las frases
            typeSpeed: 50,                   // Velocidad de escritura (ms por carácter)
            backSpeed: 30,                   // Velocidad de borrado
            backDelay: 2000,                 // Tiempo que espera antes de borrar (en ms)
            startDelay: 500,                 // Retraso antes de empezar a escribir
            loop: true,                      // Repetir el efecto
            cursorChar: '|',                 // Carácter del cursor
        });
    }
    
});