// Show modal with message
function showModal(message, isSuccess) {
    const modalContent = document.getElementById('modalContent');
    if (modalContent) {
        modalContent.innerHTML = `
            <div class="flex flex-col items-center justify-center">
                <div class="text-${isSuccess ? 'green' : 'red'}-500 text-4xl mb-4">
                    <i class="fas fa-${isSuccess ? 'check-circle' : 'exclamation-circle'}"></i>
                </div>
                <p class="text-lg text-center">${message}</p>
            </div>
        `;
    }
    const subscribeModal = document.getElementById('subscribeModal');
    if (subscribeModal) {
        subscribeModal.classList.remove('hidden');
    }
}

// Initialize when DOM is ready
function init() {
    console.log('Initializing website functionality');
    
    // Subscription form handling
    const subscribeForm = document.getElementById('subscribeForm');
    const emailInput = document.getElementById('emailInput');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const subscribeText = document.getElementById('subscribeText');
    const subscribeSpinner = document.getElementById('subscribeSpinner');
    const closeModal = document.getElementById('closeModal');

    if (subscribeForm && emailInput && subscribeBtn) {
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                const subscribeModal = document.getElementById('subscribeModal');
                if (subscribeModal) {
                    subscribeModal.classList.add('hidden');
                }
            });
        }

        // Handle form submission
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Add loading state
            subscribeText.textContent = 'Sending...';
            subscribeSpinner.classList.remove('hidden');
            subscribeBtn.disabled = true;
            
            if (emailRegex.test(email)) {
                // Simulate API call
                setTimeout(() => {
                    showModal('Thank you for subscribing!', true);
                    emailInput.value = '';
                    subscribeText.textContent = 'Subscribe';
                    subscribeSpinner.classList.add('hidden');
                    subscribeBtn.disabled = false;
                }, 1500);
            } else {
                showModal('Please enter a valid email address', false);
                subscribeText.textContent = 'Subscribe';
                subscribeSpinner.classList.add('hidden');
                subscribeBtn.disabled = false;
            }
        });
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

    // Client Inquiry Form Handling
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
                showModal('Please fill in all required fields', false);
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showModal('Please enter a valid email address', false);
                return;
            }

            // Simulate form submission
            console.log('Inquiry submitted:', formData);
            showModal('Thank you for your inquiry! We will contact you shortly.', true);
            this.reset();
        });
    }
}

// Start when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}