$(document).ready(function () {


    $('#pagepiling').pagepiling({
        navigation: false,
        afterRender: function () {
            console.log('pagepilingis ready')
            $.fn.pagepiling.setAllowScrolling(false);
        },
        onLeave: function (index, nextIndex, direction) {
            let activeScreen = $('#message');
            let hasClassStart = activeScreen.hasClass('message_start')
            let hasClassEnd = activeScreen.hasClass('message_end')

            if (index == 1 && direction == 'down' && !hasClassStart && !hasClassEnd) {
                //прокрутка с 1го к 2му слайду
                $.fn.pagepiling.setAllowScrolling(false);
                document.getElementById('scrollDown').style.visibility = 'hidden';

                document.querySelector('.message__composition').style.visibility = 'visible';

                $('.message__anim')[0].beginElement();
                activeScreen.addClass('message_start')
                setTimeout(() => {
                    bodymovin.loadAnimation({
                        container: document.getElementById('polyp1'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: '../json/polyp.json'
                        // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/polyp.json'
                    })
                }, 1000)

                setTimeout(() => {
                    $.fn.pagepiling.setAllowScrolling(true);
                    document.getElementById('scrollDown').style.visibility = 'visible'
                }, 10000)
            } else if (index == 2 && direction == 'down' && hasClassStart) {
                if (!hasClassEnd) {
                    //прокрутка со 2го на 3й слайд
                    $.fn.pagepiling.moveTo(2);
                    $.fn.pagepiling.setAllowScrolling(false);
                    document.getElementById('scrollDown').style.visibility = 'hidden'
                    activeScreen.addClass('message_end')

                    setTimeout(() => {

                        bodymovin.loadAnimation({
                            container: document.getElementById('polyp2'),
                            renderer: 'svg',
                            loop: false,
                            autoplay: true,
                            path: '../json/polyp_mutation.json'
                            // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/polyp_mutation.json'
                        });
                        document.getElementById('polyp1').style.dispaly = 'none'
                    }, 4200)

                    //6s to text translate animation + 1.5s to polyp + 1.5s to composition translate left + 1.5s to fade in text
                    setTimeout(() => {
                        $.fn.pagepiling.moveTo(3);
                    }, 8800);
                    setTimeout(() => {
                        $('#message').addClass('message__static')
                        $.fn.pagepiling.setAllowScrolling(true);
                        document.getElementById('scrollDown').style.visibility = 'visible'
                    }, 12000);
                } else {
                    //прокрутка с 3-го на 4й слайд
                    activeScreen.removeClass('message_start')
                }
            } else if (index == 3 && direction == 'up') {
                activeScreen.removeClass('message_end');
                activeScreen.addClass('message_start')
                if ($('#polyp2 svg').length == 1) {
                    $('#polyp2 svg').remove()
                }

            } else if (index == 3 && direction == 'down') {
                $('.header').hide()
                document.getElementById('scrollDown').style.visibility = 'hidden'

            } else if (index == 4 && direction == 'up') {
                document.getElementById('scrollDown').style.visibility = 'visible'
            }
        },
        afterLoad: function (anchorLink, index) {
            let active2 = $('#message').hasClass('active')
            if (index == 1) {
                setTimeout(() => {
                    $.fn.pagepiling.setAllowScrolling(true);
                    document.getElementById('scrollDown').style.visibility = 'visible'
                }, 3000)

            }
            if (index == 4 && !active2) {
                if ($('#polyp2 svg').length == 1) {
                    $('#polyp2 svg').remove()
                }

                $('.last').on("scroll", () => {
                    circleAnimate()
                });

                function circleAnimate() {
                    let scrollHeight = $(".last__container_jsWatch").innerHeight();
                    let sectionTop = $(".last__container_jsWatch").offset().top;
                    let angle = -(sectionTop / scrollHeight * 460);
                    if (angle <= 0) {
                        angle = 0;
                    } else if (angle > 360) {
                        angle = 360;
                    }
                    $(".last__circle").css({ 'transform': `rotate(${angle}deg)` });
                }
            } else {
                $('.header').show()
            }
        }
    });

    setTimeout(() => {
        $.fn.pagepiling.setAllowScrolling(true);
        let scrollDown = bodymovin.loadAnimation({
            container: document.getElementById('scrollDown'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '../json/scroll_icon_onblue.json'
            // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/scroll_icon_onblue.json'
        }).setSpeed(2);

    }, 2000)



    /*************HEADER**************** */
    //HEader menu animation
    $('.panel__btn').mouseenter(function () {
        let $animElem = $(this).find('.anim_elem');
        $animElem.removeClass('anim_return')
            .addClass('anim_active');
        return;
    }).mouseleave(function () {
        let $animElem = $(this).find('.anim_elem');
        var transformValue = $animElem.css('webkitTransform') ||
            $animElem.css('transform');
        $animElem.css({
            'webkitTransform': transformValue,
            'transform': transformValue
        })
            .removeClass('anim_active');
        requestAnimationFrame(function () {
            $animElem.addClass('anim_return')
                .css({
                    'webkitTransform': 'none',
                    'transform': 'none'
                });
        });
    });

    /*************END HEADER************** */


    $("#scrollDown").on('click', () => {
        $.fn.pagepiling.moveSectionDown();

    })





});

$('.panel__btn_menu').on('click', function () {
    $('#headerNav').addClass('nav_open')
    $('.nav__overlay').addClass('nav__overlay_active')
    $('.nav__close').on('click', function () {
        $('#headerNav').removeClass('nav_open')
        $('.nav__overlay').removeClass('nav__overlay_active')
    })
})
$('.nav__overlay').on('click', function () {
    $('#headerNav').removeClass('nav_open')
    $('.nav__overlay').removeClass('nav__overlay_active')
})

$("#scrollDown").on('click', () => {
    $.fn.pagepiling.moveSectionDown();

})

let overlay = document.getElementById('navOverlay')
overlay.addEventListener('wheel', function (event) {
    event.stopPropagation();
    return false
})
let nav = document.getElementById('headerNav')
nav.addEventListener('wheel', function (event) {
    event.stopPropagation();
    return false
})