const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 클릭하지 않은 상태에서 mouse를 canvas에서 계속 움직이면
    // mouse가 움직이는 좌표값을 계속해서 path의 시작점으로 설정하는것
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // 클릭을 하게 되면 painting = true가 되면서
    // lineTo & stroke가 실행되면서
    // mouse가 움직이는 모든 좌표에 line이 그려지게 됨
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const width = event.target.value;
  ctx.lineWidth = width;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault(); // 우클릭 방지
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[🎨]';
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM); // 우클릭
}

Array.from(colors).forEach(color =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
