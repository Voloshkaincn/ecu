$(document).ready(function () {

    let screenWidth = $(window).width()
    let screenHeight = $(window).height()
    let landscape = !!(screenWidth > screenHeight)
    let firstIllustration, pulseAnim, questionAnim, colorectal, risk, screening
    // console.log(screenWidth, screenHeight, landscape)
    let page;
    function pagePilingInit() {
        // let pulseAnim, questionAnim, colorectal, risk, screening
        $('#pagepiling').pagepiling({
            navigation: false,
            afterRender: function () {
                if (!firstIllustration) {
                    firstIllustration = bodymovin.loadAnimation({
                        container: document.getElementById('firstIllustration'),
                        path: '../json/colon.json'
                        // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/colon.json'
                    });
                    bodymovin.loadAnimation({
                        container: document.getElementById('scrollDown'),
                        path: '../json/scroll_icon_onblue.json'
                        // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/scroll_icon_onblue.json'
                    }).setSpeed(2);
                }
            },
            onLeave: function (index, nextIndex, direction) {
                $('#pagepiling').removeClass().addClass('screen' + nextIndex);
                if (index == 2 && pulseAnim) {
                    pulseAnim.stop()
                }
                if (nextIndex == 6) {
                    console.log(colorectal)
                    if (!colorectal) {
                        colorectal = bodymovin.loadAnimation({
                            container: document.getElementById('colorectal'),
                            path: '../json/crr.json'
                            // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/crr.json'
                        });
                    }
                    if (!risk) {
                        risk = bodymovin.loadAnimation({
                            container: document.getElementById('risk'),
                            path: '../json/risk_factors.json'
                            // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/risk_factors.json'
                        });
                    }
                    if (!screening) {
                        screening = bodymovin.loadAnimation({
                            container: document.getElementById('screening'),
                            path: '../json/screening.json'
                            // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/screening.json'
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
                            path: '../json/heartbeat.json'
                            // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/heartbeat.json'
                        });
                    } else {
                        pulseAnim.play()
                    }
                } else if (index == 3) {
                    if (!questionAnim) {
                        questionAnim = bodymovin.loadAnimation({
                            container: document.getElementById('questionAnim'),
                            path: '../json/questions.json'
                            // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/questions.json'
                        });
                    }
                }
            }
        });
        return true;
    }

    if (screenWidth > 768 && screenHeight > 460 && landscape) {
        $('body').addClass('pp_init')
        page = pagePilingInit()
    } else {
        $('body').removeClass('pp_init')
        if (!firstIllustration) {
            firstIllustration = bodymovin.loadAnimation({
                container: document.getElementById('firstIllustration'),
                path: '../json/colon.json'
                // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/colon.json'
            });
            bodymovin.loadAnimation({
                container: document.getElementById('scrollDown'),
                path: '../json/scroll_icon_onblue.json'
                // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/scroll_icon_onblue.json'
            }).setSpeed(2);
        }
        if (!colorectal) {
            colorectal = bodymovin.loadAnimation({
                container: document.getElementById('colorectal'),
                path: '../json/crr.json'
                // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/crr.json'
            });
        }
        if (!risk) {
            risk = bodymovin.loadAnimation({
                container: document.getElementById('risk'),
                path: '../json/risk_factors.json'
                // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/risk_factors.json'
            });
        }
        if (!screening) {
            screening = bodymovin.loadAnimation({
                container: document.getElementById('screening'),
                path: '../json/screening.json'
                // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/screening.json'
            });
        }
        if (!pulseAnim) {
            pulseAnim = bodymovin.loadAnimation({
                container: document.getElementById('pulseAnim'),
                path: '../json/heartbeat.json'
                // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/heartbeat.json'
            });
        }
        if (!questionAnim) {
            questionAnim = bodymovin.loadAnimation({
                container: document.getElementById('questionAnim'),
                path: '../json/questions.json'
                // path: 'http://1047754.ufexpo.web.hosting-test.net/EuropaColon/json/questions.json'
            });
        }
    }
    $(window).resize(function () {
        screenWidth = $(window).width()
        screenHeight = $(window).height()
        landscape = !!(screenWidth > screenHeight)
        if (screenWidth < 768 || screenHeight < 460 || !landscape) {
            console.log(page)
            if (page) {
                $('body').removeClass('pp_init')
                $('#pagepiling').pagepiling.destroy('all');
            }
        } else {
            $('body').addClass('pp_init')
            page = pagePilingInit()
        }
    })



    //====== accordion ===========
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

