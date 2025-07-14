document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCIÓN REUTILIZABLE PARA PESTAÑAS INTERACTIVAS ---
    const setupInteractiveTabs = (linkSelector, cardContainerSelector) => {
        const links = document.querySelectorAll(linkSelector);
        // Aseguramos que el selector de tarjetas sea específico para evitar conflictos
        const cards = document.querySelectorAll(`${cardContainerSelector} > .explanation-card`);

        if (links.length === 0 || cards.length === 0) {
            // Si no se encuentran elementos, no continuamos para evitar errores.
            return;
        }

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                const targetCard = document.getElementById(targetId);

                // Desactivamos todos los enlaces y tarjetas de este grupo
                links.forEach(item => item.classList.remove('active'));
                cards.forEach(card => card.classList.remove('active'));

                // Activamos el enlace y la tarjeta seleccionados
                link.classList.add('active');
                if (targetCard) {
                    targetCard.classList.add('active');
                }
            });
        });
    };

    // --- INICIALIZACIÓN DE TODAS LAS SECCIONES INTERACTIVAS ---
    setupInteractiveTabs('.operator-link', '.operadores-ejemplos-interactivos');
    setupInteractiveTabs('.operator-link-assign', '.asignacion-compuesta-ejemplos');
    setupInteractiveTabs('.operator-link-incdec', '.incremento-decremento-ejemplos');
    setupInteractiveTabs('.operator-link-rel', '.relacionales-ejemplos');
    setupInteractiveTabs('.operator-link-log', '.logicos-ejemplos');


    // --- LÓGICA PARA LA NAVEGACIÓN PRINCIPAL Y PERSISTENCIA DE ESTADO ---
    const topicLinks = document.querySelectorAll('.topic-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContent = document.querySelector('.main-content');

    // Función para mostrar una sección específica
    const showTopic = (topicId) => {
        topicLinks.forEach(item => item.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));

        const linkToActivate = document.querySelector(`.topic-link[data-target="${topicId}"]`);
        const sectionToActivate = document.getElementById(topicId);

        if (linkToActivate && sectionToActivate) {
            linkToActivate.classList.add('active');
            sectionToActivate.classList.add('active');
        }
    };

    // 1. Lógica al hacer clic en un tema
    topicLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            showTopic(targetId);
            
            // Guarda el ID del tema en la memoria del navegador
            localStorage.setItem('lastVisitedTopic', targetId);
            
            if (mainContent) {
                mainContent.scrollTop = 0;
            }
        });
    });

    // 2. Lógica al cargar la página
    const savedTopicId = localStorage.getItem('lastVisitedTopic');

    if (savedTopicId) {
        showTopic(savedTopicId);
    } else {
        // Si no hay nada guardado (primera visita), activa el primer tema
        const firstTopic = topicLinks[0];
        if (firstTopic) {
            showTopic(firstTopic.getAttribute('data-target'));
        }
    }


    // --- LÓGICA PARA EL INTERRUPTOR DE TEMA (MODO OSCURO/CLARO) ---
    const themeToggle = document.getElementById('theme-toggle');

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.checked = theme === 'dark';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // --- LÓGICA PARA EL MENÚ HAMBURGUESA (MÓVIL) ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

    const closeSidebar = () => {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    };

    const openSidebar = () => {
        if (sidebar) sidebar.classList.add('active');
        if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    };

    if (mobileMenuBtn && sidebar && sidebarBackdrop) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el click se propague
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        sidebarBackdrop.addEventListener('click', closeSidebar);
        
        // Cierra el menú lateral si se hace clic en un enlace de tema
        topicLinks.forEach(link => {
            link.addEventListener('click', closeSidebar);
        });
    }

    // --- INTERSECTION OBSERVER PARA ANIMACIONES AL HACER SCROLL ---
    const observerOptions = {
      threshold: 0.15
    };

    const revealOnScroll = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('hidden');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    document.querySelectorAll('.code-terminal, .data-table, .mind-map-container').forEach(el => {
      el.classList.add('hidden');
      observer.observe(el);
    });

    // --- BOTÓN DE COPIAR EN BLOQUES DE CÓDIGO ---
    document.querySelectorAll('.code-terminal').forEach(terminal => {
      const header = terminal.querySelector('.code-terminal-header');
      const pre = terminal.querySelector('pre code');
      if (header && pre) {
        // Evita duplicar el botón si ya existe
        if (!header.querySelector('.copy-btn')) {
          const btn = document.createElement('button');
          btn.className = 'copy-btn';
          btn.type = 'button';
          btn.textContent = 'Copiar';
          btn.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.textContent).then(() => {
              const original = btn.textContent;
              btn.textContent = '¡Copiado!';
              btn.disabled = true;
              setTimeout(() => {
                btn.textContent = original;
                btn.disabled = false;
              }, 2000);
            });
          });
          header.appendChild(btn);
        }
      }
    });
});