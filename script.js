// script.js
var kpsApp = angular.module('kpsApp', ['ngRoute', 'ngTable']);
var NZ;
var graph;

kpsApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'pages/login.html',
            controller: 'loginController'
        })
        .when('/addMailItem', {
            templateUrl: 'pages/addMailItem.html',
            controller: 'addMailItemController',
            loginReq: true,
            adminAccess: false
        })
        .when('/addRoute', {
            templateUrl: 'pages/addRoute.html',
            controller: 'addRouteController',
            loginReq: true,
            adminAccess: false
        })
        .when('/updateRoute', {
            templateUrl: 'pages/updateRoute.html',
            controller: 'updateRouteController',
            loginReq: true,
            adminAccess: false
        })
        .when('/updatePrice', {
            templateUrl: 'pages/updatePrice.html',
            controller: 'updatePriceController',
            loginReq: true,
            adminAccess: false
        })
        .when('/routeSummary', {
            templateUrl: 'pages/routeSummary.html',
            controller: 'routeSummaryController',
            loginReq: true,
            adminAccess: true
        })
        .when('/eventLog', {
            templateUrl: 'pages/eventLog.html',
            controller: 'eventLogController',
            loginReq: true,
            adminAccess: true
        });
});


// create the controller and inject Angular's $scope
kpsApp.controller('mainController', function ($scope, $http, $location, $rootScope) {

    $rootScope.loginControl = {
        user: {},
        users: []
    };
    $rootScope.loginControl.set = false;
    if ($rootScope.loginControl.set === false) {
        $rootScope.loginControl.loggedIn = false;
        $rootScope.loginControl.set = true;
    }
    $rootScope.users = {};
    $http.get("data/users.json").success(function (data) {
        $rootScope.loginControl.users = data.users;
    });


    $scope.$watch(function () {
//        console.log($location.path());
        return $location.path();
    }, function (newPath, oldPath) {
        if ($rootScope.loginControl.loggedIn === false) {
            $location.path('/');
        }
        else if ($rootScope.loginControl.loggedIn === true && (newPath !=='/routeSummary' || newPath !=='/eventLog')) {
            $location.path(newPath);
        }
        else if($rootScope.loginControl.loggedIn === true && (newPath ==='/routeSummary' || newPath ==='/eventLog')
            && $rootScope.loginControl.user.Type === 'Admin'){
            $location.path(newPath);
        }
        else if ($rootScope.loginControl.loggedIn === true && (newPath ==='/routeSummary' || newPath ==='/eventLog')
            && $rootScope.loginControl.user.Type !== 'Admin'){
            $location.path('/');
        }
    });

    var cities = {};
    if (localStorage.getItem("mainSimulation") == null || localStorage.getItem("mainSimulation") == 'undefined') {
        $http.get("data/master_simulation.json").success(function (data) {
            localStorage.setItem("mainSimulation", JSON.stringify(data));
        });
    }
    $http.get("/data/nationalCities.json").success(function (data) {

        cities.NZ = data.NewZealand.cities;
        console.log(data);
        console.log(NZ);
    });

    // create a message to displa in our view
//  $scope.message = 'Should say some shit about KPSmart';
});

kpsApp.controller('addRouteController', function ($scope) {
    var r;
    r = JSON.parse(localStorage.getItem("mainSimulation"));

    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var types = ["Land", "Air", "Sea"];
    $scope.days = days;
    $scope.types = types;
    $scope.placeHolder = "*";
    $scope.addRoute = {
        "company": "",
        "day":"",
        "destination": "",
        "duration":"",
        "frequency":"",
        "maxVolume":"",
        "maxVolume":"",
        "origin":"",
        "priority":"",
        "type":"",
        "volumeCost":"",
        "volumePrice":"",
        "weightCost":"",
        "weightPrice":""


    };
    $scope.submit = function () {
        var newRoute = $scope.addRoute;
        console.log(newRoute);
        r.simulation.route.push(newRoute);

        console.log(r);
        localStorage.setItem("mainSimulation", JSON.stringify(r));

    }
});

