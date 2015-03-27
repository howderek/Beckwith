var gridSize = Math.floor(Math.sqrt(Math.min(innerHeight, innerWidth))) / 2,
    _c = document.getElementById('grid'),
        context = _c.getContext('2d'),
    beckwith = new Beckwith(),
    oldX = 0,
    oldY = 0,
    oldPath = [];

function test() { 
    console.log('Starting Beckwith...');
    var map = [[0,0,1,0,0],
               [0,0,1,0,0],
               [0,0,1,0,0],
               [0,0,1,0,0],
               [0,0,0,0,0]];
    PathFinder = new Beckwith(true);
    PathFinder.findPath(map, [0], 0, 0, 4, 0).then(console.log);
}



function renderGrid(data) {
    

    _c.width = (data.width * data.gridSize);
    _c.height = (data.height * data.gridSize)
    _c.style.width = (data.width * data.gridSize) + 'px';
    _c.style.height = (data.height * data.gridSize) + 'px';
    
    for (var i = 0; i < data.height; i += 1) {
        for (var j = 0; j < data.width; j += 1) {
            if (data.map[i][j] === 1) {
                context.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
            }
        }
    }
}


function renderBox(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
    context.fillStyle ='#1d1d1d';
}

function renderPath (path) {
    var colorFactor = Math.floor(255 / path.length),
        currentDelta = 0;
    for (var i = 0; i < path.length; i += 1) {
        renderBox(path[i].x, path[i].y, 'rgba(' + (255 - currentDelta) +',' + currentDelta +', 36, 0.68)');
        currentDelta += colorFactor;
    }
    renderBox(currentGrid.startingPlace[1], currentGrid.startingPlace[0], '#f00');
}

function grid(chance) {     
    var map = [],
        potentialStartingPlaces = [],
        startingPlace = [],
        width = Math.floor(innerWidth / gridSize),
        height = Math.floor(innerHeight / gridSize);
        
    chance = (chance) ? chance : .3;
    
    for (var i = 0; i < height; i += 1) {
        map[i] = [];
        for (var j = 0; j < width; j += 1) {
            var wall = (Math.random() < chance);
            map[i][j] = Number(wall);
            if (!wall) {
                potentialStartingPlaces.push([i,j]);
            }
                
        }
    }
    
    return {
        width: width,
        height: height,
        map: map,
        startingPlace: potentialStartingPlaces[Math.floor(potentialStartingPlaces.length * Math.random())],
        gridSize: gridSize
    }
}

var currentGrid = grid();
renderGrid(currentGrid)

_c.onmousemove = function (e) {
    var x = Math.floor((e.clientX) / gridSize),
        y = Math.floor((e.clientY) / gridSize);

    if (currentGrid.map[y][x] === 0 && (x !== oldX || y !== oldY)) {
        context.clearRect(0,0,_c.width,_c.height);
        renderGrid(currentGrid);
        
        renderBox(currentGrid.startingPlace[1], currentGrid.startingPlace[0], '#f00');
        renderBox(x, y, '#0f0');
        
        beckwith.findPath(currentGrid.map, [0], currentGrid.startingPlace[1], currentGrid.startingPlace[0], x, y).then(function (message) {
            if (message) {
                renderGrid(currentGrid);
                renderBox(x, y, '#0f0');
                oldX = x;
                oldY = y;
                oldPath = message.slice(1,message.length);;
            }
        });
        /*function (result) {
            result.forEach(function (obj) {
                renderBox(obj.x, obj.y, '#aaa');
            });
        }*/
    }
    
}
_c.onmousedown = function () {
    currentGrid = grid();
}

function moveBox () {
    if (typeof this.counter === 'undefined') {
        this.counter = Date.now();
    }
    if (Date.now() - this.counter >= 75 && oldPath.length > 1) {
        var nextSpot = oldPath.shift();
        currentGrid.startingPlace[1] = nextSpot.x;
        currentGrid.startingPlace[0] = nextSpot.y;
        this.counter = Date.now();
    }
    renderGrid(currentGrid);
    renderPath(oldPath);
    requestAnimationFrame(moveBox);
}
  
moveBox();