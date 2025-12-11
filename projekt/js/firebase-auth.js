// firebase-auth.js (Añadir al final del archivo)

// 5. Función para Iniciar Sesión con Email y Contraseña (LOGIN)
// Nota: Usa el método signInWithEmailAndPassword (SDK v7)
function iniciarSesionUsuario(email, password) {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Inicio de sesión exitoso:", user.uid);
                resolve(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = "Error desconocido al iniciar sesión. Inténtalo de nuevo.";

                if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
                    errorMessage = 'Correo o contraseña incorrectos. Verifica tus credenciales.';
                } else if (errorCode === 'auth/invalid-email') {
                    errorMessage = 'El formato del correo electrónico es inválido.';
                } else if (errorCode === 'auth/user-disabled') {
                    errorMessage = 'Tu cuenta ha sido deshabilitada.';
                }

                console.error("Error completo de inicio de sesión:", error);
                reject(new Error(errorMessage));
            });
    });
}

// 6. Función para Cerrar Sesión (LOGOUT)
function cerrarSesion() {
    return auth.signOut();
}