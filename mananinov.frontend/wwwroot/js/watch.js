// Скрипты для страницы просмотра аниме

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация функций
    initDropdowns();
    initActionButtons();
    initCommentButtons();
    initEpisodeSelection();
    initQualitySelector();
    initScreenshots();
});

// Обработка выпадающих меню
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const parent = toggle.closest('.action-dropdown, .comment-actions-dropdown');
            const menu = parent.querySelector('.dropdown-menu');

            // Закрываем все другие открытые меню
            document.querySelectorAll('.dropdown-menu.active').forEach(openMenu => {
                if (openMenu !== menu) {
                    openMenu.classList.remove('active');
                }
            });

            // Переключаем текущее меню
            menu?.classList.toggle('active');
        });
    });

    // Закрываем меню при клике вне их области
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
    });
}

// Обработка кнопок действий (избранное, просмотрено и т.д.)
function initActionButtons() {
    const actionBtns = document.querySelectorAll('.action-btn');

    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Имитация активного состояния (в реальном приложении здесь будет запрос на сервер)
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                // Применяем активное состояние
                if (this.classList.contains('favorite')) {
                    this.style.backgroundColor = 'rgba(255, 64, 129, 0.2)';
                    this.style.color = '#ff4081';
                } else if (this.classList.contains('watched')) {
                    this.style.backgroundColor = 'rgba(0, 230, 118, 0.2)';
                    this.style.color = '#00e676';
                } else if (this.classList.contains('watchlist')) {
                    this.style.backgroundColor = 'rgba(41, 121, 255, 0.2)';
                    this.style.color = '#2979ff';
                }

                // Показываем сообщение об успешном действии
                showNotification(getActionMessage(this.className), 'success');
            } else {
                // Сбрасываем стили
                this.style.backgroundColor = '';
                this.style.color = '';

                // Показываем сообщение об отмене действия
                showNotification(getRemovedActionMessage(this.className), 'info');
            }
        });
    });
}

// Получение сообщения для действия
function getActionMessage(className) {
    if (className.includes('favorite')) {
        return 'Добавлено в избранное';
    } else if (className.includes('watched')) {
        return 'Отмечено как просмотренное';
    } else if (className.includes('watchlist')) {
        return 'Добавлено в список просмотра';
    } else if (className.includes('share')) {
        return 'Ссылка скопирована в буфер обмена';
    }
    return 'Действие выполнено';
}

// Получение сообщения для отмены действия
function getRemovedActionMessage(className) {
    if (className.includes('favorite')) {
        return 'Удалено из избранного';
    } else if (className.includes('watched')) {
        return 'Отметка о просмотре снята';
    } else if (className.includes('watchlist')) {
        return 'Удалено из списка просмотра';
    }
    return 'Действие отменено';
}

// Обработка кнопок комментариев (голосование, ответ)
function initCommentButtons() {
    // Голосование за комментарий
    const voteButtons = document.querySelectorAll('.vote-btn');

    voteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const isUpvote = this.classList.contains('upvote');
            const countElement = this.querySelector('span');
            let count = parseInt(countElement.textContent);

            // Переключаем активное состояние
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.style.color = '';
                countElement.textContent = isUpvote ? count - 1 : count + 1;
            } else {
                this.classList.add('active');
                this.style.color = isUpvote ? '#00e676' : '#ff3d00';
                countElement.textContent = isUpvote ? count + 1 : count - 1;

                // Если это upvote, то downvote должен быть деактивирован и наоборот
                const siblingBtn = this.parentElement.querySelector(isUpvote ? '.downvote' : '.upvote');
                if (siblingBtn && siblingBtn.classList.contains('active')) {
                    siblingBtn.classList.remove('active');
                    siblingBtn.style.color = '';
                    const siblingCount = siblingBtn.querySelector('span');
                    siblingCount.textContent = parseInt(siblingCount.textContent) + (isUpvote ? 1 : -1);
                }
            }
        });
    });

    // Ответ на комментарий
    const replyButtons = document.querySelectorAll('.reply-btn');

    replyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Получаем имя пользователя
            const username = this.closest('.comment-item').querySelector('.comment-username').textContent;

            // Фокусируемся на форме комментария и вставляем обращение
            const commentInput = document.querySelector('.comment-input');
            commentInput.value = `@${username} `;
            commentInput.focus();

            // Прокручиваем к форме комментария
            commentInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // Отправка комментария
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const commentInput = this.querySelector('.comment-input');

            if (commentInput.value.trim()) {
                // В реальном приложении здесь будет отправка комментария на сервер
                showNotification('Комментарий отправлен', 'success');
                commentInput.value = '';
            } else {
                showNotification('Введите текст комментария', 'error');
            }
        });
    }
}

