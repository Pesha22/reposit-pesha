$(document).ready(function () {
  var Th = $('#modalTh'),
      modalForm = $('.modal_form'),
      modalThanks = $('.modal_thanks'),
      modalBtn = $('[data-toggle=modal]'),
      closeBtnForm = $('.modalclose', modalForm),
      closeBtnThanks = $('.modalclose', modalThanks);
  
  modalBtn.on('click', function () { 
    modalForm.toggleClass('modal--visible');
  });
  closeBtnForm.on('click', function () { 
    modalForm.toggleClass('modal--visible');
  });
  closeBtnThanks.on('click', function () { 
    modalThanks.toggleClass('modal--visible');
  });

  var mySwiper = new Swiper ('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

    var next = $('.swiper-button-next');
    var prev = $('.swiper-button-prev');
    var bullets = $('.swiper-pagination');

    next.css('left', prev.width() + 10 + bullets.width() + 10)
    bullets.css('left', prev.width() + 10 )

    new WOW().init();

  // валидация формы
  $('.modal__form').validate({
    errorClass: "invalid",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },// правило-объект (блок)
      userPhone: "required",
      userEmail: {
        required: true,
        email: true
      }
    }, // сообщения 
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не менее двух букв",
        maxlength: "Имя не более 15 букв"
      },
      userPhone: "Заполните поле",
      userEmail: { 
        required: "Заполните поле",
        email: "Введите корректный email"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          console.log('сработал Ajax' + response);
          modalThanks.toggleClass('modal--visible');
          
          $(form)[0].reset();
          modalForm.removeClass('modal--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса ' + response);
        }
      });
    }
  });
// маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___ __-__"});

});

