$(document).ready(function () {


    $('#pagepiling').pagepiling({
        onLeave: function (index, nextIndex, direction) {
            let activeScreen = $('#message');
            let hasClassStart = activeScreen.hasClass('message_start')
            let hasClassEnd = activeScreen.hasClass('message_end')

            if (index == 1 && direction == 'down' && !hasClassStart && !hasClassEnd) {

                $.fn.pagepiling.setAllowScrolling(false);
                document.getElementById('scrollDown').style.visibility = 'hidden';

                document.querySelector('.message__composition').style.visibility = 'visible';
                activeScreen.addClass('message_start')
                $('.message__anim')[0].beginElement();

                setTimeout(() => {
                    bodymovin.loadAnimation({
                        container: document.getElementById('polyp1'),
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        path: '../json/polyp.json'
                    })
                }, 1000)

                setTimeout(() => {
                    $.fn.pagepiling.setAllowScrolling(true);
                    document.getElementById('scrollDown').style.visibility = 'visible'
                }, 10000)
            } else if (index == 2 && direction == 'down' && hasClassStart) {
                if (!hasClassEnd) {
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
                        });
                        document.getElementById('polyp1').style.dispaly = 'none'
                    }, 4200)

                    //6s to text translate animation + 1.5s to polyp + 1.5s to composition translate left + 1.5s to fade in text
                    console.log('end')
                    setTimeout(() => {
                        // polyp2.destroy();
                        $('.message__content').hide()
                        $('.message__composition').hide()
                        $.fn.pagepiling.setAllowScrolling(true);
                        document.getElementById('scrollDown').style.visibility = 'visible'
                    }, 13000);
                } else {
                    activeScreen.removeClass('message_start')
                    $('.header').hide()
                    document.getElementById('scrollDown').style.visibility = 'hidden'
                }
            } else if (index == 2 && direction == 'down' && !hasClassStart) {
                $('.header').hide()
                document.getElementById('scrollDown').style.visibility = 'hidden'

            } else if (index == 3 && direction == 'up') {
                document.getElementById('scrollDown').style.visibility = 'visible'
            }
        },
        afterLoad: function (anchorLink, index) {
            let active2 = $('#message').hasClass('active')

            if (index == 1) {
                document.getElementById('scrollDown').style.visibility = 'visible'
            }
            if (index == 3 && !active2) {
                if ($('#polyp1 svg').length == 1) {
                    console.log($('#polyp1 svg'))
                    $('#polyp1 svg').remove()
                }
                if ($('#polyp2 svg').length == 1) {
                    console.log($('#polyp1 svg'))
                    $('#polyp2 svg').remove()
                }
                // $('.header').hide()
                // document.getElementById('scrollDown').style.visibility = 'hidden'

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

