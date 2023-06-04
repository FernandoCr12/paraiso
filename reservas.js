document.addEventListener("DOMContentLoaded", () => {
    // Obtener elementos del DOM
    const agregarBtn = document.getElementById("agregar-btn");
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const closeBtn = document.getElementsByClassName("close")[0];
    const agregarForm = document.getElementById("agregar-form");
    const huéspedesTable = document.getElementById("huéspedes-table").getElementsByTagName("tbody")[0];
    const filaNueva = document.getElementById("fila-nueva");

    // Contador para el número de huésped
    let contadorHuésped = 1;

    // Evento click en el botón "Agregar"
    agregarBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Evento click en el botón "Cerrar" del modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        agregarForm.reset();
    });

    // Evento submit del formulario de agregar huésped
    agregarForm.addEventListener("submit", (e) => {
        e.preventDefault();
        agregarHuésped();
        modal.style.display = "none";
        agregarForm.reset();
    });

    // Cargar huéspedes al cargar la página
    cargarHuéspedes();

    // Agregar un nuevo huésped a la tabla
    function agregarHuésped() {
        const numeroHabitacionSelect = document.getElementById("numero-habitacion");
        const numeroHabitacion = numeroHabitacionSelect.value;
        const habitacionOcupada = numeroHabitacionSelect.options[numeroHabitacionSelect.selectedIndex].dataset.ocupada === "true";

        if (habitacionOcupada) {
            alert("La habitación seleccionada está ocupada. Por favor, elija otra habitación.");
            return;
        }

        const nombre = document.getElementById("nombre").value;
        const ci = document.getElementById("ci").value;
        const monto = document.getElementById("monto").value;
        const tipoEstancia = document.getElementById("tipo-estancia").value;
        const diaIngreso = document.getElementById("dia-ingreso").value;
        const horaIngreso = document.getElementById("hora-ingreso").value;

        // Verificar si la habitación ya está seleccionada
        const habitacionesSeleccionadas = Array.from(huéspedesTable.getElementsByClassName("numero-habitacion")).map((celda) => celda.textContent);
        if (habitacionesSeleccionadas.includes(numeroHabitacion)) {
            alert("La habitación seleccionada ya ha sido elegida. Por favor, elija otra habitación.");
            return;
        }

        // Crear una nueva fila
        const nuevaFila = document.createElement("tr");

        // Agregar clases a la nueva fila
        nuevaFila.classList.add("nueva-fila");

        // Crear celdas de la nueva fila
        const numeroCelda = document.createElement("td");
        numeroCelda.classList.add("numero-habitacion");
        const habitacionCelda = document.createElement("td");
        const nombreCelda = document.createElement("td");
        const ciCelda = document.createElement("td");
        const tipoEstanciaCelda = document.createElement("td");
        const diaIngresoCelda = document.createElement("td");
        const horaIngresoCelda = document.createElement("td");
        const accionesCelda = document.createElement("td");

        // Agregar contenido a las celdas
        numeroCelda.textContent = contadorHuésped;
        habitacionCelda.textContent = `Habitación ${numeroHabitacion}`;
        nombreCelda.textContent = nombre;
        ciCelda.textContent = ci;
        tipoEstanciaCelda.textContent = tipoEstancia;
        diaIngresoCelda.textContent = diaIngreso;
        horaIngresoCelda.textContent = horaIngreso;
        accionesCelda.innerHTML = '<button class="borrar-btn">Borrar</button>';

        // Agregar evento al botón "Borrar"
        accionesCelda.querySelector(".borrar-btn").addEventListener("click", () => {
            nuevaFila.remove();
            guardarHuéspedes(); // Guardar cambios después de borrar un huésped
        });

        // Agregar celdas a la nueva fila
        nuevaFila.appendChild(numeroCelda);
        nuevaFila.appendChild(habitacionCelda);
        nuevaFila.appendChild(nombreCelda);
        nuevaFila.appendChild(ciCelda);
        nuevaFila.appendChild(tipoEstanciaCelda);
        nuevaFila.appendChild(diaIngresoCelda);
        nuevaFila.appendChild(horaIngresoCelda);
        nuevaFila.appendChild(accionesCelda);

        // Incrementar el contador de huésped
        contadorHuésped++;

        // Agregar la nueva fila a la tabla
        huéspedesTable.appendChild(nuevaFila);

        guardarHuéspedes(); // Guardar cambios después de agregar un huésped
    }

    // Cargar huéspedes desde el localStorage
    function cargarHuéspedes() {
        const huéspedes = obtenerHuéspedesGuardados();
        if (huéspedes && huéspedes.length > 0) {
            huéspedes.forEach((huésped) => {
                const nuevaFila = crearFilaHuésped(huésped);
                huéspedesTable.appendChild(nuevaFila);
                contadorHuésped++;
            });
        }
    }

    // Guardar los huéspedes en el localStorage
    function guardarHuéspedes() {
        const huéspedes = obtenerHuéspedesDeTabla();
        localStorage.setItem("huéspedes", JSON.stringify(huéspedes));
    }

    // Obtener los huéspedes guardados en el localStorage
    function obtenerHuéspedesGuardados() {
        const huéspedesString = localStorage.getItem("huéspedes");
        return JSON.parse(huéspedesString);
    }

    // Obtener los huéspedes de la tabla
    function obtenerHuéspedesDeTabla() {
        const filas = Array.from(huéspedesTable.getElementsByClassName("nueva-fila"));
        return filas.map((fila) => ({
            numero: fila.children[0].textContent,
            habitacion: fila.children[1].textContent,
            nombre: fila.children[2].textContent,
            ci: fila.children[3].textContent,
            tipoEstancia: fila.children[4].textContent,
            diaIngreso: fila.children[5].textContent,
            horaIngreso: fila.children[6].textContent
        }));
    }

    // Crear una fila de huésped con los datos proporcionados
    function crearFilaHuésped(huésped) {
        const nuevaFila = document.createElement("tr");
        nuevaFila.classList.add("nueva-fila");

        const numeroCelda = document.createElement("td");
        numeroCelda.classList.add("numero-habitacion");
        const habitacionCelda = document.createElement("td");
        const nombreCelda = document.createElement("td");
        const ciCelda = document.createElement("td");
        const tipoEstanciaCelda = document.createElement("td");
        const diaIngresoCelda = document.createElement("td");
        const horaIngresoCelda = document.createElement("td");
        const accionesCelda = document.createElement("td");

        numeroCelda.textContent = huésped.numero;
        habitacionCelda.textContent = huésped.habitacion;
        nombreCelda.textContent = huésped.nombre;
        ciCelda.textContent = huésped.ci;
        tipoEstanciaCelda.textContent = huésped.tipoEstancia;
        diaIngresoCelda.textContent = huésped.diaIngreso;
        horaIngresoCelda.textContent = huésped.horaIngreso;
        accionesCelda.innerHTML = '<button class="borrar-btn">Borrar</button>';

        accionesCelda.querySelector(".borrar-btn").addEventListener("click", () => {
            nuevaFila.remove();
            guardarHuéspedes();
        });

        nuevaFila.appendChild(numeroCelda);
        nuevaFila.appendChild(habitacionCelda);
        nuevaFila.appendChild(nombreCelda);
        nuevaFila.appendChild(ciCelda);
        nuevaFila.appendChild(tipoEstanciaCelda);
        nuevaFila.appendChild(diaIngresoCelda);
        nuevaFila.appendChild(horaIngresoCelda);
        nuevaFila.appendChild(accionesCelda);

        return nuevaFila;
    }
});