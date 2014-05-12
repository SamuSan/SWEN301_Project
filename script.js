// script.js

	// create the module and name it scotchApp
	var kpsApp = angular.module('kpsApp', ['ngRoute', 'ngTable']);


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
			.when('/monitoring', {
				templateUrl : 'pages/monitoring.html',
				controller  : 'monitorController'
			});
	});


	// create the controller and inject Angular's $scope
	kpsApp.controller('mainController', function($scope) {

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