document.addEventListener('DOMContentLoaded', function() {
    // Configuración de la fecha de la boda
    const weddingDate = new Date('December 15, 2025 16:00:00').getTime();
    
    // Carrusel de imágenes con efecto fade
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    let carouselInterval;
    
    // Función para mostrar la slide actual
    function showSlide(index) {
        // Oculta todas las imágenes
        items.forEach(item => {
            item.classList.remove('active');
        });
        
        // Muestra la imagen actual
        items[index].classList.add('active');
        
        // Actualizar indicadores
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Función para avanzar a la siguiente slide
    function nextSlide() {
        let newIndex = currentIndex + 1;
        if (newIndex >= items.length) newIndex = 0;
        showSlide(newIndex);
    }
    
    // Función para retroceder a la slide anterior
    function prevSlide() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = items.length - 1;
        showSlide(newIndex);
    }
    
    // Crear indicadores
    items.forEach((_, index) => {
        const indicator = document.createElement('span');
        indicator.addEventListener('click', () => showSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = document.querySelectorAll('.carousel-indicators span');
    
    // Mostrar la primera slide
    showSlide(0);
    
    // Event listeners para botones
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Auto-avance del carrusel
    function startCarousel() {
        carouselInterval = setInterval(nextSlide, 5000);
    }
    
    startCarousel();
    
    // Pausar al hacer hover
    carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carousel.addEventListener('mouseleave', startCarousel);
    
    // Cuenta regresiva
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        // Si la fecha ya pasó
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // Cálculos de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar el DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Actualizar cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Smooth scrolling para el botón de scroll down
    document.querySelector('.scroll-down').addEventListener('click', () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
    
    // Efecto de aparición al hacer scroll
    const fadeElements = document.querySelectorAll('.section-title, .divider, .wedding-info, .carousel, .countdown-timer, .rsvp-text');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar observadores iniciales
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);
});