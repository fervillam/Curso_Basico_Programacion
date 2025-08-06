let formulario = document.getElementById('formulario_contacto'); // Asignar el formulario a una variable

let nombre = document.getElementById('nombre'); // Asignar variable al nombre
let email = document.getElementById('email'); // Asignar variable al email
let celular = document.getElementById('celular'); // Asignar variable al celular
let mensaje = document.getElementById('mensaje'); // Asignar variable al mensaje
let submit = document.getElementById('boton_enviar'); // Asignar variable al botón enviar

formulario.addEventListener('submit', function(event) { // Añadir un evento al formulario para cuando se envíe
    if(nombre.value === '' || email.value === '' || mensaje.value === '' || celular.value === '') { // Comprobar si algún campo está vacío. .value se usa para obtener el valor del input
        event.preventDefault(); // Si algún campo está vacío, prevenir el envío del formulario
        alert('Por favor, completa todos los campos.'); // Si están vacíos, mostrar un mensaje de alerta
    }

    const celular_regex = /^3\d{9}$/; // Expresión regular para validar el formato del número de celular (que empiece por 3 y tenga 10 dígitos). Se pone una cadena de 9 porque ya se está contando el 3 como primer dígito. Lo que está entre slash es el patrón que se quiere validar.
    if(!celular_regex.test(celular.value)) { // Comprobar si el número de celular ingresado en el formato cumple con la expresión regular que declaramos en la línea anterior
        alert('Por favor, ingresa un número de celular válido.'); // Si no cumple, mostrar un mensaje de alerta
        return; // Detener la ejecución del código si el número de celular no es válido
    }

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email
    if(!email_regex.test(email.value)) { // Comprobar si el email ingresado cumple con la expresión regular
        alert('Por favor, ingresa un correo electrónico válido.'); // Si no cumple, mostrar un mensaje de alerta
        return; // Detener la ejecución del código si el email no es válido
    }

    if(mensaje.length < 20) {
        alert('Por favor, ingresa un mensaje de al menos 20 caracteres.'); // Si no cumple, mostrar un mensaje de alerta
        return; // Detener la ejecución del código si el mensaje es menor a 20 caracteres
    }
}
);
