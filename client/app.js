var app = angular.module('interviewDB', ['firebase']);

app.factory('DB', function($http, $firebase){
  var ref = new Firebase('https://interviewDB.firebaseio.com/');
  var sync = $firebase(ref);

  var addQuestion = function(question){
    sync.$push(question).then(function(newChildRef) {
      console.log("added question");
    });
    // var list = $firebase(ref).$asArray();
    // return list.$loaded(function(loadedList){
    //   console.log('firebase loaded, deleting messageID', messageID);
    //   return loadedList.$remove(loadedList.$getRecord(messageID));
    // });
  };

  return {
    push: addQuestion
  }
});


app.value('Questions', []);

// {company: 'Hooli', type: 'Factual', prompt: 'What\'s a closure?', answer: 'It\'s a private variable.', conclusion: 'Okay, can you give an example of when you used one?'},
// {company: 'Pied Piper', type: 'Whiteboarding', prompt: 'Design an API to show all interactions from a single user.', answer: 'Let\'s capture user interaction via session tracking, then store that in a MongoDB.', conclusion: 'Okay, how can we make this faster?'}

app.controller('QuestionController', function($scope, Questions, DB){
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

app.controller('ViewQuestionsController', function($scope, Questions, DB){
  $scope.questions = Questions;
});
