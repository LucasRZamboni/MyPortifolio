// gere o codigo respectivo ao arquivo index.html
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link'); // Seleciona apenas links de navegação

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isActive = navMenu.classList.contains('active');
            mobileBtn.setAttribute('aria-expanded', isActive);
            mobileBtn.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');

            const icon = mobileBtn.querySelector('i');
            if (isActive) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Fecha o menu mobile ao clicar em um link
            if (navMenu.classList.contains('active')) {
                mobileBtn.click();
            }
        });
    });

    // Lógica do Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verifica se há preferência salva
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Configuração do Efeito Typewriter
    const typewriterElement = document.getElementById('typewriter');
    let typewriterText = '';
    
    if (typewriterElement) {
        typewriterText = typewriterElement.textContent;
        typewriterElement.textContent = ''; // Limpa o texto para começar vazio
    }

    function typeWriter(element, text) {
        const chars = Array.from(text); // Array.from lida corretamente com emojis
        let i = 0;
        function type() {
            if (i < chars.length) {
                element.textContent += chars[i];
                i++;
                setTimeout(type, 100); // Velocidade da digitação (ms)
            } else {
                // Adiciona o cursor piscando ao final
                element.innerHTML += '<span class="cursor">&nbsp;</span>';
            }
        }
        type();
    }

    // Animação de Scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${delay}ms`;
                entry.target.classList.add('show');
                
                // Inicia o efeito de digitação se for o elemento correto
                if (entry.target.id === 'typewriter') {
                    typeWriter(entry.target, typewriterText);
                }

                delay += 200;
                observer.unobserve(entry.target); // Garante que a animação rode apenas uma vez
            }
        });
    });

    // Lógica de Filtros de Projetos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.projeto');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove classe active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adiciona ao clicado
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                    setTimeout(() => project.classList.add('show'), 10); // Reativa animação suave
                } else {
                    project.style.display = 'none';
                    project.classList.remove('show');
                }
            });
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal de Imagem
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.close-modal');
    const projectImages = document.querySelectorAll('.projeto img');

    projectImages.forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('open');
            modalImg.src = img.src;
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            modal.classList.remove('open');
        }
    });

    // Envio de Formulário via AJAX (sem sair da página)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            const btn = form.querySelector('button');
            const originalBtnText = btn.textContent;
            
            // Feedback visual de carregamento
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            
            const data = new FormData(event.target);
            
            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (response.ok) {
                    alert("Obrigado! Sua mensagem foi enviada com sucesso.");
                    form.reset();
                } else {
                    alert("Oops! Ocorreu um problema ao enviar seu formulário. Tente novamente.");
                }
            } catch (error) {
                alert("Erro de conexão. Verifique sua internet.");
            } finally {
                btn.textContent = originalBtnText;
                btn.disabled = false;
            }
        });
    }
});