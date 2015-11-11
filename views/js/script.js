(function(angular) {
  'use strict';
angular.module('mvcTutorial', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/Tutorial/home', {
          templateUrl: 'home.ejs',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        })        
        .when('/login', {
          templateUrl: 'login.ejs',
          controller: 'HomeCtrl',
          controllerAs: 'login'
        })
        .when('/profile', {
          templateUrl: 'profile.ejs',
          controller: 'HomeCtrl',
          controllerAs: 'profile'
        })
        .when('/Tutorial/history', {
          templateUrl: 'history.ejs',
          controller: 'HistoryCtrl',
          controllerAs: 'history'
        })
        .when('/Tutorial/theory', {
          templateUrl: 'theory.ejs',
          controller: 'TheoryCtrl',
          controllerAs: 'theory'
        })
        .when('/Tutorial/models', {
          templateUrl: 'models.ejs',
          controller: 'ModelsCtrl',
          controllerAs: 'models'
        })
        .when('/Tutorial/views', {
          templateUrl: 'views.ejs',
          controller: 'ViewsCtrl',
          controllerAs: 'views'
        })
        .when('/Tutorial/controllers', {
          templateUrl: 'controllers.ejs',
          controller: 'ControllersCtrl',
          controllerAs: 'controllers'
        })
        .when('/Tutorial/application', {
          templateUrl: 'application.ejs',
          controller: 'ApplicationCtrl',
          controllerAs: 'application'
        })
        .when('/Tutorial/quiz', {
          templateUrl: 'quiz.ejs',
          controller: 'QuizCtrl',
          controllerAs: 'quiz'
        });

      $locationProvider.html5Mode(true);
  }])
  .controller('MainCtrl', ['$route', '$routeParams', '$location',
    function($route, $routeParams, $location) {
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;
  }])
  .controller('HomeCtrl', ['$routeParams', function($routeParams) {
    this.name = "HomeCtrl";
    this.params = $routeParams;
  }])
  .controller('HistoryCtrl', ['$routeParams', function($routeParams) {
    this.name = "HistoryCtrl";
    this.params = $routeParams;
  }])
  .controller('TheoryCtrl', ['$routeParams', function($routeParams) {
    this.name = "TheoryCtrl";
    this.params = $routeParams;
  }])
  .controller('ModelsCtrl', ['$routeParams', function($routeParams) {
    this.name = "ModelsCtrl";
    this.params = $routeParams;
  }])
  .controller('ViewsCtrl', ['$routeParams', function($routeParams) {
    this.name = "ViewsCtrl";
    this.params = $routeParams;
  }])
  .controller('ControllersCtrl', ['$routeParams', function($routeParams) {
    this.name = "ControllersCtrl";
    this.params = $routeParams;
  }])
  .controller('ApplicationCtrl', ['$routeParams', function($routeParams) {
    this.name = "ApplicationCtrl";
    this.params = $routeParams;
  }])
  .controller('QuizCtrl',['$scope','$http','$sce',function($scope,$http,$sce){
	  $scope.userScore = 0;
	  $scope.currentQuestion = -1;
	  $scope.numAnswered = 0;
	  $scope.percent = 0;
	  
	  $http.get('quiz_data.json').then(function(quizData){
	    $scope.thisQuiz = quizData.data;
	    $scope.numQuestions = $scope.thisQuiz.length;
	  });

  	$scope.chooseAnswer = function(question,answer) {
  	  var questionState = $scope.thisQuiz[question].questionState;
  	  
  	  if(questionState != 'answered'){
  	    $scope.thisQuiz[question].selectedAnswer = answer;
  	    var correctAnswer = $scope.thisQuiz[question].correct;
  	    $scope.thisQuiz[question].correctAnswer = correctAnswer;
  	    
  	    if( answer === correctAnswer ) {
  	      $scope.thisQuiz[question].isCorrect = true;
  	      $scope.userScore += 1;
  	    } else {
  	      $scope.thisQuiz[question].isCorrect = false;
  	    }
  	    $scope.thisQuiz[question].questionState = 'answered';
  	  }
  	  $scope.percent = ($scope.userScore / $scope.numQuestions) * 100;
  	};
  	
  	$scope.isSelected = function(question,answer) {
  	  return $scope.thisQuiz[question].selectedAnswer === answer;
  	};
  	$scope.isCorrect = function(question,answer) {
  	  return $scope.thisQuiz[question].correctAnswer === answer;
  	};
  	
  	
  	$scope.selectContinue = function() {
  	  return $scope.currentQuestion += 1;
  	};
  	
	}]);
})(window.angular);