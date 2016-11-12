//angular.module('starter.controllers', ['ionic','ionic.rating', 'ngCordova'])
'Use Strict';
angular.module('starter')
.controller('RosterCtrl', function($scope,$firebaseObject,$firebaseArray) {
  var players = firebase.database().ref("Players");
  var players_array = $firebaseArray(players);
  var player_details_for_table = [];
  players_array.$loaded(function(playerInfo){
    angular.forEach(playerInfo, function (value, key){
      var displayPlayerInfo = value;
      var temp_player = {
        unique_key: value.key,
        player_id: displayPlayerInfo.player_id,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_prole: displayPlayerInfo.player_prole,
        player_srole: displayPlayerInfo.player_srole,
      };
      console.log("unique id:"+ playerInfo.key);
      player_details_for_table.push(temp_player);
    })
  })
  $scope.player_details = player_details_for_table;
})

.controller('scheduleController', function($filter,$scope,$state,$firebaseObject,$firebaseArray){
  var selectDate;
  var date = new Date(); console.log("Date: "+date);
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var startDate = new Date(2013, 1, 26);
  var endDate = new Date(2025, 12, 26);
  var disableDates = [];
  var disableDaysOfWeek = {};
  var highlights = [
    {
        date: new Date(2016, 1, 7),
        color: '#8FD4D9',
        textColor: '#fff'
    },
    {
        date: new Date(2016, 1, 18)
    }
  ];
  $scope.onezoneDatepicker = {
    date: date, // MANDATORY
    mondayFirst: false,
    months: months,
    daysOfTheWeek: daysOfTheWeek,
    startDate: startDate,
    endDate: endDate,
    disablePastDays: true,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: disableDates,
    disableDaysOfWeek: disableDaysOfWeek,
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: highlights,


    callback: function(Cvalue){
      console.log("Value: "+$filter('date')(Cvalue));
      selectDate = $filter('date')(Cvalue);
      //return $filter('date')(Cvalue);
    }
  };
  var events = firebase.database().ref("Events");
  var event_array = $firebaseArray(events);
  var event_details_for_table = [];

  event_array.$loaded(function(eventInfo){
    angular.forEach(eventInfo, function (value, key){
      var temp_event= {
        event_id: value.event_id,
        event_title: value.event_title,
        event_description: value.event_description,
        event_venue: value.event_venue,
        event_time: value.event_time,
        event_date: value.event_date,
        date_added: value.date_added
      };
      event_details_for_table.push(temp_event);
    })
    var checkNum = -1;
    for(var i=0; i<event_details_for_table.length; i++){
      if(event_details_for_table[i].event_id > checkNum){
        checkNum = event_details_for_table[i].event_id;
        console.log("checkNum news: "+checkNum);
      }
    }
    if(event_details_for_table.length == 0){
      checkNum = -1;
    }
    var nextEventID = checkNum+1;
    console.log("Next News ID: "+nextEventID);
    $scope.doSubmitEvent = function(eventSubmit){
      var currDate = new Date();
      console.log(eventSubmit);
      currDate = $filter('date')(currDate);

      var eventData = {
        event_id: nextEventID,
        event_title: eventSubmit.eventTitle,
        event_description: eventSubmit.eventDetail,
        event_venue: eventSubmit.eventVenue,
        event_time: eventSubmit.eventTime,
        event_date: selectDate,
        date_added: $filter('date')(currDate)
      }
      //console.log("Data to push: "+newsData.news_id +newsData.title + newsData.message +newsData.date_added);

      events.push(eventData);
      console.log("Push successful");

      alert('Message Added');
      $state.go("calendar");

    }
  })
})
.controller('AdminRosterCtrl', function($state,$scope,$firebaseObject,$firebaseArray) {
  var players = firebase.database().ref("Players");
  var players_array = $firebaseArray(players);
  var player_details_for_table = [];
  players_array.$loaded(function(playerInfo){
    angular.forEach(playerInfo, function (value, key){
      var displayPlayerInfo = value;
      var temp_player = {
        unique_key: value.key,
        player_id: displayPlayerInfo.player_id,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_prole: displayPlayerInfo.player_prole,
        player_srole: displayPlayerInfo.player_srole,
      };
      player_details_for_table.push(temp_player);
    })
  })

  $scope.player_details = player_details_for_table;

  $scope.remove_player= function(selected_player){
    var teh_key;
    firebase.database().ref("Players")
    .orderByChild("player_id")
    .equalTo(selected_player.player_id)
    .once("value", function (snapshot) {
      var key;
      snapshot.forEach(function (childSnapshot) {
        key = childSnapshot.key;
        return true; // Cancel further enumeration.
      });

      if (key) {
        teh_key = key;
        console.log("Found user: " + key);
      } else {
        console.log("User not found.");
      }
    });
    var path = "Players/" + teh_key;
    console.log(path);
    firebase.database().ref(path).remove()
      .then(function() {
        console.log("Remove succeeded. 100");
        alert('Delete Successful');
        $state.go("news");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  }
})

.controller('NewsCtrl', function($ionicPopup,$state,$scope,$firebaseObject,$firebaseArray) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user.email == "mubarakdcricketer@hotmail.com") {
      $scope.ans= false;
    } else {
      $scope.ans= true;
    }
  })
  $scope.hideManagerTab = function(){
    return $scope.ans;
  }

  $scope.noAccessToManagerTab = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Stop!',
     template: 'You don\'t have access to this tab. You hold no power here!'
   });

   alertPopup.then(function(res) {
     console.log('GG 3Ez');
   });
 }
  $scope.clickMTab = function(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user.email == "mubarakdcricketer@hotmail.com") {
        $state.go("manager");
      } else {
        $scope.noAccessToManagerTab();
      }
    });
  }
  var news = firebase.database().ref("News");
  var news_array = $firebaseArray(news);
  var news_details_for_table = [];

  news_array.$loaded(function(newsInfo){
    angular.forEach(newsInfo, function (value, key){
      var temp_news= {
        news_id: value.news_id,
        news_title: value.title,
        news_message: value.message,
        news_time: value.date_added
      };
      news_details_for_table.push(temp_news);
    })
  })
  //news_details_for_table.forEach()
  $scope.news = news_details_for_table;

})

.controller('healthController', function() {

})
.controller('managerController', function($scope) {

})

.controller('newsDetailController', function($stateParams,$scope,$firebaseObject,$firebaseArray){
  var news = firebase.database().ref("News");
  var news_array = $firebaseArray(news);
  var news_details_for_table = [];

  news_array.$loaded(function(newsInfo){
    angular.forEach(newsInfo, function (value, key){
      var temp_news= {
        news_id: value.news_id,
        news_title: value.title,
        news_message: value.message,
        news_time: value.date_added
      };
      news_details_for_table.push(temp_news);
      console.log("News IDs: "+news_details_for_table[key].news_id);

    })
    for (var i = 0; i < news_details_for_table.length; i++) {
      if (news_details_for_table[i].news_id === parseInt($stateParams.newsID)) {
        $scope.news = news_details_for_table[i];
        console.log("News id ="+$scope.news.news_id);
      }
    }
  })
  console.log("State Params News ID: "+$stateParams.newsID);
  //news_details_for_table.forEach()
  //$scope.chat = Chats.get($stateParams.chatId)
  //$scope.news = news_details_for_table[];
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
