document.addEventListener('DOMContentLoaded', () => {
    //  Time Display
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        function updateTime() {
            const now = new Date();
            // Display time in a more readable format, e.g., 10:30:55 AM UTC
            const utcTime = now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            timeElement.textContent = `Current Time (UTC): ${utcTime}`;
        }
        updateTime();
        setInterval(updateTime, 1000); // Update every second
    }

    // Page Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pageViews = document.querySelectorAll('.page-view');

    function showPage(pageId) {
        // Hide all pages
        pageViews.forEach(page => {
            page.classList.remove('active');
        });

        // Show the target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default jump-to-anchor behavior
            const pageId = link.getAttribute('href').substring(1);

            // Update active link style
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Show the correct page
            showPage(pageId);

            // Update URL hash for better history and bookmarking
            window.location.hash = pageId;
        });
    });

    // Handle initial page load based on URL hash (e.g., if someone visits yoursite.com/#about)
    const initialPage = window.location.hash.substring(1) || 'home';
    const initialLink = document.querySelector(`.nav-link[href="#${initialPage}"]`);
    if (initialLink) {
        navLinks.forEach(nav => nav.classList.remove('active'));
        initialLink.classList.add('active');
        showPage(initialPage);
    }


    const form = document.getElementById('contactForm');
    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const isValid = validateForm();

            if (isValid) {
                console.log('Form submitted successfully!');
                console.log({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value,
                });

                successMessage.classList.add('visible');
                form.style.display = 'none';
            }
        });

        function validateForm() {
            let isValid = true;
            resetError(nameInput);
            resetError(emailInput);
            resetError(messageInput);

            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your full name.');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter a message.');
                isValid = false;
            }

            return isValid;
        }

        function showError(input, message) {
            
            
            const errorDiv = document.getElementById(`${input.id}Error`);
            input.classList.add('error');
            if (errorDiv) {
                errorDiv.textContent = message;
                errorDiv.classList.add('visible');
            }
        }

        function resetError(input) {
            const errorDiv = document.getElementById(`${input.id}Error`);
            input.classList.remove('error');
            if (errorDiv) {
                errorDiv.classList.remove('visible');
            }
        }
    }
});
