// script.js

	// create the module and name it scotchApp
<<<<<<< HEAD
=======
	var kpsApp = angular.module('kpsApp', ['ngRoute', 'ngTable']);
>>>>>>> origin/fb-alex

	var kpsApp = angular.module('kpsApp', ['ngRoute']);

var NZ;
kpsApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/#', {
				templateUrl : 'index.html',
				controller  : 'mainController'
			})

			.when('/addMailItem', {
				templateUrl : 'pages/addMailItem.html',
				controller  : 'addMailItemController'
			})
			.when('/addRoute', {
				templateUrl : 'pages/addRoute.html',
				controller  : 'addRouteController'
			})
			.when('/updateRoute', {
				templateUrl : 'pages/updateRoute.html',
				controller  : 'updateRouteController'
			})
			.when('/updatePrice', {
				templateUrl : 'pages/updatePrice.html',
				controller  : 'updatePriceController'
			})
<<<<<<< HEAD
			.when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
=======
			.when('/monitoring', {
				templateUrl : 'pages/monitoring.html',
				controller  : 'monitorController'
>>>>>>> origin/fb-alex
			});
	});
// Array.prototype.contains = function(obj) {
//     var i = this.length;
//     while (i--) {
//         if (this[i].ID === obj) {
//             return true;
//         }
//     }
//     return false;
// }
// function expenditure(data){
// 		var expenditure = 0;
// 		for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
// 			var item = data.simulation.mail[i];
// 			var origin = "";
// 			if(NZ.contains(item.from)){
// 				origin = "New Zealand";
// 			}
// 			else{
// 				origin = item.from;
// 			}

// 			var prices = data.simulation.price;
// 			for (var x = prices.length - 1; x >= 0; x--) {
// 				var currPrice = prices[x];
// 				if(prices[x].to ===  item.to){
// 					if(prices[x].from === origin){
// 						if(prices[x].priority === item.priority){
// 							price = prices[x];
// 							var weightCost = price.weightcost * item.weight;
// 							var volumeCost = price.volumecost * item.volume;
// 							revenue+=(weightCost+volumeCost);
// 						}
// 					}
// 				}
				
// 			};



// 		};
// 		expenditure.toFixed(2).replace(/./g, function(c, i, a) {
//    			 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
// 		});
// 		return expenditure;
// 		};

// function revenue(data){
// 		var revenue = 0;
// 		for (var i = data.simulation.mail.length - 1; i >= 0; i--) {
// 			var item = data.simulation.mail[i];
// 			var origin = "";
// 			if(NZ.contains(item.from)){
// 				origin = "New Zealand";
// 			}
// 			else{
// 				origin = item.from;
// 			}

// 			var prices = data.simulation.price;
// 			for (var x = prices.length - 1; x >= 0; x--) {
// 				var currPrice = prices[x];
// 				if(prices[x].to ===  item.to){
// 					if(prices[x].from === origin){
// 						if(prices[x].priority === item.priority){
// 							price = prices[x];
// 							var weightCost = price.weightcost * item.weight;
// 							var volumeCost = price.volumecost * item.volume;
// 							revenue+=(weightCost+volumeCost);
// 						}
// 					}
// 				}
				
// 			};



// 		};
// 		revenue.toFixed(2).replace(/./g, function(c, i, a) {
//    			 return i && c !== "." && !((a.length - i) % 3) ? ',' + c : c;
// 		});
// 		return revenue;
// 		};
	// create the controller and inject Angular's $scope
	kpsApp.controller('mainController', function($scope, $http) {

		$http.get("http://localhost:8000/data/nationalCities.json").success(function(data){

		NZ = data.NewZealand.cities;

		console.log(data);
		console.log(NZ);

});


		$http.get("http://localhost:8000/data/master_simulation.json").success(function(data){

		$scope.numItems = data.simulation.mail.length;
		var rev = revenue(data);
		var exp = expenditure(data);
		var time = deliveryTimes(data);

		console.log(data);
		console.log(rev);
		console.log(exp);
		console.log(time);
		$scope.totalRevenue = rev;
		$scope.totalExpenditure = exp;
		$scope.averageTime = time;
});

		// create a message to display in our view
		$scope.message = 'Should say some shit about KPSmart';
	});

	kpsApp.controller('addMailItemController', function($scope){
		$scope.message = 'Should say some shit about mail items';
	});
	kpsApp.controller('addRouteController', function($scope){
		$scope.message = 'Should say some shit about routes (Not that Mike gets any)';
	});
	kpsApp.controller('updateRouteController', function($scope){
		$scope.message = 'Should say some shit about up your date';
	});
	kpsApp.controller('updatePriceController', function($scope){
		$scope.message = 'Should say some shit about privey up your date';
	})
		kpsApp.controller('loginController', function($scope,$rootScope,AUTH_EVENTS,AuthService){



		$scope.message = 'Should say some shit about privey up your date';
	});

// Monitor Controller
kpsApp.controller('monitorController', function($scope, $http, $filter, ngTableParams) {

    var data = [
	    {
	        id: "1", 
	        startDate: "1st March 2014", 
	        endDate: "31st March 2014", 
	        revenue: "456,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: "2.5"
	    }, 
	    {
	        id: "2", 
	        startDate: "1st February 2014", 
	        endDate: "28th February 2014", 
	        revenue: "567,000",
	        expenditure: "132,000",
	        averageDeliveryTimes: 2.2
	    }, 
	    {
	        id: "3", 
	        startDate: "1st January 2013", 
	        endDate: "31st January 2013", 
	        revenue: "356,000",
	        expenditure: "143,000",
	        averageDeliveryTimes: 2.7
	    }, 
	    {
	        id: "4", 
	        startDate: "1st December 2013", 
	        endDate: "31st December 2013", 
	        revenue: "436,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: 2.5
	    }, 
	    {
	        id: "5", 
	        startDate: "1st November 2013", 
	        endDate: "30th November 2013", 
	        revenue: "556,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: 2.5
	    }, 
	    {
	        id: "6", 
	        startDate: "1st October 2013", 
	        endDate: "31st October 2013", 
	        revenue: "656,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: 2.5
	    },
	    {
	        id: "7", 
	        startDate: "1st March 2013", 
	        endDate: "31st March 2013", 
	        revenue: "456,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: "2.5"
	    }, 
	    {
	        id: "8", 
	        startDate: "1st February 2013", 
	        endDate: "28th February 2013", 
	        revenue: "567,000",
	        expenditure: "132,000",
	        averageDeliveryTimes: 2.2
	    }, 
	    {
	        id: "9", 
	        startDate: "1st January 2012", 
	        endDate: "31st January 2012", 
	        revenue: "356,000",
	        expenditure: "143,000",
	        averageDeliveryTimes: 2.7
	    }, 
	    {
	        id: "10", 
	        startDate: "1st December 2012", 
	        endDate: "31st December 2012", 
	        revenue: "436,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: 2.5
	    }, 
	    {
	        id: "11", 
	        startDate: "1st November 2012", 
	        endDate: "30th November 2012", 
	        revenue: "556,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: 2.5
	    }, 
	    {
	        id: "12", 
	        startDate: "1st October 2012", 
	        endDate: "31st October 2012", 
	        revenue: "656,000",
	        expenditure: "123,000",
	        averageDeliveryTimes: 2.5
	    }
	];

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        sorting: {
            id: 'asc'     // initial sorting
        }
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ?
                                $filter('orderBy')(data, params.orderBy()) :
                                data;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
});
