const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw snake
  snake.forEach(part => {
    ctx.fillStyle = "lime";
    ctx.fillRect(part.x, part.y, box, box);
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  // Game over
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvas.width ||
    head.y >= canvas.height ||
    snake.some(part => part.x === head.x && part.y === head.y)
  ) {
    clearInterval(game);
    alert("Game Over");
  }

  snake.unshift(head);
}

let game = setInterval(draw, 100);
