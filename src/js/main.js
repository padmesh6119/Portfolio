class InteractivePortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.initCursor();
        this.initNavigation();
        this.initScrollEffects();
        this.initParticles();
        this.initInteractiveElements();
        this.hideLoadingScreen();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }

    initCursor() {
        this.cursor = document.querySelector('.cursor-dot');
        
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                this.cursor.style.left = e.clientX + 'px';
                this.cursor.style.top = e.clientY + 'px';
            });
        });

        // Enhanced hover effects
        const hoverElements = document.querySelectorAll('a, button, .interactive-skill, .interactive-timeline, .interactive-card, .interactive-project, .interactive-contact, .nav-link');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
                el.style.transform = el.style.transform + ' scale(1.05)';
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
                el.style.transform = el.style.transform.replace(' scale(1.05)', '');
            });
        });
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');
        
        // Smooth scrolling for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active nav link on scroll
        const updateActiveNav = () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    }

    initScrollEffects() {
        // Scroll progress bar
        const progressBar = document.querySelector('.progress-bar');
        
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = `${scrollPercent}%`;
        };

        window.addEventListener('scroll', updateScrollProgress);

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all interactive elements
        const animatedElements = document.querySelectorAll('.interactive-skill, .interactive-timeline, .interactive-card, .interactive-project, .interactive-contact');
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    initParticles() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        const particles = [];
        const particleCount = 100;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? '#00FF8C' : '#00D9FF'
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 255, 140, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            // Draw and update particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.fillStyle = `rgba(${particle.color === '#00FF8C' ? '0, 255, 140' : '0, 217, 255'}, ${particle.opacity})`;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    initInteractiveElements() {
        // Enhanced skill interactions
        document.querySelectorAll('.interactive-skill').forEach(skill => {
            skill.addEventListener('click', () => {
                skill.style.transform = 'translateY(-5px) scale(0.95)';
                skill.style.background = 'rgba(0, 255, 140, 0.3)';
                
                setTimeout(() => {
                    skill.style.transform = 'translateY(-5px) scale(1)';
                    skill.style.background = 'rgba(0, 255, 140, 0.2)';
                }, 150);
            });
        });

        // Project card interactions
        document.querySelectorAll('.interactive-project').forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.style.borderColor = '#00FF8C';
                project.style.boxShadow = '0 20px 40px rgba(0, 255, 140, 0.3)';
            });
            
            project.addEventListener('mouseleave', () => {
                project.style.borderColor = 'rgba(0, 255, 140, 0.3)';
                project.style.boxShadow = '0 20px 40px rgba(0, 255, 140, 0.1)';
            });
        });

        // Timeline interactions
        document.querySelectorAll('.interactive-timeline').forEach(timeline => {
            timeline.addEventListener('click', () => {
                timeline.style.background = 'rgba(0, 255, 140, 0.15)';
                timeline.style.transform = 'translateX(20px) scale(1.02)';
                
                setTimeout(() => {
                    timeline.style.background = 'rgba(0, 255, 140, 0.1)';
                    timeline.style.transform = 'translateX(10px) scale(1)';
                }, 200);
            });
        });

        // Contact item interactions
        document.querySelectorAll('.interactive-contact').forEach(contact => {
            contact.addEventListener('click', () => {
                contact.style.transform = 'translateY(-15px) rotateY(5deg)';
                contact.style.boxShadow = '0 25px 50px rgba(0, 255, 140, 0.3)';
                
                setTimeout(() => {
                    contact.style.transform = 'translateY(-10px) rotateY(0deg)';
                    contact.style.boxShadow = '0 15px 30px rgba(0, 255, 140, 0.2)';
                }, 300);
            });
        });

        // Add ripple effect to buttons
        document.querySelectorAll('.cyber-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// Global scroll function for buttons
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractivePortfolio();
    
    // Terminal cursor animation
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
});
// Enhanced Interactive Features
class EnhancedInteractivePortfolio extends InteractivePortfolio {
    constructor() {
        super();
        this.initEnhancedFeatures();
    }

    initEnhancedFeatures() {
        this.initContactForm();
        this.initTooltips();
        this.initEnhancedCursor();
        this.initFloatingParticles();
        this.initAdvancedAnimations();
    }

    initContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = form.querySelector('.submit-btn');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.innerHTML = '✅ Message sent successfully!';
                successMsg.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 255, 140, 0.9);
                    color: #000;
                    padding: 20px 40px;
                    border-radius: 10px;
                    font-weight: bold;
                    z-index: 10001;
                    animation: fadeInOut 3s ease;
                `;
                
                document.body.appendChild(successMsg);
                
                // Reset form
                form.reset();
                
                // Remove success message
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
                
            }, 2000);
        });

        // Enhanced input animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.style.transform = 'scale(1.02)';
                input.parentElement.style.boxShadow = '0 5px 15px rgba(0, 255, 140, 0.2)';
            });
            
            input.addEventListener('blur', () => {
                input.parentElement.style.transform = 'scale(1)';
                input.parentElement.style.boxShadow = 'none';
            });
        });
    }

    initTooltips() {
        const tooltip = document.getElementById('tooltip');
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const text = el.getAttribute('data-tooltip');
                tooltip.textContent = text;
                tooltip.classList.add('show');
            });
            
            el.addEventListener('mousemove', (e) => {
                tooltip.style.left = e.clientX + 10 + 'px';
                tooltip.style.top = e.clientY - 30 + 'px';
            });
            
            el.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });
    }

    initEnhancedCursor() {
        const interactiveCursor = document.querySelector('.interactive-cursor');
        
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                interactiveCursor.style.left = e.clientX - 20 + 'px';
                interactiveCursor.style.top = e.clientY - 20 + 'px';
            });
        });

        // Enhanced hover effects
        const hoverElements = document.querySelectorAll('.interactive-skill, .interactive-project, .interactive-contact, .cyber-btn');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                interactiveCursor.classList.add('active');
                el.style.filter = 'brightness(1.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                interactiveCursor.classList.remove('active');
                el.style.filter = 'brightness(1)';
            });
        });
    }

    initFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${Math.random() > 0.5 ? '#00FF8C' : '#00D9FF'};
                border-radius: 50%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    initAdvancedAnimations() {
        // Skill item click effects
        document.querySelectorAll('.interactive-skill').forEach(skill => {
            skill.addEventListener('click', () => {
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(0, 255, 140, 0.5);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: rippleEffect 0.6s ease-out;
                    pointer-events: none;
                `;
                
                skill.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
                
                // Add skill level display
                const skillLevel = Math.floor(Math.random() * 20) + 80;
                const levelDisplay = document.createElement('div');
                levelDisplay.textContent = `${skillLevel}%`;
                levelDisplay.style.cssText = `
                    position: absolute;
                    top: -30px;
                    right: 10px;
                    background: var(--primary-color);
                    color: #000;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    animation: fadeInOut 2s ease;
                `;
                
                skill.appendChild(levelDisplay);
                setTimeout(() => levelDisplay.remove(), 2000);
            });
        });

        // Project card enhanced interactions
        document.querySelectorAll('.interactive-project').forEach(project => {
            project.addEventListener('mouseenter', () => {
                project.style.transform = 'translateY(-15px) rotateX(5deg)';
                project.style.boxShadow = '0 25px 50px rgba(0, 255, 140, 0.4)';
            });
            
            project.addEventListener('mouseleave', () => {
                project.style.transform = 'translateY(0) rotateX(0deg)';
                project.style.boxShadow = '0 20px 40px rgba(0, 255, 140, 0.1)';
            });
        });

        // Timeline item storytelling
        document.querySelectorAll('.interactive-timeline').forEach((timeline, index) => {
            timeline.addEventListener('click', () => {
                const stories = [
                    'Led a team of 5 security analysts in implementing advanced threat detection systems.',
                    'Conducted over 50 penetration tests for Fortune 500 companies.'
                ];
                
                const story = document.createElement('div');
                story.textContent = stories[index] || 'More details coming soon...';
                story.style.cssText = `
                    margin-top: 15px;
                    padding: 15px;
                    background: rgba(0, 217, 255, 0.1);
                    border-left: 3px solid var(--secondary-color);
                    border-radius: 5px;
                    font-style: italic;
                    animation: slideDown 0.5s ease;
                `;
                
                // Remove existing story if any
                const existingStory = timeline.querySelector('.story');
                if (existingStory) {
                    existingStory.remove();
                } else {
                    story.classList.add('story');
                    timeline.appendChild(story);
                }
            });
        });
    }
}

// Add CSS animations
const enhancedStyle = document.createElement('style');
enhancedStyle.textContent = `
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes rippleEffect {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(enhancedStyle);

// Initialize enhanced portfolio
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedInteractivePortfolio();
});
// Military Radar System
class MilitaryRadar {
    constructor() {
        this.radar = document.getElementById('militaryRadar');
        this.target = document.getElementById('radarTarget');
        this.status = document.getElementById('radarStatus');
        this.sweep = this.radar.querySelector('.radar-sweep');
        this.isDetecting = false;
        this.init();
    }

    init() {
        this.radar.addEventListener('mouseenter', () => {
            this.startDetection();
        });

        this.radar.addEventListener('mouseleave', () => {
            this.stopDetection();
        });

        this.radar.addEventListener('mousemove', (e) => {
            this.trackTarget(e);
        });
    }

    startDetection() {
        this.isDetecting = true;
        this.status.textContent = 'TARGET ACQUIRED';
        this.status.style.color = '#ff0000';
        this.sweep.classList.add('active');
    }

    stopDetection() {
        this.isDetecting = false;
        this.status.textContent = 'SCANNING';
        this.status.style.color = 'var(--primary-color)';
        this.target.classList.remove('detected');
        this.sweep.classList.remove('active');
    }

    trackTarget(e) {
        if (!this.isDetecting) return;

        const rect = this.radar.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Position target at cursor
        this.target.style.left = x - 3 + 'px';
        this.target.style.top = y - 3 + 'px';
        this.target.classList.add('detected');

        // Calculate distance from center
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.min(centerX, centerY);
        const intensity = Math.max(0, 1 - (distance / maxDistance));

        // Update status based on distance
        if (intensity > 0.8) {
            this.status.textContent = 'CRITICAL THREAT';
            this.status.style.color = '#ff0000';
        } else if (intensity > 0.5) {
            this.status.textContent = 'THREAT DETECTED';
            this.status.style.color = '#ff8800';
        } else {
            this.status.textContent = 'TARGET ACQUIRED';
            this.status.style.color = '#ffff00';
        }
    }
}

// Interactive Background System
class InteractiveBackground {
    constructor() {
        this.bg = document.getElementById('interactiveBg');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.updateBackground(e);
        });

        document.addEventListener('click', (e) => {
            this.createRipple(e);
        });
    }

    updateBackground(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        this.bg.style.setProperty('--mouse-x', x + '%');
        this.bg.style.setProperty('--mouse-y', y + '%');
    }

    createRipple(e) {
        const ripple = document.createElement('div');
        ripple.className = 'bg-ripple';
        ripple.style.left = e.clientX - 150 + 'px';
        ripple.style.top = e.clientY - 150 + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }
}

// Enhanced Portfolio with new features
class SuperEnhancedPortfolio extends EnhancedInteractivePortfolio {
    constructor() {
        super();
        this.initMilitaryFeatures();
    }

    initMilitaryFeatures() {
        new MilitaryRadar();
        new InteractiveBackground();
        this.initContactCardAnimations();
    }

    initContactCardAnimations() {
        document.querySelectorAll('.contact-item').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.05)';
                card.style.boxShadow = '0 15px 30px rgba(0, 255, 140, 0.3)';
                card.style.borderColor = 'var(--primary-color)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
                card.style.borderColor = 'var(--border-color)';
            });

            card.addEventListener('click', () => {
                // Create pulse effect
                card.style.animation = 'pulse 0.3s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 300);
            });
        });
    }
}

// Initialize super enhanced portfolio
document.addEventListener('DOMContentLoaded', () => {
    new SuperEnhancedPortfolio();
});
// Enhanced Military Radar with Ripples
class EnhancedMilitaryRadar extends MilitaryRadar {
    constructor() {
        super();
        this.ripple = document.getElementById('radarRipple');
        this.rippleInterval = null;
    }

    startDetection() {
        super.startDetection();
        this.startRipples();
    }

    stopDetection() {
        super.stopDetection();
        this.stopRipples();
    }

    startRipples() {
        this.rippleInterval = setInterval(() => {
            this.createRipple();
        }, 800);
    }

    stopRipples() {
        if (this.rippleInterval) {
            clearInterval(this.rippleInterval);
            this.rippleInterval = null;
        }
        this.ripple.classList.remove('active');
    }

    createRipple() {
        this.ripple.classList.remove('active');
        setTimeout(() => {
            this.ripple.classList.add('active');
        }, 10);
    }

    trackTarget(e) {
        // Remove the red target tracking, keep only status updates
        if (!this.isDetecting) return;

        const rect = this.radar.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.min(centerX, centerY);
        const intensity = Math.max(0, 1 - (distance / maxDistance));

        if (intensity > 0.8) {
            this.status.textContent = 'CRITICAL THREAT';
            this.status.style.color = '#ff0000';
        } else if (intensity > 0.5) {
            this.status.textContent = 'THREAT DETECTED';
            this.status.style.color = '#ff8800';
        } else {
            this.status.textContent = 'TARGET ACQUIRED';
            this.status.style.color = '#ffff00';
        }
    }
}

// Super Interactive Background
class SuperInteractiveBackground extends InteractiveBackground {
    constructor() {
        super();
        this.particles = [];
        this.initParticleSystem();
    }

    initParticleSystem() {
        // Create floating interactive particles
        for (let i = 0; i < 15; i++) {
            this.createFloatingParticle();
        }
        
        // Add mouse trail effect
        this.initMouseTrail();
    }

    createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? '#00FF8C' : '#00D9FF'};
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.6;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        this.particles.push(particle);
    }

    initMouseTrail() {
        let mouseTrail = [];
        
        document.addEventListener('mousemove', (e) => {
            // Create trail dot
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 3px;
                height: 3px;
                background: rgba(0, 255, 140, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: fadeTrail 1s ease-out forwards;
            `;
            
            document.body.appendChild(dot);
            mouseTrail.push(dot);
            
            // Limit trail length
            if (mouseTrail.length > 20) {
                const oldDot = mouseTrail.shift();
                oldDot.remove();
            }
            
            // Remove dot after animation
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.remove();
                }
            }, 1000);
        });
    }

    createRipple(e) {
        // Enhanced ripple with multiple rings
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const ripple = document.createElement('div');
                ripple.className = 'bg-ripple';
                ripple.style.left = e.clientX - 150 + 'px';
                ripple.style.top = e.clientY - 150 + 'px';
                ripple.style.animationDelay = i * 0.1 + 's';
                
                document.body.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 2000);
            }, i * 100);
        }
    }
}

