var app = angular.module('InterviewSecrets', ['icon', 'tile']);

app.value('Questions', [
    {company: 'JPMC', type: 'factual', icon: 'book', prompt: 'what\'s a closure', answer: 'private var', conclusion: 'gj'}
]);

app.controller('AddQuestionController', function($scope, Questions){
  $scope.submitQuestion = function (company, type, prompt, answer, conclusion){
    var icon; // deciding which font-awesome icon to use:
    switch(type){
      case 'coding': icon='keyboard-o'; break;
      case 'whiteboarding': icon='pencil-square-o'; break;
      case 'behavioral': icon='users'; break;
      case 'factual': icon='book'; break;
      default: icon='question-circle fa-spin'; //'other'
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
