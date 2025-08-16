const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');

// Game variables
let gameRunning = false;
let score = 0;
let gameSpeed = 2;

// Bird object
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 25,
    velocity: 0,
    gravity: 0.5,
    jumpPower: -8,
    color: '#FFD700'
};

// Pipes array
let pipes = [];
const pipeWidth = 60;
const pipeGap = 150;
const pipeColor = '#228B22';

// Game functions
function drawBird() {
    ctx.fillStyle = bird.color;
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
    
    // Simple bird details
    ctx.fillStyle = '#FF6347';
    ctx.fillRect(bird.x + 20, bird.y + 8, 8, 6); // beak
    ctx.fillStyle = '#000';
    ctx.fillRect(bird.x + 8, bird.y + 6, 4, 4); // eye
}

function drawPipes() {
    ctx.fillStyle = pipeColor;
    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.topHeight + pipeGap, pipeWidth, canvas.height - pipe.topHeight - pipeGap);
        
        // Pipe caps
        ctx.fillStyle = '#006400';
        ctx.fillRect(pipe.x - 5, pipe.topHeight - 20, pipeWidth + 10, 20);
        ctx.fillRect(pipe.x - 5, pipe.topHeight + pipeGap, pipeWidth + 10, 20);
        ctx.fillStyle = pipeColor;
    });
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    
    // Keep bird in bounds
    if (bird.y < 0) bird.y = 0;
    if (bird.y + bird.height > canvas.height) {
        gameOver();
    }
}

function updatePipes() {
    // Move pipes
    pipes.forEach(pipe => {
        pipe.x -= gameSpeed;
    });
    
    // Remove pipes that are off screen
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
    
    // Add new pipes
    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        const topHeight = Math.random() * (canvas.height - pipeGap - 100) + 50;
        pipes.push({
            x: canvas.width,
            topHeight: topHeight,
            passed: false
        });
    }
}

function checkCollisions() {
    pipes.forEach(pipe => {
        // Check collision with top pipe
        if (bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.topHeight) {
            gameOver();
        }
        
        // Check collision with bottom pipe
        if (bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            bird.y + bird.height > pipe.topHeight + pipeGap) {
            gameOver();
        }
        
        // Check if bird passed pipe
        if (!pipe.passed && bird.x > pipe.x + pipeWidth) {
            pipe.passed = true;
            score++;
            scoreElement.textContent = `Score: ${score}`;
            
            // Increase game speed slightly
            if (score % 5 === 0) {
                gameSpeed += 0.2;
            }
        }
    });
}

function gameLoop() {
    if (!gameRunning) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update game objects
    updateBird();
    updatePipes();
    checkCollisions();
    
    // Draw everything
    drawPipes();
    drawBird();
    
    requestAnimationFrame(gameLoop);
}

function jump() {
    if (gameRunning) {
        bird.velocity = bird.jumpPower;
    }
}

function startGame() {
    gameRunning = true;
    score = 0;
    gameSpeed = 2;
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    scoreElement.textContent = 'Score: 0';
    gameOverElement.classList.add('hidden');
    gameLoop();
}

function gameOver() {
    gameRunning = false;
    finalScoreElement.textContent = score;
    gameOverElement.classList.remove('hidden');
}

function restartGame() {
    startGame();
}

// Event listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (!gameRunning) {
            startGame();
        } else {
            jump();
        }
    }
});

canvas.addEventListener('click', () => {
    if (!gameRunning) {
        startGame();
    } else {
        jump();
    }
});

// Initialize game
ctx.fillStyle = '#333';
ctx.font = '24px Arial';
ctx.textAlign = 'center';
ctx.fillText('Click or Press SPACE to Start', canvas.width / 2, canvas.height / 2);