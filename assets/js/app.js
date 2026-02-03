        // Aguardar o carregamento completo do DOM
        document.addEventListener('DOMContentLoaded', function() {
            // Elementos do menu
            const menuToggle = document.getElementById('menuToggle');
            const navMenu = document.querySelector('.nav-menu');
            const body = document.body;
            
            // Toggle do menu mobile
            menuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle classes
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Prevenir rolagem do body quando menu está aberto
                if (navMenu.classList.contains('active')) {
                    body.style.overflow = 'hidden';
                } else {
                    body.style.overflow = '';
                }
            });
            
            // Fechar menu ao clicar em um link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        menuToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        body.style.overflow = '';
                    }
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
                const header = document.querySelector('.main-head');
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
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    // Efeito visual de clique
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                });
            });
        });


        //Área de About Me: 
        // Efeito de digitação em LOOP contínuo com velocidades ajustadas
        const typewriterText = document.getElementById('typewriter');
        const speedButtons = document.querySelectorAll('.speed-btn');
        
        const professions = [
            "Desenvolvedor Web",
            "Suporte Técnico", 
            "Área de Dados",
            "Gerenciamento de Equipes",
            "UI/UX"
        ];
        
        // Configurações de velocidade
        const speedSettings = {
            slow: {
                write: 120,    // ms por caractere ao escrever
                delete: 60,    // ms por caractere ao apagar
                pauseWrite: 2000, // ms de pausa após escrever
                pauseDelete: 800  // ms de pausa após apagar
            },
            normal: {
                write: 80,     // ms por caractere ao escrever
                delete: 40,    // ms por caractere ao apagar
                pauseWrite: 1500, // ms de pausa após escrever
                pauseDelete: 500  // ms de pausa após apagar
            },
            fast: {
                write: 50,     // ms por caractere ao escrever
                delete: 25,    // ms por caractere ao apagar
                pauseWrite: 1000, // ms de pausa após escrever
                pauseDelete: 300  // ms de pausa após apagar
            }
        };
        
        // Velocidade atual (normal por padrão)
        let currentSpeed = 'normal';
        let typewriterInterval;
        
        function startTypewriter() {
            let textIndex = 0;
            let charIndex = 0;
            let isErasing = false;
            
            function type() {
                const currentText = professions[textIndex];
                const speed = speedSettings[currentSpeed];
                
                if (!isErasing) {
                    // Escrevendo
                    typewriterText.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                    
                    if (charIndex === currentText.length) {
                        // Terminou de escrever, espera e começa a apagar
                        setTimeout(() => {
                            isErasing = true;
                            type();
                        }, speed.pauseWrite);
                        return;
                    }
                } else {
                    // Apagando
                    typewriterText.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                    
                    if (charIndex === 0) {
                        // Terminou de apagar, vai para o próximo texto
                        isErasing = false;
                        textIndex = (textIndex + 1) % professions.length;
                        
                        // Pequena pausa antes de começar o próximo
                        setTimeout(() => {
                            type();
                        }, speed.pauseDelete);
                        return;
                    }
                }
                
                // Velocidade atual baseada na ação
                const currentSpeedValue = isErasing ? speed.delete : speed.write;
                typewriterInterval = setTimeout(type, currentSpeedValue);
            }
            
            // Inicia o loop
            type();
        }
        
        // Controladores de velocidade
        function setSpeed(speed) {
            currentSpeed = speed;
            
            // Atualiza botões ativos
            speedButtons.forEach(btn => {
                if (btn.dataset.speed === speed) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // Reinicia o typewriter com nova velocidade
            clearTimeout(typewriterInterval);
            typewriterText.textContent = '';
            startTypewriter();
        }
        
        // Event listeners para os botões de velocidade
        speedButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                setSpeed(btn.dataset.speed);
            });
        });
        
        // Inicia o typewriter quando a página carrega
        document.addEventListener('DOMContentLoaded', () => {
            startTypewriter();
        });
        
        // Função alternativa mais simples (caso precise)
        function simpleTypewriter() {
            const texts = professions;
            let i = 0;
            let j = 0;
            let isDeleting = false;
            let currentText = '';
            
            function type() {
                const speed = speedSettings[currentSpeed];
                
                if (isDeleting) {
                    currentText = texts[i].substring(0, j - 1);
                    j--;
                    typewriterText.textContent = currentText;
                    
                    if (j === 0) {
                        isDeleting = false;
                        i = (i + 1) % texts.length;
                        setTimeout(type, speed.pauseDelete);
                        return;
                    }
                    
                    setTimeout(type, speed.delete);
                } else {
                    currentText = texts[i].substring(0, j + 1);
                    j++;
                    typewriterText.textContent = currentText;
                    
                    if (j === texts[i].length) {
                        isDeleting = true;
                        setTimeout(type, speed.pauseWrite);
                        return;
                    }
                    
                    setTimeout(type, speed.write);
                }
            }
            
            type();
        }

        //CÓDIGO ÁREA DE HABILIDADES E SERVIÇOS
        // Dados dos serviços
        const skillsServices = [
            {
                id: 1,
                name: "Desenvolvimento Web",
                description: "Criação de sites responsivos e aplicações web modernas com foco em performance, usabilidade e SEO. Desenvolvimento de soluções completas para sua presença online.",
                longDescription: "Ofereço soluções completas de desenvolvimento web, desde sites institucionais responsivos até aplicações web complexas. Utilizo as melhores práticas de desenvolvimento para garantir performance, segurança e escalabilidade. Meu processo inclui análise de requisitos, design de interface, desenvolvimento front-end e back-end, testes e deploy. Trabalho com metodologias ágeis para garantir que o projeto seja entregue dentro do prazo e orçamento estabelecidos.",
                image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                tags: ["HTML5", "CSS3", "JavaScript"]
            },
            {
                id: 2,
                name: "Suporte Técnico",
                description: "É o serviço responsável por auxiliar usuários com problemas técnicos relacionados a hardware, software, redes ou sistemas.",
                longDescription: "Atuação em Suporte Técnico (Help Desk) com atendimento presencial e remoto a usuários, abertura, registro, triagem, categorização, priorização e acompanhamento de chamados (SLA), diagnóstico e resolução de incidentes e requisições em hardware, software e rede; instalação, configuração e atualização de sistemas operacionais e aplicativos (pacote Office/Microsoft 365), formatação, imagem/padronização de máquinas, backup e restauração, configuração de impressoras e periféricos, suporte a Wi-Fi, cabeamento e conectividade, criação e administração básica de contas e permissões em Active Directory, gerenciamento de acessos, suporte a ferramentas corporativas e antivírus, manutenção preventiva e corretiva, inventário/controle de ativos, documentação de procedimentos e base de conhecimento, orientação e treinamento de usuários. ",
                image: "https://images.unsplash.com/photo-1632910121591-29e2484c0259?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tags: ["Help Desk", "Manutenção", "Infra", "Suporte Remoto", "Satisfação do Usuário", "Comunicação"]
            },
            {
                id: 3,
                name: "Gerenciamento de Equipes",
                description: "Liderança e coordenação de pessoas para alcançar objetivos comuns, focando no desenvolvimento do time, na produtividade e na entrega de resultados dentro de prazos e recursos estabelecidos.",
                longDescription: "Ofereço soluções completas em gestão de equipes, desde a formação e estruturação de times até a liderança de squads multidisciplinares de alta performance. Utilizo as melhores práticas de gestão ágil e liderança servidora para garantir produtividade, engajamento e entrega de valor contínuo. Meu processo inclui análise de necessidades do negócio, definição de papéis e responsabilidades, mentoria e desenvolvimento de talentos, coordenação de rotinas ágeis e medição de resultados. Trabalho com metodologias como Scrum e Kanban para garantir que os times operem com foco, transparência e melhoria constante, sempre alinhados aos prazos e objetivos estratégicos da organização.",
                image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1184&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tags: ["Metodologias Ágeis", "Comunicação", "Empatia","Gestão de Tempo","Gestão de Projetos"]
            },
            {
                id: 4,
                name: "Design UX/UI - A ser estudado",
                description: "Design de interfaces intuitivas e experiências de usuário excepcionais. Prototipação, wireframes e design systems para criar produtos digitais que encantam.",
                longDescription: "Desenvolvo interfaces que não apenas são visualmente atrativas, mas também intuitivas e funcionais. Meu processo de design UX/UI começa com pesquisa de usuário, criação de personas, jornada do usuário, wireframes e protótipos interativos. Utilizo princípios de design centrado no usuário para criar experiências que resolvem problemas reais e geram resultados. Também crio sistemas de design consistentes que garantem coesão visual e facilidade de manutenção.",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
                tags: ["Figma"]
            },
            {
                id: 5,
                name: "Área de Dados - A ser estudado",
                description: "A Área de Dados é o campo que trata da coleta, organização, análise e interpretação de informações, transformando dados brutos em insights valiosos para a tomada de decisões.",
                longDescription: "Ofereço soluções completas em dados, desde análise descritiva e dashboards estratégicos até a construção de modelos preditivos e pipelines de dados escaláveis. Utilizo as melhores práticas de engenharia e ciência de dados para garantir qualidade, confiabilidade e clareza nas entregas. Meu processo envolve entendimento do problema de negócio, coleta e preparação dos dados, análise exploratória, modelagem (quando aplicável) e comunicação clara dos insights através de visualizações e relatórios. Trabalho de forma estruturada para garantir que cada solução entregue valor tangível, dentro do prazo e dos objetivos estabelecidos.",
                image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tags: ["PHP", "MYSQL", "Python"]
            },
            {
                id: 6,
                name: "Revisão e Versionamento do Código",
                description: "Revisão de erros, bugs e problemas do código, visando evitar um problema maior no código principal, junto ao versionamamento, onde criamos cópias do software para que o principal seja mudado apenas quando tudo estiver funcionando.",
                longDescription: "Ofereço soluções completas em dados, desde análise descritiva e dashboards estratégicos até a construção de modelos preditivos e pipelines de dados escaláveis. Utilizo as melhores práticas de engenharia e ciência de dados para garantir qualidade, confiabilidade e clareza nas entregas. Meu processo envolve entendimento do problema de negócio, coleta e preparação dos dados, análise exploratória, modelagem (quando aplicável) e comunicação clara dos insights através de visualizações e relatórios. Trabalho de forma estruturada para garantir que cada solução entregue valor tangível, dentro do prazo e dos objetivos estabelecidos.",
                image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                tags: ["Git", "GitHub"]
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

        // Variáveis do slider
        let currentSkillSlide = 0;
        let skillsCardsPerView = 3;
        let totalSkillsSlides = 0;

        // Inicializar o slider
        function initSkillsSlider() {
            // Determinar quantos cards por view baseado na largura da tela
            updateSkillsCardsPerView();
            
            // Calcular total de slides
            totalSkillsSlides = Math.ceil(skillsServices.length / skillsCardsPerView);
            
            // Gerar cards
            generateSkillsCards();
            
            // Gerar dots
            generateSkillsDots();
            
            // Atualizar slider
            updateSkillsSlider();
            
            // Adicionar event listeners
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
                        <img src="${service.image}" alt="${service.name}">
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
            skillsNextBtn.style.opacity = currentSkillSlide === totalSkillsSlides - 1 ? '0.5' : '1';
        }

        // Navegar para o slide anterior
        function prevSkillSlide() {
            if (currentSkillSlide > 0) {
                currentSkillSlide--;
                updateSkillsSlider();
            }
        }

        // Navegar para o próximo slide
        function nextSkillSlide() {
            if (currentSkillSlide < totalSkillsSlides - 1) {
                currentSkillSlide++;
                updateSkillsSlider();
            }
        }

        // Ir para slide específico
        function goToSkillSlide(index) {
            if (index >= 0 && index < totalSkillsSlides) {
                currentSkillSlide = index;
                updateSkillsSlider();
            }
        }

        // Abrir modal com detalhes da skill
        function openSkillModal(serviceId) {
            const service = skillsServices.find(s => s.id === serviceId);
            
            if (service) {
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
            skillModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
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
            skillModalClose.addEventListener('click', closeSkillModal);
            skillModalOverlay.addEventListener('click', (e) => {
                if (e.target === skillModalOverlay) {
                    closeSkillModal();
                }
            });
            
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
                if (e.key === 'Escape' && skillModalOverlay.classList.contains('active')) {
                    closeSkillModal();
                }
                
                if (!skillModalOverlay.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') prevSkillSlide();
                    if (e.key === 'ArrowRight') nextSkillSlide();
                }
            });
        }

        // Inicializar quando o DOM estiver carregado
        document.addEventListener('DOMContentLoaded', initSkillsSlider);

        //PROJECTS SECTION
         document.addEventListener('DOMContentLoaded', function() {
            // Elementos do slider
            const sliderContainer = document.querySelector('.slider-container');
            const projectCards = document.querySelectorAll('.project-card');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const currentSlideSpan = document.getElementById('current-slide');
            const totalSlidesSpan = document.getElementById('total-slides');
            const sliderDotsContainer = document.getElementById('slider-dots');
            
            // Configurações
            let currentSlide = 0;
            const totalSlides = projectCards.length;
            
            // Atualizar contador total
            totalSlidesSpan.textContent = totalSlides;
            
            // Criar dots do slider
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                
                sliderDotsContainer.appendChild(dot);
            }
            
            // Função para atualizar o slider
            function updateSlider() {
                // Calcular o deslocamento
                const offset = -currentSlide * 100;
                sliderContainer.style.transform = `translateX(${offset}%)`;
                
                // Atualizar contador
                currentSlideSpan.textContent = currentSlide + 1;
                
                // Atualizar dots
                const dots = document.querySelectorAll('.slider-dot');
                dots.forEach((dot, index) => {
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            // Ir para slide específico
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                updateSlider();
            }
            
            // Próximo slide
            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }
            
            // Slide anterior
            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlider();
            }
            
            // Event listeners para os botões
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
            });
            
            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
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
            
            // Inicializar slider
            updateSlider();
            
            // Auto-slide a cada 8 segundos
            let autoSlideInterval = setInterval(nextSlide, 8000);
            
            // Pausar auto-slide ao interagir
            const sliderControls = document.querySelector('.projects-slider');
            sliderControls.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            
            sliderControls.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(nextSlide, 8000);
            });
        });

        //SECTION - EXPERIENCIA PROFIOSSIONAL
        // Animação de aparecimento com scroll
        document.addEventListener('DOMContentLoaded', function() {
            const experienciaContainers = document.querySelectorAll('.experiencia-container');
            
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
                experienciaContainers.forEach(container => {
                    if (isElementInViewport(container)) {
                        container.classList.add('visible');
                    }
                });
            }
            
            // Verificar visibilidade ao carregar a página
            checkVisibility();
            
            // Verificar visibilidade ao rolar a página
            window.addEventListener('scroll', checkVisibility);
            
            // Adicionar classe de animação com delay para criar efeito sequencial
            experienciaContainers.forEach((container, index) => {
                container.style.transitionDelay = `${index * 0.2}s`;
            });
        });

        //CONTACT
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contact-me-form');
            const messageDiv = document.getElementById('contact-me-message');
            
            // Remover a mensagem de status após alguns segundos
            function clearMessage() {
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                    messageDiv.className = 'contact-me-message';
                }, 5000);
            }
            
            // Envio do formulário
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Coletar dados do formulário
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Validação básica
                if (!data.name || !data.email || !data.subject || !data.message) {
                    messageDiv.textContent = 'Por favor, preencha todos os campos.';
                    messageDiv.className = 'contact-me-message error';
                    messageDiv.style.display = 'block';
                    clearMessage();
                    return;
                }
                
                // Simular envio (substitua por chamada real à API)
                // Em um caso real, você enviaria para o Formspree ou outro serviço
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                // Mostrar estado de carregamento
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitButton.disabled = true;
                
                // Simular delay de rede
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Simular resposta de sucesso
                const isSuccess = Math.random() > 0.1; // 90% de chance de sucesso para demonstração
                
                if (isSuccess) {
                    messageDiv.textContent = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
                    messageDiv.className = 'contact-me-message success';
                    messageDiv.style.display = 'block';
                    
                    // Limpar formulário
                    form.reset();
                } else {
                    messageDiv.textContent = 'Erro ao enviar mensagem. Tente novamente mais tarde.';
                    messageDiv.className = 'contact-me-message error';
                    messageDiv.style.display = 'block';
                }
                
                // Restaurar botão
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Limpar mensagem após alguns segundos
                clearMessage();
            });
            
            // Validação em tempo real
            const inputs = form.querySelectorAll('.contact-me-input, .contact-me-textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    if (this.value.trim() === '') {
                        this.style.borderColor = '#e74c3c';
                    } else {
                        this.style.borderColor = '#e0e0e0';
                    }
                });
                
                input.addEventListener('input', function() {
                    if (this.value.trim() !== '') {
                        this.style.borderColor = '#3498db';
                    }
                });
            });
        });