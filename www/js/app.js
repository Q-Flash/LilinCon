// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','firebase','onezone-datepicker','starter.configs'])

.run(function($ionicPlatform,CONFIG) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);


    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    firebase.initializeApp({
      apiKey: CONFIG.FIREBASE_API,
      authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
      databaseURL: CONFIG.FIREBASE_DB_URL,
      storageBucket: CONFIG.FIREBASE_STORAGE,
      messagingSenderId: CONFIG.FIREBASE_STORAGE
    });


  });
})

.config(['$stateProvider', '$urlRouterProvider','$ionicConfigProvider',function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.maxCache(0);
    $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'appController'
    })

    .state('login', {
      url: '/login',
      templateUrl: "templates/login.html",
      controller: "loginController"
    })

    .state('signup', {
      url: '/signup',
      templateUrl: "templates/signup.html",
      controller: "signupController"
    })

    .state('reset', {
      url: '/reset',
      templateUrl: "templates/resetemail.html",
      controller: "resetController"
    })

    .state('intro', {
      url: '/intro',
      views: {
        'menuContent': {
          templateUrl: "templates/intro.html",
          controller: "introController"
        }
      }
    })

    .state('app.dashboard', {
      url: '/app/dashboard',
      views: {
        'menuContent': {
          templateUrl: "templates/dashboard.html",
          controller: "dashboardController"
        }
      }
    })

  .state('adminRoster', {
    cache: false,
    url: '/adminRoster',
    templateUrl: 'templates/admin-roster.html',
    controller:'AdminRosterCtrl'
  })

  .state('calendar', {
    url: '/calendar',
    templateUrl: 'templates/calendar.html',
    controller:'calendarCtrl'
  })

  .state('editRoster', {
    cache: false,
    url: '/editRoster',
    templateUrl: 'templates/editRoster.html',
    controller:'editRosterCtrl'
  })

  .state('roster', {
    cache: false,
    url: '/roster',
    templateUrl: 'templates/roster.html',
    controller:'RosterCtrl'
  })

  .state('news', {
    url: '/news',
    templateUrl: 'templates/news.html',
    controller:'NewsCtrl'
  })

  .state('manager', {
    url: '/manager',
    templateUrl: 'templates/manager.html',
    controller: 'managerController'
  })
  .state('scheduler', {
    url: '/scheduler',
      templateUrl: 'templates/scheduler.html',
      controller:'scheduleController'
  })
  .state('health', {
    url: '/health',
      templateUrl: 'templates/health.html',
      controller:'healthController'
  })
  .state('edithealth', {
    url: '/edithealth',
      templateUrl: 'templates/edithealth2.html',
      controller:'edithealthCtrl'
  })
  .state('budget', {
    url: '/budget',
      templateUrl: 'templates/budget.html',
      controller:'budgetController'
  })

  .state('report', {
    url: '/report',
      templateUrl: 'templates/report.html',
      controller:'reportController'
  })

    $urlRouterProvider.otherwise('/login');

}])


.controller('dashboardController', ['$scope', '$firebaseArray', 'CONFIG', function($scope, $firebaseArray, CONFIG) {
// TODO: Show profile data


}]);
