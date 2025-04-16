// Основные скрипты для сайта

// Дождемся полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация всех функций
    initMobileMenu();
    initFormValidation();
    initPasswordToggle();

    // Плавное появление основного контента
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.classList.add('fade-in');
    }
});

// Мобильное меню
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!mobileMenuToggle || !mainNav) return;

    mobileMenuToggle.addEventListener('click', () => {
        // Создаем мобильное меню, если его еще нет
        let mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';

            // Клонируем навигацию из основного меню
            const navClone = mainNav.querySelector('.nav-list').cloneNode(true);
            mobileMenu.appendChild(navClone);

            // Добавляем кнопки авторизации
            const authButtons = document.querySelector('.auth-buttons');
            if (authButtons) {
                const authButtonsClone = authButtons.cloneNode(true);
                mobileMenu.appendChild(authButtonsClone);
            }

            // Добавляем меню в DOM
            document.body.appendChild(mobileMenu);
        }

        // Переключаем классы для анимации
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', (e) => {
        const mobileMenu = document.querySelector('.mobile-menu');

        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !e.target.closest('.mobile-menu-toggle')) {
                mobileMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
}

// Валидация форм
function initFormValidation() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Обработка формы логина
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) {
                showError('Пожалуйста, заполните все поля');
                return;
            }

            // Имитация отправки формы
            showSuccess('Выполняется вход...');

            // В реальном проекте здесь будет отправка на сервер
            setTimeout(() => {
                window.location.href = '#';  // Редирект после успешного входа
            }, 1500);
        });
    }

    // Обработка формы регистрации
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const agreement = document.getElementById('agreement').checked;

            // Простая валидация
            if (!username || !email || !password || !confirmPassword) {
                showError('Пожалуйста, заполните все обязательные поля');
                return;
            }

            if (password !== confirmPassword) {
                showError('Пароли не совпадают');
                return;
            }

            if (!agreement) {
                showError('Необходимо согласиться с условиями использования');
                return;
            }

            // Проверка валидности email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Пожалуйста, введите корректный email');
                return;
            }

            // Имитация отправки формы
            showSuccess('Регистрация аккаунта...');

            // // В реальном проекте здесь будет отправка на сервер
            // setTimeout(() => {
            //     window.location.href = 'index.html';  // Редирект после успешной регистрации
            // }, 1500);
        });
    }
}

// Функция отображения уведомления об ошибке
function showError(message) {
    // Удаляем существующее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'notification error';
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;

    // Добавляем уведомление в DOM
    document.body.appendChild(notification);

    // Анимируем появление
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Добавляем обработчик для закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Функция отображения уведомления об успехе
function showSuccess(message) {
    // Удаляем существующее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем уведомление
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.0799V11.9999C21.9988 14.1563 21.3005 16.2545 20.0093 17.9817C18.7182 19.7088 16.9033 20.9723 14.8354 21.5838C12.7674 22.1952 10.5573 22.1218 8.53447 21.3746C6.51168 20.6274 4.78465 19.2462 3.61096 17.4369C2.43727 15.6276 1.87979 13.4879 2.02168 11.3362C2.16356 9.18443 2.99721 7.13619 4.39828 5.49694C5.79935 3.85768 7.69279 2.71525 9.79619 2.24001C11.8996 1.76477 14.1003 1.9822 16.07 2.85986" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>${message}</span>
        </div>
    `;

    // Добавляем уведомление в DOM
    document.body.appendChild(notification);

    // Анимируем появление
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
}

// Функция для переключения видимости пароля
function initPasswordToggle() {
    const passwordFields = document.querySelectorAll('input[type="password"]');

    passwordFields.forEach(field => {
        // Создаем кнопку переключения
        const toggleBtn = document.createElement('button');
        toggleBtn.type = 'button';
        toggleBtn.className = 'password-toggle';
        toggleBtn.innerHTML = `
            <svg class="eye-open" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg class="eye-closed" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: none;">
                <path d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00002C19 4.00002 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88002M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06002L17.94 17.94Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1L23 23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        // Добавляем кнопку после поля ввода
        field.parentNode.style.position = 'relative';
        field.parentNode.appendChild(toggleBtn);

        // Обработчик клика
        toggleBtn.addEventListener('click', () => {
            const type = field.getAttribute('type') === 'password' ? 'text' : 'password';
            field.setAttribute('type', type);

            // Переключаем иконки
            const eyeOpen = toggleBtn.querySelector('.eye-open');
            const eyeClosed = toggleBtn.querySelector('.eye-closed');

            if (type === 'text') {
                eyeOpen.style.display = 'none';
                eyeClosed.style.display = 'block';
            } else {
                eyeOpen.style.display = 'block';
                eyeClosed.style.display = 'none';
            }
        });

        // Добавляем стили для кнопки
        const style = document.createElement('style');
        style.textContent = `
            .password-toggle {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .password-toggle:hover {
                color: var(--green-accent);
            }
            
            input[type="password"],
            input[type="text"] {
                padding-right: 40px;
            }
            
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transform: translateY(100px);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                z-index: 1000;
                max-width: 400px;
            }
            
            .notification.show {
                transform: translateY(0);
                opacity: 1;
            }
            
            .notification.error {
                background-color: rgba(244, 67, 54, 0.95);
                color: white;
            }
            
            .notification.success {
                background-color: rgba(0, 230, 118, 0.95);
                color: white;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0 5px;
            }
            
            .mobile-menu {
                position: fixed;
                top: var(--header-height);
                left: 0;
                width: 100%;
                background-color: var(--bg-card);
                box-shadow: var(--shadow-lg);
                padding: 20px;
                z-index: 99;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                display: flex;
                flex-direction: column;
                gap: 20px;
                border-bottom: 1px solid var(--border-color);
            }
            
            .mobile-menu.active {
                transform: translateY(0);
            }
            
            .mobile-menu .nav-list {
                flex-direction: column;
                gap: 15px;
            }
            
            .mobile-menu .auth-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: translateY(9px) rotate(45deg);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: translateY(-9px) rotate(-45deg);
            }
            
            body.menu-open {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    });
}