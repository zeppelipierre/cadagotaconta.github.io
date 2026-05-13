document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DARK MODE LOGIC ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'true');
            themeToggleBtn.innerHTML = '☀️';
        } else {
            localStorage.setItem('darkMode', 'false');
            themeToggleBtn.innerHTML = '🌙';
        }
    });

    // --- 2. HEADER SCROLL EFFECT ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });

    // --- 3. PROFESSIONAL CAROUSEL LOGIC ---
    const track = document.getElementById('carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const dotsNav = document.getElementById('carousel-nav');
    const dots = Array.from(dotsNav.children);

    // Arranges slides next to each other dynamically
    const slideWidth = slides[0].getBoundingClientRect().width;
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    }

    // Next Button logic
    nextBtn.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;

        // Loop back to start
        if(!nextSlide) {
            nextSlide = slides[0];
            nextDot = dots[0];
        }

        moveToSlide(track, currentSlide, nextSlide);
        updateDots(currentDot, nextDot);
    })

    // Prev Button logic
    prevBtn.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        let prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        let prevDot = currentDot.previousElementSibling;

        // Loop to end
        if(!prevSlide) {
            prevSlide = slides[slides.length - 1];
            prevDot = dots[dots.length - 1];
        }

        moveToSlide(track, currentSlide, prevSlide);
        updateDots(currentDot, prevDot);
    })

    // Dots navigation logic
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(track, currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    })

    // Auto-play (optional, professional touch)
    setInterval(() => {
        nextBtn.click();
    }, 8000); // Mudar slide a cada 8 segundos


    // --- 4. FORM SUBMISSION SIMULATION ---
    const form = document.getElementById('form-ideias');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            mensagemSucesso.style.display = 'block';
            mensagemSucesso.innerHTML = `Obrigado, ${nome.split(' ')[0]}! Sua dica foi registrada.`;
            form.reset();
            setTimeout(() => { mensagemSucesso.style.display = 'none'; }, 4000);
        });
    }
});