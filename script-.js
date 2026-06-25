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

        // Cambiar cursor si es la primera noticia clickable
        if (index === 0) {
            heroCard.style.cursor = 'pointer';
        } else {
            heroCard.style.cursor = 'default';
        }

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

        // Navegación al hacer clic en el primer slide
        heroCard.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                return;
            }
            if (currentSlide === 0) {
                window.location.href = 'noticia1.html';
            }
        });
    }

    // ==========================================
    // ARRASTRE CON EL MOUSE PARA LOS CARRUSELES (DRAG-TO-SCROLL)
    // ==========================================
    const carousels = document.querySelectorAll('[class*="-carousel"], .cronicas-grid');
    
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

    // ==========================================
    // SELECCIÓN DE CATEGORÍA (LA PLATA REPORTA)
    // ==========================================
    const categoryBtns = document.querySelectorAll('.lpr-category-btn');
    const selectedCategoryInput = document.getElementById('lprSelectedCategory');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isAlreadyActive = btn.classList.contains('active');
            
            // Removemos active de todos los botones
            categoryBtns.forEach(b => b.classList.remove('active'));
            
            let categoryValue = '';
            if (isAlreadyActive) {
                // Si ya estaba activo, al hacer clic se deselecciona
                if (selectedCategoryInput) selectedCategoryInput.value = '';
            } else {
                // Si no estaba activo, lo activamos y guardamos el valor
                btn.classList.add('active');
                categoryValue = btn.getAttribute('data-category') || '';
                if (selectedCategoryInput) selectedCategoryInput.value = categoryValue;
            }

            // Actualizar etiqueta del campo de número de reclamo/línea de transporte
            const ticketLabel = document.querySelector('label[for="lprTicketNumber"]');
            const ticketInput = document.getElementById('lprTicketNumber');
            if (ticketLabel && ticketInput) {
                if (categoryValue === 'Transporte') {
                    ticketLabel.textContent = 'Línea de transporte';
                    ticketInput.placeholder = 'Ej: Línea 202 (Opcional)';
                } else if (categoryValue === 'Luminarias') {
                    ticketLabel.textContent = 'Código de poste / columna';
                    ticketInput.placeholder = 'Ej: LP-8493 (Opcional)';
                } else if (categoryValue === 'Agua') {
                    ticketLabel.textContent = 'Empresa de servicio (ABSA o Municipio)';
                    ticketInput.placeholder = 'Ej: ABSA / Municipal (Opcional)';
                } else if (categoryValue === 'Inseguridad') {
                    ticketLabel.textContent = 'Número de denuncia policial';
                    ticketInput.placeholder = 'Ej: IPP-12-004532-26 (Opcional)';
                } else {
                    ticketLabel.textContent = 'Número de reclamo (147 o ABSA)';
                    ticketInput.placeholder = 'Ej: AB-12345 (Opcional)';
                }
            }
        });
    });

    // ==========================================
    // CONTADOR DE CARACTERES (LA PLATA REPORTA)
    // ==========================================
    const descriptionTextarea = document.getElementById('lprDescription');
    const charCounter = document.getElementById('lprCharCounter');

    if (descriptionTextarea && charCounter) {
        descriptionTextarea.addEventListener('input', () => {
            const count = descriptionTextarea.value.length;
            charCounter.textContent = `${count}/500 caracteres`;
            
            if (count >= 500) {
                charCounter.style.color = '#ef4444'; // Rojo aviso
                charCounter.style.fontWeight = '700';
            } else {
                charCounter.style.color = '#94a3b8'; // Gris por defecto
                charCounter.style.fontWeight = '500';
            }
        });
    }

    // ==========================================
    // MAPA INTERACTIVO (LEAFLET - LA PLATA REPORTA)
    // ==========================================
    const mapContainer = document.getElementById('lprMap');
    let reportMap = null;
    let reportMarker = null;

    if (mapContainer && typeof L !== 'undefined') {
        // Inicializar el mapa centrado en La Plata
        const laPlataCoords = [-34.9214, -57.9545];
        reportMap = L.map('lprMap').setView(laPlataCoords, 13);

        // Cargar mapa desde OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(reportMap);

        // Click en el mapa para marcar ubicación
        reportMap.on('click', (e) => {
            const { lat, lng } = e.latlng;
            
            if (reportMarker) {
                reportMarker.setLatLng(e.latlng);
            } else {
                reportMarker = L.marker(e.latlng, { draggable: true }).addTo(reportMap);
                
                // Actualizar inputs si se arrastra el marcador
                reportMarker.on('dragend', () => {
                    const pos = reportMarker.getLatLng();
                    document.getElementById('lprLatitude').value = pos.lat.toFixed(6);
                    document.getElementById('lprLongitude').value = pos.lng.toFixed(6);
                });
            }
            
            document.getElementById('lprLatitude').value = lat.toFixed(6);
            document.getElementById('lprLongitude').value = lng.toFixed(6);
        });
    }

    // ==========================================
    // SUBIDA DE ARCHIVOS MULTIMEDIA (LPR)
    // ==========================================
    const uploadDropzone = document.getElementById('lprUploadDropzone');
    const fileInput = document.getElementById('lprFileInput');
    const previewsContainer = document.getElementById('lprUploadPreviews');
    let uploadedFilesList = [];

    if (uploadDropzone && fileInput) {
        // Clic en la zona de dropzone activa el selector
        uploadDropzone.addEventListener('click', () => {
            fileInput.click();
        });

        // Al seleccionar archivos
        fileInput.addEventListener('change', (e) => {
            handleUploadedFiles(e.target.files);
        });

        // Arrastrar y Soltar (Drag & Drop)
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadDropzone.style.borderColor = '#009fe3';
                uploadDropzone.style.backgroundColor = 'rgba(0, 159, 227, 0.05)';
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadDropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                uploadDropzone.style.borderColor = '';
                uploadDropzone.style.backgroundColor = '';
            }, false);
        });

        uploadDropzone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            handleUploadedFiles(dt.files);
        });
    }

    function handleUploadedFiles(files) {
        if (!files || files.length === 0) return;
        
        // Sumar archivos controlando el límite de 3
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Validar límite máximo de 3 archivos
            if (uploadedFilesList.length >= 3) {
                alert('Solo podés subir hasta un máximo de 3 archivos multimedia.');
                break;
            }
            
            // Validar peso de archivo (máximo 10MB)
            if (file.size > 10 * 1024 * 1024) {
                alert(`El archivo "${file.name}" supera el tamaño máximo permitido de 10 MB.`);
                continue;
            }
            
            uploadedFilesList.push(file);
        }
        
        renderUploadedPreviews();
    }

    function renderUploadedPreviews() {
        if (!previewsContainer) return;
        previewsContainer.innerHTML = '';
        
        if (uploadedFilesList.length > 0) {
            previewsContainer.style.display = 'flex';
        } else {
            previewsContainer.style.display = 'none';
        }
        
        uploadedFilesList.forEach((file, index) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'lpr-preview-item';
            
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                previewItem.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                previewItem.appendChild(video);
            } else {
                const fileIcon = document.createElement('div');
                fileIcon.className = 'lpr-preview-file-icon';
                fileIcon.textContent = file.name.split('.').pop() || 'file';
                previewItem.appendChild(fileIcon);
            }
            
            // Botón de eliminar vista previa
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'lpr-preview-remove-btn';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                uploadedFilesList.splice(index, 1);
                renderUploadedPreviews();
            });
            
            previewItem.appendChild(removeBtn);
            previewsContainer.appendChild(previewItem);
        });
    }

    // ==========================================
    // FORMULARIO Y PANTALLA DE FEEDBACK (LPR)
    // ==========================================
    const reportForm = document.getElementById('lprReportForm');
    const feedbackScreen = document.getElementById('lprFeedbackScreen');
    const resetReportBtn = document.getElementById('lprResetBtn');

    if (reportForm && feedbackScreen) {
        reportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validar que se haya seleccionado una categoría
            const selectedCategory = document.getElementById('lprSelectedCategory').value;
            if (!selectedCategory) {
                alert('Por favor, seleccioná una categoría para el reporte.');
                document.querySelector('.lpr-category-section').scrollIntoView({ behavior: 'smooth' });
                return;
            }
            
            // Validar que se haya marcado la ubicación en el mapa
            const lat = document.getElementById('lprLatitude').value;
            const lng = document.getElementById('lprLongitude').value;
            if (!lat || !lng) {
                alert('Por favor, marcá la ubicación del incidente en el mapa.');
                document.getElementById('lprMap').scrollIntoView({ behavior: 'smooth' });
                return;
            }
            
            // Ocultar formulario y mostrar feedback
            reportForm.style.display = 'none';
            feedbackScreen.style.display = 'flex';
            
            // Scroll arriba de la sección de reporte
            document.querySelector('.lpr-report-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (resetReportBtn && reportForm && feedbackScreen) {
        resetReportBtn.addEventListener('click', () => {
            // Limpiar formulario y reiniciar variables
            reportForm.reset();
            
            // Limpiar categorías activas
            document.querySelectorAll('.lpr-category-btn').forEach(b => b.classList.remove('active'));
            document.getElementById('lprSelectedCategory').value = '';
            
            // Restaurar etiqueta del ticket a su valor por defecto
            const ticketLabel = document.querySelector('label[for="lprTicketNumber"]');
            const ticketInput = document.getElementById('lprTicketNumber');
            if (ticketLabel && ticketInput) {
                ticketLabel.textContent = 'Número de reclamo (147 o ABSA)';
                ticketInput.placeholder = 'Ej: AB-12345 (Opcional)';
            }
            
            // Limpiar mapa
            document.getElementById('lprLatitude').value = '';
            document.getElementById('lprLongitude').value = '';
            if (reportMarker && reportMap) {
                reportMap.removeLayer(reportMarker);
                reportMarker = null;
                reportMap.setView([-34.9214, -57.9545], 13);
            }
            
            // Limpiar archivos multimedia
            uploadedFilesList = [];
            renderUploadedPreviews();
            if (fileInput) fileInput.value = '';
            
            // Reiniciar contador de caracteres
            if (charCounter) {
                charCounter.textContent = '0/500 caracteres';
                charCounter.style.color = '';
                charCounter.style.fontWeight = '';
            }
            
            // Mostrar formulario y ocultar feedback
            feedbackScreen.style.display = 'none';
            reportForm.style.display = 'block';
            
            // Scroll arriba de la sección
            document.querySelector('.lpr-report-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================
    // SCROLL AL FORMULARIO DE CATEGORÍAS (LPR)
    // ==========================================
    const heroRegisterBtn = document.querySelector('.lpr-button');
    const categorySection = document.querySelector('.lpr-category-section');

    if (heroRegisterBtn && categorySection) {
        heroRegisterBtn.addEventListener('click', () => {
            categorySection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================
    // BANNER ACTIVAR UBICACIÓN (Flotante persistente)
    // ==========================================
    const locationBanner = document.getElementById('locationBanner');
    const locationBannerBtn = document.getElementById('locationBannerBtn');

    // Función para calcular el barrio más cercano de La Plata según coordenadas
    function getNeighborhood(lat, lng) {
        const points = [
            { name: 'City Bell', lat: -34.8647, lng: -58.0461 },
            { name: 'Gonnet', lat: -34.8776, lng: -58.0179 },
            { name: 'Ringuelet', lat: -34.8972, lng: -57.9892 },
            { name: 'Tolosa', lat: -34.8986, lng: -57.9686 },
            { name: 'Saavedra', lat: -34.9318, lng: -57.9431 },
            { name: 'La Plata', lat: -34.9214, lng: -57.9545 }
        ];
        
        let closest = points[0];
        let minDistance = Infinity;
        
        points.forEach(point => {
            const dist = Math.pow(point.lat - lat, 2) + Math.pow(point.lng - lng, 2);
            if (dist < minDistance) {
                minDistance = dist;
                closest = point;
            }
        });
        
        return closest.name;
    }

    // Función para actualizar los badges de ubicación en la cabecera del hero
    function updateLocationBadges(neighborhoodName) {
        const badgeContainer = document.querySelector('.badge-container');
        const badgeZone = document.querySelector('.badge-zone');
        const badgeLocation = document.querySelector('.badge-location');
        
        if (badgeContainer && badgeZone && badgeLocation) {
            badgeContainer.classList.remove('no-location');
            badgeZone.classList.remove('location-disabled');
            badgeZone.textContent = 'EN TU ZONA';
            badgeLocation.textContent = neighborhoodName;
            badgeLocation.style.display = 'block';
        }
    }

    // Función para solicitar ubicación al usuario
    function requestUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    // Guardar estado de éxito y coordenadas
                    localStorage.setItem('userLocationEnabled', 'true');
                    localStorage.setItem('userLatitude', lat);
                    localStorage.setItem('userLongitude', lng);
                    
                    // Encontrar barrio correspondiente y actualizar badges
                    const neighborhood = getNeighborhood(lat, lng);
                    updateLocationBadges(neighborhood);
                    
                    // Ordenar secciones por cercanía si estamos en laplata.html
                    sortLaPlataSections();
                    
                    // Ocultar banner principal si existe
                    if (locationBanner) {
                        locationBanner.classList.remove('active');
                    }
                    
                    // Ocultar banner dinámico de La Plata si existe
                    const activateLocBanner = document.getElementById('activateLocationBanner');
                    if (activateLocBanner) {
                        activateLocBanner.style.display = 'none';
                    }

                    alert(`Ubicación activada con éxito. Tu zona es: ${neighborhood}.`);
                },
                (error) => {
                    console.error('Error de geolocalización:', error);
                    alert('No se pudo activar la ubicación. Por favor, habilitá los permisos de ubicación en tu navegador.');
                }
            );
        } else {
            alert('La geolocalización no está soportada por este navegador.');
        }
    }

    if (locationBanner && locationBannerBtn) {
        // Mostrar el banner después de 1.5 segundos si no ha sido activado antes
        if (!localStorage.getItem('userLocationEnabled')) {
            setTimeout(() => {
                locationBanner.classList.add('active');
            }, 1500);
        }

        // Activar ubicación al hacer clic en el botón
        locationBannerBtn.addEventListener('click', requestUserLocation);
    }

    // Configurar el click en el banner dinámico de La Plata si existe
    const activateLocBannerLink = document.getElementById('activateLocationLink');
    if (activateLocBannerLink) {
        activateLocBannerLink.addEventListener('click', (e) => {
            e.preventDefault();
            requestUserLocation();
        });
    }

    // ==========================================
    // ORDENACIÓN DE SECCIONES POR CERCANÍA (LA PLATA)
    // ==========================================
    function sortLaPlataSections() {
        const laPlataContainer = document.querySelector('.laplata-container');
        if (!laPlataContainer) return; // Solo ejecutar en la sección La Plata (laplata.html)
        
        const mainContent = laPlataContainer.parentNode;
        
        const sections = [
            { name: 'gonnet', element: document.querySelector('.gonnet-section'), lat: -34.8776, lng: -58.0179 },
            { name: 'citybell', element: document.querySelector('.citybell-section'), lat: -34.8647, lng: -58.0461 },
            { name: 'saavedra', element: document.querySelector('.saavedra-section'), lat: -34.9318, lng: -57.9431 },
            { name: 'ringuelet', element: document.querySelector('.ringuelet-section'), lat: -34.8972, lng: -57.9892 },
            { name: 'tolosa', element: document.querySelector('.tolosa-section'), lat: -34.8986, lng: -57.9686 }
        ];

        // Filtrar elementos existentes
        const validSections = sections.filter(s => s.element !== null);

        const isLocEnabled = localStorage.getItem('userLocationEnabled') === 'true';
        
        if (isLocEnabled) {
            const lat = parseFloat(localStorage.getItem('userLatitude'));
            const lng = parseFloat(localStorage.getItem('userLongitude'));
            
            if (!isNaN(lat) && !isNaN(lng)) {
                // Ordenar por distancia de menor a mayor
                validSections.sort((a, b) => {
                    const distA = Math.pow(a.lat - lat, 2) + Math.pow(a.lng - lng, 2);
                    const distB = Math.pow(b.lat - lat, 2) + Math.pow(b.lng - lng, 2);
                    return distA - distB;
                });
            }
        } else {
            // Orden por defecto cuando está desactivado: Tolosa, Ringuelet, Gonnet, City Bell, Parque Saavedra
            const defaultOrder = ['tolosa', 'ringuelet', 'gonnet', 'citybell', 'saavedra'];
            validSections.sort((a, b) => {
                return defaultOrder.indexOf(a.name) - defaultOrder.indexOf(b.name);
            });
        }

        // Reubicar elementos en el DOM en el orden calculado y limpiar clases de banner
        validSections.forEach(s => {
            mainContent.appendChild(s.element);
            if (s.element) {
                s.element.classList.remove('has-banner-above');
            }
        });

        // Posicionar el banner de ubicación activa en La Plata y aplicar clases
        const banner = document.getElementById('activateLocationBanner');
        if (banner) {
            if (isLocEnabled) {
                banner.style.display = 'none';
            } else {
                banner.style.display = 'inline-block';
                const firstSection = validSections[0]?.element;
                if (firstSection) {
                    mainContent.insertBefore(banner, firstSection);
                    firstSection.classList.add('has-banner-above');
                }
            }
        }
    }

    // Cargar estado inicial de ubicación
    const isLocationEnabled = localStorage.getItem('userLocationEnabled') === 'true';
    if (isLocationEnabled) {
        const lat = parseFloat(localStorage.getItem('userLatitude'));
        const lng = parseFloat(localStorage.getItem('userLongitude'));
        if (!isNaN(lat) && !isNaN(lng)) {
            const neighborhood = getNeighborhood(lat, lng);
            updateLocationBadges(neighborhood);
        }
    }

    // Ordenar las secciones de La Plata al cargar la página
    sortLaPlataSections();

    // Permitir activar ubicación al tocar el badge celeste cuando está desactivado
    const badgeZone = document.querySelector('.badge-zone');
    if (badgeZone) {
        badgeZone.addEventListener('click', () => {
            if (badgeZone.classList.contains('location-disabled')) {
                requestUserLocation();
            }
        });
    }
});
