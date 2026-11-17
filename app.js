document.addEventListener("DOMContentLoaded", () => {
  
  /* ==============================================================
     1. EFECTO CONTADOR DE NÚMEROS (Panel Amarillo)
  ============================================================== */
  const contadores = document.querySelectorAll('.contador');

  if (contadores.length > 0) {
    const animarContadores = () => {
      contadores.forEach(contador => {
        const actualizarContador = () => {
          const objetivo = +contador.getAttribute('data-target');
          const valorActual = +contador.innerText.replace(/,/g, '');
          const incremento = objetivo / 40; // Velocidad

          if (valorActual < objetivo) {
            contador.innerText = Math.ceil(valorActual + incremento);
            setTimeout(actualizarContador, 30);
          } else {
            contador.innerText = objetivo === 1500 ? "1,500" : objetivo; 
          }
        };
        actualizarContador();
      });
    };

    // Bajamos el threshold a 0.1 para que cuente apenas se vea un 10% del panel
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
          animarContadores();
          observador.disconnect();
        }
      });
    }, { threshold: 0.1 });

    const panelStats = document.querySelector('.stats');
    if (panelStats) {
      observador.observe(panelStats);
    } else {
      // Si por alguna razón falla el sensor, que cuente de todas formas
      animarContadores();
    }
  }

  /* ==============================================================
     2. FUNCIONALIDAD DEL FORMULARIO DE CONTACTO
  ============================================================== */
  const formContacto = document.getElementById('formContacto');

  if (formContacto) {
    formContacto.addEventListener('submit', function(evento) {
      evento.preventDefault(); 
      
      formContacto.style.display = 'none';
      
      const respuesta = document.getElementById('respuestaContacto');
      respuesta.style.display = 'block';
    });
  }

});
/* ==============================================================
   3. CARRITO DE COMPRAS INTERACTIVO (productos.html)
============================================================== */
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const contadorCarrito = document.getElementById('contador-carrito');
let cantidadCarrito = 0; 

if (botonesAgregar.length > 0 && contadorCarrito) {
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function(evento) {
      evento.preventDefault(); 
      
      // 1. Buscamos el desplegable que está al lado de este botón específico
      const contenedor = boton.parentElement;
      const selectCantidad = contenedor.querySelector('.cantidad-producto');
      
      // 2. Leemos el número que eligió el usuario y lo convertimos a entero
      const cantidadElegida = parseInt(selectCantidad.value);
      
      // 3. Sumamos esa cantidad al carrito
      cantidadCarrito += cantidadElegida;
      
      // Actualizamos el menú con la animación
      contadorCarrito.innerText = cantidadCarrito;
      contadorCarrito.style.transform = 'scale(1.5)';
      
      setTimeout(() => {
        contadorCarrito.style.transform = 'scale(1)';
      }, 200);

      // Cambiamos el texto del botón
      const textoOriginal = boton.innerText;
      boton.innerText = '¡Agregado!';
      boton.style.backgroundColor = '#28a745'; 

      setTimeout(() => {
        boton.innerText = textoOriginal;
        boton.style.backgroundColor = 'var(--mass-azul)'; 
      }, 1000);
      
      // Opcional: Regresamos el desplegable a "1" después de agregar
      setTimeout(() => {
        selectCantidad.value = "1";
      }, 1000);
    });
  });
}
/* ==============================================================
   4. FORMULARIO DINÁMICO DE REGISTRO (registro.html)
============================================================== */
const formRegistro = document.getElementById('formRegistro');
const selectPuesto = document.getElementById('puesto');
const divExperiencia = document.getElementById('divExperiencia');

if (formRegistro && selectPuesto) {
  // 1. Efecto Dinámico: Mostrar campo según el puesto elegido
  selectPuesto.addEventListener('change', function() {
    if (this.value === 'cajero' || this.value === 'administrador') {
      divExperiencia.style.display = 'block';
      // Pequeña animación para que aparezca suavemente
      divExperiencia.style.animation = 'fadeInUp 0.5s ease-out forwards';
      // Lo volvemos obligatorio si aparece
      document.getElementById('experiencia').required = true;
    } else {
      divExperiencia.style.display = 'none';
      document.getElementById('experiencia').required = false;
    }
  });

  // 2. Respuesta al usuario sin recargar la página
  formRegistro.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    
    // Oculta el formulario suavemente
    formRegistro.style.display = 'none';
    
    // Muestra el mensaje de éxito
    const respuesta = document.getElementById('respuestaRegistro');
    respuesta.style.display = 'block';
    respuesta.style.animation = 'fadeInUp 0.8s ease-out forwards';
  });
}
/* ==============================================================
   5. ENCUESTA DE SATISFACCIÓN (encuesta.html)
============================================================== */
const formEncuesta = document.getElementById('formEncuesta');

if (formEncuesta) {
  formEncuesta.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita que la página salte al inicio
    
    // Oculta el formulario de encuesta
    formEncuesta.style.display = 'none';
    
    // Muestra el mensaje de agradecimiento
    const respuesta = document.getElementById('respuestaEncuesta');
    respuesta.style.display = 'block';
    respuesta.style.animation = 'fadeInUp 0.8s ease-out forwards';
  });
}