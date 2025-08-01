Snake Game



Welcome to the Snake Game project — a modern take on the classic Snake game, built with HTML, CSS, and JavaScript. This engaging web application allows players to control a snake to eat food, grow longer, and avoid collisions, featuring customizable difficulty levels, themes, and a polished, animated interface.
Table of Contents

Project Overview
Features
File Structure
Setup Instructions
Usage
Contributing
License
Contact

Project Overview
The Snake Game is a client-side web application that recreates the iconic Snake game with a vibrant, animated UI. Players navigate a snake on a 17x17 grid using arrow keys, aiming to eat food to increase their score while avoiding walls and self-collisions. The game includes difficulty settings, light/dark themes, pause functionality, and high score tracking, making it both fun and customizable.
Features

Classic Snake Gameplay: Control a snake to eat food, grow, and avoid collisions on a 17x17 grid.



Customizable Difficulty: Choose from Easy (150ms), Medium (100ms), or Hard (60ms) game speeds.



Light/Dark Themes: Switch between visually distinct themes with different colors for the snake, food, and background.



Score Tracking: Displays current score and persists high score using local storage.



Pause/Resume: Toggle pause with the 'P' key, with a semi-transparent pause screen.



Game Over Screen: Shows final score and offers a restart option.



Animated UI: Features a pulsing background, slithering snake icon, blinking eyes, and smooth transitions.



Responsive Design: Optimized for various screen sizes with a centered game board.



Visual Effects: Pulsing food, grid overlay, and circular snake segments with eyes on the head.



File Structure
Snake-Game/
├── index.html    # Main HTML file for the game interface
├── style.css     # Stylesheet for layout, animations, and design
├── script.js     # JavaScript for game logic and interactivity
└── README.md     # Project documentation




Setup Instructions

Clone the Repository:git clone https://github.com/rwannies/snake-game.git
cd snake-game


Open the Project:
No external dependencies are required as the project uses vanilla HTML, CSS, and JavaScript.
Open index.html in a web browser to start the game.


Optional: Local Server:
For a better development experience, use a local server (e.g., Live Server in VS Code or Python's HTTP server):python -m http.server 8000


Access the game at http://localhost:8000.


Font Dependency:
The game uses the 'Poppins' font via Google Fonts, which is loaded in index.html. Ensure an internet connection for the font to load, or host the font locally if needed.



Usage

Start the Game:
On the start screen, select a difficulty (Easy, Medium, Hard) and theme (Dark, Light).
Click "Start Game" to begin.


Gameplay:
Use arrow keys to move the snake up, down, left, or right.
Eat the red food to grow and increase your score.
Avoid hitting the walls or the snake's own body.
Press 'P' to pause or resume the game.


Game Over:
If the snake collides with a wall or itself, the game ends, showing your score.
Click "Restart" to play again.


Score Tracking:
The current score and high score are displayed above the game board.
High scores persist across sessions via local storage.



Contributing


Contributions are welcome! To contribute:

Fork the repository.


Create a new branch (git checkout -b feature/your-feature).


Make your changes and commit (git commit -m 'Add your feature').


Push to the branch (git push origin feature/your-feature).


Open a pull request to the main branch.


Please ensure your code follows best practices for HTML, CSS, and JavaScript. Test changes thoroughly, especially game logic and animations. Document any new features (e.g., new themes, AI mode) clearly.



License


This project is licensed under the MIT License. See the LICENSE file for details.




Contact



For questions or suggestions, contact the project maintainer at wanniesruche@gmail.com or open an issue on GitHub.
