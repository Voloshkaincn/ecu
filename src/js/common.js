$(document).ready(function () {
    var slideIndex2 = 0,
        slideIndex3 = 0,
        sliding = false,
        isInheritanceSectionDisplayed = true,
        stepsActiveSlide = false;

    $('#fullpage').fullpage({
        anchors: ['main', 'steps', 'eating', 'inheritance'],
        css3: true,
        slidesNavigation: true,
        slidesNavPosition: 'top',
        scrollOverflow: true,
        scrollingSpeed: 500,
        scrollOverflowOptions: {
            bounce: false,
        },
        afterLoad: function (origin, index) {
            stepsActiveSlide = $('.steps__slide.active').data('anchor');
        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            if (index == 2) {
                slideIndex2 = slideIndex;
            } else if (index == 3) {
                slideIndex3 = slideIndex;
                isInheritanceSectionDisplayed = false;
            }
        },
        onLeave: function (index, nextIndex, direction) {
            // Slides
            // console.log(index, slideIndex2, slideIndex3);
            if ((index == 1)) {
                $('.fp-slidesNav').addClass('fp-slidesNav_active')
            } else if (index == 2) {
                if (direction == 'down' && slideIndex2 < 5) {
                    $.fn.fullpage.moveSlideRight();
                    return false;
                } else if (direction == 'up' && slideIndex2 > 0) {
                    $.fn.fullpage.moveSlideLeft();
                    return false;
                } else if ((direction == 'up' && slideIndex2 == 0) || (direction == 'down' && slideIndex2 == 5)) {
                    $('.fp-slidesNav').removeClass('fp-slidesNav_active fp-slidesNav_active_reverse');

                }
            } else if (index == 3) {
                if (direction == 'up' && slideIndex3 == 0) {
                    $('.fp-slidesNav').addClass('fp-slidesNav_active fp-slidesNav_active_reverse')
                    if (stepsActiveSlide == 'steps__slide1') {
                        stepsActiveSlide = false
                        $.fn.fullpage.moveTo(2, 5);
                        return false;
                    }
                    // $.fn.fullpage.moveSlideRight();
                } else if (direction == 'down' && slideIndex3 < 2) {
                    $.fn.fullpage.moveSlideRight();
                    return false;
                } else if (direction == 'up' && slideIndex3 > 0) {
                    $.fn.fullpage.moveSlideLeft();
                    return false;
                }
            }


            //Inheritance animation
            if (index == 3 && direction == 'down' && !isInheritanceSectionDisplayed) {
                $.fn.fullpage.setAllowScrolling(false);
                $('.inheritance').addClass('inheritance_transition')
                    .one('animationend', () => {
                        $('.inheritance').removeClass('inheritance_transition');
                        isInheritanceSectionDisplayed = true;
                        $.fn.fullpage.silentMoveTo('inheritance');
                        $.fn.fullpage.setAllowScrolling(true);
                    });
                return false;
            } else if (index == 4 && direction == 'up' && isInheritanceSectionDisplayed) {
                $.fn.fullpage.setAllowScrolling(false);
                $('.inheritance').addClass('inheritance_transition-reverse')
                    .one('animationend', () => {
                        $('.inheritance').removeClass('inheritance_transition-reverse');
                        $.fn.fullpage.setAllowScrolling(true);
                    });
                isInheritanceSectionDisplayed = false;
                $.fn.fullpage.silentMoveTo('eating', 2);
                return false;
            }
        },
        afterRender: function () {
            let iScroll = $('section.section.inheritance').find('.fp-scrollable').data('iscrollInstance');

            iScroll.prevScrollFunc = iScroll.scrollTo;
            iScroll.scrollTo = function (x, y, time, easing) {
                isScrolling = true;
                window.requestAnimationFrame(step);
                iScroll.prevScrollFunc(x, y, 500, IScroll.utils.ease.circular);
            };

            let isScrolling = false;
            iScroll.on("scrollStart", () => {
                isScrolling = true;
                window.requestAnimationFrame(step);
            });
            iScroll.on("scrollEnd", () => {
                isScrolling = false;
            });

            function step() {
                let { top: sectionTop } = $(".inheritance-wrapper").get(0).getBoundingClientRect();
                let scrollHeight = $(".footer").innerHeight();
                let angle = -(sectionTop / scrollHeight * 460);
                //console.log(sectionTop);
                if (angle < -360) {
                    angle = -360;
                }
                if (angle > 360) {
                    angle = 360;
                }
                $(".inheritance__circle").css({ 'transform': `rotate(${angle}deg)` });
                if (isScrolling) {
                    window.requestAnimationFrame(step);
                }
            }

            //SECOND SOLUTION


            // let scroll = 0;
            // let angle = 0;

            // $(".inheritance").bind("mousewheel", function (e) {
            // if (e.originalEvent.wheelDelta / 120 > 0) {
            //   scroll -= 120;
            //   angle = 360 / 100*scroll/$(".footer").height() * 100;
            //   console.log(angle);
            //   if(angle <= 0){
            //       angle = 0;
            //   }
            //   $(".inheritance__circle").css({'transform' : 'rotate('+ angle +'deg)'});

            // } else {
            //   scroll += 120;
            //   angle = 360 / 100*scroll / $(".footer").height() * 100;
            //   if(angle >= 360){
            //       angle = 360;
            //   }
            //   $(".inheritance__circle").css({'transform' : 'rotate('+ angle +'deg)'});
            // }
            // });
        },
    });

    //console.log( "offset",$('#smoking-circle').offset().top);




    // let y = document.getElementsByClassName("inheritance_transition")[0].animate([
    //     // keyframes
    //     { 'transform': 'translateY(0px)' }, 
    //     { 'transform': 'translateY(-300px)' }
    //   ], { 
    //     // timing options
    //     duration: 1000,
    //     iterations: Infinity
    //   });

    // console.log(y);
    //console.log( "position",$('#smoking-circle').position().left);




    /* Circule move by mouse moving*/

    var banner = $(".eating .slide");
    var imgs = $(".halfimage .white-circle, .halfimage__circle");
    console.log($(".halfimage .white-circle, .halfimage__circle"))
    function moving(object) {
        banner.on('mousemove', function (event) {
            let screenWidth = $(window).width();
            let screenHeight = $(window).height();
            let Y = Math.floor((event.pageY + screenWidth * 0.24 - screenHeight / 2) / 2.5) + "px";
            // let X = Math.floor((event.pageX - 300) / 35) + "deg";
            let deg = Math.floor((event.pageY - screenHeight / 2) / screenHeight * -180) + "deg";
            // let X = Math.abs(Math.floor((event.pageY - screenHeight / 2) / (screenHeight / screenWidth))) + "px";
            console.log(event.pageY - screenHeight / 2, screenHeight / screenWidth, event.pageY - screenHeight / 2) / (screenHeight / screenWidth)
            object.css({
                'top': Y, 'transform': 'rotate(' + deg + ')'
            });
        });
    }
    moving(imgs);
});

/* **** paralax effect on top bg **** */
var parallaxIt = function (e, target, parent, movement) {
    var relX = e.pageX - offset(parent).left
    var relY = e.pageY - offset(parent).top
    var x = (relX - parent.offsetWidth / 2) / parent.offsetWidth * movement
    var y = (relY - parent.offsetHeight / 2) / parent.offsetHeight * movement / 2

    target.style.setProperty('--parallax-x', x + "px");
    target.style.setProperty('--parallax-y', y + "px");
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

document.querySelector(".main").addEventListener("mousemove", function (e) {
    parallaxIt(e, document.querySelector("#svgAnimJs"), this, 150)
})