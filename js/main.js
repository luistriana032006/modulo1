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
        // Feature 8 — smooth scroll to top on section change
        const contentArea = document.querySelector('.content');
        if (contentArea) contentArea.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 1. Lógica al hacer clic en un tema
    topicLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            
            showTopic(targetId);
            
            // Guarda el ID del tema en la memoria del navegador
            localStorage.setItem('lastVisitedTopic', targetId);
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

    // --- Feature 5 — Indicador de Progreso ---
    const progressFill = document.getElementById('progressFill');
    const progressLabel = document.getElementById('progressLabel');
    const allProgressCheckboxes = document.querySelectorAll('.progress-checkbox');
    const totalTopics = allProgressCheckboxes.length;

    const updateProgressBar = () => {
        const checkedCount = document.querySelectorAll('.progress-checkbox:checked').length;
        const percentage = totalTopics > 0 ? (checkedCount / totalTopics) * 100 : 0;
        if (progressFill) progressFill.style.width = percentage + '%';
        if (progressLabel) progressLabel.textContent = `${checkedCount} / ${totalTopics} completados`;
    };

    // --- Checklist de Progreso (Feature 1 ya implementado, conectado a Feature 5) ---
    document.querySelectorAll('.progress-checkbox').forEach(checkbox => {
      const target = checkbox.getAttribute('data-target');
      const key = 'progress-' + target;
      const link = checkbox.parentElement.querySelector('.topic-link');
      // Cargar estado
      if (localStorage.getItem(key) === 'true') {
        checkbox.checked = true;
        if (link) {
          link.style.textDecoration = 'line-through';
          link.style.opacity = '0.7';
        }
      }
      // Guardar estado
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          localStorage.setItem(key, 'true');
          if (link) {
            link.style.textDecoration = 'line-through';
            link.style.opacity = '0.7';
          }
        } else {
          localStorage.removeItem(key);
          if (link) {
            link.style.textDecoration = '';
            link.style.opacity = '';
          }
        }
        updateProgressBar(); // Feature 1 → Feature 5 hook
      });
    });
    updateProgressBar(); // Initial state on page load

    // --- Inicializar Tippy.js para el glosario ---
    if (window.tippy) {
      tippy('[data-tippy-content]');
    }

    // --- Feature 7 — Tiempo estimado de lectura ---
    document.querySelectorAll('.content-section').forEach(section => {
        const h2 = section.querySelector('h2');
        if (!h2 || section.querySelector('.reading-time')) return;
        const wordCount = section.innerText.split(/\s+/).filter(w => w.length > 0).length;
        const minutes = Math.max(1, Math.round(wordCount / 200));
        const badge = document.createElement('span');
        badge.className = 'reading-time';
        badge.textContent = `~${minutes} min`;
        h2.appendChild(badge);
    });

    // --- Feature 6 — Navegación con teclado ---
    const topicLinksArray = Array.from(topicLinks);

    const showKeyboardToast = (message) => {
        let toast = document.getElementById('kbToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'kbToast';
            toast.className = 'kb-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => toast.classList.remove('visible'), 1500);
    };

    document.addEventListener('keydown', (e) => {
        const tag = document.activeElement.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;

        const activeLink = document.querySelector('.topic-link.active');
        const currentIndex = topicLinksArray.indexOf(activeLink);
        let newIndex = -1;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            newIndex = Math.min(currentIndex + 1, topicLinksArray.length - 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            newIndex = Math.max(currentIndex - 1, 0);
        }

        if (newIndex >= 0 && newIndex !== currentIndex) {
            e.preventDefault();
            const newLink = topicLinksArray[newIndex];
            const newTopicId = newLink.getAttribute('data-target');
            showTopic(newTopicId);
            localStorage.setItem('lastVisitedTopic', newTopicId);
            showKeyboardToast(newLink.textContent.trim());
        }
    });

    // --- Feature 2 — Buscador de contenido ---
    const searchInput = document.getElementById('searchInput');
    const searchCount = document.getElementById('searchCount');

    const clearSearch = () => {
        document.querySelectorAll('mark.search-highlight').forEach(mark => {
            const parent = mark.parentNode;
            if (parent) {
                parent.replaceChild(document.createTextNode(mark.textContent), mark);
                parent.normalize();
            }
        });
        if (searchCount) searchCount.textContent = '';
    };

    const performSearch = (query) => {
        clearSearch();
        if (query.length < 2) return;

        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        let totalMatches = 0;

        document.querySelectorAll('.content-section').forEach(section => {
            const walker = document.createTreeWalker(section, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    const tag = node.parentNode && node.parentNode.tagName
                        ? node.parentNode.tagName.toLowerCase() : '';
                    if (tag === 'script' || tag === 'style' || tag === 'mark') {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            });

            const textNodes = [];
            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue.trim()) textNodes.push(node);
            }

            textNodes.forEach(textNode => {
                const matches = textNode.nodeValue.match(regex);
                if (!matches) return;
                totalMatches += matches.length;

                const fragment = document.createDocumentFragment();
                const parts = textNode.nodeValue.split(regex);
                parts.forEach((part, i) => {
                    if (i % 2 === 1) {
                        const mark = document.createElement('mark');
                        mark.className = 'search-highlight';
                        mark.textContent = part;
                        fragment.appendChild(mark);
                    } else {
                        fragment.appendChild(document.createTextNode(part));
                    }
                });
                textNode.parentNode.replaceChild(fragment, textNode);
            });
        });

        if (searchCount) {
            searchCount.textContent = totalMatches > 0
                ? `${totalMatches} resultado${totalMatches !== 1 ? 's' : ''}`
                : 'Sin resultados';
        }
    };

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            performSearch(searchInput.value.trim());
        });
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                clearSearch();
            }
        });
    }

    // --- Feature 3 — Ejercicios interactivos ---
    const ejerciciosSection = document.getElementById('ejercicios');
    if (ejerciciosSection) {
        ejerciciosSection.querySelectorAll('ol').forEach((ol, sectionIndex) => {
            const items = ol.querySelectorAll('li');

            const counter = document.createElement('span');
            counter.className = 'exercise-counter';
            ol.parentNode.insertBefore(counter, ol);

            const updateCounter = () => {
                const checked = ol.querySelectorAll('.exercise-checkbox:checked').length;
                counter.textContent = `${checked}/${items.length} completados`;
            };

            items.forEach((li, exerciseIndex) => {
                const key = `exercise-${sectionIndex}-${exerciseIndex}`;

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = 'exercise-checkbox';
                checkbox.checked = localStorage.getItem(key) === 'true';

                // Wrap existing li content in a span so flexbox works cleanly
                const contentSpan = document.createElement('span');
                contentSpan.className = 'exercise-content';
                while (li.firstChild) contentSpan.appendChild(li.firstChild);

                li.classList.add('exercise-item');
                li.appendChild(checkbox);
                li.appendChild(contentSpan);

                if (checkbox.checked) li.classList.add('completed');

                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        localStorage.setItem(key, 'true');
                        li.classList.add('completed');
                    } else {
                        localStorage.removeItem(key);
                        li.classList.remove('completed');
                    }
                    updateCounter();
                });
            });

            updateCounter();
        });
    }

    // --- Feature 4 — Editor de código embebido ---
    const compilerModal = document.getElementById('compilerModal');
    const compilerClose = document.getElementById('compilerClose');
    const compilerTextarea = document.getElementById('compilerTextarea');

    const openCompilerModal = (code) => {
        if (compilerTextarea) compilerTextarea.value = code;
        if (compilerModal) compilerModal.classList.add('active');
    };

    const closeCompilerModal = () => {
        if (compilerModal) compilerModal.classList.remove('active');
    };

    if (compilerClose) compilerClose.addEventListener('click', closeCompilerModal);

    if (compilerModal) {
        compilerModal.addEventListener('click', (e) => {
            if (e.target === compilerModal) closeCompilerModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && compilerModal && compilerModal.classList.contains('active')) {
            closeCompilerModal();
        }
    });

    // Add "▶ Probar" buttons to each code terminal
    document.querySelectorAll('.code-terminal').forEach(terminal => {
        const header = terminal.querySelector('.code-terminal-header');
        const pre = terminal.querySelector('pre code');
        if (!header || !pre || header.querySelector('.try-btn')) return;

        // Create a button container to hold both try and copy buttons neatly
        let btnContainer = header.querySelector('.terminal-btns');
        if (!btnContainer) {
            btnContainer = document.createElement('div');
            btnContainer.className = 'terminal-btns';
            const copyBtn = header.querySelector('.copy-btn');
            if (copyBtn) {
                header.removeChild(copyBtn);
                btnContainer.appendChild(copyBtn);
            }
            header.appendChild(btnContainer);
        }

        const tryBtn = document.createElement('button');
        tryBtn.className = 'try-btn';
        tryBtn.type = 'button';
        tryBtn.textContent = '▶ Probar';
        tryBtn.addEventListener('click', () => openCompilerModal(pre.textContent));

        // Insert try button before copy button
        btnContainer.insertBefore(tryBtn, btnContainer.firstChild);
    });

});