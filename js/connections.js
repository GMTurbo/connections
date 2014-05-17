
var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var rint = 40;
var stars;
var delay = true;
var counter = 0;

var MAX_DISTANCE = 75;
var SPEED = 1;
var DENSITY = .15;

setInterval(function () {
  ++counter;
  if (counter > 0) {
  	delay = false;
  }
}, 1000);

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
                              
var pxs = [];

$(document).ready(function(){

  bang(); // creating life

  $( window ).resize(function() {
    WIDTH = $('#area').width();
    $(canvas).attr('width', WIDTH).attr('height',WIDTH);
    stars = WIDTH * DENSITY;
  });


});

function bang() {
  WIDTH = $('#area').width();
  HEIGHT = $('#area').height();
  
  canvas = document.getElementById('space');
  $(canvas).attr('width', WIDTH).attr('height',HEIGHT);
  
  con = canvas.getContext('2d');
  stars = WIDTH * DENSITY;
  for(var i = 0; i < stars; i++) {
    pxs[i] = new Body();
  }
  draw();
}

function draw() {
  con.clearRect(0,0,WIDTH,HEIGHT);
  for(var i = 0; i < pxs.length; i++) {
    pxs[i].move();
    pxs[i].draw();
    for(var j = 0 ; j < pxs.length; j++){
      if(j===i) continue;
      var dis = getDistance(pxs[i], pxs[j]);
      if(dis <= MAX_DISTANCE)
        connect(pxs[i], pxs[j], dis/MAX_DISTANCE);
    }
  }
  window.requestAnimationFrame(draw);
}

function Body() {
  var x, y, r, dx, dy, dr, opacity;
  
  this.createBug = function(){
    
  	x = (WIDTH*Math.random());
  	y = (HEIGHT*Math.random());
  	r = getRandomIn(3, 5);
  	planet = false;
  	dx = (Math.random() > 0.5 ? -1 : 1) * Math.random() * SPEED;
  	dy = (Math.random() > 0.5 ? -1 : 1) * Math.random() * SPEED;
  	dr = 0;
  	opacity = 1;
  };
  
  this.reset = function() {
      this.createBug();
  };
  
  this.draw = function() {
    
    con.beginPath();
     
    con.fillStyle = 'rgba(226,225,142,'+opacity+')';
    con.shadowColor   = 'rgba(226,225,142,1)';
    con.arc(x - r, y - r, r, 0, 2 * Math.PI, false);
    
    con.closePath();
    con.shadowOffsetX = 0;
    con.shadowOffsetY = 0;
    con.shadowBlur    = 10;
    con.fill();
    
  };
  
  this.move = function() {
    x += dx;
    y += dy;
    r += dr;
    if(r <= 0 || r > 30)
      opacity-=0.025;
    if(x > WIDTH || x < 0 || opacity <= 0 || r <= 0)
      this.reset();
    if(y > HEIGHT || y < 0)
      this.reset();
  };
  
  this.getX = function() { return x; }
  this.getY = function() { return y; }
  this.getR = function() { return r; }
  
  this.reset();
};

var getRandomIn = function(bottom, top){
  return bottom + (Math.random())*(top - bottom);
};

var getDistance = function(current, other){
  return Math.sqrt(
    Math.pow(other.getX() - current.getX(), 2) +
    Math.pow(other.getY() - current.getY(), 2)
    );
};

var connect = function(bug1, bug2, opacity){
  
  con.beginPath();
  
  con.lineWidth = 0.5;
  con.strokeStyle = 'rgba(0,255,255' + opacity + ')';
  //con.shadowColor   = 'rgba(226,225,142,1)';
  con.moveTo(bug1.getX() - bug1.getR(), bug1.getY() - bug1.getR());
  con.lineTo(bug2.getX() - bug2.getR(), bug2.getY() - bug2.getR());
  con.stroke();
  
  con.closePath();
};