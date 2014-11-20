var app = angular.module('interviewDB', ['firebase']);

app.factory('DB', function($http, $firebase, Questions){
  var ref = new Firebase('https://interviewDB.firebaseio.com/');
  var sync = $firebase(ref);

  var addQuestion = function(question){
    sync.$push(question).then(function(newChildRef) {
      console.log("added question");
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
  $scope.logQuestions = function(){
    console.log('Questions',Questions);
  }
});

app.controller('AddQuestionController', function($scope, Questions, DB){
  $scope.submitQuestion = function (company, date, type, prompt, answer, conclusion){
    // Clear fields
    $scope.type = '';
    $scope.prompt = '';
    $scope.answer = '';
    $scope.conclusion = '';

    // Create new question object.
    var question = {
      company: company,
      date: date,
      type: type,
      prompt: prompt,
      answer: answer,
      conclusion: conclusion
    };

    Questions.push( question );
    DB.push( question );
  };
});
