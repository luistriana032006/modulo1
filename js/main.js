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
    
});