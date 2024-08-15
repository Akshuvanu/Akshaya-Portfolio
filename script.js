document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                animateSection(entry.target.id);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Function to animate sections based on their ID
    function animateSection(sectionId) {
        switch(sectionId) {
            case 'home':
                gsap.from('#home h1, #home h2, #home h3', {
                    opacity: 0,
                    y: 50,
                    stagger: 0.2,
                    duration: 1
                });
                break;
            case 'about':
                gsap.from('#about .about-image', {
                    opacity: 0,
                    x: -100,
                    duration: 1
                });
                gsap.from('#about .about-text', {
                    opacity: 0,
                    x: 100,
                    duration: 1
                });
                break;
            case 'education':
                gsap.from('.education-item', {
                    opacity: 0,
                    y: 50,
                    stagger: 0.2,
                    duration: 0.8
                });
                break;
            case 'experiences':
                gsap.from('.experience-item', {
                    opacity: 0,
                    scale: 0.8,
                    stagger: 0.2,
                    duration: 0.8
                });
                break;
            case 'skills':
                gsap.from('.skill-item', {
                    opacity: 0,
                    y: 20,
                    stagger: 0.1,
                    duration: 0.5
                });
                break;
            case 'projects':
                gsap.from('.project-item', {
                    opacity: 0,
                    y: 50,
                    stagger: 0.2,
                    duration: 0.8
                });
                break;
            case 'contact':
                gsap.from('.contact-item', {
                    opacity: 0,
                    x: -50,
                    stagger: 0.2,
                    duration: 0.8
                });
                gsap.from('.contact-form', {
                    opacity: 0,
                    y: 50,
                    duration: 1
                });
                break;
        }
    }

    // Responsive navigation menu
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.className = 'menu-toggle';
    document.querySelector('nav').appendChild(menuToggle);

    menuToggle.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });

    // Window resize event for responsiveness
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelector('nav ul').classList.remove('show');
        }
    });
    // EmailJS initialization
    emailjs.init("email_hBIh8G1QSI5XS64zuXZ7zfcK"); // Replace with your EmailJS user ID

    // Form submission handling
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('service_uza8zsd', 'template_6st46uh', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Thank you for your message. I will get back to you soon!');
                form.reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Oops! There was a problem submitting your form. Please try again.');
            });
    });
});
