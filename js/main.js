var bgSlideDuration = 10;

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


    
    var resizeCalc = function () {
		var wh = $(window).height();
		var ww = $(window).width();
		$('.bg-slider .slick-slide').css({'width': ww, 'height': wh});
        $('.side-menu').css({'height': wh});



		$('.bg-slider .slick-slide').each(function (i) {
			var el = $(this),
                delay = i * bgSlideDuration;
			el.css({
                'background-image' : 'url(' + el.data('src') + ')',
                'animation-duration' : bgSlideDuration +  's'
            });
		});
    }
    resizeCalc();
    $(window).on("resize", resizeCalc);

});