// Coordenadas del centro de Bucaramanga
const centro = [7.119349, -73.125942]; 

// Límite de cobertura (en km)
const limiteCobertura = 15;

// Crear el mapa con Leaflet
const mapa = L.map('map').setView(centro, 12);

// Cargar tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

// Añadir marcador fijo en el centro
L.marker(centro).addTo(mapa)
  .bindPopup("Centro de Bucaramanga").openPopup();

// Escuchar clics en el mapa
mapa.on('click', function (e) {
  const { lat, lng } = e.latlng;

  // Eliminar marcador anterior si existe
  if (window.userMarker) {
    mapa.removeLayer(window.userMarker);
  }

  // Agregar nuevo marcador en la ubicación seleccionada
  window.userMarker = L.marker([lat, lng]).addTo(mapa);

  // Calcular distancia al centro de Bucaramanga
  const distancia = calcularDistanciaKm(lat, lng, centro[0], centro[1]);

  // Mostrar resultado
  let mensaje = `Distancia desde el centro: ${distancia.toFixed(2)} km.<br>`;

  if (distancia < 1) {
    mensaje += "<b>Zona sin recargo.</b>";
    guardarRecargo(0);
  } else if (distancia <= limiteCobertura) {
    const recargo = calcularRecargo(distancia);
    mensaje += `<b>Zona con recargo: $${recargo.toLocaleString('es-CO')}</b>`;
    guardarRecargo(recargo);
  } else {
    mensaje += "<b>Zona fuera de cobertura.</b>";
    guardarRecargo("Fuera de cobertura");
  }

  document.getElementById('map-result').innerHTML = mensaje;
});

// Función para calcular distancia entre dos puntos (fórmula Haversine)
function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // radio de la Tierra en km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Función para calcular recargo proporcional entre 8.000 y 15.000 dependiendo de la distancia
function calcularRecargo(distancia) {
  const minimo = 8000;
  const maximo = 15000;
  const escala = (maximo - minimo) / (limiteCobertura - 1);
  return Math.round(minimo + (distancia - 1) * escala);
}

// Función para guardar el recargo en un input oculto del formulario
function guardarRecargo(valor) {
  const input = document.getElementById("recargo");
  if (input) {
    input.value = valor;
  }
}

// Escuchar el envío del formulario una vez cargado el DOM del html
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevenir envío por defecto

    const mensaje = document.getElementById("message").value.trim();
    const celular = document.getElementById("telefono").value.trim();
    const email = document.getElementById("correo").value.trim();

    // Verifica que al menos uno de los dos medios de contacto esté presente
    if (!celular && !email) {
        alert("Debes ingresar al menos un medio de contacto: celular o correo.");
        return; // Detener ejecución si no hay ningún medio de contacto
    }

    const celular_regex = /^3\d{9}$/; // Expresión regular para validar el formato del número de celular (que empiece por 3 y tenga 10 dígitos). Se pone una cadena de 9 porque ya se está contando el 3 como primer dígito. Lo que está entre slash es el patrón que se quiere validar.
    if(celular && !celular_regex.test(celular)) { // Comprobar si el número de celular ingresado en el formato cumple con la expresión regular que declaramos en la línea anterior
        alert('Por favor, ingresa un número de celular válido.'); // Si no cumple, mostrar un mensaje de alerta
        return; // Detener la ejecución del código si el número de celular no es válido
    }

    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el formato del email
    if(email && !email_regex.test(email)) { // Comprobar si el email ingresado cumple con la expresión regular
        alert('Por favor, ingresa un correo electrónico válido.'); // Si no cumple, mostrar un mensaje de alerta
        return; // Detener la ejecución del código si el email no es válido
    }

    if(mensaje.length < 20) {
        alert('Por favor, ingresa un mensaje de al menos 20 caracteres.'); // Si no cumple, mostrar un mensaje de alerta
        return; // Detener la ejecución del código si el mensaje es menor a 20 caracteres
    }

    alert("¡Formulario enviado correctamente!");
    form.submit(); // Envía el formulario si todo está correcto
  });
});
