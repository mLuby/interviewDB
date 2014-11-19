var app = angular.module('InterviewSecrets', []);

app.value('Questions', [
    {company: 'JPMC', type: 'factual', prompt: 'what\'s a closure', answer: 'private var', conclusion: 'gj'}
]);

app.controller('AddQuestionController', function($scope, Questions){
  $scope.submitQuestion = function (company, type, prompt, answer, conclusion){
    // Clear fields
    $scope.type = '';
    $scope.prompt = '';
    $scope.answer = '';
    $scope.conclusion = '';

    // Create new question object.
    var question = {
      company: company,
      type: type,
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
