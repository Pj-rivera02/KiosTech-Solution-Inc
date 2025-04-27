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
            
            console.log('Form submitted with email:', email);
            
            // Add loading state
            subscribeText.textContent = 'Sending...';
            subscribeSpinner.classList.remove('hidden');
            subscribeBtn.disabled = true;
            
            if (emailRegex.test(email)) {
                console.log('Email format valid, preparing to send');
                
                // Create FormData
                const formData = new FormData();
                formData.append('email', email);
                
                console.log('Sending request to subscribe.php');
                
                // Send to PHP with explicit error handling
                fetch('subscribe.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    console.log('Response status:', response.status);
                    return response.text();
                })
                .then(data => {
                    console.log('Server response:', data);
                    showModal(data === "Subscription successful" ? 'Thank you for subscribing!' : data, 
                              data === "Subscription successful" || data === "You're already subscribed!");
                    emailInput.value = '';
                    subscribeText.textContent = 'Subscribe';
                    subscribeSpinner.classList.add('hidden');
                    subscribeBtn.disabled = false;
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    showModal('An error occurred. Please try again later.', false);
                    subscribeText.textContent = 'Subscribe';
                    subscribeSpinner.classList.add('hidden');
                    subscribeBtn.disabled = false;
                });
            } else {
                console.log('Email validation failed');
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
                firstName: document.getElementById('first_name').value.trim(),
                lastName: document.getElementById('last_name').value.trim(),
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
        
            // Create FormData object for sending to PHP
            const phpFormData = new FormData();
            phpFormData.append('first_name', formData.firstName);
            phpFormData.append('last_name', formData.lastName);
            phpFormData.append('email', formData.email);
            phpFormData.append('phone', formData.phone);
            phpFormData.append('message', formData.message);
        
            // Send data to PHP script
            fetch('submit.php', {
                method: 'POST',
                body: phpFormData
            })
            .then(response => response.text())
            .then(data => {
                console.log('Server response:', data);
                showModal('Thank you for your inquiry! We will contact you shortly.', true);
                this.reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                showModal('An error occurred. Please try again later.', false);
            });
        
            console.log('Inquiry submitted:', formData);
        });
    }
}

// Start when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Navigation Icon Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing navigation');
    
    try {
        // Toggle nav menu
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!navToggle || !navMenu) {
            console.error('Navigation elements not found');
            return;
        }

        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Toggle clicked');
            navMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && e.target !== navToggle) {
                navMenu.classList.add('hidden');
            }
        });

        // Smooth scrolling for nav items
        document.querySelectorAll('.nav-menu a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Nav item clicked:', this.textContent);
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    navMenu.classList.add('hidden');
                } else {
                    console.error('Target element not found:', targetId);
                }
            });
        });

        console.log('Navigation setup complete');
    } catch (error) {
        console.error('Navigation setup error:', error);
    }
});