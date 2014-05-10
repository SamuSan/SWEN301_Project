// script.js

	// create the module and name it scotchApp

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
			.when('/login', {
				templateUrl : 'pages/login.html',
				controller  : 'loginController'
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

		console.log(data);
		console.log(rev);
		$scope.totalRevenue = rev;
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
