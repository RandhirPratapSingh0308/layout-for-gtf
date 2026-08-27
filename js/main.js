$(document).ready(function() {
    
    // Initialize AOS Animation Library
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-in-out'
    });

    // Initialize Hero Background Slider
    const heroSwiper = new Swiper('.hero-bg-slider', {
        effect: 'fade',
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
        allowTouchMove: false
    });

    // Initialize Swiper Gallery
    const swiper = new Swiper('.gallery-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '#gallery .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        }
    });

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.premium-nav').addClass('scrolled');
        } else {
            $('.premium-nav').removeClass('scrolled');
        }
    });

    // Initial check for navbar if page is already scrolled on load
    if ($(window).scrollTop() > 50) {
        $('.premium-nav').addClass('scrolled');
    }

    // Smooth scrolling for navigation links
    $('a.nav-link[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70 // Adjust offset for fixed navbar
            }, 800);
            
            // Close mobile menu if open
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-toggler').click();
            }
        }
    });

    // Form submission handlers (prevent default for demo)
    $('#heroForm, .footer-form, #enquireModal form').on('submit', function(e) {
        e.preventDefault();
        
        // Change button text to indicate action
        var $btn = $(this).find('button[type="submit"]');
        var originalText = $btn.text();
        
        $btn.html('<i class="fa-solid fa-spinner fa-spin"></i> Submitting...');
        $btn.prop('disabled', true);
        
        // Simulate API call
        setTimeout(function() {
            $btn.html('<i class="fa-solid fa-check"></i> Success!');
            $btn.removeClass('btn-gold btn-dark-green').addClass('btn-success');
            
            setTimeout(function() {
                $btn.html(originalText);
                $btn.removeClass('btn-success').addClass(originalText === 'Enquire Now' ? 'btn-gold' : 'btn-dark-green');
                $btn.prop('disabled', false);
                
                // Clear form
                e.target.reset();
                
                // Close modal if it's the modal form
                if ($(e.target).parents('.modal').length) {
                    $('#enquireModal').modal('hide');
                }
            }, 2000);
        }, 1500);
    });
});
