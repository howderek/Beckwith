# Beckwith
#### Asynchronus A* Pathfinding with Promises
Beckwith is a library for doing super-fast A* pathfinding in a seperate thread, and is ideal for applications that need to have fluid UX while doing computationally heavy pathfinding, such as finding paths for large numbers of characters in a game, or computing the path betweem two points on an extremely large map.

In the Web Worker, it uses a slightly modified and very minified version of [@bgrins](https://github.com/bgrins/javascript-astar) [javascript-astar](https://github.com/bgrins/javascript-astar) library, which is hella fast because it uses `BinaryHeaps`.
#### Usage

small example: https://jsfiddle.net/howderek/w86bc46k/

    //create a new Beckwith object;
    var bw = new Beckwith();
    //create a map (2D Array) 1 is travesable, 0 is a wall.
    var map = [
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1]
    ];
    //tell Beckwith to find you a path, and use Promises to recieve the path that is returned.
    //usage: BeckwithObject.findPath(map, startX, startY, endX, endY)
    bw.findPath(map, 0, 0, 2, 0).then(function (path) {
        //manipulate your path
        //Array of Objects with x and y values
        path.forEach(function (point) {
            console.log(point.x + ',' + point.y);
        });
    });

#### Demo
https://howderek.github.io/Beckwith/
#### Beckwith?
![Edward Griffin Beckwith](http://i.imgur.com/bWYxgY6.jpg)

[Edward Griffin Beckwith](http://en.wikipedia.org/wiki/Edward_Griffin_Beckwith) was an United States Army officer who served in the Union Army during the American Civil War and who conducted one of the Pacific Railroad Surveys in the 1850s and became known as the "Explorer of the Central Rockies"

He found paths, and he did it well. As does this library. Hence, Beckwith.
