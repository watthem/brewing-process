(function() {

    jQuery.fn.showHoverText = function() {
        var text;
        text = this.find('.text-container').animate({
            opacity: 1
        }, 500);
        return text;
    };
    jQuery.fn.focusClosestStep = function() {
        var step;
        step = this.closest('.brewing-step').animate({
            opacity: 1
        }, 500);
        return step;
    };
    $('.vector-container').hover(function() {
        $(this).focusClosestStep().showHoverText();
        $(this).find('.dynamic').animate({
            opacity: 1
        }, 500);
    });

    $('.bam').hover(function() {
       
        $(this).addClass('after');
    });
}.call(this));