// Ultimate Enhanced Portfolio
class UltimatePortfolio extends SuperEnhancedPortfolio {
    constructor() {
        super();
        this.initUltimateFeatures();
    }

    initUltimateFeatures() {
        new EnhancedMilitaryRadar();
        new SuperInteractiveBackground();
        this.initContactCards();
    }

    initContactCards() {
        document.querySelectorAll('.contact-item').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.05)';
                card.style.boxShadow = '0 12px 25px rgba(0, 255, 140, 0.3)';
                card.style.borderColor = 'var(--primary-color)';
                
                // Stagger animation for other cards
                document.querySelectorAll('.contact-item').forEach((otherCard, otherIndex) => {
                    if (otherIndex !== index) {
                        otherCard.style.transform = 'scale(0.95)';
                        otherCard.style.opacity = '0.7';
                    }
                });
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
                card.style.borderColor = 'var(--border-color)';
                
                // Reset other cards
                document.querySelectorAll('.contact-item').forEach(otherCard => {
                    otherCard.style.transform = 'scale(1)';
                    otherCard.style.opacity = '1';
                });
            });
        });
    }
}

// Add new animations
const ultimateStyle = document.createElement('style');
ultimateStyle.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
        100% { transform: translateY(0px) rotate(360deg); }
    }
    
    @keyframes fadeTrail {
        0% { opacity: 0.5; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(ultimateStyle);

// Initialize ultimate portfolio
document.addEventListener('DOMContentLoaded', () => {
    new UltimatePortfolio();
});
// Classic Ripple and Hover Effects
class ClassicInteractiveBackground {
    constructor() {
        this.hoverGlow = this.createHoverGlow();
        this.init();
    }

    createHoverGlow() {
        const glow = document.createElement('div');
        glow.className = 'hover-glow';
        document.body.appendChild(glow);
        return glow;
    }

    init() {
        // Hover glow effect
        document.addEventListener('mousemove', (e) => {
            this.hoverGlow.style.left = e.clientX + 'px';
            this.hoverGlow.style.top = e.clientY + 'px';
            this.hoverGlow.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.hoverGlow.style.opacity = '0';
        });

        // Classic ripple on click
        document.addEventListener('click', (e) => {
            this.createClassicRipple(e);
        });
    }

    createClassicRipple(e) {
        const ripple = document.createElement('div');
        ripple.className = 'classic-ripple';
        
        const size = 60;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - size / 2) + 'px';
        ripple.style.top = (e.clientY - size / 2) + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Fixed Military Radar (no red target)
class FixedMilitaryRadar {
    constructor() {
        this.radar = document.getElementById('militaryRadar');
        this.status = document.getElementById('radarStatus');
        this.sweep = this.radar.querySelector('.radar-sweep');
        this.ripple = document.getElementById('radarRipple');
        this.isDetecting = false;
        this.rippleInterval = null;
        this.init();
    }

    init() {
        this.radar.addEventListener('mouseenter', () => {
            this.startDetection();
        });

        this.radar.addEventListener('mouseleave', () => {
            this.stopDetection();
        });

        this.radar.addEventListener('mousemove', (e) => {
            this.trackTarget(e);
        });
    }

    startDetection() {
        this.isDetecting = true;
        this.status.textContent = 'TARGET ACQUIRED';
        this.status.style.color = '#ff0000';
        this.sweep.classList.add('active');
        this.radar.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
        this.startRipples();
    }

    stopDetection() {
        this.isDetecting = false;
        this.status.textContent = 'SCANNING';
        this.status.style.color = 'var(--primary-color)';
        this.sweep.classList.remove('active');
        this.radar.style.boxShadow = 'none';
        this.stopRipples();
    }

    startRipples() {
        this.rippleInterval = setInterval(() => {
            this.createRipple();
        }, 800);
    }

    stopRipples() {
        if (this.rippleInterval) {
            clearInterval(this.rippleInterval);
            this.rippleInterval = null;
        }
        this.ripple.classList.remove('active');
    }

    createRipple() {
        this.ripple.classList.remove('active');
        setTimeout(() => {
            this.ripple.classList.add('active');
        }, 10);
    }

    trackTarget(e) {
        if (!this.isDetecting) return;

        const rect = this.radar.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.min(centerX, centerY);
        const intensity = Math.max(0, 1 - (distance / maxDistance));

        if (intensity > 0.8) {
            this.status.textContent = 'CRITICAL THREAT';
            this.status.style.color = '#ff0000';
        } else if (intensity > 0.5) {
            this.status.textContent = 'THREAT DETECTED';
            this.status.style.color = '#ff8800';
        } else {
            this.status.textContent = 'TARGET ACQUIRED';
            this.status.style.color = '#ffff00';
        }
    }
}

// Final Portfolio Class
class FinalPortfolio extends UltimatePortfolio {
    constructor() {
        super();
        this.initFinalFeatures();
    }

    initFinalFeatures() {
        new FixedMilitaryRadar();
        new ClassicInteractiveBackground();
        this.initContactCards();
    }

    initContactCards() {
        // Square contact cards
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-10px)';
                }, 150);
            });
        });

        // Existing contact items
        document.querySelectorAll('.contact-item').forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 10px 20px rgba(0, 255, 140, 0.2)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = 'none';
            });
        });
    }
}

