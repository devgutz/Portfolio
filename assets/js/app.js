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
            "Área de Dados"
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