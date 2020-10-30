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