// Initialize final portfolio
document.addEventListener('DOMContentLoaded', () => {
    new FinalPortfolio();
});
// Enhanced Hover-Only Background
class HoverOnlyBackground {
    constructor() {
        this.hoverGlow = this.createHoverGlow();
        this.init();
    }

    createHoverGlow() {
        const glow = document.createElement('div');
        glow.className = 'hover-glow';
        document.body.appendChild(glow);
        return glow;
    }

    init() {
        // Enhanced hover glow effect
        document.addEventListener('mousemove', (e) => {
            this.hoverGlow.style.left = e.clientX + 'px';
            this.hoverGlow.style.top = e.clientY + 'px';
            this.hoverGlow.style.opacity = '1';
            
            // Add dynamic size based on movement speed
            const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
            const size = Math.min(300, 200 + speed * 2);
            this.hoverGlow.style.width = size + 'px';
            this.hoverGlow.style.height = size + 'px';
        });

        document.addEventListener('mouseleave', () => {
            this.hoverGlow.style.opacity = '0';
        });

        // Remove click event listener - no more click animations
    }
}

// Enhanced Profile Photo Interactions
class ProfilePhotoEffects {
    constructor() {
        this.photo = document.querySelector('.profile-photo');
        this.container = document.querySelector('.profile-image');
        this.init();
    }

    init() {
        if (!this.photo || !this.container) return;

        this.container.addEventListener('mouseenter', () => {
            this.activateEffects();
        });

        this.container.addEventListener('mouseleave', () => {
            this.deactivateEffects();
        });

        this.container.addEventListener('mousemove', (e) => {
            this.createSparkles(e);
        });
    }

    activateEffects() {
        this.photo.style.filter = 'brightness(1.2) contrast(1.1)';
        this.container.style.transform = 'scale(1.02)';
    }

    deactivateEffects() {
        this.photo.style.filter = 'brightness(1) contrast(1)';
        this.container.style.transform = 'scale(1)';
    }

