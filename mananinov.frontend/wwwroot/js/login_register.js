// Для формы входа
// document.getElementById('login-form').addEventListener('submit', async function(e) {
//     e.preventDefault();
//
//     const email = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//
//     try {
//         const response = await fetch('http://localhost:5191/account/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         });
//
//         if (response.ok) {
//             const data = await response.json();
//             // Сохраняем токен в localStorage
//             localStorage.setItem('authToken', data.token);
//             // Перенаправляем на защищенную страницу
//             window.location.href = '/dashboard';
//         } else {
//             alert('Ошибка входа. Проверьте логин и пароль.');
//         }
//     } catch (error) {
//         console.error('Ошибка:', error);
//     }
// });

// Для формы регистрации
document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const Name = document.getElementById('username').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }

    try {
        const response = await fetch('http://localhost:5191/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  Name, email, password })
        })

        if (response.ok) {
            alert('Регистрация успешна! Теперь вы можете войти.');
            window.location.href = '/login';
        } else {
            const errorData = await response.json();
            alert(`Ошибка регистрации: ${errorData.message || 'Неизвестная ошибка'}`);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});