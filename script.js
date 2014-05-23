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
    // $http.get("data/users.json").success(function (data) {
    //     $rootScope.loginControl.users = data.users;
    // });


    $scope.$watch(function () {

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


var NZ = [
    "Wellington",
    "Auckland",
    "Christchurch",
    "Hamilton",
     "Dunedin"
];

// var data = JSON.parse(localStorage.getItem("mainSimulation"));
// $scope.figures = {};
// $scope.figures.critRoutes=getRoutesAtALoss();
// $scope.figures.events = numberEvents();
// $scope.figures.sysItems = numItems();
// $scope.figures.sysItemsWeight = itemsWeightInSys();
// $scope.figures.sysItemsVolume = itemsVolumeInSys();

// $scope.figures.totalRevenue = revenue();
// $scope.figures.totalExpenditure = expenditure();
// $scope.figures.averageTime = averTimeDelivery();







// function numItems(){
//     return data.simulation.mail.length;
// }
// function itemsWeightInSys() {
//      var weight=0;
//     for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
       
//         var item = data.simulation.mail[i];

//         weight =  weight + +item.weight;
//     }
//     return weight;
// }
// function itemsVolumeInSys() {

//      var volume=0;
//          console.log(volume);
//     for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
       
//         var item = data.simulation.mail[i];

//         volume =  volume + +item.volume;
//     }
//     console.log(volume);
//     return volume;
// }
// function numberEvents(){
//     return data.simulation.businessEvent.length;
// }
// function averTimeDelivery() {
//      var time=0;
//     for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
       
//         var item = data.simulation.mail[i];

//         var routes = data.simulation.route;
//         for (var x = routes.length - 1; x >= 0; x--) {
//             var currroute = routes[x];
//             if (routes[x].destination === item.destination) {
//                 if (routes[x].origin === item.origin) {
//                     if (routes[x].priority === item.priority) {
//                         route = routes[x];
//                         time = time + +route.duration;

                  
//                     }
//                 }
//             }

//         }
//     }
//     time = (time / data.simulation.mail.length);
//    time = time.toFixed(1).replace(/./g, function (c, i, a) {
//         return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
//     });
//                         console.log("TIME" + time);
//     return time;
// }

// function expenditure() {
  
//     var expenditure = 0;
//     for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
//         var item = data.simulation.mail[i];

//         var routes = data.simulation.route;
//         for (var x = routes.length - 1; x >= 0; x--) {
//             var currroute = routes[x];
//             if (routes[x].destination === item.destination) {
//                 if (routes[x].origin === item.origin) {
//                     if (routes[x].priority === item.priority) {
//                         route = routes[x];
//                         var weightCost = route.weightcost * item.weight;
//                         var volumeCost = route.volumecost * item.volume;
//                         expenditure += (weightCost + volumeCost);
//                     }
//                 }
//             }

//         }
//     }
//     expenditure.toFixed(2).replace(/./g, function (c, i, a) {
//         return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
//     });

//     return expenditure;
// }
// function revenue() {
//     var revenue = 0;
//     for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
//         var item = data.simulation.mail[i];
//         var routes = data.simulation.route;
//         for (var x = routes.length - 1; x >= 0; x--) {
//             var currroute = routes[x];
//             if (routes[x].destination === item.destination) {
//                 if (routes[x].origin === item.origin) {
//                     if (routes[x].priority === item.priority) {
//                         route = routes[x];
//                         var weightCost = route.weightPrice * item.weight;
//                         var volumeCost = route.volumePrice * item.volume;
//                         revenue += (weightCost + volumeCost);
//                     }
//                 }
//             }

//         }
//     }
//     revenue.toFixed(2).replace(/./g, function (c, i, a) {
//         return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
//     });
//     return revenue;
// }
    $http.get("/data/nationalCities.json").success(function (data) {

        cities.NZ = data.NewZealand.cities;
        // console.log(data);
        // console.log(NZ);
    });
// function getRoutesAtALoss(){
//             var routes = data.simulation.route;
//     var crRoutes = [];
//         for (var x = routes.length - 1; x >= 0; x--) {
//             var routePrice= 0;
//             var routeCost =0;
//             var totalItems = 0;
//             for(var i = data.simulation.mail.length - 1; i >= 0; i--){
//                         var item = data.simulation.mail[i];


//                 if (routes[x].destination === item.destination) {
//                     if (routes[x].origin === item.origin) {
//                         if (routes[x].priority === item.priority) {
//                             totalItems +=1;
//                             route = routes[x];
//                             var weightPrice = route.weightPrice * item.weight;
//                             var volumePrice = route.volumePrice * item.volume;

//                             var weightCost = route.weightcost * item.weight;
//                             var volumeCost = route.volumecost * item.volume;
//                             routeCost += (weightCost + volumeCost);
//                             routePrice +=(weightPrice + volumePrice);
//                         }
//                     }
//                 }
//             }
//             routeCost = (routeCost / totalItems);
//             routePrice = (routePrice / totalItems);
//             if(routeCost > routePrice){
//                 var diff = routeCost  -routePrice;
//                 console.log(diff);
//                 crRoutes.push({"Destination" :routes[x].destination, "Origin": routes[x].origin, "Priority":routes[x].priority, "Difference": diff});
//             }

//         }

// return crRoutes;
// //Cost > Price
// }
    // create a message to displa in our view
//  $scope.message = 'Should say some shit about KPSmart';
});

