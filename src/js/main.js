$(document).ready(function () {

    let pulseAnim, questionAnim, colorectal, risk, screening;
    $('#pagepiling').pagepiling({
        navigation: false,
        afterRender: function () {

            bodymovin.loadAnimation({
                container: document.getElementById('firstIllustration'),
                // path: '../json/colon.json'
                path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/colon.json'
            });

            bodymovin.loadAnimation({
                container: document.getElementById('scrollDown'),
                // path: '../json/scroll_icon_onblue.json'
                path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/scroll_icon_onblue.json'
            });

        },
        onLeave: function (index, nextIndex, direction) {
            // $('#bg').removeClass().addClass('bg_' + nextIndex);
            $('#pagepiling').removeClass().addClass('screen' + nextIndex);


            // if (nextIndex == 2) {
            //     $('.bg').addClass('bg_2')
            // } else if (index == 2) {
            //     $('.bg').removeClass('bg_2')
            // }
            // if (nextIndex == 3) {
            //     $('.bg').addClass('bg_3')
            // } else if (index == 3) {
            //     $('.bg').removeClass('bg_3')
            // }
            // if (nextIndex == 4) {
            //     $('.bg').addClass('bg_4')
            // }
            if (index == 2 && pulseAnim) {
                pulseAnim.stop()
            }
            if (nextIndex == 6) {
                if (!colorectal) {
                    colorectal = bodymovin.loadAnimation({
                        container: document.getElementById('colorectal'),
                        // path: '../json/crr.json'
                        path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/crr.json'
                    });
                }
                if (!risk) {
                    risk = bodymovin.loadAnimation({
                        container: document.getElementById('risk'),
                        // path: '../json/risk_factors.json'
                        path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/risk_factors.json'
                    });
                }
                if (!screening) {
                    screening = bodymovin.loadAnimation({
                        container: document.getElementById('screening'),
                        // path: '../json/screening.json'
                        path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/screening.json'
                    });
                }
            }
        },
        afterLoad: function (anchorLink, index) {
            // $('#pagepiling').removeClass().addClass('screen' + index)

            if (index == 2) {
                if (!pulseAnim) {
                    pulseAnim = bodymovin.loadAnimation({
                        container: document.getElementById('pulseAnim'),
                        // path: '../json/heartbeat.json'
                        path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/heartbeat.json'
                    });
                } else {
                    pulseAnim.play()
                }
            } else if (index == 3) {
                if (!questionAnim) {
                    questionAnim = bodymovin.loadAnimation({
                        container: document.getElementById('questionAnim'),
                        // path: '../json/questions.json'
                        path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/questions.json'
                    });
                }
            }
        }
    });

    $('.accordion__title').on('click', function (event) {
        $('.accordion__desc').slideUp();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $('.accordion__title.active').removeClass('active')
            $(this).addClass('active').next('.accordion__desc').slideDown();
        }
    })





});

