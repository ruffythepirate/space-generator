let imagedata = null
window.onload = function() {
  let canvas = document.getElementById("viewport")
  let context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  generateStars(0.005);

  animationLoop();
}

function animationLoop() {

  updateBackground();
  requestAnimationFrame(animationLoop)
}

let stars = [];

/**
 * Generates the stars that should be drawn. The density parameter calculates how common the stars should be.
 */
function generateStars(density) {
  let width = window.innerWidth;
  let height = window.innerHeight;

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let randomNbr = Math.random()

      if(randomNbr < density) {
        let star = createStar(x, y)
        stars.push(star)
      }
    }
  }
}

function createStar(x, y) {
  return {
    x,
    y,
    radius : Math.sqrt(Math.random() * 4),
    alpha : 1.0,
    decreasing : true,
    dRatio : Math.random() * 0.05
  }
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

