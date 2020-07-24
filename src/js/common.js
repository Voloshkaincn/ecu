$(document).ready(function () {
    var slideIndex2 = 0,
        slideIndex3 = 0,
        sliding = false;
    $('#fullpage').fullpage({
        anchors: ['main', 'steps', 'eating', 'inheritance', 'footer'],
        css3: true,
        slidesNavigation: true,
        slidesNavPosition: 'top',
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            if (index == 2) {
                slideIndex2 = slideIndex + 1;
            } else if (index == 3) {
                slideIndex3 = slideIndex + 1;
            }
        },
        onLeave: function (index, nextIndex, direction) {
            console.log("index " + index)
            console.log("slideIndex2 " + slideIndex2)
            console.log("slideIndex3 " + slideIndex3)
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
        }
    });
});