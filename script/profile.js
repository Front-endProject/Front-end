(function() { //create closure to avoid polluting the global namespace

    var profileTitle = "#profile-title",
        bgWrap = ".bgWrap",
        navbarFixed = ".navbar-fixed",
        bgImgImg = ".background-img img",
        bgImg = ".background-img",
        bgLayer = ".background-layer"; //these will change with each developers program


    var initialOffset = $(profileTitle).offset().top;
    var bgHeight;
    var bgWrapHeight = $().height();

    var scrollTop = $(window).scrollTop();
    var navbarHeight = $(navbarFixed).height();
    var initialDiff = initialOffset - scrollTop- navbarHeight;

    $(bgImgImg).load(function(e) {
        bgHeight = this.height;
    })

    var finalDiff = 0;
    var imgInitialValue = 200;
    var imgFinalValue = 100;
    var finalPercentage = imgFinalValue / imgInitialValue;

    var navbarHeight = $(navbarFixed).height();

    function updateScroll() {
        var scrollTop= $(window).scrollTop();
        var d = (initialOffset - scrollTop- navbarHeight);

        var imgPercentage = calculateY({
            x: initialDiff,
            y: 1
        }, {
            x: 0,
            y: finalPercentage
        }, d);

        var bgPercentage = calculateY({
            x: initialDiff,
            y: 0.15
        }, {
            x: 0,
            y: 1
        }, d);

        $(profileTitle).css('transform', 'scale(' + imgPercentage + ')');

        var bgRGB = calculateY({
            x: initialDiff,
            y: 255
        }, {
            x: 0,
            y: 255
        }, d);
        bgRGB = parseInt(bgRGB, 10);
        var str = "rgba(" + bgRGB + "," + bgRGB + "," + bgRGB + "," + bgPercentage + ")";
        $(bgLayer).css('background', str);

        if(!bgHeight) return;
        var imgPosY = calculateY({
            x: initialDiff,
            y: 0
        }, {
            x: 0,
            y: -bgHeight + bgWrapHeight
        }, d);

        //new version
        var speed = .5;


        imgPosY = -speed * $(window).scrollTop();

        var str2 = 'translate(0,' + imgPosY + 'px)';

        $(bgImg).css('transform', str2);



    }

    $(window).scroll(updateScroll);
    updateScroll();


    function calculateY(p1, p2, x) {
        var a = (p1.y - p2.y) / (p1.x - p2.x),
            b = p1.y - a * p1.x,
            y = a * x + b;
        //console.log(y);
        var minY, maxY;
        if(p1.y > p2.y) {
            maxY = p1.y;
            minY = p2.y;
        } else {
            maxY = p2.y;
            minY = p1.y;
        }
        y = Math.min(Math.max(minY, y), maxY);
        //console.log("a:" , y)
        return y;
    }

    return {
        parallax: function(){},
        scale: function(){},
        fade: function(){}
    }

})()