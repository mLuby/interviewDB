/* TODO:
 * [ ] autosuggest company name
 * [x] default hide all but prompts; click reveals
 * [x] can dismiss question via top right x.
 * [x] make relative date buttons work
 */


var app = angular.module('interviewDB', ['firebase']);

app.factory('DB', function($http, $firebase, Questions){
  var ref = new Firebase('https://interviewDB.firebaseio.com/');
  var sync = $firebase(ref);

  var addQuestion = function(question){
    sync.$push(question).then(function(newChildRef) {
      console.log('added question', question);
    });
  };

  var getQuestions = function(){
    var list = $firebase(ref).$asArray();
    return list.$loaded();
  }

  return {
    push: addQuestion,
    load: getQuestions
  }
});

app.value('Questions', []);

app.controller('ViewQuestionsController', function($scope, Questions, DB){
  DB.load().then(function(data){
    Questions = data;
    $scope.questions = Questions;
  });
});

app.controller('AddQuestionController', function($scope, Questions, DB){
  $scope.setDateTo = function(relativeDate){
    var currentDate = new Date();
    if(relativeDate === 'yesterday'){
      currentDate.setDate(currentDate.getDate() - 1)
    }
    $scope.date = currentDate;
  };
  $scope.submitQuestion = function (company, date, type, prompt, answer, conclusion){
    // Clear fields
    $scope.type = '';
    $scope.prompt = '';
    $scope.answer = '';
    $scope.conclusion = '';

    // Create new question object.
    var question = {
      company: company,
      date: date.toDateString(),
      type: type,
      prompt: prompt,
    };
    if(answer){ question.answer = answer; }
    if(conclusion){ question.conclusion = conclusion; }

    Questions.push( question );
    DB.push( question );
  };
});
