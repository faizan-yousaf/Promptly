// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

let observer;

// Initialize scroll animations when DOM is loaded
export function initScrollAnimations() {
  if (typeof window !== 'undefined' && !observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
  }
  if (observer) {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach(el => observer.observe(el));
  }
}


// Parallax effect for hero section
export function initParallaxEffect() {
  if (typeof window !== 'undefined') {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach(element => {
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }
}

// Smooth scroll for navigation links
export function initSmoothScroll() {
  if (typeof window !== 'undefined') {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Typing animation effect
export function initTypingAnimation() {
  if (typeof window !== 'undefined') {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #00BFFF';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          // Remove cursor after typing is complete
          setTimeout(() => {
            element.style.borderRight = 'none';
          }, 1000);
        }
      };
      
      // Start typing when element comes into view
      const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeWriter();
            typingObserver.unobserve(entry.target);
          }
        });
      });
      
      typingObserver.observe(element);
    });
  }
}

// Counter animation for statistics
export function initCounterAnimation() {
  if (typeof window !== 'undefined') {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          
          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };
          
          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
  }
}

// Floating particles background effect
export function initFloatingParticles() {
  if (typeof window !== 'undefined') {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${this.opacity})`;
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}

