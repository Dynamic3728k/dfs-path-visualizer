const rows = 20;
const cols = 40;
const gridContainer = document.getElementById('grid-container');

let grid = [];
let isMousePressed = false;
let startNode = { r: 5, c: 5 }; // Default start position
let endNode = { r: 15, c: 35 }; // Default end position
let isRunning = false;

// Initialize the grid
function createGrid() {
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 25px)`;
    grid = [];
    gridContainer.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        let rowArray = [];
        for (let c = 0; c < cols; c++) {
            let node = document.createElement('div');
            node.className = 'node';
            node.id = `node-${r}-${c}`;
            
            // Set Start and End classes
            if (r === startNode.r && c === startNode.c) node.classList.add('node-start');
            if (r === endNode.r && c === endNode.c) node.classList.add('node-end');

            // Mouse events for creating walls
            node.addEventListener('mousedown', () => {
                if(!isRunning) {
                    isMousePressed = true;
                    toggleWall(r, c);
                }
            });
            node.addEventListener('mouseenter', () => {
                if (isMousePressed && !isRunning) toggleWall(r, c);
            });
            node.addEventListener('mouseup', () => {
                isMousePressed = false;
            });

            gridContainer.appendChild(node);
            rowArray.push(node);
        }
        grid.push(rowArray);
    }
}

// Function to toggle walls
function toggleWall(r, c) {
  
    if ((r === startNode.r && c === startNode.c) || (r === endNode.r && c === endNode.c)) return;

    const node = grid[r][c];
    node.classList.toggle('node-wall');
}


function clearBoard() {
    if (isRunning) return;
    grid.forEach(row => {
        row.forEach(node => {
            node.classList.remove('node-visited', 'node-path', 'node-wall');
        });
    });
}

// --- DFS Algorithm ---
async function visualizeDFS() {
    if (isRunning) return;
    isRunning = true;

    
    grid.forEach(row => {
        row.forEach(node => {
            node.classList.remove('node-visited', 'node-path');
        });
    });

    let stack = [startNode];
    let visited = new Set();
    let parentMap = new Map(); 
    let found = false;

  
    const getKey = (r, c) => `${r}-${c}`;

    visited.add(getKey(startNode.r, startNode.c));

    while (stack.length > 0) {
        let current = stack.pop();
        let r = current.r;
        let c = current.c;

       
        if (r === endNode.r && c === endNode.c) {
            found = true;
            break;
        }

        
        if (current !== startNode) {
            grid[r][c].classList.add('node-visited');
        }
        
        
        await new Promise(resolve => setTimeout(resolve, 20));

        
        const neighbors = [
            { r: r - 1, c: c }, 
            { r: r, c: c + 1 }, 
            { r: r + 1, c: c }, 
            { r: r, c: c - 1 }  
        ];

        for (let neighbor of neighbors) {
            let nr = neighbor.r;
            let nc = neighbor.c;
            let key = getKey(nr, nc);

           
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
                !visited.has(key) &&
                !grid[nr][nc].classList.contains('node-wall')) {
                
                visited.add(key);
                parentMap.set(key, current); 
                stack.push({ r: nr, c: nc });
            }
        }
    }

    if (found) {
        await drawPath(parentMap);
    } else {
        alert("No path found!");
    }
    isRunning = false;
}

async function drawPath(parentMap) {
    let curr = endNode;
    let path = [];

    // Backtrack from end to start
    while (curr.r !== startNode.r || curr.c !== startNode.c) {
        path.push(curr);
        let key = `${curr.r}-${curr.c}`;
        curr = parentMap.get(key);
    }

    
    for (let i = path.length - 1; i >= 0; i--) {
        let node = path[i];
        if (node.r !== endNode.r || node.c !== endNode.c) {
            grid[node.r][node.c].classList.add('node-path');
        }
        await new Promise(resolve => setTimeout(resolve, 30));
    }
}


window.addEventListener('mouseup', () => {
    isMousePressed = false;
});


createGrid();