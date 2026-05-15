const productWindow = document.querySelector('.product-window');

function scrollNext() {
    productWindow.scrollBy({ left: 310, behavior: 'smooth' });
}

function scrollPrev() {
    productWindow.scrollBy({ left: -310, behavior: 'smooth' });
}

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        }
    });
}

history.scrollRestoration = "manual";

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// ปิด menu เมื่อกดลิงก์
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});

// Nav indicator (desktop only)
const navContainer = document.querySelector('.nav');
const indicator = document.querySelector('.nav-indicator');
const items = document.querySelectorAll('.nav-menu a');

function handleIndicator(el) {
    if (!indicator || window.innerWidth <= 768) return;

    indicator.style.display = 'block';

    indicator.style.width = `${el.offsetWidth}px`;
    indicator.style.left = `${el.offsetLeft}px`;

    const navTop = el.offsetTop;
    const navHeight = el.offsetHeight;
    const indicatorHeight = indicator.offsetHeight;
    indicator.style.top = `${navTop + (navHeight / 2) - (indicatorHeight / 2)}px`;
}

items.forEach((item) => {
    item.addEventListener('mouseenter', (e) => {
        handleIndicator(e.target);
    });

    item.addEventListener('click', (e) => {
        items.forEach(i => i.classList.remove('is-active'));
        e.target.classList.add('is-active');
        handleIndicator(e.target);
    });
});

navContainer.addEventListener('mouseleave', () => {
    const activeItem = document.querySelector('.nav-menu a.is-active');
    if (activeItem) {
        handleIndicator(activeItem);
    } else {
        if (indicator) indicator.style.display = 'none';
    }
});