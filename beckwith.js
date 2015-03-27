/*************************************
*	Beckwith                         *
*	github.com/howderek/Beckwith     *
*   (c) 2015 Derek Howard            *
*	Licensed under the MIT license.  *
**************************************/    
var Beckwith = (function () {
    //Guts of this function to be injected into a WebWorker using a Blob
    function WorkerCode() {
       // javascript-astar 0.4.0
       // http://github.com/bgrins/javascript-astar
       // Freely distributable under the MIT License.
       // Implements the astar search algorithm in javascript using a Binary Heap.
       // Includes Binary Heap (with modifications) from Marijn Haverbeke.
       // http://eloquentjavascript.net/appendix2.html
        
        !function(a){if("object"==typeof module&&"object"==typeof module.exports)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b=a();astar=b.astar,Graph=b.Graph}}(function(){function a(a){for(var b=a,c=[];b.parent;)c.push(b),b=b.parent;return c.reverse()}function b(){return new f(function(a){return a.f})}function d(a,b){b=b||{},this.nodes=[],this.diagonal=!!b.diagonal,this.grid=[];for(var c=0;c<a.length;c++){this.grid[c]=[];for(var d=0,f=a[c];d<f.length;d++){var g=new e(c,d,f[d]);this.grid[c][d]=g,this.nodes.push(g)}}this.init()}function e(a,b,c){this.x=a,this.y=b,this.weight=c}function f(a){this.content=[],this.scoreFunction=a}var c={search:function(d,e,f,g){d.cleanDirty(),g=g||{};var h=g.heuristic||c.heuristics.manhattan,i=g.closest||!1,j=b(),k=e;for(e.h=h(e,f),j.push(e);j.size()>0;){var l=j.pop();if(l===f)return a(l);l.closed=!0;for(var m=d.neighbors(l),n=0,o=m.length;o>n;++n){var p=m[n];if(!p.closed&&!p.isWall()){var q=l.g+p.getCost(l),r=p.visited;(!r||q<p.g)&&(p.visited=!0,p.parent=l,p.h=p.h||h(p,f),p.g=q,p.f=p.g+p.h,d.markDirty(p),i&&(p.h<k.h||p.h===k.h&&p.g<k.g)&&(k=p),r?j.rescoreElement(p):j.push(p))}}}return i?a(k):[]},heuristics:{manhattan:function(a,b){var c=Math.abs(b.x-a.x),d=Math.abs(b.y-a.y);return c+d},diagonal:function(a,b){var c=1,d=Math.sqrt(2),e=Math.abs(b.x-a.x),f=Math.abs(b.y-a.y);return c*(e+f)+(d-2*c)*Math.min(e,f)}},cleanNode:function(a){a.f=0,a.g=0,a.h=0,a.visited=!1,a.closed=!1,a.parent=null}};return d.prototype.init=function(){this.dirtyNodes=[];for(var a=0;a<this.nodes.length;a++)c.cleanNode(this.nodes[a])},d.prototype.cleanDirty=function(){for(var a=0;a<this.dirtyNodes.length;a++)c.cleanNode(this.dirtyNodes[a]);this.dirtyNodes=[]},d.prototype.markDirty=function(a){this.dirtyNodes.push(a)},d.prototype.neighbors=function(a){var b=[],c=a.x,d=a.y,e=this.grid;return e[c-1]&&e[c-1][d]&&b.push(e[c-1][d]),e[c+1]&&e[c+1][d]&&b.push(e[c+1][d]),e[c]&&e[c][d-1]&&b.push(e[c][d-1]),e[c]&&e[c][d+1]&&b.push(e[c][d+1]),this.diagonal&&(e[c-1]&&e[c-1][d-1]&&b.push(e[c-1][d-1]),e[c+1]&&e[c+1][d-1]&&b.push(e[c+1][d-1]),e[c-1]&&e[c-1][d+1]&&b.push(e[c-1][d+1]),e[c+1]&&e[c+1][d+1]&&b.push(e[c+1][d+1])),b},d.prototype.toString=function(){for(var c,d,e,f,a=[],b=this.grid,g=0,h=b.length;h>g;g++){for(c=[],d=b[g],e=0,f=d.length;f>e;e++)c.push(d[e].weight);a.push(c.join(" "))}return a.join("\n")},e.prototype.toString=function(){return"["+this.x+" "+this.y+"]"},e.prototype.getCost=function(a){return a&&a.x!=this.x&&a.y!=this.y?1.41421*this.weight:this.weight},e.prototype.isWall=function(){return 0===this.weight},f.prototype={push:function(a){this.content.push(a),this.sinkDown(this.content.length-1)},pop:function(){var a=this.content[0],b=this.content.pop();return this.content.length>0&&(this.content[0]=b,this.bubbleUp(0)),a},remove:function(a){var b=this.content.indexOf(a),c=this.content.pop();b!==this.content.length-1&&(this.content[b]=c,this.scoreFunction(c)<this.scoreFunction(a)?this.sinkDown(b):this.bubbleUp(b))},size:function(){return this.content.length},rescoreElement:function(a){this.sinkDown(this.content.indexOf(a))},sinkDown:function(a){for(var b=this.content[a];a>0;){var c=(a+1>>1)-1,d=this.content[c];if(!(this.scoreFunction(b)<this.scoreFunction(d)))break;this.content[c]=b,this.content[a]=d,a=c}},bubbleUp:function(a){for(var b=this.content.length,c=this.content[a],d=this.scoreFunction(c);;){var h,e=a+1<<1,f=e-1,g=null;if(b>f){var i=this.content[f];h=this.scoreFunction(i),d>h&&(g=f)}if(b>e){var j=this.content[e],k=this.scoreFunction(j);(null===g?d:h)>k&&(g=e)}if(null===g)break;this.content[a]=this.content[g],this.content[g]=c,a=g}}},{astar:c,Graph:d}});

        
        function work(map, startX, startY, endX, endY) {
            var graph = new Graph(map),
                start = graph.grid[startY][startX],
                end = graph.grid[endY][endX];
            postMessage(astar.search(graph, start, end));
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
        findPath: function (map, startX, startY, endX, endY) {
            this.log('You: Find us that path!');
            var me = this;
            
            this.currentPromise = new Promise(
                function (resolve, reject) {
                    var scope = this;
                    me.Thread.setCallback(function (message) {
                        resolve.call(scope, message.data);
                    });
                    me.log('Beckwith: I found the path sir! I\'ll send it now!');
                    me.Thread.call(map, startX, startY, endX, endY);
                }
            );
            
            return this.currentPromise; 
        }
    };
    
    return Beckwith;
    
})();
