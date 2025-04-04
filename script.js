document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonials-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (!slider || !slides.length || !dots.length) return;

    let currentSlide = 0;
    const slideCount = slides.length;

    // Функция для центрирования элемента в видимой области
    function centerElement(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Вычисляем позицию, чтобы элемент был по центру
        const targetY = scrollTop + rect.top - (windowHeight / 2) + (elementHeight / 2);
        
        // Плавно прокручиваем к элементу
        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    }

    // Функция для обновления позиции слайдера
    function updateSlider(shouldCenter = false) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        
        // Показываем текущий слайд
        slides[currentSlide].style.display = 'block';
        slides[currentSlide].classList.add('active');
        
        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Центрируем активный слайд только если нужно
        if (shouldCenter) {
            centerElement(slides[currentSlide]);
        }
    }

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault(); // Предотвращаем стандартное поведение
            currentSlide = index;
            updateSlider(true); // Передаем true, чтобы центрировать слайд
        });
    });

    // Автоматическое переключение слайдов
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider(false); // Передаем false, чтобы не центрировать слайд
    }, 5000);

    // Останавливаем автопереключение при наведении на слайдер
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // Возобновляем автопереключение при уходе мыши со слайдера
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider(false); // Передаем false, чтобы не центрировать слайд
        }, 5000);
    });

    // Инициализация слайдера
    updateSlider(false); // Передаем false, чтобы не центрировать слайд при инициализации

    // Слайдер портфолио
    const portfolioSlider = document.querySelector('.slider');
    const portfolioSlides = document.querySelectorAll('.slide');
    const portfolioDots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (portfolioSlider && portfolioSlides.length && portfolioDots.length) {
        let currentPortfolioSlide = 0;
        const portfolioSlideCount = portfolioSlides.length;

        function updatePortfolioSlider() {
            portfolioSlider.style.transform = `translateX(-${currentPortfolioSlide * 100}%)`;
            
            portfolioDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPortfolioSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentPortfolioSlide = (currentPortfolioSlide - 1 + portfolioSlideCount) % portfolioSlideCount;
                updatePortfolioSlider();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentPortfolioSlide = (currentPortfolioSlide + 1) % portfolioSlideCount;
                updatePortfolioSlider();
            });
        }

        portfolioDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentPortfolioSlide = index;
                updatePortfolioSlider();
            });
        });

        // Инициализация слайдера портфолио
        updatePortfolioSlider();
    }

    // Добавляем обработчик для кнопки "Наши работы"
    const worksButton = document.querySelector('.btn.secondary');
    if (worksButton) {
        worksButton.addEventListener('click', function(e) {
            e.preventDefault();
            const portfolioSection = document.querySelector('.portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Добавляем обработчик для кнопки "Бесплатная консультация"
    const consultationButton = document.querySelector('.btn.primary');
    if (consultationButton) {
        consultationButton.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '+7 (999) 123-45-67'; // Замените на ваш номер телефона
            if (confirm('Для получения бесплатной консультации, пожалуйста, позвоните нам по номеру: ' + phoneNumber)) {
                window.location.href = 'tel:' + phoneNumber.replace(/\s+/g, '');
            }
        });
    }

    // Добавляем обработчик для кнопки "Каталог"
    const catalogButton = document.querySelector('.catalog-btn');
    if (catalogButton) {
        catalogButton.addEventListener('click', function(e) {
            e.preventDefault();
            const gallerySection = document.querySelector('.gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Инициализация Яндекс Карт
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map("map", {
            center: [55.756981, 37.618423],
            zoom: 16
        });

        var myPlacemark = new ymaps.Placemark([55.756981, 37.618423], {
            hintContent: 'Наш офис',
            balloonContent: 'Мы находимся здесь'
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');
    }
}); 