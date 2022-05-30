let imagedata = null
let canvas; 
window.onload = function() {
  canvas = document.getElementById("viewport")
  let context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  generateStars(0.005, new SpeedRange(0.0, 1.0, 0.0, 0.0));

  animationLoop();
}

class SpeedRange {
  constructor(minDX, maxDX, minDY, maxDY) {
    this.minDX = minDX;
    this.maxDX = maxDX;
    this.minDY = minDY;
    this.maxDY = maxDY;
  }
}

function animationLoop() {

  updateBackground();
  requestAnimationFrame(animationLoop)
}

let stars = [];

/**
 * Generates the stars that should be drawn. The density parameter calculates how common the stars should be.
 */
function generateStars(density, speedRange) {
  speedRange = speedRange || new SpeedRange(0.0, 0.0, 0.0, 0.0);
  let width = window.innerWidth;
  let height = window.innerHeight;

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let randomNbr = Math.random()

      if(randomNbr < density) {
        let star = createStar(x, y, speedRange)
        stars.push(star)
      }
    }
  }
}

function createStar(x, y, speedRange) {
  return {
    x,
    y,
    dx : speedRange.minDX + (speedRange.maxDX - speedRange.minDX) * Math.random(),
    dy : speedRange.minDY + (speedRange.maxDY - speedRange.minDY) * Math.random(),
    radius : Math.sqrt(Math.random() * 4),
    alpha : 1.0,
    decreasing : true,
    dRatio : Math.random() * 0.05
  }
}

function ensureStarInView(star) {
  let width = canvas.width;
  let height = canvas.height;

  if(star.x < 0) {
    star.x = width + star.x;
  } else if (star.x > width) {
    star.x = star.x % width;
  }
  if(star.y < 0) {
    star.y += height
  }
  star.y = star.y % height;
}


function updateStars(stars) {
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let dRatio = star.dRatio;
    if (star.decreasing == true)
    {
      star.alpha -= dRatio;
      if (star.alpha < 0.1)
      { star.decreasing = false; }
    }
    else
    {
      star.alpha += dRatio;
      if (star.alpha > 0.95)
      { star.decreasing = true; }
    }

    star.x += star.dx;
    star.y += star.dy;
    ensureStarInView(star);
  }
}

function clearBackground(canvas, context) {
  context.fillStyle = "#111"
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScene(canvas, context, stars) {
  context.save();
  clearBackground(canvas, context);
  drawStars(context, stars)
  context.restore();
}

function updateBackground() {
  let canvas = document.getElementById("viewport")
  let context = canvas.getContext("2d");
  updateStars(stars);
  drawScene(canvas, context, stars);
}

function drawStars(context, stars) {
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, 2*Math.PI);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 255, " + star.alpha + ")";
    context.fill();
  }
  context.restore();
}

window.addEventListener('resize', drawScene);

