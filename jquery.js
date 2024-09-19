const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Function to update canvas size based on window size
function updateCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Call updateCanvasSize initially and on window resize
updateCanvasSize();
window.addEventListener('resize', updateCanvasSize);

// Load the image
const image = new Image();
image.src = 'img/strongbowBwhite.png';

// Update the drawImage function to increase the size of the image
function drawImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  const imageWidth = image.width;
  const imageHeight = image.height;
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const aspectRatio = imageWidth / imageHeight;
  let drawWidth, drawHeight;
  
  // Adjust the size to fit the canvas while maintaining the aspect ratio
  if (canvasWidth / canvasHeight > aspectRatio) {
    drawHeight = canvasHeight;
    drawWidth = drawHeight * aspectRatio;
  } else {
    drawWidth = canvasWidth;
    drawHeight = drawWidth / aspectRatio;
  }
  const x = (canvasWidth - drawWidth) / 2;
  const y = (canvasHeight - drawHeight) / 2;
  ctx.drawImage(image, x, y, drawWidth, drawHeight); // Draw the image to fit the canvas
}

// Wait for the image to load before drawing it
image.onload = function() {
  drawImage();
  // Add a loop to continuously draw the particles and image
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawImage(); // Draw the image to fit the canvas
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(120); // Update particles with an even slower speed factor
      if (particles[i].alpha <= 0) {
        particles[i] = new Particle(Math.random() * canvas.width, Math.random() * canvas.height);
      }
      particles[i].draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
};

// Create a particle system to simulate smoke
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.radius = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;
    if (this.alpha < 0) this.alpha = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fill();
  }
}

const particles = [];
for (let i = 0; i < 20; i++) {
  particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
}









