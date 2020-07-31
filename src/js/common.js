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
                $.fn.fullpage.silentMoveTo('eating',2);
                return false;
            }
        }
    });
});

