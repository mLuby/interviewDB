angular.module('tile', [])
.directive('tile', function(){
  return {
    restrict: 'E',
    template: '<div ng-transclude ng-click="select()"></div>',
    replace: false,
    transclude: true
  };
})
.directive('option', function(){
  return {
    restrict: 'A',
    controller: function ($scope, $element){
      $scope.select = function(){
        console.log('clicked', $element);
        $element.addClass('selected');
      };
    }
  };
})

