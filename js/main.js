//задать дительность анимации одного слайда: *секунд
var bgSlideDuration = 10;

//слайдер для фона
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

$(document).ready(function(){
    //да мой код говно, но он работает.
    
    //выезжает боковое меню при загрузке
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
        });
    
        //выезжает боковое меню по наведению
        $('.side-menu').mouseenter(function(){
            $('.side-menu, .side-menu-list li, .side-feedback').clearQueue().stop();
            $('.side-menu').animate({'width':'250px'},300);
            $('.side-menu-list li, .side-feedback').delay(200).animate({'opacity':'1'},200);
        });
    };
    
    function slideSearch(){
         $('.search-block').mouseenter(function(){
            $('.search-input input').clearQueue().stop();
             $('.search.dark-item').css({'color':'#000','background':'#fff'});
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
                $('.search.dark-item').css({'color':'#fff','background':'transparent'});
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

});