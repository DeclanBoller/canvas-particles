let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Rectangles
//c.fillRect(x, y, width, height);

//c.fillStyle = "rgba(0, 235, 255, 0.37)";
//  c.fillRect(100, 100, 100, 100);
//  c.fillRect(300, 250, 100, 100);
//
//c.fillStyle = "rgba(186, 0, 255, 0.58)";
//  c.fillRect(500, 400, 100, 100);
//  c.fillRect(700, 550, 100, 100);
//
//// Line 
//
//c.strokeStyle = "#0021d6";
//c.beginPath();
//
////  c.moveTo(x, y);
//c.moveTo(50, 300);
//  c.lineTo(300, 400);
//  c.lineTo(400, 400);
//  c.stroke();

// Arc
//c.arc(x: Int, y: Int, r: Int, startAngle: Float, endAngle: Float, drawCounterClockwise: Bool (false));

//for (let i=0; i < 40; i++){
//  let x = Math.random() * window.innerWidth;
//  let y = Math.random() * window.innerHeight;
//  c.beginPath();
//  c.arc(x, y, 100, Math.PI * 2, false);
//    c.strokeStyle = '#f00000';
//    c.stroke();
//}

let maxRadius = 40;
//let minRadius = 2;

let colorArray = [
  '#F35B68',
  '#D81E5B',
  '#FEF0D5',
  '#00BEB2',
  '#1A5D63'
];

let mouse = {
  x: undefined,
  y: undefined
};

// Add Event Listener
window.addEventListener('mousemove', function(event){
    mouse.x = event.x
    mouse.y = event.y 
})

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  init()
})

// Object
function Circles(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.minRadius = radius;
  this.radius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  
// Annonymous function draws Circles
  this.draw = function(){
    c.beginPath();
      c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
      c.fillStyle = this.color;
        c.fill();
  };
  
// Annonymous function makes balls bounce off edges
  this.update = function(){
      if(this.x + radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
    };
      if(this.y + radius > innerHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
    };
      this.x += this.dx;
      this.y += this.dy;
    
    // interactivity occurs here
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      };
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    };
    
    this.draw();
  }
};

// New Array generates 100 balls with for statement 
let circleArray = [];

function init() {
  
  circleArray = [];

for(var i = 0; i < 1000; i++){
    let radius = Math.random() * 4 + 2; // Sets Radius
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() * -0.5) * 5;
    let dy = (Math.random() * -0.5) * 5;
  circleArray.push(new Circles(x, y, dx, dy, radius));
};
}

// Refactored code for clean function below
function circleGenerator(){
  c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  };
};


function animate(){
  requestAnimationFrame(animate);
    circleGenerator();
};
animate();
init();


