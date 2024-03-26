const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const restartButton = document.getElementById("restart");
const box = 20;
const canvasSize = 400;
const speed = 100;

let snake = [{ x: 200, y: 200 }];
let points = document.getElementById("points");
let dx = 0;
let dy = 0;
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };

// restartGame();

document.addEventListener("keydown", direction);
restartButton.addEventListener("click", restartGame)

function direction(event) {
    if (event.keyCode === 37 && dx !== box) {
        dx = -box;
        dy = 0;
    } else if (event.keyCode === 38 && dy !== box) {
        dx = 0;
        dy = -box;
    } else if (event.keyCode === 39 && dx !== -box) {
        dx = box;
        dy = 0;
    } else if (event.keyCode === 40 && dy !== -box) {
        dx = 0;
        dy = box;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collision with food
    if (snake[0].x === food.x && snake[0].y === food.y) {
        // Generate new food
        points.innerText = (parseInt(points.innerText) + 1);
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        // Remove tail
        snake.pop();
    }

    // Draw snake
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, box, box);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Check for collision with walls or itself
    if (snake[0].x < 0 || snake[0].x >= canvasSize || snake[0].y < 0 || snake[0].y >= canvasSize || collision()) {
        restartButton.classList.remove('hide');
        clearInterval(game);
    }
}

function collision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}


function restartGame() {
    snake = [{ x: 200, y: 200 }];
    points.innerText = 0;
    dx = 0;
    dy = 0;
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    
    restartButton.classList.add('hide');
    game = setInterval(draw, speed);
}


let game = setInterval(draw, speed);

