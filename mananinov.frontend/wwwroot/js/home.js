// Скрипты для главной страницы

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация функций
    initBannerSlider();
    initScrollButtons();
});

// Слайдер-баннер с автопрокруткой
function initBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    const prevButton = document.querySelector('.banner-prev');
    const nextButton = document.querySelector('.banner-next');
    let currentSlide = 0;
    let slideInterval;

    // Функция для отображения выбранного слайда
    const showSlide = (index) => {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Сбрасываем активные точки
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Активируем текущий слайд и точку
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };

    // Переход к следующему слайду
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    // Переход к предыдущему слайду
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // Запускаем автопрокрутку
    const startAutoSlide = () => {
        slideInterval = setInterval(nextSlide, 6000); // Меняем слайд каждые 6 секунд
    };

    // Останавливаем автопрокрутку
    const stopAutoSlide = () => {
        clearInterval(slideInterval);
    };

    // Обработчики событий для кнопок
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    // Обработчики событий для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });

    // Останавливаем автопрокрутку при наведении на слайдер
    const bannerSlider = document.querySelector('.banner-slider');
    if (bannerSlider) {
        bannerSlider.addEventListener('mouseenter', stopAutoSlide);
        bannerSlider.addEventListener('mouseleave', startAutoSlide);
    }

    // Запускаем автопрокрутку при загрузке страницы
    startAutoSlide();
}

// Кнопки прокрутки для секций с аниме
function initScrollButtons() {
    const scrollContainers = document.querySelectorAll('.anime-scroll-container');

    scrollContainers.forEach(container => {
        const leftButton = container.querySelector('.scroll-left');
        const rightButton = container.querySelector('.scroll-right');
        const cardsContainer = container.querySelector('.anime-cards-container');

        if (!leftButton || !rightButton || !cardsContainer) return;

        // Функция прокрутки влево
        leftButton.addEventListener('click', () => {
            cardsContainer.scrollBy({
                left: -600,
                behavior: 'smooth'
            });
        });

        // Функция прокрутки вправо
        rightButton.addEventListener('click', () => {
            cardsContainer.scrollBy({
                left: 600,
                behavior: 'smooth'
            });
        });

        // Скрываем/показываем кнопки при прокрутке
        const updateButtonVisibility = () => {
            // Левая кнопка видима только если есть куда прокручивать влево
            leftButton.style.opacity = cardsContainer.scrollLeft > 0 ? '1' : '0.3';

            // Правая кнопка видима только если есть куда прокручивать вправо
            const maxScrollLeft = cardsContainer.scrollWidth - cardsContainer.clientWidth;
            rightButton.style.opacity = cardsContainer.scrollLeft < maxScrollLeft - 10 ? '1' : '0.3';
        };

        // Вызываем функцию при прокрутке и при инициализации
        cardsContainer.addEventListener('scroll', updateButtonVisibility);
        updateButtonVisibility();

        // Пересчитываем видимость кнопок при изменении размера окна
        window.addEventListener('resize', updateButtonVisibility);
    });
}

// Функция анимации при наведении на карточки аниме
function addCardHoverEffects() {
    const animeCards = document.querySelectorAll('.anime-card');

    animeCards.forEach(card => {
        // При наведении
        card.addEventListener('mouseenter', () => {
            // Анимация появления оверлея уже реализована через CSS
            card.style.zIndex = '10';
        });

        // При уходе с карточки
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
}

// Вызываем функцию добавления эффектов при загрузке DOM
document.addEventListener('DOMContentLoaded', addCardHoverEffects);