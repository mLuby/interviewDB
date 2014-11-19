angular.module('icon', [])
.directive('icon', function(){
  return {
    restrict: 'E',
    scope: {
      fontAwesome: '=i'
    },
    template: '<span></span>',
    replace: false,
    link: function (scope, element, attrs){
      scope.$watch(attrs.i, function () {
        element.addClass('fa fa-'+attrs.i+' fa-5x');
      });
    }
  };
});
