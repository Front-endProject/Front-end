var initialOffset = $("#profile-title").offset().top; 
var bgHeight;
var bgWrapHeight = $(".bgWrap").height();

var s = $(window).scrollTop();
var navbarHeight = $(".navbar-fixed").height();
var initialDiff =  initialOffset-s-navbarHeight;

$(".background-img img").load(function(e){
  //alert(this.height)
  bgHeight = this.height;
})

//console.log("initial diff is ", initialDiff);
var finalDiff = 0;
var imgInitialValue = 200;
var imgFinalValue = 100;
var finalPercentage = imgFinalValue/imgInitialValue;

var navbarHeight = $(".navbar-fixed").height();

function updateScroll(){
  var s = $(window).scrollTop();
  var d = (initialOffset-s-navbarHeight);

var imgPercentage = calculateY({x:initialDiff,y:1}, {x:0, y: finalPercentage}, d);
  
var bgPercentage = calculateY({x:initialDiff,y:0.15}, {x:0, y: 1}, d);
  
 $("#profile-title").css('transform', 'scale(' + imgPercentage  + ')'); 
  
  var bgRGB = calculateY({x:initialDiff,y:255}, {x:0, y: 255}, d);
  bgRGB = parseInt(bgRGB,10);
  var str = "rgba(" + bgRGB + "," + bgRGB + "," + bgRGB + "," + bgPercentage+ ")";
  $(".background-layer").css('background',str);
  
  if (!bgHeight) return;
  var imgPosY = calculateY({x:initialDiff,y:0}, {x:0, y: -bgHeight+bgWrapHeight}, d);
  
  //new version
    var speed = .5;


  imgPosY = - speed * $(window).scrollTop();
  
    var str2 = 'translate(0,'+imgPosY+'px)';
  
  //console.log(imgPosY)
  $(".background-img").css('transform',str2);



}

$(window).scroll(updateScroll);
updateScroll();


function calculateY(p1, p2, x){
  var a = (p1.y-p2.y)/(p1.x-p2.x), b = p1.y - a*p1.x, y = a*x + b;
  //console.log(y);
  var minY, maxY;
  if (p1.y > p2.y) {
    maxY = p1.y;
    minY = p2.y;
  }
  else {
    maxY = p2.y;
    minY = p1.y;
  }
  y = Math.min(Math.max(minY,y), maxY);
  //console.log("a:" , y)
  return y;
}