kpsApp.controller('updateRouteController', function ($scope) {


    $scope.message = 'Should say some shit about up your date';
});

kpsApp.controller('updatePriceController', function ($scope) {
    $scope.message = 'Should say some shit about privey up your date';
});

kpsApp.controller('loginController', function ($scope, $rootScope, $location) {

    $scope.user = {
        "Name": "",
        "Password": "",
        "Type":""
    };

    $scope.logUser = function () {
        var users = {
            "user": [
                {
                    "ID": "Samu",
                    "Password": "XX",
                    "Type": "Post"
                },
                {
                    "ID": "James",
                    "Password": "XX",
                    "Type": "Admin"
                }
            ]
        }


        $rootScope.loginControl.user = $scope.user;
        console.log($rootScope.loginControl.user);


        for (var x = 0; x < users.user.length; x++) {
            if (users.user[x].ID === $rootScope.loginControl.user.Name
                && users.user[x].Password === $rootScope.loginControl.user.Password) {
                $rootScope.loginControl.user.Type = users.user[x].Type;
                $rootScope.loginControl.loggedIn = true;
                $location.path('/addMailItem')
                break;
            }

        }
        console.log($rootScope.loginControl.user.Name);
    }


});

// Route Summary Controller
kpsApp.controller('routeSummaryController', function ($scope, $filter, ngTableParams) {

    var data = JSON.parse(localStorage.getItem("mainSimulation")).simulation;
    var route = data.route;

    $scope.tableParamsRoute = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            company: 'asc'     // initial sorting
        }
    }, {
        total: route.length, // length of route
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                $filter('orderBy')(route, params.orderBy()) :
                route;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});

// Event Log Controller
kpsApp.controller('eventLogController', function ($scope, $filter, ngTableParams) {

    var data = JSON.parse(localStorage.getItem("mainSimulation"));
    // !!!
    // !!!
    var businessEvent = data.simulation.businessEvent;//data.mail; // It is currently mail as using data.businessEvent causes an error

    $scope.tableParamsEvent = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            company: 'asc'     // initial sorting
        }
    }, {
        total: businessEvent.length, // length of businessEvent
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                $filter('orderBy')(businessEvent, params.orderBy()) :
                businessEvent;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});

/**
 * Created by Marcus on 5/10/2014.
 */

kpsApp.controller('addMailItemController', function ($scope) {

    var r = JSON.parse(localStorage.getItem("mainSimulation"));

    $scope.mailItem = {
        "Volume": 0,
        "To": "",
        "From": "",
        "Weight": "",
        "Price": 0
    };

    $scope.cost;

    $scope.data = r.simulation.route;


    $scope.getRoute = function(mailItem){
        $scope.fromRoute = [];
        //will need to set fromRoute to empty
        if(mailItem.From == ""
            || mailItem.From == undefined){

        }
        else {
            graph = buildDirGraph($scope.data);

            for (var i = 0; i < r.simulation.route.length; i++) {
                if (shortestPath(graph, mailItem.From.origin, r.simulation.route[i].destination) != null) {
                    $scope.fromRoute.push(r.simulation.route[i]);
                }
            }
        }



    };

    /*############Builds graph and calls shortest path#######*/

    /*###################*/

    $scope.submit = function (mailItem) {

        var currentdate = new Date();

        var datetime = currentdate.getDate() + "/"+(currentdate.getMonth()+1)
            + "/" + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":" + currentdate.getSeconds();

        mailItem.priority = mailItem.From.priority;

        r.simulation.route.push(mailItem);


        mailItem.eventName = "Add Mail";
        mailItem.time = datetime;
        r.simulation.businessEvent.push(mailItem);



        localStorage.setItem("mainSimulation",JSON.stringify(r));

    }
});

