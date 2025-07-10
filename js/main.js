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
    const themeToggle = document.getElementById('theme-toggle');

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';
    };

    // Cargar el tema guardado al iniciar
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Escuchar cambios en el interruptor
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        applyTheme(newTheme);
    });
    
});