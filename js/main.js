//задать дительность анимации одного слайда: *секунд
var bgSlideDuration = 10;

// Инициализация слайдера в фоне
var Bg = function(){
    $('.bg-slider').slick({
      infinite: true,
      speed: 1,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover:false,
      autoplaySpeed: bgSlideDuration *1000
    }); 
}
Bg();

// Карта  --------------------------------
var myCenter=new google.maps.LatLng(50.271951, 28.648168);

function initialize()
{
var mapProp = {
  center:myCenter,
  /*scrollwheel: false,*/
  zoom:17,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };

var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

var marker=new google.maps.Marker({
  position:myCenter,
  icon:'marker.png'
  });

marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

//--------------------------------

// ОСТАНОВИТЬ ИТЕРАЦИИ СЛАЙДЕРА КОГДА ВКЛАДКА НЕ АКТИВНА -----------------------------/
// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    $(".bg-slider").slick('slickPause');
  } else {
    $(".bg-slider").slick('slickNext');
    $(".bg-slider").slick('slickPlay');
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || 
  typeof document[hidden] === "undefined") {
  alert("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }
//------------------------------------------------------------------------------------/





$(document).ready(function(){
    //да мой код говно, но он работает.
    
    // Галерея *Наши работы*
    var $grid1 = $('.work-gal').masonry({
      itemSelector: '.gal-item',
      fitWidth: true,
      gutter:10,
      columnWidth: 350
    });
    $grid1.imagesLoaded().progress( function() {
        $grid1.masonry('layout');
    });
    
    // Галерея новостей
    var $grid2 = $('.news-wrapper').masonry({
      itemSelector: '.news-item',
      gutter:50,
      percentPosition: true
    });
    $grid2.imagesLoaded().progress( function() {
      $grid2.masonry('layout');
    });
    
    // Тень для лого
    setTimeout(function(){
        $('.logo-shadow').css({'opacity':'1'});
    }, 2000);
    
    //выезжает боковое меню при загрузке //СДЕЛАТЬ ТАК ЧТОБ СРАБАТЫВАЛО ТОЛЬКО НА index.html
    setTimeout(function(){
        $('.side-menu').animate({left:'0px'},500,sideNavSlideToggle)
    }, 1000);
    
    // Поиск
    slideSearch();
   
    
    function sideNavSlideToggle (){
        //прячет боковое меню когда не ховер
        $('.side-menu').mouseleave(function(){
            $('.side-menu, .side-menu-list li, .side-feedback').clearQueue().stop();
            $('.side-menu-list li, .side-feedback').animate({'opacity':'0'},200);
            $('.side-menu').animate({'width':'80px'},400); 
            $('.side-menu-burger div').css({ 
                'transform': 'rotateY(0deg)',
                'background-image':'url(img/side-menu-burger.png)',
                'background-size':'42px 28px'
                });
            $('.side-menu-burger span').css({'transform': 'rotateY(0deg)'});
            $('.side-menu-burger span').text('меню');
            
        });
    
        //выезжает боковое меню по наведению
        $('.side-menu').mouseenter(function(){
            $('.side-menu, .side-menu-list li, .side-feedback').clearQueue().stop();
            $('.side-menu').animate({'width':'250px'},300);
            $('.side-menu-burger div').css({ 
                'transform': 'rotateY(360deg)',
                'background-image':'url(img/logo.png)',
                'background-size':'49px 40px'
                });
            $('.side-menu-burger span').css({'transform': 'rotateY(360deg)'});
            $('.side-menu-burger span').text('главная');
            $('.side-menu-list li, .side-feedback').delay(200).animate({'opacity':'1'},200);
        });
    };
    
    function slideSearch(){
         $('.search-block').mouseenter(function(){
            $('.search-input input').clearQueue().stop();
            $('.search.dark-item i').css({'color':'#000','background':'#fff'});
            $('.search-input input').animate({
                'width':'226px',
                'padding':'10px 50px 10px 15px',
                'opacity':'1'
            },300, slidebackSearch);
        });
    }
        
    function slidebackSearch(){
        $('.search-block').mouseleave(function(){
            if ($('.search-input input').is(':focus')) {
                return false;
            } else {
                $('.search-input input').clearQueue().stop();
                $('.search.dark-item i').css({'color':'#fff','background':'transparent'});
                $('.search-input input').animate({
                    'width':'0px',
                    'padding':'10px 0 10px 0',
                    'opacity':'0'
                },300);    
            }
        });
    }
    
   //----------------------------------------------------------------- 
    //считает высоту окна 
    var resizeCalc = function () {
		var wh = $(window).height();
		var ww = $(window).width();
        
        //задает эту высоту фону
		$('.bg-slider .slick-slide').css({'width': ww, 'height': wh});
        
        //задает эту высоту боковому меню
        $('.side-menu').css({'height': wh});
        
        $('#wrapper').simplebar({ autoHide: false });

        //задает фоновое изображение слайда и добавляет указанную в первой строке длительность анимации
		$('.bg-slider .slick-slide').each(function (i) {
			var el = $(this);
			el.css({
                'background-image' : 'url(' + el.data('src') + ')',
                'animation-duration' : bgSlideDuration +  's'
            });
		});
    }
    // Пересчитать высоту окна при загрузке
    resizeCalc();
    
    //Пересчитать высоту окна при ресайзе
    $(window).on("resize", resizeCalc);
    
    $('.clients-wrap').slick({
      infinite: true,
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnHover:false,
      prevArrow: '<i class="fa fa-angle-left"></i>',
      nextArrow: '<i class="fa fa-angle-right"></i>'
    }); 
    
    $('.work-gal').magnificPopup({
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'image',
        gallery:{enabled:true},
        titleSrc: 'title'
      // other options
    });
    
    $('.toggle-trigger').click(function(){
       $(this).siblings('.toggle-content').slideToggle(); 
       $(this).find($('i')).toggleClass('i-rotate');
       $('.simplebar-scroll-content').scrollTo($(this),500);
    });

});

