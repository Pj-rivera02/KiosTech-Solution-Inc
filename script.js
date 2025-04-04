// More robust element selectors
const subscribeForm = document.querySelector('.container > div:first-child form') || 
                     document.querySelector('form');
const subscribeInput = document.querySelector('input[type="email"]');
const subscribeBtn = document.querySelector('.container button.bg-black');

// Initialize when DOM is ready
function init() {
    console.log('Initializing website functionality');
    
    // Email subscription
    if (subscribeForm && subscribeInput && subscribeBtn) {
        subscribeForm.onsubmit = function(e) {
            e.preventDefault();
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(subscribeInput.value)) {
                alert('Thank you for subscribing!');
                subscribeInput.value = '';
            } else {
                alert('Please enter a valid email');
            }
        };
    }

    // Navigation buttons
    document.querySelectorAll('.text-center button').forEach(btn => {
        btn.onclick = function() {
            const section = this.closest('.text-center');
            section.scrollIntoView({behavior: 'smooth'});
        };
    });

    // Product card hover effects
    document.querySelectorAll('.flex.flex-wrap div').forEach(card => {
        card.onmouseenter = () => card.style.transform = 'scale(1.05)';
        card.onmouseleave = () => card.style.transform = 'scale(1)';
    });
}

// Start when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