kpsApp.controller('addRouteController', function ($scope, $route, $location, $window, $rootScope) {
    $rootScope.figures = {};
    $rootScope.figures.critRoutes=getRoutesAtALoss();
    $rootScope.figures.events = numberEvents();
    $rootScope.figures.sysItems = numItems();
    $rootScope.figures.sysItemsWeight = itemsWeightInSys();
    $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
    $rootScope.figures.totalRevenue = revenue();
    $rootScope.figures.totalExpenditure = expenditure();
    $rootScope.figures.averageTime = averTimeDelivery();

    // getFigs($scope);/
    var r;
    r = JSON.parse(localStorage.getItem("mainSimulation"));
 var priors = ["International Air", "International Standard", "Domestic Standard", "Domestic Air"];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var types = ["Land", "Air", "Sea"];
    $scope.days = days;
    $scope.types = types;
    $scope.priors = priors;
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
        r.simulation.route.push(newRoute);
    $scope.routeEvent = {
        "event":"",
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
        "volumecost":"",
        "volumePrice":"",
        "weightcost":"",
        "weightPrice":""


    };
var routeEvent = $scope.routeEvent;
        routeEvent.company=newRoute.company;
        routeEvent.day=newRoute.day;
        routeEvent.destination=newRoute.destination;
        routeEvent.duration=newRoute.duration;
        routeEvent.frequency=newRoute.frequency;
        routeEvent.maxVolume=newRoute.maxVolume;
        routeEvent.maxWeight=newRoute.maxWeight;
        routeEvent.origin=newRoute.origin;
        routeEvent.priority=newRoute.priority;
        routeEvent.type=newRoute.type;
        routeEvent.volumeCost=newRoute.volumecost;
        routeEvent.volumePrice=newRoute.volumePrice;
        routeEvent.weightCost=newRoute.weightcost;
        routeEvent.weightPrice=newRoute.weightPrice;
        routeEvent.event = "Add Route";
        r.simulation.businessEvent.push(routeEvent);

        localStorage.setItem("mainSimulation", JSON.stringify(r));

    $rootScope.figures = {};
    $rootScope.figures.critRoutes=getRoutesAtALoss();
    $rootScope.figures.events = numberEvents();
    $rootScope.figures.sysItems = numItems();
    $rootScope.figures.sysItemsWeight = itemsWeightInSys();
    $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
    $rootScope.figures.totalRevenue = revenue();
    $rootScope.figures.totalExpenditure = expenditure();
    $rootScope.figures.averageTime = averTimeDelivery();
        $location.path('/addMailItem');
        
            $route.reload();
    }

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

        for (var x = 0; x < users.user.length; x++) {
            if (users.user[x].ID === $rootScope.loginControl.user.Name
                && users.user[x].Password === $rootScope.loginControl.user.Password) {
                $rootScope.loginControl.user.Type = users.user[x].Type;
                $rootScope.loginControl.loggedIn = true;
                $location.path('/addMailItem')
                break;
            }

        }

    }


});