// Обработка выбора эпизода
function initEpisodeSelection() {
    const episodeCards = document.querySelectorAll('.episode-card:not(.disabled)');

    episodeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();

            // Получаем номер эпизода
            const episodeNumber = this.querySelector('.episode-number').textContent;
            const episodeName = this.querySelector('.episode-name').textContent;

            // Обновляем информацию об эпизоде
            const episodeTitle = document.querySelector('.episode-title');
            if (episodeTitle) {
                episodeTitle.textContent = `Эпизод ${episodeNumber} — ${episodeName}`;
            }

            // Обновляем активный эпизод
            document.querySelectorAll('.episode-card.current').forEach(current => {
                current.classList.remove('current');
            });
            this.classList.add('current');

            // В реальном приложении здесь будет загрузка видео
            showNotification(`Загрузка эпизода ${episodeNumber}`, 'info');

            // Прокручиваем к плееру
            document.querySelector('.player-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Обработка кнопки воспроизведения
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // В реальном приложении здесь будет логика воспроизведения видео
            showNotification('Воспроизведение', 'success');

            // Имитация загрузки плеера
            const playerOverlay = this.parentElement;
            playerOverlay.innerHTML = '<div class="loading">Загрузка видео...</div>';
            playerOverlay.style.backgroundColor = '#000';
            playerOverlay.style.color = '#fff';
            playerOverlay.style.display = 'flex';
            playerOverlay.style.alignItems = 'center';
            playerOverlay.style.justifyContent = 'center';
        });
    }

    // Выбор сезона
    const seasonSelect = document.querySelector('.episodes-season-select select');
    if (seasonSelect) {
        seasonSelect.addEventListener('change', function() {
            // В реальном приложении здесь будет загрузка эпизодов выбранного сезона
            showNotification(`Загрузка эпизодов: ${this.value}`, 'info');
        });
    }
}

// Обработка выбора качества видео
function initQualitySelector() {
    const qualityToggle = document.querySelector('.quality-toggle');

    if (qualityToggle) {
        qualityToggle.addEventListener('click', function(e) {
            e.stopPropagation();

            // Создаем выпадающее меню качества, если его еще нет
            let qualityMenu = document.querySelector('.quality-menu');

            if (!qualityMenu) {
                qualityMenu = document.createElement('div');
                qualityMenu.className = 'dropdown-menu quality-menu';

                // Добавляем варианты качества
                const qualities = ['1080p', '720p', '480p', '360p', 'Авто'];
                qualities.forEach(quality => {
                    const item = document.createElement('a');
                    item.className = 'dropdown-item';
                    item.href = '#';
                    item.textContent = quality;

                    item.addEventListener('click', function(e) {
                        e.preventDefault();
                        // Обновляем текст кнопки
                        const toggleText = qualityToggle.querySelector('span');
                        toggleText.textContent = `Качество: ${quality}`;
                        // Закрываем меню
                        qualityMenu.classList.remove('active');
                        // Показываем уведомление
                        showNotification(`Качество изменено на ${quality}`, 'success');
                    });

                    qualityMenu.appendChild(item);
                });

                // Добавляем меню в DOM
                qualityToggle.parentElement.appendChild(qualityMenu);
            }

            // Переключаем видимость меню
            qualityMenu.classList.toggle('active');
        });
    }

    // Кнопки управления плеером
    const playerOptions = document.querySelectorAll('.player-option');

    playerOptions.forEach(option => {
        option.addEventListener('click', function() {
            let message = '';

            if (this.title === 'Субтитры') {
                message = 'Настройки субтитров';
            } else if (this.title === 'Озвучка') {
                message = 'Выбор озвучки';
            } else if (this.title === 'Скорость') {
                message = 'Настройка скорости воспроизведения';
            } else if (this.title === 'Полный экран') {
                message = 'Переход в полноэкранный режим';
            }

            showNotification(message, 'info');
        });
    });
}

// Обработка скриншотов
function initScreenshots() {
    const screenshots = document.querySelectorAll('.screenshot img');

    screenshots.forEach(img => {
        img.addEventListener('click', function() {
            // В реальном приложении здесь будет открытие скриншота в полном размере
            // Например, через модальное окно

            // Создаем временный элемент для имитации просмотра
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
            modal.style.cursor = 'pointer';

            // Создаем увеличенное изображение
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.borderRadius = '8px';
            enlargedImg.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';

            // Добавляем изображение в модальное окно
            modal.appendChild(enlargedImg);

            // Закрытие при клике
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });

            // Добавляем модальное окно в DOM
            document.body.appendChild(modal);
        });
    });
}

// Показ уведомлений
function showNotification(message, type = 'info') {
    // Удаляем существующее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    // Определяем иконку в зависимости от типа
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 16.2L4.8 12L3.4 13.4L9 19L21 7L19.6 5.6L9 16.2Z" fill="currentColor"/></svg>';
            break;
        case 'error':
            icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/></svg>';
            break;
        default:
            icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" fill="currentColor"/></svg>';
    }

    // Формируем содержимое уведомления
    notification.innerHTML = `
        <div class="notification-content">
            ${icon}
            <span>${message}</span>
        </div>
        <button class="notification-close">×</button>
    `;

    // Добавляем стили
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 16px';
    notification.style.borderRadius = '8px';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'space-between';
    notification.style.gap = '12px';
    notification.style.minWidth = '250px';
    notification.style.maxWidth = '350px';
    notification.style.zIndex = '9999';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

    // Определяем цвет фона в зависимости от типа
    switch (type) {
        case 'success':
            notification.style.backgroundColor = 'rgba(0, 230, 118, 0.9)';
            notification.style.color = 'white';
            break;
        case 'error':
            notification.style.backgroundColor = 'rgba(244, 67, 54, 0.9)';
            notification.style.color = 'white';
            break;
        default:
            notification.style.backgroundColor = 'rgba(41, 121, 255, 0.9)';
            notification.style.color = 'white';
    }

    // Стили для содержимого
    const content = notification.querySelector('.notification-content');
    content.style.display = 'flex';
    content.style.alignItems = 'center';
    content.style.gap = '8px';

    // Стили для кнопки закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.padding = '0 4px';

    // Добавляем в DOM
    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);

    // Обработчик закрытия
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });

    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}