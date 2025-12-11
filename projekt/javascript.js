searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
}

let loginForm = document.querySelector('.login-form-container');

document.querySelector('#login-btn').onclick = () =>{
  loginForm.classList.toggle('active');
}

document.querySelector('#close-login-btn').onclick = () =>{
  loginForm.classList.remove('active');
}

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 4000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

// --- LÓGICA DE FIREBASE ---

// 1. Detección de Estado de Autenticación
// Esto es crucial: verifica si el usuario está logueado al cargar la página
// Nota: 'auth' viene de firebase-auth.js
auth.onAuthStateChanged((user) => {
    // Asegúrate de que tienes estos IDs en tu archivo principal (ej. index.html o html.html)
    const loginBtn = document.getElementById('login-btn'); // Botón de 'Iniciar Sesión'
    const logoutBtn = document.getElementById('logout-btn'); // Nuevo botón de 'Cerrar Sesión'

    if (user) {
        // Usuario logueado
        if (loginBtn) loginBtn.style.display = 'none'; // Ocultar Login
        if (logoutBtn) logoutBtn.style.display = 'inline-block'; // Mostrar Logout
        console.log("Usuario actual:", user.email);
    } else {
        // Usuario NO logueado
        if (loginBtn) loginBtn.style.display = 'inline-block'; // Mostrar Login
        if (logoutBtn) logoutBtn.style.display = 'none'; // Ocultar Logout
        
        // Si no está en login/register, redirigir al home o login
        // Puedes agregar una redirección aquí si es necesario (Ej: window.location.href = 'login.html';)
    }
});

// 2. Función de Cerrar Sesión
// Nota: 'cerrarSesion()' viene de firebase-auth.js
// Asumiendo que el botón de logout tiene el ID 'logout-btn'
const logoutElement = document.querySelector('#logout-btn');
if (logoutElement) {
    logoutElement.onclick = () => {
        cerrarSesion()
            .then(() => {
                alert("Has cerrado sesión con éxito. ¡Vuelve pronto!");
                // Redirigir a la página principal o de login después de cerrar sesión
                window.location.href = 'index.html'; // Usando index.html como has solicitado
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
                alert("Hubo un error al intentar cerrar la sesión. Inténtalo de nuevo.");
            });
    };
}