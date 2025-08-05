const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
const size = canvas.width / grid;

let snake = [{ x: 8, y: 10 }];
let dx = 1, dy = 0;
let food = {};
let score = 0;
document.getElementById('score').textContent = `Score: ${score}`;

const logoImg = new Image();
logoImg.src = '/ethos-logo.png';

function placeFood() {
  food.x = Math.floor(Math.random() * grid);
  food.y = Math.floor(Math.random() * grid);
}
placeFood();

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dy !== 1) { dx = 0; dy = -1; }
  if (e.key === 'ArrowDown' && dy !== -1) { dx = 0; dy = 1; }
  if (e.key === 'ArrowLeft' && dx !== 1) { dx = -1; dy = 0; }
  if (e.key === 'ArrowRight' && dx !== -1) { dx = 1; dy = 0; }
});

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // gambar food sebagai logo
  ctx.drawImage(logoImg, food.x * size, food.y * size, size, size);

  // gambar snake: kepala dengan tulisan
  snake.forEach((seg, i) => {
    ctx.fillStyle = i === 0 ? '#0f9' : '#0c6';
    ctx.fillRect(seg.x * size, seg.y * size, size, size);

    if (i === 0) {
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.fillText('Wen Code', seg.x * size + 2, seg.y * size + size - 2);
    }
  });
}

function update() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // cek dinding atau tubrukan diri
  if (head.x < 0 || head.x >= grid || head.y < 0 || head.y >= grid ||
      snake.some(s => s.x === head.x && s.y === head.y)) {
    return alert(`Game Over! Score: ${score}`), snake = [{ x:8, y:10 }], dx = 1, dy = 0, score = 0, placeFood();
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = `Score: ${score}`;
    placeFood();
  } else {
    snake.pop();
  }
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 200);
}

gameLoop();
