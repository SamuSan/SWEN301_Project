/**
 * Created by Marcus on 5/10/2014.
 */

var routes = []

kpsApp.controller('addMailItemController', function($scope,filefetch){

    filefetch.fetch().then(function(data){
        $scope.data = data;
        routes = data;
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
kpsApp.factory('filefetch', function($q, $http) {
    var getFile = {
        fetch: function(callback) {

            var deferred = $q.defer();

                $http.get('../route.json').success(function(data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        }
    };
    return getFile;
});