    createSparkles(e) {
        const rect = this.container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: ${Math.random() > 0.5 ? '#00FF8C' : '#00D9FF'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: sparkleEffect 1s ease-out forwards;
        `;

        this.container.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Updated Final Portfolio
class UltimateHoverPortfolio extends FinalPortfolio {
    constructor() {
        super();
        this.initHoverFeatures();
    }

    initHoverFeatures() {
        new FixedMilitaryRadar();
        new HoverOnlyBackground();
        new ProfilePhotoEffects();
        this.initEnhancedContactCards();
        this.initHomePageHovers();
    }

    initEnhancedContactCards() {
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) rotateY(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(0, 255, 140, 0.4)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateY(0deg)';
                card.style.boxShadow = 'none';
            });
        });
    }

    initHomePageHovers() {
        // Hero buttons enhanced hover
        document.querySelectorAll('.cyber-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
                btn.style.boxShadow = '0 10px 25px rgba(0, 255, 140, 0.4)';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
                btn.style.boxShadow = 'none';
            });
        });
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleEffect {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Initialize ultimate hover portfolio
document.addEventListener('DOMContentLoaded', () => {
    new UltimateHoverPortfolio();
});
// Page-Wide Interactive Effects
class PageWideInteractivity {
    constructor() {
        this.init();
    }

    init() {
        this.initSectionHovers();
        this.initElementHovers();
        this.initMouseTrail();
        this.initHoverSounds();
    }

    initSectionHovers() {
        document.querySelectorAll('section').forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.transform = 'translateY(-2px)';
                section.style.boxShadow = '0 10px 30px rgba(0, 255, 140, 0.1)';
            });

            section.addEventListener('mouseleave', () => {
                section.style.transform = 'translateY(0)';
                section.style.boxShadow = 'none';
            });
        });
    }

    initElementHovers() {
        // Enhanced skill interactions
        document.querySelectorAll('.interactive-skill').forEach(skill => {
            skill.addEventListener('mouseenter', () => {
                this.createHoverParticles(skill);
            });
        });

        // Project card magnetic effect
        document.querySelectorAll('.interactive-project').forEach(project => {
            project.addEventListener('mousemove', (e) => {
                const rect = project.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                project.style.transform = `translateY(-20px) rotateX(10deg) rotateY(${x * 0.1}deg) rotateZ(${y * 0.05}deg)`;
            });

            project.addEventListener('mouseleave', () => {
                project.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
            });
        });

        // Timeline pulse effect
        document.querySelectorAll('.interactive-timeline').forEach(timeline => {
            timeline.addEventListener('mouseenter', () => {
                timeline.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    timeline.style.animation = '';
                }, 500);
            });
        });
    }

    initMouseTrail() {
        let trail = [];
        
        document.addEventListener('mousemove', (e) => {
            // Create enhanced trail
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${Math.random() > 0.5 ? '#00FF8C' : '#00D9FF'};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${e.clientX - 3}px;
                top: ${e.clientY - 3}px;
                animation: trailFade 2s ease-out forwards;
                box-shadow: 0 0 10px currentColor;
            `;
            
            document.body.appendChild(dot);
            trail.push(dot);
            
            if (trail.length > 15) {
                const oldDot = trail.shift();
                oldDot.remove();
            }
            
            setTimeout(() => {
                if (dot.parentNode) {
                    dot.remove();
                }
            }, 2000);
        });
    }

    initHoverSounds() {
        // Visual feedback for hover interactions
        document.querySelectorAll('.interactive-skill, .interactive-project, .interactive-timeline, .contact-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.createHoverRipple(el);
            });
        });
    }

    createHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                animation: particleBurst 1s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    createHoverRipple(element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 0;
            height: 0;
            border: 2px solid rgba(0, 255, 140, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            animation: hoverRipple 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }
}

// Ultimate Interactive Portfolio
class UltimateInteractivePortfolio extends UltimateHoverPortfolio {
    constructor() {
        super();
        this.initUltimateInteractivity();
    }

    initUltimateInteractivity() {
        new PageWideInteractivity();
        this.initContactCardEffects();
    }

    initContactCardEffects() {
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.05)';
                card.style.boxShadow = '0 15px 35px rgba(0, 255, 140, 0.4)';
                card.style.background = 'rgba(0, 255, 140, 0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
                card.style.background = 'rgba(0, 255, 140, 0.1)';
            });
        });
    }
}

