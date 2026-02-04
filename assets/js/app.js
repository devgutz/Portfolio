// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfólio DevGutz iniciado...');
    
    // Inicializar todos os componentes
    initMenu();
    initTypewriter();
    initSkillsSlider();
    initProjectsSlider();
    initExperienceAnimation();
    initContactForm();
});

// ========== MENU E NAVEGAÇÃO ==========
function initMenu() {
    // Elementos do menu
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    const header = document.querySelector('.main-head');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navMenu) {
        console.warn('Elementos do menu não encontrados');
        return;
    }
    
    // Toggle do menu mobile
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle classes
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir rolagem do body quando menu está aberto
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    });
    
    // Fechar menu ao clicar fora (em telas móveis)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnToggle = menuToggle.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });
    
    // Header fixo ao rolar
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            header.classList.add('slidedown');
        } else {
            header.classList.remove('slidedown');
        }
        
        // Esconder/mostrar header baseado na direção do scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll para baixo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll para cima
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Adicionar efeito de clique nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Scroll suave para âncoras
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ========== TYPEWRITER EFFECT ==========
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    
    if (!typewriterElement) {
        console.warn('Elemento typewriter não encontrado');
        return;
    }
    
    const professions = [
        "Desenvolvedor Web",
        "Suporte Técnico", 
        "Área de Dados",
        "Gerenciamento de Equipes",
        "UI/UX"
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = professions[currentIndex];
        
        if (!isDeleting && charIndex <= currentText.length) {
            // Escrevendo
            typewriterElement.textContent = currentText.substring(0, charIndex);
            charIndex++;
            typingSpeed = 100;
        } else if (isDeleting && charIndex >= 0) {
            // Apagando
            typewriterElement.textContent = currentText.substring(0, charIndex);
            charIndex--;
            typingSpeed = 50;
        }
        
        // Verificar se terminou de escrever
        if (!isDeleting && charIndex === currentText.length + 1) {
            isDeleting = true;
            typingSpeed = 1500; // Pausa no final
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % professions.length;
            typingSpeed = 500; // Pausa antes de começar
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Iniciar com delay para melhor UX
    setTimeout(type, 1000);
}

// ========== SKILLS SLIDER ==========
function initSkillsSlider() {
    // Dados dos serviços
    const skillsServices = [
        {
            id: 1,
            name: "Desenvolvimento Web",
            description: "Criação de sites responsivos e aplicações web modernas com foco em performance, usabilidade e SEO.",
            longDescription: "Ofereço soluções completas de desenvolvimento web, desde sites institucionais responsivos até aplicações web complexas. Utilizo as melhores práticas de desenvolvimento para garantir performance, segurança e escalabilidade. Meu processo inclui análise de requisitos, design de interface, desenvolvimento front-end e back-end, testes e deploy. Trabalho com metodologias ágeis para garantir que o projeto seja entregue dentro do prazo e orçamento estabelecidos.",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO"]
        },
        {
            id: 2,
            name: "Suporte Técnico",
            description: "Atendimento técnico especializado para hardware, software, redes e sistemas empresariais.",
            longDescription: "Atuação em Suporte Técnico (Help Desk) com atendimento presencial e remoto a usuários, abertura, registro, triagem, categorização, priorização e acompanhamento de chamados (SLA), diagnóstico e resolução de incidentes e requisições em hardware, software e rede; instalação, configuração e atualização de sistemas operacionais e aplicativos (pacote Office/Microsoft 365), formatação, imagem/padronização de máquinas, backup e restauração, configuração de impressoras e periféricos, suporte a Wi-Fi, cabeamento e conectividade, criação e administração básica de contas e permissões em Active Directory, gerenciamento de acessos, suporte a ferramentas corporativas e antivírus, manutenção preventiva e corretiva, inventário/controle de ativos, documentação de procedimentos e base de conhecimento, orientação e treinamento de usuários.",
            image: "https://images.unsplash.com/photo-1632910121591-29e2484c0259?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tags: ["Help Desk", "Manutenção", "Infra", "Suporte Remoto", "SLA", "Comunicação"]
        },
        {
            id: 3,
            name: "Gerenciamento de Equipes",
            description: "Liderança e coordenação de equipes para alcançar objetivos com eficiência e produtividade.",
            longDescription: "Ofereço soluções completas em gestão de equipes, desde a formação e estruturação de times até a liderança de squads multidisciplinares de alta performance. Utilizo as melhores práticas de gestão ágil e liderança servidora para garantir produtividade, engajamento e entrega de valor contínuo. Meu processo inclui análise de necessidades do negócio, definição de papéis e responsabilidades, mentoria e desenvolvimento de talentos, coordenação de rotinas ágeis e medição de resultados. Trabalho com metodologias como Scrum e Kanban para garantir que os times operem com foco, transparência e melhoria constante, sempre alinhados aos prazos e objetivos estratégicos da organização.",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tags: ["Metodologias Ágeis", "Comunicação", "Empatia", "Gestão de Tempo", "Liderança"]
        },
        {
            id: 4,
            name: "Design UX/UI",
            description: "Design de interfaces intuitivas e experiências de usuário focadas em usabilidade e engajamento.",
            longDescription: "Desenvolvo interfaces que não apenas são visualmente atrativas, mas também intuitivas e funcionais. Meu processo de design UX/UI começa com pesquisa de usuário, criação de personas, jornada do usuário, wireframes e protótipos interativos. Utilizo princípios de design centrado no usuário para criar experiências que resolvem problemas reais e geram resultados. Também crio sistemas de design consistentes que garantem coesão visual e facilidade de manutenção. *Estou em constante aprendizado nesta área.*",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
            tags: ["Figma", "Prototipação", "User Research", "Design System"]
        },
        {
            id: 5,
            name: "Área de Dados",
            description: "Análise e processamento de dados para extrair insights valiosos e suportar decisões estratégicas.",
            longDescription: "Ofereço soluções em análise de dados, desde dashboards estratégicos até a construção de relatórios automatizados. Utilizo as melhores práticas de engenharia e análise de dados para garantir qualidade, confiabilidade e clareza nas entregas. Meu processo envolve entendimento do problema de negócio, coleta e preparação dos dados, análise exploratória e comunicação clara dos insights através de visualizações e relatórios. *Estou em transição para esta área em constante aprendizado.*",
            image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tags: ["Python", "SQL", "Análise Exploratória", "Visualização"]
        },
        {
            id: 6,
            name: "Controle de Versão",
            description: "Gerenciamento de código-fonte e colaboração em equipe com ferramentas de versionamento.",
            longDescription: "Implemento e gerenciamento de fluxos de trabalho com Git para controle de versão de código, facilitando a colaboração em equipe, revisão de código e deploy contínuo. Trabalho com boas práticas de versionamento como Git Flow, commit semântico e pull requests estruturados para garantir qualidade e rastreabilidade do código.",
            image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            tags: ["Git", "GitHub", "Versionamento", "CI/CD"]
        }
    ];

    // Elementos do DOM
    const skillsSliderTrack = document.getElementById('skillsSliderTrack');
    const skillsSliderDots = document.getElementById('skillsSliderDots');
    const skillsPrevBtn = document.getElementById('skillsPrevBtn');
    const skillsNextBtn = document.getElementById('skillsNextBtn');
    const skillModalOverlay = document.getElementById('skillModalOverlay');
    const skillModalBody = document.getElementById('skillModalBody');
    const skillModalClose = document.getElementById('skillModalClose');

    if (!skillsSliderTrack || !skillsPrevBtn || !skillsNextBtn) {
        console.warn('Elementos do skills slider não encontrados');
        return;
    }

    // Variáveis do slider
    let currentSkillSlide = 0;
    let skillsCardsPerView = 3;
    let totalSkillsSlides = 0;
    let isAnimating = false;

    // Inicializar o slider
    function initSlider() {
        updateSkillsCardsPerView();
        totalSkillsSlides = Math.ceil(skillsServices.length / skillsCardsPerView);
        generateSkillsCards();
        generateSkillsDots();
        updateSkillsSlider();
        addSkillsEventListeners();
    }

    // Atualizar cards por view baseado na largura da tela
    function updateSkillsCardsPerView() {
        if (window.innerWidth <= 768) {
            skillsCardsPerView = 1;
        } else if (window.innerWidth <= 992) {
            skillsCardsPerView = 2;
        } else {
            skillsCardsPerView = 3;
        }
    }

    // Gerar cards de skills
    function generateSkillsCards() {
        skillsSliderTrack.innerHTML = '';
        
        skillsServices.forEach(service => {
            const card = document.createElement('div');
            card.className = 'skill-service-card';
            card.dataset.skillId = service.id;
            
            card.innerHTML = `
                <div class="skill-card-image">
                    <img src="${service.image}" alt="${service.name}" loading="lazy">
                </div>
                <div class="skill-card-content">
                    <h3 class="skill-card-title">${service.name}</h3>
                    <p class="skill-card-description">${service.description}</p>
                    <div class="skill-card-tags">
                        ${service.tags.slice(0, 4).map(tag => `<span class="skill-tag">${tag}</span>`).join('')}
                        ${service.tags.length > 4 ? `<span class="skill-tag">+${service.tags.length - 4}</span>` : ''}
                    </div>
                </div>
            `;
            
            skillsSliderTrack.appendChild(card);
        });
    }

    // Gerar dots do slider
    function generateSkillsDots() {
        skillsSliderDots.innerHTML = '';
        
        for (let i = 0; i < totalSkillsSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `skills-slider-dot ${i === 0 ? 'active' : ''}`;
            dot.dataset.skillIndex = i;
            skillsSliderDots.appendChild(dot);
        }
    }

    // Atualizar slider
    function updateSkillsSlider() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Calcular o deslocamento
        const offset = -currentSkillSlide * 100;
        
        // Aplicar transformação
        skillsSliderTrack.style.transform = `translateX(${offset}%)`;
        
        // Atualizar dots
        document.querySelectorAll('.skills-slider-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSkillSlide);
        });
        
        // Atualizar visibilidade dos botões
        skillsPrevBtn.style.opacity = currentSkillSlide === 0 ? '0.5' : '1';
        skillsPrevBtn.disabled = currentSkillSlide === 0;
        
        skillsNextBtn.style.opacity = currentSkillSlide === totalSkillsSlides - 1 ? '0.5' : '1';
        skillsNextBtn.disabled = currentSkillSlide === totalSkillsSlides - 1;
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Navegar para o slide anterior
    function prevSkillSlide() {
        if (currentSkillSlide > 0 && !isAnimating) {
            currentSkillSlide--;
            updateSkillsSlider();
        }
    }

    // Navegar para o próximo slide
    function nextSkillSlide() {
        if (currentSkillSlide < totalSkillsSlides - 1 && !isAnimating) {
            currentSkillSlide++;
            updateSkillsSlider();
        }
    }

    // Ir para slide específico
    function goToSkillSlide(index) {
        if (index >= 0 && index < totalSkillsSlides && !isAnimating) {
            currentSkillSlide = index;
            updateSkillsSlider();
        }
    }

    // Abrir modal com detalhes da skill
    function openSkillModal(serviceId) {
        const service = skillsServices.find(s => s.id === serviceId);
        
        if (service && skillModalBody && skillModalOverlay) {
            skillModalBody.innerHTML = `
                <div class="skill-modal-image">
                    <img src="${service.image}" alt="${service.name}">
                </div>
                <h2 class="skill-modal-title">${service.name}</h2>
                <p class="skill-modal-description">${service.longDescription}</p>
                <div class="skill-modal-tags">
                    ${service.tags.map(tag => `<span class="skill-modal-tag">${tag}</span>`).join('')}
                </div>
            `;
            
            skillModalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // Fechar modal
    function closeSkillModal() {
        if (skillModalOverlay) {
            skillModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Adicionar event listeners
    function addSkillsEventListeners() {
        // Botões de navegação do slider
        skillsPrevBtn.addEventListener('click', prevSkillSlide);
        skillsNextBtn.addEventListener('click', nextSkillSlide);
        
        // Dots
        document.querySelectorAll('.skills-slider-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.skillIndex);
                goToSkillSlide(index);
            });
        });
        
        // Cards clicáveis
        document.querySelectorAll('.skill-service-card').forEach(card => {
            card.addEventListener('click', () => {
                const serviceId = parseInt(card.dataset.skillId);
                openSkillModal(serviceId);
            });
        });
        
        // Fechar modal
        if (skillModalClose) {
            skillModalClose.addEventListener('click', closeSkillModal);
        }
        
        if (skillModalOverlay) {
            skillModalOverlay.addEventListener('click', (e) => {
                if (e.target === skillModalOverlay) {
                    closeSkillModal();
                }
            });
        }
        
        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            updateSkillsCardsPerView();
            totalSkillsSlides = Math.ceil(skillsServices.length / skillsCardsPerView);
            generateSkillsDots();
            currentSkillSlide = Math.min(currentSkillSlide, totalSkillsSlides - 1);
            updateSkillsSlider();
        });
        
        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && skillModalOverlay && skillModalOverlay.classList.contains('active')) {
                closeSkillModal();
            }
            
            if (!skillModalOverlay || !skillModalOverlay.classList.contains('active')) {
                if (e.key === 'ArrowLeft') prevSkillSlide();
                if (e.key === 'ArrowRight') nextSkillSlide();
            }
        });
    }

    // Auto-slide
    let autoSlideInterval;
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isAnimating) {
                if (currentSkillSlide === totalSkillsSlides - 1) {
                    currentSkillSlide = 0;
                } else {
                    currentSkillSlide++;
                }
                updateSkillsSlider();
            }
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Iniciar auto-slide
    startAutoSlide();
    
    // Pausar auto-slide ao interagir
    skillsSliderTrack.addEventListener('mouseenter', stopAutoSlide);
    skillsSliderTrack.addEventListener('mouseleave', startAutoSlide);
    skillsPrevBtn.addEventListener('mouseenter', stopAutoSlide);
    skillsNextBtn.addEventListener('mouseleave', startAutoSlide);

    // Inicializar slider
    initSlider();
}

