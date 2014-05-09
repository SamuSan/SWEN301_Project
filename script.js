// script.js

	// create the module and name it scotchApp
	var kpsApp = angular.module('kpsApp', []);

	// create the controller and inject Angular's $scope
	kpsApp.controller('mainController', function($scope) {

		// create a message to display in our view
		$scope.message = 'Should say some shit about KPSmart';
	});
