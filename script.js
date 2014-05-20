// script.js
var kpsApp = angular.module('kpsApp', ['ngRoute', 'ngTable']);


var NZ;
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
        .when('/monitoring', {
            templateUrl: 'pages/monitoring.html',
            controller: 'monitorController',
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
    console.log($rootScope.loginControl.loggedIn)
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
        else if ($rootScope.loginControl.loggedIn === true && newPath !=='/monitoring') {
            $location.path(newPath);
        }
        else if($rootScope.loginControl.loggedIn === true && newPath ==='/monitoring'
            && $rootScope.loginControl.user.Type === 'Admin'){
            $location.path(newPath);
        }
        else if ($rootScope.loginControl.loggedIn === true && newPath ==='/monitoring'
            && $rootScope.loginControl.user.Type !== 'Admin'){
            $location.path('/');
        }
    });

    var cities = {};

    if (localStorage.getItem("mainSimulation") == "undefined") {
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
//	$scope.message = 'Should say some shit about KPSmart';
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
        "to": "",
        "type": "",
        "weightCost": "",
        "volumeCost": "",
        "maxWeight": "",
        "maxVolume": "",
        "duration": "",
        "frequency": "",
        "departs": ""
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
        "Password": ""

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
                $rootScope.loginControl.loggedIn = true;
                $location.path('/addMailItem')
                break;
            }

        }
        console.log($rootScope.loginControl.user.Name);
    }


});

// Monitor Controller
kpsApp.controller('monitorController', function ($scope, $http, $filter, ngTableParams) {

    $http.get("data/business_figures.json").success(function (data) {

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                id: 'asc'     // initial sorting
            }
        }, {
            total: data.length, // length of data
            getData: function ($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ?
                    $filter('orderBy')(data, params.orderBy()) :
                    data;

                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    });
});

/**
 * Created by Marcus on 5/10/2014.
 */

kpsApp.controller('addMailItemController', function ($scope) {

    var r = JSON.parse(localStorage.getItem("mainSimulation")).simulation;

    $scope.mailItem = {
        "Volume": "",
        "To": "",
        "From": "",
        "Weight": "",
        "Price": ""
    };

    $scope.data = r.route;


    $scope.submit = function (mailItem) {

        //Not working atm
        //r.route.push(mailItem);
        //r.businessEvents.push(mailItem);
        //localStorage.setItem("mainSimulation",JSON.stringify(r));

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

kpsApp.controller('updatePriceController', function ($scope, pricefetch) {


    pricefetch.fetch().then(function (data) {
        $scope.data = data;
        $scope.selectBox3 = data[0];
        var weight = selectBox3.weightcost;


    })
});

kpsApp.factory('pricefetch', function ($q, $http) {
    var getFile = {
        fetch: function (callback) {

            var deferred = $q.defer();

            $http.get('../data/prices.json').success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    };
    return getFile;
});
//########################update route

kpsApp.controller('updateRouteController', function ($scope, pricefetch) {


    pricefetch.fetch().then(function (data) {
        $scope.data = data;
        $scope.routeSelect = data[0];
    })
});

kpsApp.factory('pricefetch', function ($q, $http) {
    var getFile = {
        fetch: function (callback) {

            var deferred = $q.defer();

            $http.get('../data/prices.json').success(function (data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        }
    };
    return getFile;
});

