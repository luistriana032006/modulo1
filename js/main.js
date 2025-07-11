document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA LA NAVEGACIÓN POR TEMAS ---
    const topicLinks = document.querySelectorAll('.topic-link');
    const contentSections = document.querySelectorAll('.content-section');

    topicLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            const targetId = link.getAttribute('data-target');

            // Quitar clase activa de todos los enlaces y secciones
            topicLinks.forEach(item => item.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Añadir clase activa al enlace clickeado y a la sección correspondiente
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- LÓGICA PARA EL INTERRUPTOR DE TEMA (MODO OSCURO) ---
    const toggle = document.getElementById('theme-toggle');

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        toggle.checked = theme === 'dark';
    };

    // Cargar el tema guardado al iniciar
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Escuchar cambios en el interruptor
    toggle.addEventListener('change', function() {
      if (toggle.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
    
    // --- LÓGICA PARA LOS OPERADORES INTERACTIVOS ---
    const operatorLinks = document.querySelectorAll('.operator-link');
    const explanationCards = document.querySelectorAll('.explanation-card');

    operatorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Quitar clase activa de todos los enlaces y tarjetas
            operatorLinks.forEach(item => item.classList.remove('active'));
            explanationCards.forEach(card => card.classList.remove('active'));

            // Añadir clase activa al enlace y tarjeta correctos
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // --- LÓGICA PARA LOS OPERADORES DE ASIGNACIÓN COMPUESTA INTERACTIVOS ---
    const operatorLinksAssign = document.querySelectorAll('.operator-link-assign');
    const explanationCardsAssign = document.querySelectorAll('.asignacion-compuesta-ejemplos .explanation-card');

    operatorLinksAssign.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Quitar clase activa de todos los enlaces y tarjetas
            operatorLinksAssign.forEach(item => item.classList.remove('active'));
            explanationCardsAssign.forEach(card => card.classList.remove('active'));

            // Añadir clase activa al enlace y tarjeta correctos
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // --- LÓGICA PARA LOS OPERADORES DE INCREMENTO Y DECREMENTO INTERACTIVOS ---
    const operatorLinksIncDec = document.querySelectorAll('.operator-link-incdec');
    const explanationCardsIncDec = document.querySelectorAll('.incremento-decremento-ejemplos .explanation-card');

    operatorLinksIncDec.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Quitar clase activa de todos los enlaces y tarjetas
            operatorLinksIncDec.forEach(item => item.classList.remove('active'));
            explanationCardsIncDec.forEach(card => card.classList.remove('active'));

            // Añadir clase activa al enlace y tarjeta correctos
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // --- LÓGICA PARA LOS OPERADORES RELACIONALES INTERACTIVOS ---
    const operatorLinksRel = document.querySelectorAll('.operator-link-rel');
    const explanationCardsRel = document.querySelectorAll('.relacionales-ejemplos .explanation-card');

    operatorLinksRel.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Quitar clase activa de todos los enlaces y tarjetas
            operatorLinksRel.forEach(item => item.classList.remove('active'));
            explanationCardsRel.forEach(card => card.classList.remove('active'));

            // Añadir clase activa al enlace y tarjeta correctos
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // --- LÓGICA PARA LOS OPERADORES LÓGICOS BOOLEANOS INTERACTIVOS ---
    const operatorLinksLog = document.querySelectorAll('.operator-link-log');
    const explanationCardsLog = document.querySelectorAll('.logicos-ejemplos .explanation-card');

    operatorLinksLog.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');

            // Quitar clase activa de todos los enlaces y tarjetas
            operatorLinksLog.forEach(item => item.classList.remove('active'));
            explanationCardsLog.forEach(card => card.classList.remove('active'));

            // Añadir clase activa al enlace y tarjeta correctos
            link.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // --- LÓGICA PARA EL MENÚ HAMBURGUESA (MÓVIL) ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

    function closeSidebar() {
        sidebar.classList.remove('active');
        if (sidebarBackdrop) sidebarBackdrop.style.display = 'none';
    }
    function openSidebar() {
        sidebar.classList.add('active');
        if (sidebarBackdrop) sidebarBackdrop.style.display = 'block';
    }
    if (mobileMenuBtn && sidebar && sidebarBackdrop) {
        mobileMenuBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
        sidebarBackdrop.addEventListener('click', closeSidebar);
    }
    // Cierra el menú al seleccionar un tema
    topicLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                closeSidebar();
            }
        });
    });
    
});