// ========== PROJECTS SLIDER ==========
function initProjectsSlider() {
    // Elementos do slider
    const sliderContainer = document.querySelector('.slider-container');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');
    const sliderDotsContainer = document.getElementById('slider-dots');

    if (!sliderContainer || !prevBtn || !nextBtn) {
        console.warn('Elementos do projects slider não encontrados');
        return;
    }

    // Configurações
    let currentSlide = 0;
    const totalSlides = projectCards.length;
    let isAnimating = false;
    let autoSlideInterval;

    // Inicializar slider
    function init() {
        // Atualizar contador total
        if (totalSlidesSpan) totalSlidesSpan.textContent = totalSlides;
        
        // Criar dots do slider
        createDots();
        
        // Atualizar slider
        updateSlider();
        
        // Adicionar event listeners
        addEventListeners();
        
        // Iniciar auto-slide
        startAutoSlide();
    }

    // Criar dots
    function createDots() {
        if (!sliderDotsContainer) return;
        
        sliderDotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            
            sliderDotsContainer.appendChild(dot);
        }
    }

    // Atualizar slider
    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Calcular o deslocamento
        const offset = -currentSlide * 100;
        sliderContainer.style.transform = `translateX(${offset}%)`;
        
        // Atualizar contador
        if (currentSlideSpan) currentSlideSpan.textContent = currentSlide + 1;
        
        // Atualizar dots
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Atualizar botões
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Ir para slide específico
    function goToSlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalSlides && !isAnimating) {
            currentSlide = slideIndex;
            updateSlider();
        }
    }

    // Próximo slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1 && !isAnimating) {
            currentSlide++;
            updateSlider();
        }
    }

    // Slide anterior
    function prevSlide() {
        if (currentSlide > 0 && !isAnimating) {
            currentSlide--;
            updateSlider();
        }
    }

    // Adicionar event listeners
    function addEventListeners() {
        // Botões
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Suporte a touch para dispositivos móveis
        let touchStartX = 0;
        let touchEndX = 0;
        
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe para a esquerda -> próximo slide
                    nextSlide();
                } else {
                    // Swipe para a direita -> slide anterior
                    prevSlide();
                }
            }
        }
        
        // Pausar auto-slide ao interagir
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        prevBtn.addEventListener('mouseenter', stopAutoSlide);
        nextBtn.addEventListener('mouseenter', stopAutoSlide);
    }

    // Auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isAnimating) {
                if (currentSlide === totalSlides - 1) {
                    currentSlide = 0;
                } else {
                    currentSlide++;
                }
                updateSlider();
            }
        }, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Inicializar
    init();
}

