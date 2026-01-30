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