const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// stage of the drawing process
let isDrawing = false;
let lastx = 0;
let lasty = 0;

let brushColor = 'black';
let brushSize = 5;

// when we pressed the mouse.
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastx = e.clientX;
  lasty = e.clientY;
});

// when we moved the mouse.
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  ctx.strokeStyle = brushColor;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(lastx, lasty);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();

  lastx = e.clientX;
  lasty = e.clientY;
});

//when we released the mouse.
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
