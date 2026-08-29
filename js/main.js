(function ($) {
    "use strict";

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    // The navbar stays put; scrolling only gives it a shadow so it separates
    // from the content behind it.
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm');
        } else {
            $('.sticky-top').removeClass('shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        if (reduceMotion) {
            window.scrollTo(0, 0);
        } else {
            $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        }
        return false;
    });


    // Header carousel
    var $carousel = $(".header-carousel");

    if ($carousel.length > 0) {
        $carousel.owlCarousel({
            autoplay: !reduceMotion,
            autoplayHoverPause: true,
            smartSpeed: 1000,
            items: 1,
            dots: true,
            loop: true,
            nav: true,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ]
        });

        // Visible pause / play control. Movement that starts on its own needs
        // a way to stop it.
        var playing = !reduceMotion;

        var $toggle = $('<button>', {
            'type': 'button',
            'class': 'carousel-toggle',
            'aria-label': playing ? 'Pause the slideshow' : 'Play the slideshow'
        }).html('<i class="bi ' + (playing ? 'bi-pause-fill' : 'bi-play-fill') + '"></i>');

        $toggle.on('click', function () {
            playing = !playing;
            $carousel.trigger(playing ? 'play.owl.autoplay' : 'stop.owl.autoplay', [5000]);
            $toggle
                .attr('aria-label', playing ? 'Pause the slideshow' : 'Play the slideshow')
                .html('<i class="bi ' + (playing ? 'bi-pause-fill' : 'bi-play-fill') + '"></i>');
        });

        $carousel.parent().append($toggle);
    }

})(jQuery);