// Add new animations
const interactiveStyle = document.createElement('style');
interactiveStyle.textContent = `
    @keyframes trailFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    @keyframes particleBurst {
        0% { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
        }
        100% { 
            opacity: 0; 
            transform: scale(0) translateY(-50px); 
        }
    }
    
    @keyframes hoverRipple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
            transform: translate(-50px, -50px);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(interactiveStyle);

// Initialize ultimate interactive portfolio
document.addEventListener('DOMContentLoaded', () => {
    new UltimateInteractivePortfolio();
});
// Remove home section ripple effects
class NoRippleInteractivity extends PageWideInteractivity {
    createHoverRipple(element) {
        // Check if element is in home section
        const homeSection = document.getElementById('home');
        if (homeSection && homeSection.contains(element)) {
            return; // Don't create ripple in home section
        }
        
        // Create ripple for other sections
        super.createHoverRipple(element);
    }
}

// Updated Portfolio without contact form
class FinalCleanPortfolio extends UltimateInteractivePortfolio {
    constructor() {
        super();
        this.initCleanFeatures();
    }

    initCleanFeatures() {
        new NoRippleInteractivity();
        // Remove contact form initialization
    }
}

// Initialize final clean portfolio
document.addEventListener('DOMContentLoaded', () => {
    new FinalCleanPortfolio();
});
// Radar-specific functionality
document.addEventListener('DOMContentLoaded', () => {
    const radar = document.getElementById('militaryRadar');
    const status = document.getElementById('radarStatus');
    const sweep = radar?.querySelector('.radar-sweep');
    const ripple = document.getElementById('radarRipple');
    
    if (!radar || !status || !sweep || !ripple) return;
    
    let isDetecting = false;
    let rippleInterval = null;

    radar.addEventListener('mouseenter', () => {
        isDetecting = true;
        status.textContent = 'TARGET ACQUIRED';
        status.style.color = '#ff0000';
        sweep.classList.add('active');
        radar.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
        
        rippleInterval = setInterval(() => {
            ripple.classList.remove('active');
            setTimeout(() => {
                ripple.classList.add('active');
            }, 10);
        }, 800);
    });

    radar.addEventListener('mouseleave', () => {
        isDetecting = false;
        status.textContent = 'SCANNING';
        status.style.color = 'var(--primary-color)';
        sweep.classList.remove('active');
        radar.style.boxShadow = 'none';
        
        if (rippleInterval) {
            clearInterval(rippleInterval);
            rippleInterval = null;
        }
        ripple.classList.remove('active');
    });

    radar.addEventListener('mousemove', (e) => {
        if (!isDetecting) return;

        const rect = radar.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.min(centerX, centerY);
        const intensity = Math.max(0, 1 - (distance / maxDistance));

        if (intensity > 0.8) {
            status.textContent = 'CRITICAL THREAT';
            status.style.color = '#ff0000';
        } else if (intensity > 0.5) {
            status.textContent = 'THREAT DETECTED';
            status.style.color = '#ff8800';
        } else {
            status.textContent = 'TARGET ACQUIRED';
            status.style.color = '#ffff00';
        }
    });
});
// Cursor-following tilt effect for cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.interactive-project, .project-card, .interactive-card, .cert-card, .internship-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
});
// Add cursor tilt effect to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.interactive-project, .project-card, .interactive-card, .cert-card, .internship-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    });
});
// Sunflower tilt effect - cards face the cursor
document.querySelectorAll('.interactive-project, .project-card, .interactive-card, .cert-card, .internship-card, .contact-card').forEach(card => {
    card.style.transition = 'transform 0.1s ease';
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const deltaX = mouseX - cardCenterX;
        const deltaY = mouseY - cardCenterY;
        
        const rotateY = deltaX / 10;
        const rotateX = -deltaY / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});
// Massive Interactive Elements - Phase 2
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading screen to finish before adding interactions
    setTimeout(() => {
        
        // Interactive mouse trail with different shapes
        let trailElements = [];
        document.addEventListener('mousemove', (e) => {
            const shapes = ['1','0'];
            const trail = document.createElement('div');
            trail.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            trail.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                color: ${Math.random() > 0.5 ? '#00FF8C' : '#00FF8C'};
                font-size: ${Math.random() * 10 + 10}px;
                pointer-events: none;
                z-index: 9998;
                animation: trailFade 2s ease-out forwards;
            `;
            document.body.appendChild(trail);
            trailElements.push(trail);
            
            if (trailElements.length > 50) {
                const old = trailElements.shift();
                if (old.parentNode) old.remove();
            }
            
            setTimeout(() => {
                if (trail.parentNode) trail.remove();
            }, 2000);
        });

        // Interactive keyboard effects
        document.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            const effects = {
                'w': () => document.body.style.filter = 'brightness(1.5)',
                'a': () => document.body.style.transform = 'skew(-2deg)',
                's': () => document.body.style.filter = 'contrast(1.5)',
                'd': () => document.body.style.transform = 'skew(2deg)',
                'q': () => document.body.style.filter = 'hue-rotate(45deg)',
                'e': () => document.body.style.filter = 'hue-rotate(-45deg)'
            };
            
            if (effects[key]) {
                effects[key]();
                setTimeout(() => {
                    document.body.style.filter = '';
                    document.body.style.transform = '';
                }, 300);
            }
        });

        // Interactive scroll-based animations
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            document.documentElement.style.setProperty('--scroll-progress', scrollPercent);
            
            // Dynamic background based on scroll
            document.body.style.background = `
                linear-gradient(${scrollPercent * 360}deg, 
                rgba(0, 255, 140, ${0.05 + scrollPercent * 0.1}), 
                rgba(0, 217, 255, ${0.05 + scrollPercent * 0.1}))
            `;
        });

        // Interactive element highlighting
        document.querySelectorAll('*').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (Math.random() > 0.8) {
                    el.style.outline = '1px solid rgba(0, 255, 140, 0.5)';
                    el.style.outlineOffset = '2px';
                    setTimeout(() => {
                        el.style.outline = '';
                        el.style.outlineOffset = '';
                    }, 1000);
                }
            });
        });

        // Interactive sound visualization (visual only)
        const createSoundWave = () => {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: ${Math.random() * window.innerWidth}px;
                width: 3px;
                height: ${Math.random() * 50 + 10}px;
                background: linear-gradient(to top, var(--primary-color), transparent);
                animation: soundWave 1s ease-in-out;
                pointer-events: none;
                z-index: 1;
            `;
            document.body.appendChild(wave);
            setTimeout(() => wave.remove(), 1000);
        };
        
        setInterval(createSoundWave, 200);

        // Interactive element connections
        const connectElements = () => {
            const elements = document.querySelectorAll('.interactive-project, .interactive-card, .contact-card');
            elements.forEach((el1, i) => {
                elements.forEach((el2, j) => {
                    if (i < j && Math.random() > 0.7) {
                        const rect1 = el1.getBoundingClientRect();
                        const rect2 = el2.getBoundingClientRect();
                        
                        const line = document.createElement('div');
                        const distance = Math.sqrt(
                            Math.pow(rect2.left - rect1.left, 2) + 
                            Math.pow(rect2.top - rect1.top, 2)
                        );
                        
                        line.style.cssText = `
                            position: fixed;
                            left: ${rect1.left + rect1.width/2}px;
                            top: ${rect1.top + rect1.height/2}px;
                            width: ${distance}px;
                            height: 1px;
                            background: linear-gradient(90deg, transparent, rgba(0, 255, 140, 0.3), transparent);
                            transform-origin: 0 0;
                            transform: rotate(${Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left)}rad);
                            pointer-events: none;
                            z-index: 1;
                            animation: connectionPulse 3s ease-in-out;
                        `;
                        
                        document.body.appendChild(line);
                        setTimeout(() => line.remove(), 3000);
                    }
                });
            });
        };
        
        setInterval(connectElements, 5000);

        // Interactive weather effect
        const createRain = () => {
            for (let i = 0; i < 5; i++) {
                const drop = document.createElement('div');
                drop.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: -10px;
                    width: 2px;
                    height: 20px;
                    background: linear-gradient(to bottom, var(--primary-color), transparent);
                    pointer-events: none;
                    z-index: 1;
                    animation: rainDrop 2s linear forwards;
                `;
                document.body.appendChild(drop);
                setTimeout(() => drop.remove(), 2000);
            }
        };
        
        if (Math.random() > 0.5) {
            setInterval(createRain, 1000);
        }

        // Interactive element breathing
        document.querySelectorAll('.section-title, .hero-title').forEach(el => {
            el.style.animation = 'breathe 4s ease-in-out infinite';
        });

        // Interactive cursor magnet effect
        document.addEventListener('mousemove', (e) => {
            document.querySelectorAll('.cyber-btn, .nav-link').forEach(btn => {
                const rect = btn.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
                    Math.pow(e.clientY - (rect.top + rect.height/2), 2)
                );
                
                if (distance < 100) {
                    const pull = (100 - distance) / 100;
                    btn.style.transform = `scale(${1 + pull * 0.1}) rotate(${pull * 2}deg)`;
                } else {
                    btn.style.transform = '';
                }
            });
        });

        // Interactive time-based effects
        setInterval(() => {
            const hour = new Date().getHours();
            if (hour >= 18 || hour <= 6) {
                document.body.style.filter = 'brightness(0.9) contrast(1.1)';
            } else {
                document.body.style.filter = '';
            }
        }, 60000);

    }, 3000); // Wait for loading screen to finish
});

