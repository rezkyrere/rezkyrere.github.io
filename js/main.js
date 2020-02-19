(function ($) {
    "use strict";

    function portfolio_init() {
        var portfolio_grid = $('#portfolio_grid'),
            portfolio_filter = $('#portfolio_filters');
        if (portfolio_grid) {
            portfolio_grid.shuffle({
                speed: 450,
                itemSelector: 'figure'
            });
            $('.site-main-menu').on("click", "a", function (e) {
                portfolio_grid.shuffle('update');
            });
            portfolio_filter.on("click", ".filter", function (e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('#portfolio_filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
            });
        }
    }
    $(function () {
        $('#contact-form').validator();
        $('#contact-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var formData = {
                    aid: firebase.database().ref().child('myportofolio/contact-form').push().key,
                    fullname: document.getElementById('form_name').value,
                    email: document.getElementById('form_email').value,
                    message: document.getElementById('form_message').value
                };
                $.ajax({
                    type: "POST",
                    url: 'https://github-io-6d2fd.firebaseio.com/myportofolio/contact-form/.json',
                    data: JSON.stringify(formData),
                    success: function (data) {
                        if (data) {
                            swal({
                                title: "Success!",
                                text: "Message has been sent guys..",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#e65959",
                                confirmButtonText: "OK",
                                closeOnConfirm: true,
                                closeOnCancel: false
                            });
                            $('#contact-form')[0].reset();
                        }
                    },
                    error: function (jqXHR, errorThrown) {
                        swal({
                            title: "Failed!",
                            text: "Send message failed guys!!! " + 'Status code: ' + jqXHR.status + ' ' + errorThrown,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#e65959",
                            confirmButtonText: "OK",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        });
                    }
                });
                return false;
            }
        });
    });
    $(function () {
        $('#testimonial-form').validator();
        $('#testimonial-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var formData = {
                    aid: firebase.database().ref().child('myportofolio/testimonial-form').push().key,
                    fullname: document.getElementById('test_name').value,
                    email: document.getElementById('test_email').value,
                    company: document.getElementById('test_company').value,
                    testimonial: document.getElementById('test_testimonial').value,
                    status: 0
                };
                $.ajax({
                    type: "POST",
                    url: 'https://github-io-6d2fd.firebaseio.com/myportofolio/testimonial-form/.json',
                    data: JSON.stringify(formData),
                    success: function (data) {
                        if (data) {
                            swal({
                                title: "Success!",
                                text: "Testimonial is added to database guys..",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#e65959",
                                confirmButtonText: "OK",
                                closeOnConfirm: true,
                                closeOnCancel: false
                            });
                            $('#testimonial-form')[0].reset();
                        }
                    },
                    error: function (jqXHR, errorThrown) {
                        swal({
                            title: "Failed!",
                            text: "Send testimonial failed guys!!! " + 'Status code: ' + jqXHR.status + ' ' + errorThrown,
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#e65959",
                            confirmButtonText: "OK",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        });
                    }
                });
                return false;
            }
        });
    });
    $.fn.extend({
        rotaterator: function (options) {
            var defaults = {
                fadeSpeed: 500,
                pauseSpeed: 100,
                child: null
            };
            var options = $.extend(defaults, options);
            return this.each(function () {
                var o = options;
                var obj = $(this);
                var items = $(obj.children(), obj);
                items.each(function () {
                    $(this).hide();
                });
                if (!o.child) {
                    var next = $(obj).children(':first');
                } else {
                    var next = o.child;
                }
                $(next).fadeIn(o.fadeSpeed, function () {
                    $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function () {
                        var next = $(this).next();
                        if (next.length === 0) {
                            next = $(obj).children(':first');
                        }
                        $(obj).rotaterator({
                            child: next,
                            fadeSpeed: o.fadeSpeed,
                            pauseSpeed: o.pauseSpeed
                        });
                    });
                });
            });
        }
    });

    function mobileMenuHide() {
        var windowWidth = $(window).width();
        if (windowWidth < 1024) {
            $('#site_header').addClass('mobile-menu-hide');
        }
    }
    $(window).on('load', function () {
        $(".preloader").fadeOut("slow");
    });
    $(document).ready(function () {
        var $portfolio_container = $("#portfolio_grid");
        $portfolio_container.imagesLoaded(function () {
            setTimeout(function () {
                portfolio_init(this);
            }, 500);
        });
        $(' #portfolio_grid > figure > a ').each(function () {
            $(this).hoverdir();
        });
        $('.menu-toggle').click(function () {
            $('#site_header').toggleClass('mobile-menu-hide');
        });
        var $testimonials = $(".testimonials.owl-carousel").owlCarousel({
            nav: true,
            items: 1,
            loop: true,
            navText: false,
            margin: 10,
        });
        $('.site-main-menu').on("click", "a", function (e) {
            $testimonials.trigger('refresh.owl.carousel');
        });
        $('#rotate').rotaterator({
            fadeSpeed: 800,
            pauseSpeed: 1900
        });
        setTimeout(function () {
            var $container = $(".blog-masonry");
            $container.masonry();
        }, 500);
        $('.site-main-menu').on("click", "a", function (e) {
            var $container = $(".blog-masonry");
            $container.masonry();
        });
        $('.lightbox').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            image: {
                titleSrc: 'title'
            },
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src',
            },
            callbacks: {
                markupParse: function (template, values, item) {
                    values.title = item.el.attr('title');
                }
            },
        });
    });
    $(window).on('resize', function () {
        mobileMenuHide();
    });
    $('.site-main-menu').on("click", "a", function (e) {
        mobileMenuHide();
    });
})(jQuery);