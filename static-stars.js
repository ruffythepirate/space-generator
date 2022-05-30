let imagedata = null
window.onload = function() {
  let canvas = document.getElementById("viewport")
  canvas.onresize = function() {
    console.log(`Resize happened. Canvas size is now: ${canvas.width} x ${canvas.height}`);
    drawImage();
  }

  let context = canvas.getContext("2d");

  let width = window.innerWidth;
  let height = window.innerHeight;

  imagedata = context.createImageData(width, height);

  for(let x = 0; x < width; x++) {
    for(let y = 0; y < height; y++) {
      let randomNbr = Math.random()
      let pixelIndex = (y * width + x) * 4;

      if(randomNbr > 0.99) {
        imagedata.data[pixelIndex] = 255;
        imagedata.data[pixelIndex + 1] = 255;
        imagedata.data[pixelIndex + 2] = 255;
        imagedata.data[pixelIndex + 3] = 255;
      }
    }
  }
  drawImage();
}


function drawImage() {
  let canvas = document.getElementById("viewport")
  let context = canvas.getContext("2d");
  context.putImageData(imagedata, 0, 0);

}
