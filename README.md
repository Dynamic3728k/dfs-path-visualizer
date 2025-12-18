# DFS Path Finder Visualizer

> A web-based visualization tool for the Depth First Search (DFS) graph traversal algorithm.

**[ LIVE DEMO HERE](https://dynamic3728k.github.io/dfs-path-visualizer/)**

![Project Screenshot]
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/bc223f2f-e887-4581-a6bb-29fac0facc05" />


## Overview
This project visualizes how the **Depth First Search** algorithm explores a 2D grid to find a path between a source node and a destination node. Unlike shortest-path algorithms (like BFS or Dijkstra), DFS explores as far as possible along each branch before backtracking.

This application was built to demonstrate:
* **Graph Theory** concepts applied to a grid layout.
* **Recursive/Stack-based** logic visualization.
* **DOM manipulation** using vanilla JavaScript.

## Features
* **Interactive Grid:** Users can click and drag to draw "Walls" (impassable nodes).
* **Real-time Visualization:** Watch the algorithm scan nodes (blue) and backtrack to find the path (yellow).
* **Responsive Design:** Adjusts to the screen size (grid is generated dynamically).
* **Clear/Reset:** Easily reset the board to test different maze configurations.

## How It Works
The grid is treated as an **unweighted graph** where:
* Each cell is a **Node**.
* Each node has edges connecting to its 4 neighbors (Up, Right, Down, Left).

### The Algorithm
The visualization uses a **Stack** (LIFO - Last In, First Out) approach:
1.  Push the **Start Node** to the stack.
2.  While the stack is not empty:
    * **Pop** the top node.
    * Mark it as **Visited**.
    * Check if it is the **End Node**.
    * If not, push all valid unvisited neighbors (Up, Right, Down, Left) to the stack.
3.  If the End Node is found, trace the parent pointers back to the start to draw the path.

**Time Complexity:** $O(V + E)$ where $V$ is vertices (cells) and $E$ is edges.

## Tech Stack
* **HTML5** - Grid layout structure.
* **CSS3** - Flexbox/Grid and keyframe animations.
* **JavaScript (ES6+)** - DFS logic and DOM interaction.

## Getting Started Locally
If you want to run this on your own machine:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/Dynamic3728k/dfs-path-visualizer.git](https://github.com/Dynamic3728k/dfs-path-visualizer.git)
    ```
2.  **Navigate to the folder**
    ```bash
    cd dfs-path-visualizer
    ```
3.  **Open index.html**
    Simply double-click `index.html` to open it in your browser.

## Future Improvements
* Add **Breadth First Search (BFS)** to compare shortest path vs. DFS path.
* Add a **Maze Generation** algorithm (like Recursive Division) to automatically build walls.
* Add a speed slider to control the visualization speed.

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## License
This project is open source and available under the [MIT License](LICENSE).
