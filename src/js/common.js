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


$("#scrollDown").on('click', () => {
    $.fn.pagepiling.moveSectionDown();

})