kpsApp.directive('customValidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {

                var transformedInput = inputValue.split('').filter(function (s) {
                    return ((!isNaN(s) || s == '.') && s != ' ');
                }).join('');

                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i].ID === obj) {
            return true;
        }
    }
    return false;
}
function expenditure(data) {
    var expenditure = 0;
    for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
        var item = data.simulation.mail[i];
        var origin = "";
        if (NZ.contains(item.from)) {
            origin = "New Zealand";
        }
        else {
            origin = item.from;
        }

        var prices = data.simulation.price;
        for (var x = prices.length - 1; x >= 0; x--) {
            var currPrice = prices[x];
            if (prices[x].to === item.to) {
                if (prices[x].from === origin) {
                    if (prices[x].priority === item.priority) {
                        price = prices[x];
                        var weightCost = price.weightcost * item.weight;
                        var volumeCost = price.volumecost * item.volume;
                        expenditure += (weightCost + volumeCost);
                    }
                }
            }

        }
    }
    expenditure.toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
    });
    return expenditure;
}
function revenue(data, NZ) {
    var revenue = 0;
    for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
        var item = data.simulation.mail[i];
        var origin = "";
        if (NZ.contains(item.from)) {
            origin = "New Zealand";
        }
        else {
            origin = item.from;
        }

        var prices = data.simulation.price;
        for (var x = prices.length - 1; x >= 0; x--) {
            var currPrice = prices[x];
            if (prices[x].to === item.to) {
                if (prices[x].from === origin) {
                    if (prices[x].priority === item.priority) {
                        price = prices[x];
                        var weightCost = price.weightcost * item.weight;
                        var volumeCost = price.volumecost * item.volume;
                        revenue += (weightCost + volumeCost);
                    }
                }
            }

        }
    }
    revenue.toFixed(2).replace(/./g, function (c, i, a) {
        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
    });
    return revenue;
}

/* James fat controller
 */

kpsApp.controller('updatePriceController', function ($scope) {

    var r = JSON.parse(localStorage.getItem("mainSimulation"));
    $scope.data = r.simulation.route;
    $scope.updateMessage = 'Changes Pending';
    $scope.routeEvent = {
        "company": "",
        "day":"",
        "destination": "",
        "duration":"",
        "frequency":"",
        "maxVolume":"",
        "maxWeight":"",
        "origin":"",
        "priority":"",
        "type":"",
        "volumeCost":"",
        "volumePrice":"",
        "weightCost":"",
        "weightPrice":""


    };

    $scope.submit = function () {

        var routeEvent = $scope.routeEvent;
        //r.route.push(routeEvent);

        /*yeah shut up i know its ugly*/
        routeEvent.company=$scope.priceBox.company;
        routeEvent.day=$scope.priceBox.day;
        routeEvent.destination=$scope.priceBox.destination;
        routeEvent.duration=$scope.priceBox.duration;
        routeEvent.frequency=$scope.priceBox.frequency;
        routeEvent.maxVolume=$scope.priceBox.maxVolume;
        routeEvent.maxWeight=$scope.priceBox.maxWeight;
        routeEvent.origin=$scope.priceBox.origin;
        routeEvent.priority=$scope.priceBox.priority;
        routeEvent.type=$scope.priceBox.type;
        routeEvent.volumeCost=$scope.priceBox.volumecost;
        routeEvent.volumePrice=$scope.priceBox.volumePrice;
        routeEvent.weightCost=$scope.priceBox.weightcost;
        routeEvent.weightPrice=$scope.priceBox.weightPrice;
        routeEvent.eventName = "Price Change";
        r.simulation.businessEvent.push(routeEvent);

        for(var i = 0 ; i < r.simulation.route.length ; i ++)

        { if(compare(routeEvent,r.simulation.route[i]) == true){

         //update here       
            r.simulation.route[i].volumePrice = $scope.priceBox.volumePrice;
            r.simulation.route[i].weightPrice = $scope.priceBox.weightPrice;
             } 
         }

        console.log(routeEvent);

        localStorage.setItem("mainSimulation",JSON.stringify(r));

        $scope.priceBox = null;
        $scope.updateMessage = 'Successfully Updated';
    }
    $scope.cancel = function(){
        $scope.priceBox = null;
        $scope.updateMessage = 'Cancelled Changes';
    }
    $scope.pend =function(){
        $scope.updateMessage = 'Changes Pending'
    }
});