// Additional CSS animations
const additionalStyle = document.createElement('style');
additionalStyle.textContent = `
    @keyframes trailFade {
        0% { opacity: 1; transform: scale(1) rotate(0deg); }
        100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
    
    @keyframes soundWave {
        0%, 100% { height: 10px; opacity: 0.3; }
        50% { height: 50px; opacity: 1; }
    }
    
    @keyframes connectionPulse {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.5; }
    }
    
    @keyframes rainDrop {
        0% { top: -20px; opacity: 1; }
        100% { top: 100vh; opacity: 0; }
    }
    
    @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(additionalStyle);
// Futuristic Interactive System - Phase 3
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        
        // Remove ugly cursor trail and fix colors
        document.body.style.background = 'var(--bg-color)';
        document.body.style.filter = '';
        document.body.style.transform = '';
        
        // Add glitch data attribute to hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.setAttribute('data-text', heroTitle.textContent);
        }
        
        // Create futuristic background grid
        const grid = document.createElement('div');
        grid.className = 'futuristic-grid';
        document.body.appendChild(grid);
        
        // Create circuit pattern
        const circuit = document.createElement('div');
        circuit.className = 'circuit-pattern';
        document.body.appendChild(circuit);
        
        // Add energy fields to cards
        document.querySelectorAll('.interactive-project, .interactive-card, .contact-card').forEach(card => {
            const energyField = document.createElement('div');
            energyField.className = 'energy-field';
            card.style.position = 'relative';
            card.appendChild(energyField);
            
            const holographic = document.createElement('div');
            holographic.className = 'holographic-effect';
            card.appendChild(holographic);
        });
        
        // Data stream effects
        const createDataStream = () => {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.left = Math.random() * window.innerWidth + 'px';
            stream.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(stream);
            
            setTimeout(() => stream.remove(), 3000);
        };
        
        setInterval(createDataStream, 1000);
        
        // Card scanning effect
        document.querySelectorAll('.interactive-project, .interactive-card, .contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const scanner = document.createElement('div');
                scanner.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
                    animation: scanLine 1s ease-in-out;
                    pointer-events: none;
                    z-index: 10;
                `;
                card.appendChild(scanner);
                setTimeout(() => scanner.remove(), 1000);
            });
        });
        
        // Background matrix rain
        const createMatrixRain = () => {
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            const drop = document.createElement('div');
            drop.textContent = chars[Math.floor(Math.random() * chars.length)];
            drop.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: -20px;
                color: rgba(0, 255, 140, 0.7);
                font-family: 'Courier New', monospace;
                font-size: 14px;
                pointer-events: none;
                z-index: 1;
                animation: matrixFall 4s linear forwards;
            `;
            document.body.appendChild(drop);
            setTimeout(() => drop.remove(), 4000);
        };
        
        setInterval(createMatrixRain, 200);
        
        // Interactive card connections
        document.querySelectorAll('.interactive-project, .interactive-card, .contact-card').forEach(card => {
            card.addEventListener('click', () => {
                // Create energy burst
                for (let i = 0; i < 8; i++) {
                    const burst = document.createElement('div');
                    burst.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 4px;
                        height: 4px;
                        background: var(--primary-color);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 10;
                        animation: energyBurst 1s ease-out forwards;
                        transform: rotate(${i * 45}deg) translateX(0);
                    `;
                    card.appendChild(burst);
                    setTimeout(() => burst.remove(), 1000);
                }
            });
        });
        
        // Background pulse on scroll
        let pulseTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(pulseTimeout);
            document.body.style.boxShadow = 'inset 0 0 100px rgba(0, 255, 140, 0.1)';
            pulseTimeout = setTimeout(() => {
                document.body.style.boxShadow = '';
            }, 200);
        });
        
        // Futuristic mouse interaction
        document.addEventListener('mousemove', (e) => {
            // Create subtle energy dots instead of ugly trail
            if (Math.random() > 0.98) {
                const dot = document.createElement('div');
                dot.style.cssText = `
                    position: fixed;
                    left: ${e.clientX}px;
                    top: ${e.clientY}px;
                    width: 2px;
                    height: 2px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    animation: dotFade 1s ease-out forwards;
                `;
                document.body.appendChild(dot);
                setTimeout(() => dot.remove(), 1000);
            }
        });
        
        // Card magnetic field visualization
        document.querySelectorAll('.interactive-project, .interactive-card, .contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const field = document.createElement('div');
                field.style.cssText = `
                    position: absolute;
                    top: -20px;
                    left: -20px;
                    right: -20px;
                    bottom: -20px;
                    border: 1px solid rgba(0, 255, 140, 0.2);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    animation: magneticField 2s ease-in-out infinite;
                `;
                card.appendChild(field);
                
                card.addEventListener('mouseleave', () => {
                    field.remove();
                }, { once: true });
            });
        });
        
    }, 3000); // Wait for loading screen
});

