"use strict";
const canvas = document.getElementById("gameCanvas");
const startButton = document.getElementById("startBtn");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const canvasSize = canvas.width / gridSize;
let gameInterval;
let score = 0;
let snake = [
    { x: 10, y: 10 },
];
let direction = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const segment of snake) {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        score += 1;
        food = {
            x: Math.floor(Math.random() * canvasSize),
            y: Math.floor(Math.random() * canvasSize)
        };
    }
    else {
        snake.pop();
    }
}
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0)
                direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0)
                direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0)
                direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0)
                direction = { x: 1, y: 0 };
            break;
    }
});
function gameLoop() {
    moveSnake();
    drawSnake();
    if (snake[0].x < 0 || snake[0].x >= canvasSize || snake[0].y < 0 || snake[0].y >= canvasSize) {
        submitScore(score);
        alert("Your score " + score);
        resetGame();
    }
}
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    score = 0;
    clearInterval(gameInterval);
    gameInterval = null;
}
async function submitScore(score) {
    const response = await fetch(`https://localhost:7293/api/Stats/AddScore?score=${score}`, {
        method: "POST"
    });
    if (response.ok) {
        console.log("Score submitted successfully");
    }
    else {
        console.error("Failed to submit score");
    }
}
startButton.addEventListener("click", () => {
    if (!gameInterval) {
        gameInterval = setInterval(gameLoop, 200);
    }
});
