/*************************************
*	Beckwith                         *
*	github.com/howderek/Beckwith     *
*   (c) 2015 Derek Howard            *
*	Licensed under the MIT license.  *
**************************************/    
var Beckwith = (function () {
    //Guts of this function to be injected into a WebWorker using a Blob
    function WorkerCode() {
    /**
    *	easystar-0.1.8.min.js
    *	github.com/prettymuchbryce/EasyStarJS
    *	Licensed under the MIT license.
    * 
    *	Implementation By Bryce Neal (@prettymuchbryce)
    **/    
        "function"==typeof define&&define.amd&&define("easystar",[],function(){return EasyStar}),"undefined"!=typeof module&&module.exports&&(module.exports=EasyStar);var EasyStar=EasyStar||{};EasyStar.Node=function(t,i,e,n,s){this.parent=t,this.x=i,this.y=e,this.costSoFar=n,this.simpleDistanceToTarget=s,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}},EasyStar.Node.OPEN_LIST=0,EasyStar.Node.CLOSED_LIST=1,EasyStar.PriorityQueue=function(t,i){this.length=0;var e=[],n=!1;if(i==EasyStar.PriorityQueue.MAX_HEAP)n=!0;else{if(i!=EasyStar.PriorityQueue.MIN_HEAP)throw i+" not supported.";n=!1}this.insert=function(i){if(!i.hasOwnProperty(t))throw"Cannot insert "+i+" because it does not have a property by the name of "+t+".";e.push(i),this.length++,s(this.length-1)},this.getHighestPriorityElement=function(){return e[0]},this.shiftHighestPriorityElement=function(){if(0===this.length)throw"There are no more elements in your priority queue.";if(1===this.length){var t=e[0];return e=[],this.length=0,t}var i=e[0],n=e.pop();return this.length--,e[0]=n,a(0),i};var s=function(t){if(0!==t){var i=l(t);r(t,i)&&(o(t,i),s(i))}},a=function(t){var i=h(t),e=u(t);if(r(i,t))o(t,i),a(i);else if(r(e,t))o(t,e),a(e);else{if(0==t)return;a(0)}},o=function(t,i){var n=e[t];e[t]=e[i],e[i]=n},r=function(i,s){if(void 0===e[s]||void 0===e[i])return!1;var a,o;return"function"==typeof e[i][t]?(a=e[i][t](),o=e[s][t]()):(a=e[i][t],o=e[s][t]),n?a>o?!0:!1:o>a?!0:!1},l=function(t){return Math.floor(t/2)-1},h=function(t){return 2*t+1},u=function(t){return 2*t+2}},EasyStar.PriorityQueue.MAX_HEAP=0,EasyStar.PriorityQueue.MIN_HEAP=1,EasyStar.instance=function(){this.isDoneCalculating=!0,this.pointsToAvoid={},this.startX,this.callback,this.startY,this.endX,this.endY,this.nodeHash={},this.openList},EasyStar.js=function(){var t,i,e,n=10,s=14,a={},o={},r=[],l=Number.MAX_VALUE,h=!1;this.setAcceptableTiles=function(t){t instanceof Array?e=t:!isNaN(parseFloat(t))&&isFinite(t)&&(e=[t])},this.enableDiagonals=function(){h=!0},this.disableDiagonals=function(){h=!1},this.setGrid=function(i){t=i;for(var e=0;e<t.length;e++)for(var n=0;n<t[0].length;n++)o[t[e][n]]||(o[t[e][n]]=1)},this.setTileCost=function(t,i){o[t]=i},this.setIterationsPerCalculation=function(t){l=t},this.avoidAdditionalPoint=function(t,i){a[t+"_"+i]=1},this.stopAvoidingAdditionalPoint=function(t,i){delete a[t+"_"+i]},this.stopAvoidingAllAdditionalPoints=function(){a={}},this.findPath=function(i,s,a,o,l){if(void 0===e)throw"You can't set a path without first calling setAcceptableTiles() on EasyStar.";if(void 0===t)throw"You can't set a path without first calling setGrid() on EasyStar.";if(0>i||0>s||0>a||0>a||i>t[0].length-1||s>t.length-1||a>t[0].length-1||o>t.length-1)throw"Your start or end point is outside the scope of your grid.";i===a&&s===o&&l([]);for(var h=t[o][a],u=!1,c=0;c<e.length;c++)if(h===e[c]){u=!0;break}if(u===!1)return void l(null);var y=new EasyStar.instance;y.openList=new EasyStar.PriorityQueue("bestGuessDistance",EasyStar.PriorityQueue.MIN_HEAP),y.isDoneCalculating=!1,y.nodeHash={},y.startX=i,y.startY=s,y.endX=a,y.endY=o,y.callback=l,y.openList.insert(f(y,y.startX,y.startY,null,n)),r.push(y)},this.calculate=function(){if(0!==r.length&&void 0!==t&&void 0!==e)for(i=0;l>i;i++){if(0===r.length)return;if(0!==r[0].openList.length){var a=r[0].openList.shiftHighestPriorityElement();if(a.list=EasyStar.Node.CLOSED_LIST,a.y>0&&(u(r[0],a,0,-1,n*o[t[a.y-1][a.x]]),r[0].isDoneCalculating===!0))r.shift();else if(a.x<t[0].length-1&&(u(r[0],a,1,0,n*o[t[a.y][a.x+1]]),r[0].isDoneCalculating===!0))r.shift();else if(a.y<t.length-1&&(u(r[0],a,0,1,n*o[t[a.y+1][a.x]]),r[0].isDoneCalculating===!0))r.shift();else if(a.x>0&&(u(r[0],a,-1,0,n*o[t[a.y][a.x-1]]),r[0].isDoneCalculating===!0))r.shift();else if(h){if(a.x>0&&a.y>0&&(u(r[0],a,-1,-1,s*o[t[a.y-1][a.x-1]]),r[0].isDoneCalculating===!0)){r.shift();continue}if(a.x<t[0].length-1&&a.y<t.length-1&&(u(r[0],a,1,1,s*o[t[a.y+1][a.x+1]]),r[0].isDoneCalculating===!0)){r.shift();continue}if(a.x<t[0].length-1&&a.y>0&&(u(r[0],a,1,-1,s*o[t[a.y-1][a.x+1]]),r[0].isDoneCalculating===!0)){r.shift();continue}if(a.x>0&&a.y<t.length-1&&(u(r[0],a,-1,1,s*o[t[a.y+1][a.x-1]]),r[0].isDoneCalculating===!0)){r.shift();continue}}}else r[0].callback(null),r.shift()}};var u=function(i,n,s,o,r){var l=n.x+s,h=n.y+o;if(i.endX===l&&i.endY===h){i.isDoneCalculating=!0;var u=[],c=0;u[c]={x:l,y:h},c++,u[c]={x:n.x,y:n.y},c++;for(var y=n.parent;null!=y;)u[c]={x:y.x,y:y.y},c++,y=y.parent;u.reverse(),i.callback(u)}if(void 0===a[l+"_"+h])for(var d=0;d<e.length;d++)if(t[h][l]===e[d]){var g=f(i,l,h,n,r);void 0===g.list?(g.list=EasyStar.Node.OPEN_LIST,i.openList.insert(g)):g.list===EasyStar.Node.OPEN_LIST&&n.costSoFar+r<g.costSoFar&&(g.costSoFar=n.costSoFar+r,g.parent=n);break}},f=function(t,i,e,n,s){if(void 0!==t.nodeHash[i+"_"+e])return t.nodeHash[i+"_"+e];var a=c(i,e,t.endX,t.endY);if(null!==n)var o=n.costSoFar+s;else o=a;var r=new EasyStar.Node(n,i,e,o,a);return t.nodeHash[i+"_"+e]=r,r},c=function(t,i,e,s){return Math.sqrt(Math.abs(e-t)*Math.abs(e-t)+Math.abs(s-i)*Math.abs(s-i))*n}};
        
        function work(map, acceptableTiles, startX, startY, endX, endY) {
            var easystar = new EasyStar.js();
            easystar.setGrid(map);
            easystar.setAcceptableTiles(acceptableTiles);
            easystar.findPath(startX, startY, endX, endY, function (result) {
                postMessage(result);
            });
            easystar.calculate();
        }
        
        onmessage = function (message) {
            work.apply(this, message.data);
        };
        
    };
    
    function Thread(code) { 
        this.code = code.toString().substring(code.toString().indexOf('{') + 1, code.toString().lastIndexOf('}'));
        var workerURL = URL.createObjectURL(new Blob([this.code], {
            type: 'text/javascript'
        }));
        this.worker = new Worker(workerURL);
        this.onmessage = function (message) {
            this.currentPromise(message.data);
        }
    };
    
    Thread.prototype.stop = function () {
        this.worker.terminate();
    };
    
    Thread.prototype.setCallback = function (func) {
        this.worker.onmessage = func;
    }
    
    Thread.prototype.call = function () {
        var args = [];
        for (var i = 0; i < arguments.length; i += 1) {
            args.push(arguments[i]);
        }
        this.worker.postMessage(args);
    }
    
    var Beckwith = function(debug) {
        this.DEBUG = !!(debug);
        this.Thread = new Thread(WorkerCode);
        this.log('Beckwith: Ready for service, sir!');
        
    };
    
    Beckwith.prototype = {
        log: function (message, level) {
            var level = level || 'debug';
            if (level === 'error') {
                console.error('Thread: ' + message);
            } else if (level === 'warn') {
                console.error('Thread: ' + message);
            } else if (this.DEBUG) {
                console.log('%c' + message, 'color: #6f3232');
            }
        },
        findPath: function (map, acceptableTiles, startX, startY, endX, endY) {
            this.log('You: Find us that path!');
            var me = this;
            
            this.currentPromise = new Promise(
                function (resolve, reject) {
                    var scope = this;
                    me.Thread.setCallback(function (message) {
                        resolve.call(scope, message.data);
                    });
                    me.log('Beckwith: I found the path sir! I\'ll send it now!');
                    me.Thread.call(map, acceptableTiles, startX, startY, endX, endY);
                }
            );
            
            return this.currentPromise; 
        }
    };
    
    return Beckwith;
    
})();