// ========== EXPERIENCE ANIMATION ==========
function initExperienceAnimation() {
    const experienciaContainers = document.querySelectorAll('.experiencia-container');
    
    if (experienciaContainers.length === 0) {
        console.warn('Containers de experiência não encontrados');
        return;
    }
    
    // Função para verificar se um elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Função para verificar e aplicar animação aos elementos visíveis
    function checkVisibility() {
        experienciaContainers.forEach((container, index) => {
            if (isElementInViewport(container)) {
                setTimeout(() => {
                    container.classList.add('visible');
                }, index * 200);
            }
        });
    }
    
    // Verificar visibilidade ao carregar a página
    checkVisibility();
    
    // Verificar visibilidade ao rolar a página
    window.addEventListener('scroll', checkVisibility);
    
    // Debounce para performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkVisibility, 100);
    });
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contact-me-form');
    const messageDiv = document.getElementById('contact-me-status');
    
    if (!form) {
        console.warn('Formulário de contato não encontrado');
        return;
    }
    
    // Configuração do Formspree
    const formAction = form.getAttribute('action');
    if (!formAction || !formAction.includes('formspree')) {
        console.warn('Formspree action não configurado corretamente');
    }
    
    // Validação dos campos
    const inputs = form.querySelectorAll('.contact-me-input, .contact-me-textarea');
    inputs.forEach(input => {
        // Validação em tempo real
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'rgba(52, 152, 219, 0.5)';
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && value === '') {
            field.style.borderColor = '#e74c3c';
            return false;
        }
        
        if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.style.borderColor = '#e74c3c';
                return false;
            }
        }
        
        field.style.borderColor = 'rgba(52, 152, 219, 0.2)';
        return true;
    }
    
    // Envio do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar todos os campos
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showMessage('Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }
        
        // Coletar dados do formulário
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Mostrar estado de carregamento
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        try {
            // Enviar para Formspree
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showMessage('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                form.reset();
            } else {
                throw new Error('Erro ao enviar formulário');
            }
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
        } finally {
            // Restaurar botão
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Mostrar mensagem
    function showMessage(text, type) {
        if (!messageDiv) return;
        
        messageDiv.textContent = text;
        messageDiv.className = `contact-me-message ${type}`;
        messageDiv.style.display = 'block';
        
        // Remover a mensagem após alguns segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
            messageDiv.className = 'contact-me-message';
        }, 5000);
    }
}

// ========== LOADING ANIMATION ==========
window.addEventListener('load', function() {
    // Remover preloader se existir
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
    
    // Adicionar classe loaded ao body para animações
    document.body.classList.add('loaded');
    
    console.log('Portfólio completamente carregado');
});

// ========== PERFORMANCE OPTIMIZATIONS ==========
// Debounce para eventos de resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Eventos que precisam ser executados no resize
        console.log('Window resized');
    }, 250);
});

// Intersection Observer para lazy loading (se implementado)
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    
    // Observar imagens com data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
}