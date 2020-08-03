$(document).ready(function () {
    var slideIndex2 = 0,
        slideIndex3 = 0,
        sliding = false,
        isInheritanceSectionDisplayed = true;

    $('#fullpage').fullpage({
        anchors: ['main', 'steps', 'eating', 'inheritance'],
        css3: true,
        slidesNavigation: true,
        slidesNavPosition: 'top',
        scrollOverflow: true,
        scrollOverflowOptions: {

        },
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            if (index == 2) {
                slideIndex2 = slideIndex + 1;
            } else if (index == 3) {
                slideIndex3 = slideIndex + 1;
                isInheritanceSectionDisplayed = false;
            }
        },
        onLeave: function (index, nextIndex, direction) {
            // Slides
            if (index == 2) {
                if (direction == 'down' && slideIndex2 < 4) {
                    $.fn.fullpage.moveSlideRight();
                    return false;
                } else if (direction == 'up' && slideIndex2 > 1) {
                    $.fn.fullpage.moveSlideLeft();
                    return false;
                } else if (direction == 'up' && slideIndex2 < 4) {
                    $('.fp-slidesNav').removeClass('fp-slidesNav_active');
                }
            } else if (index == 3) {

                if (direction == 'down' && slideIndex3 < 3) {
                    $.fn.fullpage.moveSlideRight();
                    return false;
                } else if (direction == 'up' && slideIndex3 > 1) {
                    $.fn.fullpage.moveSlideLeft();
                    return false;
                }
            } else if (index == 1) {
                $('.fp-slidesNav').addClass('fp-slidesNav_active')
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
                let angle = -(sectionTop / scrollHeight * 360);
                //console.log(sectionTop);
                if(angle < -360){
                    angle = -360;
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
});