// Obtener el formulario de inicio de sesión
const loginForm = document.getElementById('login-form');

// Agregar un controlador de eventos para el envío del formulario de inicio de sesión
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores de usuario y contraseña ingresados
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar las credenciales de inicio de sesión
    if ((username === 'ferxxo' && password === '65669599') ||
        (username === 'isael' && password === '5009632') ||
        (username === 'santiago' && password === '72192910') ||
        (username === 'laura' && password === '12888396') ||
        (username === 'dani' && password === '60513020')) {
        // Redirigir a la página de reservas de habitaciones si las credenciales son válidas
        window.location.href = 'reservas.html';
    } else {
        alert('de nuevo mi colla');
    }
});

// Obtener el formulario de reserva de habitaciones
const reservaForm = document.getElementById('reserva-form');

// Agregar un controlador de eventos para el envío del formulario de reserva de habitaciones
reservaForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores de la reserva de habitaciones
    const habitacion = document.getElementById('habitacion').value;
    const inicio = document.getElementById('inicio').value;
    const fin = document.getElementById('fin').value;

    // Realizar el procesamiento o envío de la reserva
    // ...

    // Mostrar mensaje de éxito
    alert(`Habitación ${habitacion} reservada desde ${inicio} hasta ${fin}`);
});