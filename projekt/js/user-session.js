// Agregar este script al final del body en html.html o en un archivo separado

(function() {
    const loginBtn = document.getElementById('login-btn');
    
    // Verificar si hay un usuario en sesión
    function checkUserSession() {
        const currentUser = localStorage.getItem('currentUser');
        
        if (currentUser) {
            // Usuario está logueado
            const user = JSON.parse(currentUser);
            showUserInfo(user);
        } else {
            // Usuario no está logueado
            showLoginButton();
        }
    }
    
    // Mostrar información del usuario
    function showUserInfo(user) {
        // Cambiar el icono por un menú desplegable
        loginBtn.classList.remove('fa-user');
        loginBtn.style.cursor = 'pointer';
        
        // Crear menú de usuario
        const userMenu = document.createElement('div');
        userMenu.id = 'user-menu';
        userMenu.style.cssText = `
            position: relative;
            display: inline-block;
        `;
        
        // Botón con nombre de usuario
        const userButton = document.createElement('div');
        userButton.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        `;
        
        // Obtener iniciales del nombre
        const initials = user.name.split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
        
        userButton.innerHTML = `
            <div style="
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 14px;
            ">${initials}</div>
            <span>${user.name.split(' ')[0]}</span>
            <i class="fas fa-chevron-down" style="font-size: 12px;"></i>
        `;
        
        // Menú desplegable
        const dropdown = document.createElement('div');
        dropdown.id = 'user-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            top: 110%;
            right: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            min-width: 250px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1000;
            overflow: hidden;
        `;
        
        dropdown.innerHTML = `
            <div style="padding: 20px; border-bottom: 1px solid #f0f0f0;">
                <div style="
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 24px;
                    margin: 0 auto 12px;
                ">${initials}</div>
                <div style="text-align: center;">
                    <div style="font-weight: 600; color: #2c2c54; font-size: 16px; margin-bottom: 4px;">
                        ${user.name}
                    </div>
                    <div style="font-size: 13px; color: #666;">
                        ${user.email}
                    </div>
                </div>
            </div>
            <div style="padding: 8px 0;">
                <a href="#" id="profile-link" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    color: #333;
                    text-decoration: none;
                    transition: background 0.2s;
                ">
                    <i class="fas fa-user" style="width: 20px; color: #667eea;"></i>
                    <span>Mi Perfil</span>
                </a>
                <a href="#" id="favorites-link" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    color: #333;
                    text-decoration: none;
                    transition: background 0.2s;
                ">
                    <i class="fas fa-heart" style="width: 20px; color: #667eea;"></i>
                    <span>Mis Favoritos</span>
                </a>
                <a href="#" id="settings-link" style="
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 20px;
                    color: #333;
                    text-decoration: none;
                    transition: background 0.2s;
                ">
                    <i class="fas fa-cog" style="width: 20px; color: #667eea;"></i>
                    <span>Configuración</span>
                </a>
            </div>
            <div style="border-top: 1px solid #f0f0f0; padding: 8px;">
                <button id="logout-btn" style="
                    width: 100%;
                    padding: 12px 20px;
                    background: none;
                    border: none;
                    color: #ff4757;
                    text-align: left;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    transition: background 0.2s;
                ">
                    <i class="fas fa-sign-out-alt" style="width: 20px;"></i>
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        `;
        
        // Estilos hover para los enlaces
        const links = dropdown.querySelectorAll('a, #logout-btn');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.background = '#f8f9fa';
            });
            link.addEventListener('mouseleave', () => {
                link.style.background = 'transparent';
            });
        });
        
        userMenu.appendChild(userButton);
        userMenu.appendChild(dropdown);
        
        // Reemplazar el botón original
        loginBtn.parentNode.replaceChild(userMenu, loginBtn);
        
        // Toggle del menú
        let isOpen = false;
        userButton.addEventListener('click', (e) => {
            e.stopPropagation();
            isOpen = !isOpen;
            
            if (isOpen) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
                userButton.style.transform = 'scale(0.98)';
            } else {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
                userButton.style.transform = 'scale(1)';
            }
        });
        
        // Hover effect en el botón
        userButton.addEventListener('mouseenter', () => {
            if (!isOpen) {
                userButton.style.transform = 'translateY(-2px)';
                userButton.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
            }
        });
        
        userButton.addEventListener('mouseleave', () => {
            if (!isOpen) {
                userButton.style.transform = 'translateY(0)';
                userButton.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
            }
        });
        
        // Cerrar al hacer click fuera
        document.addEventListener('click', () => {
            if (isOpen) {
                isOpen = false;
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
                userButton.style.transform = 'scale(1)';
            }
        });
        
        // Funcionalidad de cerrar sesión
        document.getElementById('logout-btn').addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                localStorage.removeItem('currentUser');
                location.reload();
            }
        });
        
        // Aquí puedes agregar más funcionalidades a los enlaces
        document.getElementById('profile-link').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Ir a perfil - Funcionalidad pendiente');
        });
        
        document.getElementById('favorites-link').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Ir a favoritos - Funcionalidad pendiente');
        });
        
        document.getElementById('settings-link').addEventListener('click', (e) => {
            e.preventDefault();
            alert('Ir a configuración - Funcionalidad pendiente');
        });
    }
    
    // Mostrar botón de login
    function showLoginButton() {
        loginBtn.style.cursor = 'pointer';
        
        loginBtn.addEventListener('click', () => {
            // Mostrar modal de opciones
            showLoginModal();
        });
    }
    
    // Crear modal de login/registro
    function showLoginModal() {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        // Crear modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
            position: relative;
        `;
        
        modal.innerHTML = `
            <button id="close-modal" style="
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                color: #999;
                cursor: pointer;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.3s;
            ">&times;</button>
            
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="font-size: 48px; margin-bottom: 16px;">📚</div>
                <h2 style="color: #2c2c54; font-size: 28px; margin-bottom: 8px;">Bienvenido a BookMood</h2>
                <p style="color: #666; font-size: 14px;">Inicia sesión o crea una cuenta para continuar</p>
            </div>
            
            <button id="login-option" style="
                width: 100%;
                padding: 16px;
                margin-bottom: 12px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            ">
                <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
            </button>
            
            <button id="register-option" style="
                width: 100%;
                padding: 16px;
                background: white;
                color: #667eea;
                border: 2px solid #667eea;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                <i class="fas fa-user-plus"></i> Crear Cuenta
            </button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Hover effects
        const loginBtn = modal.querySelector('#login-option');
        const registerBtn = modal.querySelector('#register-option');
        const closeBtn = modal.querySelector('#close-modal');
        
        loginBtn.addEventListener('mouseenter', () => {
            loginBtn.style.transform = 'translateY(-2px)';
            loginBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
        });
        
        loginBtn.addEventListener('mouseleave', () => {
            loginBtn.style.transform = 'translateY(0)';
            loginBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
        });
        
        registerBtn.addEventListener('mouseenter', () => {
            registerBtn.style.background = '#667eea';
            registerBtn.style.color = 'white';
            registerBtn.style.transform = 'translateY(-2px)';
        });
        
        registerBtn.addEventListener('mouseleave', () => {
            registerBtn.style.background = 'white';
            registerBtn.style.color = '#667eea';
            registerBtn.style.transform = 'translateY(0)';
        });
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.color = '#ff4757';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.color = '#999';
        });
        
        // Funcionalidad de botones
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
        
        registerBtn.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
        
        closeBtn.addEventListener('click', () => {
            overlay.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => overlay.remove(), 300);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }
    
    // Inicializar al cargar la página
    checkUserSession();
    
})();