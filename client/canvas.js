const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// stage of the drawing process
let isDrawing = false;
let lastPos = null;

const strokes = [];

let lastx = 0;
let lasty = 0;

let brushColor = 'black';
let brushSize = 5;

const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('coneected to the websocket server');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type == 'STROKE') {
    drawStroke(data.stroke);
  }

  if (data.type === 'USER_JOINED') {
    console.log('Users online:', data.users);
  }
};

socket.onclose = () => {
  console.log('disconnected from server');
};

// when we pressed the mouse.
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  lastPos = { x: e.clientX, y: e.clientY };
});

// when we moved the mouse.
canvas.addEventListener('mousemove', (e) => {
  if (!isDrawing) return;

  const currentPos = { x: e.clientX, y: e.clientY };
  // create the stroke object.
  const stroke = {
    start: lastPos,
    end: currentPos,
    color: brushColor,
    width: brushSize,
    userId: 'local-user',
    timestamp: Date.now(),
  };

  // call the stoke function to draw.
  strokes.push(stroke);
  drawStroke(stroke);

  socket.send(
    JSON.stringify({
      type: 'STROKE',
      stroke,
    })
  );
  lastPos = currentPos;
});

// function to draw
function drawStroke(stroke) {
  ctx.strokeStyle = stroke.color;
  ctx.lineWidth = stroke.width;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(stroke.start.x, stroke.start.y);
  ctx.lineTo(stroke.end.x, stroke.end.y);
  ctx.stroke();

  console.log('this is janardhan');
}

//when we released the mouse.
canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
