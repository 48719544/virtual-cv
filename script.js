// --- DARK / LIGHT THEME CONTROLLER ---
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Apply stored theme setting on startup
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
} else {
    // Standard initialization is Dark Mode
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

// Click event for swapping values
themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});


// --- INTERACTIVE & AUTOPLAY SLIDESHOW CAROUSEL ---
let slideIndex = 1;
let timer = null;

showSlides(slideIndex);
resetTimer(); // Start autoplay immediately on page load

// Manual slider direction controls (+1 or -1)
function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer(); // Reset the autoplay timer when user manually interacts
}

// Indicator bullet slide controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    resetTimer(); // Reset the autoplay timer when user manually interacts
}

// Core rendering carousel function
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    // Loop back to start if max value exceeded
    if (n > slides.length) { slideIndex = 1; }
    // Jump to last page if negative value reached
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all other elements
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Remove selected theme style from indicator circles
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Display the active slide and style the corresponding indicator bullet
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";  
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

// Autoplay Timer Logic (Transitions every 4 seconds)
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 4000); // 4000ms = 4 seconds. Adjust this number to speed it up or slow it down.
}
