$(document).ready(function () {
    var slideIndexS = 0,
        sliding = false;
    $('#fullpage').fullpage({
        anchors: ['main', 'steps', 'eating', 'training', 'smoking', 'inheritance', 'footer'],
        css3: true,
        slidesNavigation: true,
        slidesNavPosition: 'top',
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
            slideIndexS = slideIndex + 1;
        },
        onLeave: function (index, nextIndex, direction) {
            if (index == 2 && !sliding) {
                if (direction == 'down' && slideIndexS < 4) {
                    $.fn.fullpage.moveSlideRight();
                    return false;
                } else if (direction == 'up' && slideIndexS > 1) {
                    $.fn.fullpage.moveSlideLeft();
                    return false;
                }
            } else if (sliding) {
                return false;
            }
        }
    });
});