//########################update route

kpsApp.controller('updateRouteController', function ($scope) {
    var r = JSON.parse(localStorage.getItem("mainSimulation"));
    $scope.data = r.simulation.route;
    $scope.routeEvent = {
        "company": "",
        "day":"",
        "destination": "",
        "duration":"",
        "frequency":"",
        "maxVolume":"",
        "maxWeight":"",
        "origin":"",
        "priority":"",
        "type":"",
        "volumeCost":"",
        "volumePrice":"",
        "weightCost":"",
        "weightPrice":""


    };

    $scope.submit = function () {

        var routeEvent = $scope.routeEvent;
       

        /*yeah shut up i know its ugly*/
        routeEvent.company=$scope.routeBox.company;
        routeEvent.day=$scope.routeBox.day;
        routeEvent.destination=$scope.routeBox.destination;
        routeEvent.duration=$scope.routeBox.duration;
        routeEvent.frequency=$scope.routeBox.frequency;
        routeEvent.maxVolume=$scope.routeBox.maxVolume;
        routeEvent.maxWeight=$scope.priceBox.maxWeight;
        routeEvent.origin=$scope.routeBox.origin;
        routeEvent.priority=$scope.routeBox.priority;
        routeEvent.type=$scope.routeBox.type;
        routeEvent.volumeCost=$scope.routeBox.volumecost;
        routeEvent.volumePrice=$scope.routeBox.volumePrice;
        routeEvent.weightCost=$scope.routeBox.weightcost;
        routeEvent.weightPrice=$scope.routeBox.weightPrice;
        routeEvent.eventName = "Route update";
        r.simulation.businessEvent.push(routeEvent);

        console.log(routeEvent);

        localStorage.setItem("mainSimulation",JSON.stringify(r));

        $scope.message="saved";
        $scope.routeBox = null;

    }


});



/* Mike : Shortest path finder for the route data*/

/*Graph builder*/
function buildDirGraph(data){
    graph = new DirectedGraph();

    for (var i = 0; i < data.length; i++) {

        var to = data[i].destination;
        var from = data[i].origin;
        var cost = data[i].weightPrice + data[i].volumePrice;
        graph.addNode(from);
        graph.addNode(to);
        graph.addEdge(from,to,cost);

    }

    return graph;
}
/*Finds Shortest Path on graph.*/
function shortestPath(graph,start,dest){
    var path = [];
    var Dijk = new Dijkstra(graph, start);
    path = Dijk.bestPath(start,dest);
    return path;
}

function compare(Route1, Route2){
if(Route2 == undefined){return false;}
    if(Route1.company != Route2.company){ return false; }
    if(Route1.day != Route2.day){ return false; }
    if(Route1.destination != Route2.destination){ return false; }
    if(Route1.frequency != Route2.frequency){ return false; }
    if(Route1.maxVolume != Route2.maxVolume){ return false; }
    if(Route1.maxWeight != Route2.maxWeight){ return false; }
    if(Route1.origin != Route2.origin){ return false; }
    if(Route1.priority != Route2.priority){ return false; }
    if(Route1.volumeCost != Route2.volumeCost){ return false; }
    if(Route1.type != Route2.type){ return false; }
    if(Route1.volumePrice != Route2.volumePrice){ return false; }
    if(Route1.weightCost != Route2.weightCost){ return false; }
    if(Route1.weightPrice != Route2.weightPrice){ return false; }
    return true; }
