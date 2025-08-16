# Flappy Bird Clone

A simple Flappy Bird clone built with HTML5 Canvas and JavaScript, containerized with nginx.

## Features

- Classic Flappy Bird gameplay
- Responsive controls (click or spacebar)
- Score tracking with increasing difficulty
- Game over screen with restart functionality
- Smooth animations and collision detection

## How to Play

- Press **SPACE** or **click** to make the bird flap
- Avoid hitting the pipes or the ground
- Score points by passing through pipes
- Game speed increases every 5 points

## Running with Docker

### Build the Docker image:
```bash
docker build -t flappy-bird .
```

### Run the container:
```bash
docker run -p 8080:80 flappy-bird
```

### Access the game:
Open your browser and go to `http://localhost:8080`

## Running locally (without Docker)

Simply open `index.html` in your web browser or serve it with any web server.

## Files Structure

- `index.html` - Main HTML file
- `style.css` - Game styling and layout
- `game.js` - Game logic and mechanics
- `Dockerfile` - Docker container configuration
- `nginx.conf` - nginx web server configuration

## Docker Image Details

- Based on `nginx:alpine` for minimal size
- Serves static files efficiently
- Includes gzip compression
- Security headers configured
- Health check endpoint at `/health`# flappy
# flappy
