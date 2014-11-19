var app = angular.module('InterviewSecrets', []);

app.value('Questions', [
    {company: 'JPMC', type: 'factual', icon: 'fa-book', prompt: 'what\'s a closure', answer: 'private var', conclusion: 'gj'}
]);

app.controller('AddQuestionController', function($scope, Questions){
  $scope.submitQuestion = function (company, type, prompt, answer, conclusion){
    var icon; // deciding which font-awesome icon to use:
    switch(type){
      case 'coding': icon='fa-keyboard-o'; break;
      case 'whiteboarding': icon='fa-pencil-square-o'; break;
      case 'behavioral': icon='fa-users'; break;
      case 'factual': icon='fa-book'; break;
      default: icon='fa-question-circle fa-spin'; //'other'
    }
    var question = {
      company: company,
      type: type,
      icon: icon,
      prompt: prompt,
      answer: answer,
      conclusion: conclusion
    };
    Questions.push( question );
  };
});

app.controller('ViewQuestionsController', function($scope, Questions){
  $scope.questions = Questions;
});

app.directive('tileOption', function(){
  return {
    restrict: 'E',
    scope: true,
    template: ''+
      '<div></div>',
    replace: true,
    transclude: true
  };
});

app.directive('icon', function(){
  return {
    restrict: 'E',
    scope: {
      fontAwesome: '=i'
    },
    template: ''+
      '<span class="fa"></span>',
    replace: true,
    link: function (scope, element, attrs){
      scope.$watch(attrs.i, function () {
        element.addClass('fa-'+attrs.i);
      });
    }
  };
});