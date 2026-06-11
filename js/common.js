$(function () {
  var $header = $('.header');
  var headerHeight = $header.outerHeight();

  /* Header fixed on scroll */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 0 && $header.hasClass('default')) {
      $header.removeClass('default').addClass('fixed');
    } else if ($(this).scrollTop() <= 0 && $header.hasClass('fixed')) {
      $header.removeClass('fixed').addClass('default');
    }
  });

  /* Кнопка «Меню» — мобильная навигация */
  $(document).on('click', '.btn-header-menu', function () {
    if ($('.menu-mobile').is(':hidden')) {
      $('.menu-mobile').slideDown(200);
      $('.btn-header-menu').addClass('active').attr('aria-expanded', 'true');
      $('body').addClass('body--menu');
      $('.menu-overlay').fadeIn(200);
    } else {
      closeMobileMenu();
    }
  });

  $(document).on('click', '.menu-overlay, .menu-mobile__close', function () {
    closeMobileMenu();
  });

  $(document).on('click', '.menu-mobile a', function () {
    closeMobileMenu();
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $('body').hasClass('body--menu')) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    $('.menu-mobile').slideUp(200);
    $('.btn-header-menu').removeClass('active').attr('aria-expanded', 'false');
    $('body').removeClass('body--menu');
    $('.menu-overlay').fadeOut(200);
  }

  /* Кнопка «Наверх» */
  var $scrollTopBtn = $(
    '<button type="button" class="btn-scroll-top" aria-label="Наверх" title="Наверх">' +
    '<i class="fal fa-chevron-up" aria-hidden="true"></i></button>'
  ).appendTo('body');

  function toggleScrollTopBtn() {
    $scrollTopBtn.toggleClass('is-visible', $(window).scrollTop() > 400);
  }

  $(window).on('scroll', toggleScrollTopBtn);
  toggleScrollTopBtn();

  $scrollTopBtn.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 400);
  });

  /* Hero slider */
  var $heroSlider = $('.hero-slider');
  if ($heroSlider.length) {
    var $slides = $heroSlider.find('.hero-slide');
    var $dots = $heroSlider.find('.hero-dot');
    var autoplayDelay = Number($heroSlider.data('autoplay')) || 5000;
    var currentSlide = 0;
    var autoplayTimer = null;

    function goToSlide(index) {
      currentSlide = (index + $slides.length) % $slides.length;
      $slides.removeClass('is-active');
      $slides.eq(currentSlide).addClass('is-active');
      $dots.removeClass('is-active');
      $dots.eq(currentSlide).addClass('is-active');
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(function () {
        goToSlide(currentSlide + 1);
      }, autoplayDelay);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    $(document).on('click', '.hero-dot', function () {
      goToSlide($(this).index());
      startAutoplay();
    });

    $heroSlider.on('mouseenter focusin', stopAutoplay);
    $heroSlider.on('mouseleave focusout', startAutoplay);

    goToSlide(0);
    startAutoplay();
  }

  /* Segments slider (slick) */
  if ($('.segments-slider__track').length && typeof $.fn.slick === 'function') {
    $('.segments-slider__track').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      dots: true,
      appendDots: $('.segments-slider__dots'),
      prevArrow: $('.segments-slider__prev'),
      nextArrow: $('.segments-slider__next'),
      touchThreshold: 1000
    });
  }

  /* Partners slider (slick) */
  if ($('.partners-slider__track').length && typeof $.fn.slick === 'function') {
    $('.partners-slider__track').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      arrows: true,
      prevArrow: $('.partners-slider__prev'),
      nextArrow: $('.partners-slider__next'),
      touchThreshold: 1000,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 576,
          settings: { slidesToShow: 1 }
        }
      ]
    });
  }

  /* FAQ accordion */
  $(document).on('click', '.item-question__trigger', function () {
    var $item = $(this).closest('.item-question');
    var isOpen = $item.hasClass('is-open');

    $('.item-question').removeClass('is-open');
    $('.item-question__trigger').attr('aria-expanded', 'false');

    if (!isOpen) {
      $item.addClass('is-open');
      $(this).attr('aria-expanded', 'true');
    }
  });

  /* Phone mask */
  if (typeof $.fn.mask === 'function') {
    $('.input-phone').mask('+7 (999) 999-99-99');
  }

  function getAnchorOffset() {
    var gap = 16;
    if ($header.hasClass('fixed')) {
      return $header.outerHeight() + gap;
    }
    return $header.find('.header__wrapper').outerHeight() + 30 + gap;
  }

  /* Smooth anchor scroll with header offset */
  $(document).on('click', 'a[href^="#"]', function (e) {
    var target = $(this).attr('href');
    if (!target || target === '#' || target.length < 2) return;
    if ($(this).hasClass('fancybox')) return;

    var $el = $(target);
    if (!$el.length) return;

    e.preventDefault();
    $('html, body').animate({
      scrollTop: $el.offset().top - getAnchorOffset()
    }, 500);
  });

  /* Form submit preventDefault */
  $(document).on('submit', 'form', function (e) {
    e.preventDefault();
  });

  /* Recalc header spacer (reserved for Bitrix fixed header mode) */
  function updateHeaderSpacer() {
    if ($('.header-spacer').css('display') !== 'none') {
      $('.header-spacer').height($header.outerHeight());
    }
  }

  updateHeaderSpacer();
  $(window).on('resize', updateHeaderSpacer);

  /* Catalog category filter */
  $(document).on('click', '.catalog-filter__btn', function () {
    var filter = $(this).data('filter');
    var $buttons = $('.catalog-filter__btn');
    var $items = $('.catalog-grid [data-category]');

    $buttons.removeClass('is-active').attr('aria-selected', 'false');
    $(this).addClass('is-active').attr('aria-selected', 'true');

    if (filter === 'all') {
      $items.removeClass('is-hidden');
      return;
    }

    $items.each(function () {
      var match = $(this).data('category') === filter;
      $(this).toggleClass('is-hidden', !match);
    });
  });
});
