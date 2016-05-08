(function() {
    var Line, borderWidth, connect, windowHeight, windowWidth;
    var currentLine = 1;
    connect = function(element) {
        var $stepLine, line, stepLine;
        if (element.hasClass('connected')){
            return;
        }
        if (!element.is(':first-child') && !element.prev().hasClass('connected')) {
            return;
        }
        line = new Line(element, element.next());
     
        

        stepLine = '<div  class="animated-line-container" id="line_' + line.id + '"/>';

      
        //   stepLine = '<div class="animated-line-container" id="' + line.id + '" style=\'display: none; position: absolute; transform: rotate( ' + line.angle + 'deg); height: 0px; left: ' + line.left + 'px; top:' + line.top + 'px; width: 0px; right: ' + line.right + 'px; animation-direction: ' + line.direction + '\'/>';
        $stepLine = $(stepLine);
        $('#svg_canvas').append($stepLine);
        $stepLine.fadeIn(20000);
        element.addClass('connected');
    
    };
    Line = function(activeElement, nextElement) {
        var activeCenter, activeLeft, activeTop, activeHeight, activeWidth, nextCenter, nextLeft, nextTop, tmpRight, tmpTop, topDifference;
        this.id = activeElement.attr('id');
       
        if(nextElement.length < 1){
            nextElement = activeElement;
        }
        
        activeLeft = activeElement.offset().left;
        activeWidth = activeElement.width();
        activeHeight = activeElement.height();
        activeTop = activeElement.offset().top;
        nextTop = nextElement.offset().top;
        nextLeft = nextElement.offset().left;
        activeCenter = activeLeft + activeWidth / 2;
        nextCenter = nextLeft - activeLeft;
        topDifference = activeTop - nextTop;
        tmpRight = 0;
        if (activeTop < nextTop) {
            tmpTop = activeTop - topDifference;
            this.direction = 'reverse';
            this.angle = 180;
        } else {
            tmpTop = activeTop - topDifference;
            this.direction = 'forwards';
        }
        if (activeCenter > windowWidth * 0.8 && activeTop < windowHeight * 0.5) {
            nextCenter = windowWidth - activeCenter - borderWidth * 4;
            topDifference = nextTop - activeTop;
        }
        if (activeLeft > nextLeft && activeTop > activeHeight) {
            nextCenter = activeLeft - nextLeft;
            activeCenter = nextLeft + nextElement.width() / 2;
        }
        if (activeTop > windowHeight * 0.75) {
            tmpTop = activeTop -= topDifference + borderWidth * 2;
            nextCenter = activeLeft - nextLeft - borderWidth * 2;
            tmpRight = windowWidth - activeCenter - nextCenter - borderWidth * 2;
            activeCenter = null;
        }
        if (topDifference < 0) {
            topDifference = Math.abs(topDifference);
        }
        if (nextCenter < 5) {
            tmpTop = activeTop - topDifference;
            nextCenter = null;
            tmpRight = windowWidth - activeTop
        }
       
        this.top = tmpTop;
        this.right = tmpRight;
        this.left = activeCenter;
        this.width = nextCenter;
        this.height = topDifference;
    };
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
    borderWidth = 8;
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    $('.brewing-step').hover(function() {
        connect($(this));
    });
    $(window).resize(function() {
        $('.brewing-step').removeClass('connected');
        $('.animated-line-container').remove();
    });
}.call(this));