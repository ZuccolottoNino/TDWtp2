document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // MENÚ LATERAL (SIDEBAR)
    // ==========================================
    const sectionsBtn = document.querySelector('.sections-btn');
    const closeBtn = document.getElementById('sidebarCloseBtn');
    const overlay = document.getElementById('sidebarOverlay');
    const menu = document.getElementById('sidebarMenu');

    // Función para abrir el menú lateral
    function openSidebar() {
        if (menu && overlay) {
            menu.classList.add('open');
            overlay.classList.add('active');
            document.body.classList.add('no-scroll');
        }
    }

    // Función para cerrar el menú lateral
    function closeSidebar() {
        if (menu && overlay) {
            menu.classList.remove('open');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    }

    // Event listeners del Sidebar
    if (sectionsBtn) {
        sectionsBtn.addEventListener('click', openSidebar);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    });


    // ==========================================
    // CARRUSEL AUTOMÁTICO DE PORTADA (HERO)
    // ==========================================
    const slides = [
        {
            image: 'images/ImagenPrimeraSeccion.png',
            title1: 'Crimen en City Bell',
            title2: 'La pista que cambia el caso',
            mobileTitle1: 'Crimen en City Bell',
            mobileTitle2: 'La pista que cambia el caso'
        },
        {
            image: 'images/ImagenPrimeraSeccion3.png',
            title1: 'Acusados por el crimen de Santiago Correa',
            title2: 'apelaron un fallo a la Cámara Penal',
            mobileTitle1: 'Apelan el fallo por el',
            mobileTitle2: 'crimen de Santiago Correa'
        },
        {
            image: 'images/ImagenPrimeraSeccion4.png',
            title1: 'Familiares y amigos de Santiago Correa',
            title2: 'llevaron acabo una marcha.',
            mobileTitle1: 'Marcha por justicia para',
            mobileTitle2: 'Santiago Correa'
        },
        {
            image: 'images/ImagenPrimeraSeccion5.png',
            title1: 'Familias de alumnos reclaman',
            title2: 'urgentes medidas de seguridad vial en la zona.',
            mobileTitle1: 'Familias reclaman medidas',
            mobileTitle2: 'de seguridad vial'
        }
    ];

    const heroCard = document.getElementById('heroCard');
    const heroTitle1 = document.getElementById('heroTitle1');
    const heroTitle2 = document.getElementById('heroTitle2');
    const dots = document.querySelectorAll('#heroSliderDots .dot');

    let currentSlide = 0;
    let carouselInterval = null;

    // Función para mostrar un slide específico
    function showSlide(index) {
        if (!heroCard || !heroTitle1 || !heroTitle2) return;

        const slide = slides[index];
        // Cambiar imagen de fondo
        heroCard.style.backgroundImage = `url('${slide.image}')`;
        
        // Detectar si es celular (ancho < 768px)
        const isMobile = window.innerWidth < 768;
        
        // Cambiar textos del título según el dispositivo
        heroTitle1.textContent = isMobile ? slide.mobileTitle1 : slide.title1;
        heroTitle2.textContent = isMobile ? slide.mobileTitle2 : slide.title2;

        // Actualizar dots
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        currentSlide = index;
    }

    // Actualizar el slide actual si se redimensiona la pantalla (para cambiar entre títulos de móvil/escritorio)
    window.addEventListener('resize', () => {
        showSlide(currentSlide);
    });

    // Función para avanzar al siguiente slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Iniciar temporizador automático (cada 4 segundos)
    function startAutoplay() {
        if (carouselInterval === null) {
            carouselInterval = setInterval(nextSlide, 4000);
        }
    }

    // Detener temporizador
    function stopAutoplay() {
        if (carouselInterval !== null) {
            clearInterval(carouselInterval);
            carouselInterval = null;
        }
    }

    // Reiniciar temporizador al interactuar manualmente
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Event listeners para los dots del slider
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            showSlide(index);
            resetAutoplay();
        });
    });

    // Inicializar el carrusel
    if (heroCard && slides.length > 0) {
        showSlide(0);
        startAutoplay();
    }

    // ==========================================
    // ARRASTRE CON EL MOUSE PARA LOS CARRUSELES (DRAG-TO-SCROLL)
    // ==========================================
    const carousels = document.querySelectorAll('[class*="-carousel"]');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        let moved = false;

        // Evitar el comportamiento de arrastre por defecto de las imágenes y enlaces
        carousel.querySelectorAll('img, a').forEach(el => {
            el.addEventListener('dragstart', (e) => e.preventDefault());
        });

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            moved = false;
            // Guardamos la posición inicial del mouse y el scroll horizontal actual
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.style.cursor = 'grabbing';
            carousel.style.scrollBehavior = 'auto'; // Deshabilitar temporalmente scroll-behavior suave para mayor respuesta al arrastre
        });

        carousel.addEventListener('mouseleave', () => {
            if (isDown) {
                isDown = false;
                carousel.style.cursor = 'grab';
                carousel.style.scrollBehavior = '';
            }
        });

        carousel.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                carousel.style.cursor = 'grab';
                carousel.style.scrollBehavior = '';
            }
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // Evitar la selección de texto
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1.5; // Multiplicador de velocidad de arrastre
            
            // Si el movimiento es mayor a 5px, se considera arrastre y se inhabilita el click
            if (Math.abs(x - startX) > 5) {
                moved = true;
            }
            
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Cancelar el click de los enlaces en caso de arrastre
        carousel.addEventListener('click', (e) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true); // Fase de captura
    });
});
