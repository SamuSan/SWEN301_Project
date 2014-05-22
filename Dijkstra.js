/*
 * Dijkstras Algorithm.
 * @author: Mohammad Chehab <chehabz@hotmail.com>
 * @date: April 24, 2013
 * https://github.com/chehabz/JavaScript-Dijkstra-Class/blob/master/Dijkstra.js
 */

/*
 * Edited by Michael Rimmer 21/05/14:
 * Intended to be used for route finding the shortest route.
 * Edited to include the lowest cost on the path output. Added a fix for nodes with no neighbors.
 * Otherwise no changes.
 */

(function () {

    var Dijkstra = function (graph, start) {
        this.Graph = graph;
        this.visited = new Array(graph.size());
        this.distance = new Array(graph.size());
        this.preds = [];
        this.costs = [];
        this.start = start;
        this.initialize();
    };

    var minVertex = function (distance, visitedNodes) {
        var x = MAX_VALUE, y = -1, i;

        for (i = 0; i < distance.length; i++) {
            if (!visitedNodes[i] && distance[i] < x) {
                y = i;
                x = distance[i];
            }
        }
        return y;
    }

    var MAX_VALUE = Number.MAX_VALUE;

    Dijkstra.prototype = {
        distance: [],

        //<summary>
        // initialize
        //</summary>
        initialize: function () {

            var idxStart = this.Graph.indexOf(this.start), i, j;

            for (var i = 0; i < this.Graph.size() ; i++) {
                this.distance[i] = Number.MAX_VALUE;
                this.visited[i] = false;
                this.preds[i] = null;
                this.costs[i] = null;
            }

            this.distance[idxStart] = 0;

            for (i = 0 ; i < this.distance.length; i++) {
                var next = minVertex(this.distance, this.visited);

                this.visited[next] = true;

                // The shortest path to next is dist[next] and via pred[next].

                var neighbors = this.Graph.edgesFrom(this.Graph.nodeAt(next));

                if(neighbors != null && neighbors[0] != void(0)){

                    for (j = 0; j < neighbors.length; j++) {

                        var neighborlength = Number(neighbors[j][1]) + Number(this.distance[next]);
                        var neighbor = neighbors[j][0];
                        var neighborIdx = this.Graph.indexOf(neighbor);

                        if (this.distance[neighborIdx] > neighborlength) {
                            this.distance[neighborIdx] = neighborlength;
                            this.preds[neighborIdx] = next;
                            this.costs[neighborIdx] = this.distance[neighborIdx];
                        }
                    }}

            }
            return this;
        },
        //<summary>
        // Find the best path between 2 nodes.
        //</summary>
        bestPath: function (source, destination) {

            var path = [];
            var end = this.Graph.indexOf(destination);
            var idxSource = this.Graph.indexOf(source);
            var cost;

            if(void(0) == end){
                return null;
            }

            var i = 0;

            while (end != idxSource) {
                i++;
                path.splice(0, 0, this.Graph.nodeAt(end));
                cost = this.costs[end];
                end = this.preds[end];
                if(i > 100) {
                    return null;
                }
            }
            path.splice(0, 0, source);
            return path;
        }
    };

    window.Dijkstra = Dijkstra;

    if (typeof define === "function" && define.amd) {

        define("Dijkstra", [], function () {
            return Dijkstra;
        });
    }
})();