// ----------------------------Route Summary Controller
kpsApp.controller('routeSummaryController', function ($scope, $filter, ngTableParams) {

    var data = JSON.parse(localStorage.getItem("mainSimulation")).simulation;
    var route = summaryData(data);

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

// ------------------------------Event Log Controller
kpsApp.controller('eventLogController', function ($scope, $filter, ngTableParams) {
    var i = 0;
    var data = JSON.parse(localStorage.getItem("mainSimulation"));
    var businessEvent = data.simulation.businessEvent;
    $scope.current = businessEvent[i];

    $scope.next = function () {
        data = JSON.parse(localStorage.getItem("mainSimulation"));
        businessEvent = data.simulation.businessEvent;
        if(i < data.simulation.businessEvent.length-1){
            i++;
        }
        $scope.current = businessEvent[i];
    }

    $scope.previous = function () {
        data = JSON.parse(localStorage.getItem("mainSimulation"));
        businessEvent = data.simulation.businessEvent;
        if(i > 0){
            i--;
        }
        $scope.current = businessEvent[i];
    }
});

/**
 * Created by Marcus on 5/10/2014.
 */

kpsApp.controller('addMailItemController', function ($scope, $rootScope,$route) {

    var r = JSON.parse(localStorage.getItem("mainSimulation"));


    $rootScope.figures = {};
    $rootScope.figures.critRoutes=getRoutesAtALoss();
    $rootScope.figures.events = numberEvents();
    $rootScope.figures.sysItems = numItems();
    $rootScope.figures.sysItemsWeight = itemsWeightInSys();
    $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
    $rootScope.figures.totalRevenue = revenue();
    $rootScope.figures.totalExpenditure = expenditure();
    $rootScope.figures.averageTime = averTimeDelivery();

    $scope.mailItem = {
        "Width": 0,
        "Height":0,
        "Length":0,
        //Having this throws error
        "Volume": 0,
        "destination": "",
        "origin": "",
        "Weight": "",
        "Price": 0
    };
    $scope.updateMessage = "Currently Pending";
    $scope.cost;

    $scope.data = r.simulation.route;

    $scope.points = ["Auckland","Hamilton","Rotorua","Palmerston North","Wellington","Christchurch","Dunedin"];


    $scope.updateVol = function(mailItem){
        $scope.mailItem.Volume = mailItem.Width * mailItem.Height*mailItem.Length;
        $scope.mailItem.Price =  $scope.newWeightPrice * mailItem.Weight + $scope.newVolumePrice * mailItem.Volume;
    }




    $scope.getRoute = function(mailItem){
        $scope.fromRoute = [];
        //will need to set fromRoute to empty
        if(mailItem.origin == ""
            || mailItem.origin == undefined){

        }
        else {
            graph = buildDirGraph($scope.data);


            for (var i = 0; i < r.simulation.route.length; i++) {
                var dk = shortestPath(graph, mailItem.origin, r.simulation.route[i].destination)
                if (dk != null) {
                    $scope.fromRoute.push(r.simulation.route[i]);

                }
            }
            $scope.updateVol(mailItem);
        }



    };

    $scope.getPrice = function(mailItem){
        var dk = shortestPath(graph, mailItem.origin,mailItem.destination.destination);


        if(dk.path == null){
            return;
        }
        for(var i  = 1 ; i < dk.path.length ; i++){
            var found = false;
            for (var j = 0; j < r.simulation.route.length; j++) {
                if(found == false
                    && dk.path[i-1] == r.simulation.route[j].origin
                    && dk.path[i] == r.simulation.route[j].destination){
                    found = true;
                    dk.volumeCost = parseInt(dk.volumeCost) + parseInt(r.simulation.route[j].volumecost);
                    dk.weightCost = parseInt(dk.weightCost) + parseInt(r.simulation.route[j].weightcost);
                }
            }
            if(found == false){
                console.log("Error");
            }

        }

        $scope.newWeightPrice = dk.volumeCost;
        $scope.newVolumePrice = dk.weightCost;

        $scope.updateVol(mailItem);

    }



    /*############Builds graph and calls shortest path#######*/

    /*###################*/

    $scope.submit = function (mailItem) {


        if(mailItem.destination.maxVolume < mailItem.Volume){
            $scope.updateMessage = "ERROR: Volume to high. Max Volume: " + mailItem.destination.maxVolume;
        }
        else if(mailItem.destination.destination.maxWeight < mailItem.Weight){
            $scope.updateMessage = "ERROR: Weight to high. Max Weight: " + mailItem.destination.maxWeight;
        }
        else{
            var currentdate = new Date();

            var datetime = currentdate.getDate() + "/"+(currentdate.getMonth()+1)
                + "/" + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" + currentdate.getSeconds();

            mailItem.priority = mailItem.destination.priority;

            r.simulation.mail.push(mailItem);


            mailItem.eventName = "Add Mail";
            mailItem.time = datetime;
            r.simulation.businessEvent.push(mailItem);




            localStorage.setItem("mainSimulation",JSON.stringify(r));
            $rootScope.figures = {};
            $rootScope.figures.critRoutes=getRoutesAtALoss();
            $rootScope.figures.events = numberEvents();
            $rootScope.figures.sysItems = numItems();
            $rootScope.figures.sysItemsWeight = itemsWeightInSys();
            $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
            $rootScope.figures.totalRevenue = revenue();
            $rootScope.figures.totalExpenditure = expenditure();
            $rootScope.figures.averageTime = averTimeDelivery();
            $route.reload();

        }}
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


/* James fat controller
 */

kpsApp.controller('updatePriceController', function ($scope, $rootScope) {


    $rootScope.figures = {};
    $rootScope.figures.critRoutes=getRoutesAtALoss();
    $rootScope.figures.events = numberEvents();
    $rootScope.figures.sysItems = numItems();
    $rootScope.figures.sysItemsWeight = itemsWeightInSys();
    $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
    $rootScope.figures.totalRevenue = revenue();
    $rootScope.figures.totalExpenditure = expenditure();
    $rootScope.figures.averageTime = averTimeDelivery();
    var r = JSON.parse(localStorage.getItem("mainSimulation"));
    $scope.data = r.simulation.route;
    $scope.updateMessage = 'Changes Pending';
    $scope.routeEvent = {
        "event":"",
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
        "volumecost":"",
        "volumePrice":"",
        "weightcost":"",
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
        routeEvent.volumecost=$scope.priceBox.volumecost;
        routeEvent.volumePrice=$scope.priceBox.volumePrice;
        routeEvent.weightcost=$scope.priceBox.weightcost;
        routeEvent.weightPrice=$scope.priceBox.weightPrice;
       routeEvent.event = "Change Route";
        r.simulation.businessEvent.push(routeEvent);

        for(var i = 0 ; i < r.simulation.route.length ; i ++)

        { if(compare(routeEvent,r.simulation.route[i]) == true){

         //update here       
            r.simulation.route[i].volumePrice = $scope.priceBox.volumePrice;
            r.simulation.route[i].weightPrice = $scope.priceBox.weightPrice;
             } 
         }



        localStorage.setItem("mainSimulation",JSON.stringify(r));

            $rootScope.figures = {};
    $rootScope.figures.critRoutes=getRoutesAtALoss();
    $rootScope.figures.events = numberEvents();
    $rootScope.figures.sysItems = numItems();
    $rootScope.figures.sysItemsWeight = itemsWeightInSys();
    $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
    $rootScope.figures.totalRevenue = revenue();
    $rootScope.figures.totalExpenditure = expenditure();
    $rootScope.figures.averageTime = averTimeDelivery();

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

kpsApp.controller('updateRouteController', function ($scope, $rootScope) {

                $rootScope.figures = {};
    $rootScope.figures.critRoutes=getRoutesAtALoss();
    $rootScope.figures.events = numberEvents();
    $rootScope.figures.sysItems = numItems();
    $rootScope.figures.sysItemsWeight = itemsWeightInSys();
    $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
    $rootScope.figures.totalRevenue = revenue();
    $rootScope.figures.totalExpenditure = expenditure();
    $rootScope.figures.averageTime = averTimeDelivery();
    var r = JSON.parse(localStorage.getItem("mainSimulation"));
    $scope.data = r.simulation.route;
    $scope.updateMessage = 'Changes Pending';
    $scope.routeEvent = {
        "event":"",
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
        "volumecost":"",
        "volumePrice":"",
        "weightcost":"",
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
        routeEvent.maxWeight=$scope.routeBox.maxWeight;
        routeEvent.origin=$scope.routeBox.origin;
        routeEvent.priority=$scope.routeBox.priority;
        routeEvent.type=$scope.routeBox.type;
        routeEvent.volumecost=$scope.routeBox.volumecost;
        routeEvent.volumePrice=$scope.routeBox.volumePrice;
        routeEvent.weightcost=$scope.routeBox.weightcost;
        routeEvent.weightPrice=$scope.routeBox.weightPrice;
        routeEvent.event = "Change Route";
        r.simulation.businessEvent.push(routeEvent);

        //#####modifying the route data

              for(var i = 0 ; i < r.simulation.route.length ; i ++)

        { if(compare(routeEvent,r.simulation.route[i]) == true){

         //update here       
            r.simulation.route[i].volumecost = $scope.routeBox.volumecost;
           r.simulation.route[i].weightcost = $scope.routeBox.weightcost;
             r.simulation.route[i].maxWeight  = $scope.routeBox.maxWeight ;
           r.simulation.route[i].maxVolume = $scope.routeBox.maxVolume;
             r.simulation.route[i].duration = $scope.routeBox.duration;
           r.simulation.route[i].frequency  = $scope.routeBox.frequency ;
             } 
         }




        localStorage.setItem("mainSimulation",JSON.stringify(r));

                    $rootScope.figures = {};
    $rootScope.figures.critRoutes=getRoutesAtALoss();
    $rootScope.figures.events = numberEvents();
    $rootScope.figures.sysItems = numItems();
    $rootScope.figures.sysItemsWeight = itemsWeightInSys();
    $rootScope.figures.sysItemsVolume = itemsVolumeInSys();
    $rootScope.figures.totalRevenue = revenue();
    $rootScope.figures.totalExpenditure = expenditure();
    $rootScope.figures.averageTime = averTimeDelivery();
      
        $scope.routeBox = null;
        $scope.updateMessage = 'Successfully Updated';

    }

        $scope.cancel = function(){
        $scope.routeBox = null;
        $scope.updateMessage = 'Cancelled Changes';
    }
    $scope.pend =function(){
        $scope.updateMessage = 'Changes Pending'
    }


});





/* Mike : Shortest path finder for the route data*/

/*Graph builder*/
function buildDirGraph(data){
    graph = new DirectedGraph();

    for (var i = 0; i < data.length; i++) {

        var to = data[i].destination;
        var from = data[i].origin;
        var cost = data[i].weightroute + data[i].volumeroute;
        graph.addNode(from);
        graph.addNode(to);
        graph.addEdge(from,to,cost);

    }

    return graph;
}
/*Finds Shortest Path on graph.*/
function shortestPath(graph,start,dest){
    var pathData = {};
    var Dijk = new Dijkstra(graph, start);
    pathData.path = Dijk.bestPath(start,dest);
    pathData.volumeCost = 0;
    pathData.weightCost = 0;

    return pathData;
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
    if(Route1.volumeroute != Route2.volumeroute){ return false; }
    if(Route1.weightCost != Route2.weightCost){ return false; }
    if(Route1.weightroute != Route2.weightroute){ return false; }
    return true; }

function summaryData(data){
    var tableData = [];
    var route = data.route;
    var mail = data.mail;

    for (var i = 0; i < route.length; i++) {
        var summary = {
            "company": route[i].company,
            "origin": route[i].origin,
            "destination": route[i].destination,
            "type":route[i].type,
            "shippedItems":0,
            "costShippedItems":0,
            "priceShippedItems":0,
            "revenue":0,
            "volumeCost": route[i].volumecost,
            "volumePrice": route[i].volumePrice,
            "weightCost": route[i].weightcost,
            "weightPrice": route[i].weightPrice

        }
        tableData[i] = summary;
    }
    /* iterate the mail array, and iterate through the table routes for each mail. If c,o,d match
     * add to the values.
     * */
    for (var j = 0; j < mail.length; j++) {

        var item = mail[j];
        for (var k = 0; k < tableData.length; k++) {
            if(item.origin == tableData[k].origin && item.destination == tableData[k].destination /*&& item.priority == tableData[k].priority*/){
                var temp =  tableData[k];
                var cost = (temp.volumeCost * item.volume + temp.weightCost * item.weight);
                var price = (temp.volumePrice * item.volume + temp.weightPrice * item.weight);
                temp.shippedItems += 1;
                temp.costShippedItems += cost;
                temp.priceShippedItems += price;
                temp.revenue += price - cost;
            }
        }
    }
    return tableData;
}
// function getFigs($scope){

// var data = JSON.parse(localStorage.getItem("mainSimulation"));

// $scope.figures.sysItems = 










// }
function numItems(){
    var data = JSON.parse(localStorage.getItem("mainSimulation"));
    return data.simulation.mail.length;
};


function getRoutesAtALoss(){
        var data = JSON.parse(localStorage.getItem("mainSimulation"));
            var routes = data.simulation.route;
    var crRoutes = [];
        for (var x = routes.length - 1; x >= 0; x--) {
            var routePrice= 0;
            var routeCost =0;
            var totalItems = 0;
            for(var i = data.simulation.mail.length - 1; i >= 0; i--){
                        var item = data.simulation.mail[i];


                if (routes[x].destination === item.destination) {
                    if (routes[x].origin === item.origin) {
                        if (routes[x].priority === item.priority) {
                            totalItems +=1;
                            route = routes[x];
                            var weightPrice = route.weightPrice * item.weight;
                            var volumePrice = route.volumePrice * item.volume;

                            var weightCost = route.weightcost * item.weight;
                            var volumeCost = route.volumecost * item.volume;
                            routeCost += (weightCost + volumeCost);
                            routePrice +=(weightPrice + volumePrice);
                        }
                    }
                }
            }
            routeCost = (routeCost / totalItems);
            routePrice = (routePrice / totalItems);
            if(routeCost > routePrice){
                var diff = routeCost  -routePrice;
                console.log(diff);
                crRoutes.push({"Destination" :routes[x].destination, "Origin": routes[x].origin, "Priority":routes[x].priority, "Difference": diff});
            }

        }

return crRoutes;
//Cost > Price
}

function numberEvents(){
            var data = JSON.parse(localStorage.getItem("mainSimulation"));
    return data.simulation.businessEvent.length;
}

function itemsVolumeInSys() {
            var data = JSON.parse(localStorage.getItem("mainSimulation"));
     var volume=0;
         console.log(volume);
    for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
       
        var item = data.simulation.mail[i];

        volume =  volume + +item.volume;
    }
    console.log(volume);
    return volume;
}
function itemsWeightInSys() {
                var data = JSON.parse(localStorage.getItem("mainSimulation"));
     var weight=0;
    for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
       
        var item = data.simulation.mail[i];

        weight =  weight + +item.weight;
    }
    return weight;
}

function averTimeDelivery() {
                    var data = JSON.parse(localStorage.getItem("mainSimulation"));
     var time=0;
    for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
       
        var item = data.simulation.mail[i];

        var routes = data.simulation.route;
        for (var x = routes.length - 1; x >= 0; x--) {
            var currroute = routes[x];
            if (routes[x].destination === item.destination) {
                if (routes[x].origin === item.origin) {
                    if (routes[x].priority === item.priority) {
                        route = routes[x];
                        time = time + +route.duration;

                  
                    }
                }
            }

        }
    }
    time = (time / data.simulation.mail.length);
   time = time.toFixed(1).replace(/./g, function (c, i, a) {
        return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
    });
                        console.log("TIME" + time);
    return time;
}

function expenditure() {
                    var data = JSON.parse(localStorage.getItem("mainSimulation"));
  
    var expenditure = 0;
    for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
        var item = data.simulation.mail[i];

        var routes = data.simulation.route;
        for (var x = routes.length - 1; x >= 0; x--) {
            var currroute = routes[x];
            if (routes[x].destination === item.destination) {
                if (routes[x].origin === item.origin) {
                    if (routes[x].priority === item.priority) {
                        route = routes[x];
                        var weightCost = route.weightcost * item.weight;
                        var volumeCost = route.volumecost * item.volume;
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
function revenue() {
                    var data = JSON.parse(localStorage.getItem("mainSimulation"));
    var revenue = 0;
    for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
        var item = data.simulation.mail[i];
        var routes = data.simulation.route;
        for (var x = routes.length - 1; x >= 0; x--) {
            var currroute = routes[x];
            if (routes[x].destination === item.destination) {
                if (routes[x].origin === item.origin) {
                    if (routes[x].priority === item.priority) {
                        route = routes[x];
                        var weightCost = route.weightPrice * item.weight;
                        var volumeCost = route.volumePrice * item.volume;
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
