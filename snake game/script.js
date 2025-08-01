// Game variables
let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let speedX = 0;
let speedY = 0;
let snakeBody = [];
let foodX;
let foodY;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameSpeed = 100; // Default to Medium (100ms)
let isPaused = false;
let currentTheme = 'dark';
let gameInterval;

// Theme colors
const themes = {
    dark: {
        background: '#2c3e50',
        snakeBody: '#2ecc71',
        snakeHead: '#27ae60',
        food: '#e74c3c',
        grid: '#ddd'
    },
    light: {
        background: '#ecf0f1',
        snakeBody: '#3498db',
        snakeHead: '#2980b9',
        food: '#e74c3c',
        grid: '#95a5a6'
    }
};

// Function to update the game state
function update() {
    if (gameOver || isPaused) return;
    
    // Clear the canvas
    context.fillStyle = themes[currentTheme].background;
    context.fillRect(0, 0, board.width, board.height);
    
    // Draw grid
    context.strokeStyle = themes[currentTheme].grid;
    context.lineWidth = 1;
    for (let i = 0; i <= total_row; i++) {
        context.beginPath();
        context.moveTo(0, i * blockSize);
        context.lineTo(board.width, i * blockSize);
        context.stroke();
    }
    for (let i = 0; i <= total_col; i++) {
        context.beginPath();
        context.moveTo(i * blockSize, 0);
        context.lineTo(i * blockSize, board.height);
        context.stroke();
    }
    
    // Draw food with pulsing effect
    let foodRadius = (blockSize / 2) * (1 + 0.1 * Math.sin(Date.now() / 200));
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, foodRadius, 0, Math.PI * 2);
    context.fillStyle = themes[currentTheme].food;
    context.fill();
    context.closePath();
    
    // Check if snake eats food
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score++;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        document.getElementById("score").innerText = "Score: " + score + " | High Score: " + highScore;
    }
    
    // Move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }
    
    // Move snake
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    
    // Draw snake body
    context.fillStyle = themes[currentTheme].snakeBody;
    for (let i = 0; i < snakeBody.length; i++) {
        context.beginPath();
        context.arc(snakeBody[i][0] + blockSize / 2, snakeBody[i][1] + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
    
    // Draw snake head
    context.fillStyle = themes[currentTheme].snakeHead;
    context.beginPath();
    context.arc(snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    
    // Draw eyes on the head
    context.fillStyle = "white";
    context.beginPath();
    context.arc(snakeX + blockSize / 4, snakeY + blockSize / 4, blockSize / 8, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(snakeX + 3 * blockSize / 4, snakeY + blockSize / 4, blockSize / 8, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    
    // Check for wall collision
    if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
        gameOver = true;
        showGameOverScreen();
    }
    
    // Check for self-collision
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            showGameOverScreen();
        }
    }
}

// Function to change snake direction
function changeDirection(e) {
    if (gameOver) return;
    if (e.code == "KeyP") {
        togglePause();
        return;
    }
    if (isPaused) return;
    if (e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    } else if (e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}

// Function to toggle pause state
function togglePause() {
    if (gameOver) return;
    isPaused = !isPaused;
    document.getElementById("pause-screen").style.display = isPaused ? "block" : "none";
}

// Function to place food at random position
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    foodY = Math.floor(Math.random() * total_row) * blockSize;
}

// Function to set difficulty
function setDifficulty() {
    const difficulty = document.getElementById("difficulty").value;
    switch (difficulty) {
        case "easy": gameSpeed = 150; break;
        case "medium": gameSpeed = 100; break;
        case "hard": gameSpeed = 60; break;
    }
    // Clear existing interval and start new one with updated speed
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(update, gameSpeed);
}

// Function to set theme
function setTheme() {
    currentTheme = document.getElementById("theme").value;
    // Update canvas immediately to reflect theme change
    if (board && context) {
        context.fillStyle = themes[currentTheme].background;
        context.fillRect(0, 0, board.width, board.height);
    }
}

// Function to start the game
function startGame() {
    // Clear any existing interval
    if (gameInterval) clearInterval(gameInterval);

    // Reset game state
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    speedX = 0;
    speedY = 0;
    snakeBody = [];
    score = 0;
    gameOver = false;
    isPaused = false;

    // Update UI
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    document.getElementById("game-over-screen").style.display = "none";
    document.getElementById("pause-screen").style.display = "none";
    document.getElementById("score").innerText = "Score: " + score + " | High Score: " + highScore;

    // Apply difficulty and theme
    setDifficulty();
    setTheme();

    // Set up canvas
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    // Start game
    placeFood();
}

// Function to show game over screen
function showGameOverScreen() {
    if (gameInterval) clearInterval(gameInterval);
    document.getElementById("game-container").style.display = "none";
    document.getElementById("game-over-screen").style.display = "block";
    document.getElementById("final-score").innerText = score;
}

// Initialize event listeners
window.onload = function() {
    document.addEventListener("keyup", changeDirection);
    document.getElementById("start-button").addEventListener("click", startGame);
    document.getElementById("restart-button").addEventListener("click", startGame);
};