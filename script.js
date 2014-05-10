// script.js

	// create the module and name it scotchApp
	var kpsApp = angular.module('kpsApp', ['ngRoute']);


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
			});
	});


	// create the controller and inject Angular's $scope
	kpsApp.controller('mainController', function($scope) {

		// create a message to display in our view
		$scope.message = 'Should say some shit about KPSmart';
	});


	kpsApp.controller('addRouteController', function($scope){
		$scope.message = 'Should say some shit about routes (Not that Mike gets any)';
	});
	kpsApp.controller('updateRouteController', function($scope){
		$scope.message = 'Should say some shit about up your date';
	});
	kpsApp.controller('updatePriceController', function($scope){
		$scope.message = 'Should say some shit about privey up your date';
	});
