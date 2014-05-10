/**
 * Created by Marcus on 5/10/2014.
 */

kpsApp.controller('addMailItemController', function($scope,filefetch){
    $scope.price = 'priceless';

    filefetch.fetch().then(function(data){
        $scope.routes = data;
    })
});

kpsApp.directive('customValidation', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {

                var transformedInput = inputValue.split('').filter(function (s) { return ((!isNaN(s) || s == '.') && s != ' '); }).join('');

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});

/*the factory which gets files. Called by the controller*/
kpsApp.factory('filefetch', function($q, $timeout, $http) {
    var getFile = {
        fetch: function(callback) {

            var deferred = $q.defer();

            $timeout(function() {
                $http.get('../route.json').success(function(data) {
                    deferred.resolve(data);
                });
            }, 30);
            return deferred.promise;
        }
    };
    return getFile;
});