// Additional futuristic animations
const futuristicStyle = document.createElement('style');
futuristicStyle.textContent = `
    @keyframes scanLine {
        0% { transform: translateY(0); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(100px); opacity: 0; }
    }
    
    @keyframes matrixFall {
        0% { top: -20px; opacity: 1; }
        100% { top: 100vh; opacity: 0; }
    }
    
    @keyframes energyBurst {
        0% { transform: rotate(var(--angle)) translateX(0) scale(1); opacity: 1; }
        100% { transform: rotate(var(--angle)) translateX(50px) scale(0); opacity: 0; }
    }
    
    @keyframes dotFade {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
    
    @keyframes magneticField {
        0%, 100% { transform: scale(1); opacity: 0.2; }
        50% { transform: scale(1.1); opacity: 0.5; }
    }
`;
document.head.appendChild(futuristicStyle);
// CMatrix Background Effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        
        // Create CMatrix background
        const matrixBg = document.createElement('div');
        matrixBg.className = 'cmatrix-background';
        document.body.appendChild(matrixBg);
        
        const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        
        const createMatrixColumn = () => {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = Math.random() * window.innerWidth + 'px';
            column.style.animationDuration = (Math.random() * 3 + 2) + 's';
            column.style.opacity = Math.random() * 0.8 + 0.2;
            
            let text = '';
            const length = Math.random() * 20 + 10;
            for (let i = 0; i < length; i++) {
                text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '\n';
            }
            column.textContent = text;
            
            matrixBg.appendChild(column);
            
            setTimeout(() => {
                if (column.parentNode) {
                    column.remove();
                }
            }, 5000);
        };
        
        // Create matrix columns continuously
        setInterval(createMatrixColumn, 100);
        
        // Remove cursor followup effects
        const hoverGlow = document.querySelector('.hover-glow');
        if (hoverGlow) {
            hoverGlow.remove();
        }
        
        // Remove energy dots
        document.removeEventListener('mousemove', () => {});
        
    }, 3000);
});
// Professional interface - remove rain and cursor effects
document.addEventListener('DOMContentLoaded', () => {
    // Don't interfere with loading screen timing
    setTimeout(() => {
        
        // Stop all rain/matrix creation
        const matrixBg = document.querySelector('.cmatrix-background');
        if (matrixBg) {
            matrixBg.remove();
        }
        
        // Remove cursor dot
        const cursorDot = document.querySelector('.cursor-dot');
        if (cursorDot) {
            cursorDot.remove();
        }
        
        // Professional project interactions
        document.querySelectorAll('.project-card, .interactive-project').forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'translateY(-5px) scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px) scale(1)';
                }, 150);
            });
        });
        
        // Professional certification interactions
        document.querySelectorAll('.cert-card, .interactive-card').forEach(cert => {
            cert.addEventListener('click', () => {
                cert.style.transform = 'translateY(-5px) scale(0.98)';
                setTimeout(() => {
                    cert.style.transform = 'translateY(-5px) scale(1)';
                }, 150);
            });
        });
        
    }, 4000); // Wait after loading screen completes
});
// Binary Matrix and remove cursor shapes
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        
        // Remove cursor following shapes
        document.querySelectorAll('.floating-orb').forEach(el => el.remove());
        
        // Create binary matrix background
        const matrixBg = document.createElement('div');
        matrixBg.className = 'cmatrix-background';
        document.body.appendChild(matrixBg);
        
        const binaryChars = '01'; // Only 1s and 0s
        
        const createBinaryColumn = () => {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = Math.random() * window.innerWidth + 'px';
            column.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            let text = '';
            const length = Math.random() * 20 + 10;
            for (let i = 0; i < length; i++) {
                text += binaryChars[Math.floor(Math.random() * 2)] + '\n';
            }
            column.textContent = text;
            
            matrixBg.appendChild(column);
            
            setTimeout(() => {
                if (column.parentNode) {
                    column.remove();
                }
            }, 5000);
        };
        
        // Create binary matrix columns
        setInterval(createBinaryColumn, 150);
        
        // Remove any existing cursor trail elements
        const removeTrailShapes = () => {
            document.querySelectorAll('[style*="●"], [style*="◆"], [style*="▲"], [style*="★"], [style*="♦"]').forEach(el => {
                el.remove();
            });
        };
        
        setInterval(removeTrailShapes, 1000);
        
    }, 4000); // After loading screen
});
// Restore radar functionality
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        
        // Radar functionality
        const radar = document.getElementById('militaryRadar');
        const status = document.getElementById('radarStatus');
        const sweep = radar?.querySelector('.radar-sweep');
        const ripple = document.getElementById('radarRipple');
        
        if (radar && status && sweep && ripple) {
            let isDetecting = false;
            let rippleInterval = null;

            radar.addEventListener('mouseenter', () => {
                isDetecting = true;
                status.textContent = 'TARGET ACQUIRED';
                status.style.color = '#ff0000';
                sweep.classList.add('active');
                radar.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
                
                rippleInterval = setInterval(() => {
                    ripple.classList.remove('active');
                    setTimeout(() => {
                        ripple.classList.add('active');
                    }, 10);
                }, 800);
            });

            radar.addEventListener('mouseleave', () => {
                isDetecting = false;
                status.textContent = 'SCANNING';
                status.style.color = 'var(--primary-color)';
                sweep.classList.remove('active');
                radar.style.boxShadow = 'none';
                
                if (rippleInterval) {
                    clearInterval(rippleInterval);
                    rippleInterval = null;
                }
                ripple.classList.remove('active');
            });

            radar.addEventListener('mousemove', (e) => {
                if (!isDetecting) return;

                const rect = radar.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                const maxDistance = Math.min(centerX, centerY);
                const intensity = Math.max(0, 1 - (distance / maxDistance));

                if (intensity > 0.8) {
                    status.textContent = 'CRITICAL THREAT';
                    status.style.color = '#ff0000';
                } else if (intensity > 0.5) {
                    status.textContent = 'THREAT DETECTED';
                    status.style.color = '#ff8800';
                } else {
                    status.textContent = 'TARGET ACQUIRED';
                    status.style.color = '#ffff00';
                }
            });
        }
        
    }, 4000); // After loading screen
});
// Fix project links
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all project links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = link.getAttribute('href');
            if (url && url !== '#') {
                window.open(url, '_blank');
            }
        });
    });
});
