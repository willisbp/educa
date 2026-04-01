const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('main-menu');

menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('active');
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')){
        menu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded','false');
    }
});