const gameArea = document.getElementById("gameArea");
const gameSize = { width: 600, height: 540 };
const snakeSize = 30;
let snake = [{ x: 150, y: 150 }];
let food = { x: 60, y: 60 };
let direction = { x: 0, y: 0 };
let score = 0; // Initialize score
const scoreDisplay = document.getElementById("score");

function createDiv(type) {
    let div = document.createElement("div");
    div.className = type;
    gameArea.appendChild(div);
    return div;
}

function drawSnake() {
    gameArea.innerHTML = "";
    snake.forEach((segment) => {
        let snakePart = createDiv("snake");
        snakePart.style.left = `${segment.x}px`;
        snakePart.style.top = `${segment.y}px`;
    });
    let foodDiv = createDiv("food");
    foodDiv.style.left = `${food.x}px`;
    foodDiv.style.top = `${food.y}px`;
}

function moveSnake() {
    const head = {
        x: snake[0].x + direction.x * snakeSize,
        y: snake[0].y + direction.y * snakeSize,
    };

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
        score++; // Increment score
        scoreDisplay.textContent = `Score: ${score}`; // Update score display
    } else {
        snake.pop();
    }

    if (
        head.x < 0 ||
        head.x >= gameSize.width ||
        head.y < 0 ||
        head.y >= gameSize.height ||
        snake.some(
            (segment, index) =>
                index !== 0 && segment.x === head.x && segment.y === head.y
        )
    ) {
        // Game over
        snake = [{ x: 150, y: 150 }];
        direction = { x: 0, y: 0 };
        score = 0; // Reset score
        scoreDisplay.textContent = `Score: ${score}`; // Reset score display
        alert("Game over");
    }
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * (gameSize.width / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (gameSize.height / snakeSize)) * snakeSize,
    };
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
    }
});

setInterval(() => {
    moveSnake();
    drawSnake();
}, 200);

placeFood();
drawSnake();
