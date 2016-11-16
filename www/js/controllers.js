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
        player_id: displayPlayerInfo.player_id,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_role: displayPlayerInfo.player_role
      };
      player_details_for_table.push(temp_player);
    })
  })
  $scope.player_details = player_details_for_table;
})

.controller('scheduleController', function(myPopUps,$filter,$scope,$state,$firebaseObject,$firebaseArray){
  var plans = firebase.database().ref("Events");
  var plans_array= $firebaseArray(plans);
  var selectDate;
  var highlights = [];
  var disableDates = [];
  disableDates.push(new Date());
  plans_array.$loaded(function(eventInfo){
    angular.forEach(eventInfo, function (value, key){
      var leh_date;
      var mm;
      leh_date = value.event_date.split(" ");

      if(leh_date[0]== "Jan"){
          mm = 1;
      }else if(leh_date[0]== "Feb"){
        mm = 2;
      }else if(leh_date[0]== "Mar"){
        mm = 3;
      }else if(leh_date[0]== "Apr"){
        mm = 4;
      }else if(leh_date[0]== "May"){
        mm = 5;
      }else if(leh_date[0]== "Jun"){
        mm = 6;
      }else if(leh_date[0]== "Jul"){
        mm = 7;
      }else if(leh_date[0]== "Aug"){
        mm = 8;
      }else if(leh_date[0]== "Sep"){
        mm = 9;
      }else if(leh_date[0]== "Oct"){
        mm = 10;
      }else if(leh_date[0]== "Nov"){
        mm = 11;
      }else if(leh_date[0]== "Dec"){
        mm = 12;
      }

      var dd = leh_date[1].split("");
      var newDD = dd[0]+dd[1];
      highlights.push({
        date:  new Date(leh_date[2], mm-1, newDD),
        color: '#8FD4D9',
        textColor: '#fff'
        });
      disableDates.push(new Date(leh_date[2], mm-1, newDD));
    })
  })
  var date = new Date(); console.log("Date: "+date);
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var startDate = new Date(2013, 1, 26);
  var endDate = new Date(2025, 12, 26);
  var disableDaysOfWeek = {};

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
    hideCancelButton: true,
    hideSetButton: true,
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
      if(eventSubmit.eventTitle == "" || eventSubmit.eventTitle == null){
        myPopUps.alertMessage("Error!","Looks like you forgot to enter a title!");
        return;
      } else if(eventSubmit.eventDetail == "" || eventSubmit.eventDetail == null){
        myPopUps.alertMessage("Error!","Looks like you forgot to enter details!");
        return;
      } else if(eventSubmit.eventVenue == "" || eventSubmit.eventVenue == null){
        myPopUps.alertMessage("Error!","Looks like you forgot to enter a venue!");
        return;
      } else if(eventSubmit.eventTime == "" || eventSubmit.eventTime == null){
        myPopUps.alertMessage("Error!","Looks like you forgot to enter a time!");
        return;
      }else if(selectDate == "" || selectDate == null){
        myPopUps.alertMessage("Error!","Looks like you forgot to choose a date!");
        return;
      }

      var currDate = new Date();
      console.log(eventSubmit);
      currDate = $filter('date')(currDate);
/*
      if(selectDate == $filter('date')(currDate)){
        if(!myPopUps.confirmChoice("Warning!","You currently have today's date selected. Are you user you want to use this date?")){
          return;
        }
        console.log("Hmm");
      } */
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

      myPopUps.alertMessage("Success","Message addeds successfully!");
      $state.go("calendar");

    }
  })
})
.controller('AdminRosterCtrl', function(myPopUps,$ionicPopup,$state,$scope,$firebaseObject,$firebaseArray) {
  var players = firebase.database().ref("Players");
  var players_array = $firebaseArray(players);
  var player_details_for_table = [];
  players_array.$loaded(function(playerInfo){
    angular.forEach(playerInfo, function (value, key){
      var displayPlayerInfo = value;
      var temp_player = {
        player_id: displayPlayerInfo.player_id,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_role: displayPlayerInfo.player_role,
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
        myPopUps.alertMessage("Success","Player data deleted successfully!");
        $state.go("news");
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message);
      });
  }
  $scope.confirmDelete = function(selected_player) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Whoa there!',
     template: 'Are you sure you want to remove this player from the team?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $scope.remove_player(selected_player);
     } else {
       console.log('You are not sure');
     }
   });
 };
})

.controller('NewsCtrl', function(myPopUps,$ionicPopup,$state,$scope,$firebaseObject,$firebaseArray) {
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

  $scope.confirmChoice = function(selected_news){
    var confirmPopup = $ionicPopup.confirm({
     title: 'WARNING!',
     template: 'Are you sure you want to delete this message?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       var teh_key;
       firebase.database().ref("News")
       .orderByChild("news_id")
       .equalTo(selected_news.news_id)
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
       var path = "News/" + teh_key;
       console.log(path);
       firebase.database().ref(path).remove()
         .then(function() {
           console.log("Remove succeeded. 100");
           myPopUps.alertMessage("Success","News item deleted successfully!");
           news_details_for_table.splice(news_details_for_table.indexOf(selected_news),1);
           $state.go("news");
         })
         .catch(function(error) {
           console.log("Remove failed: " + error.message);
         });
     } else {
       console.log('You are not sure');
     }
   });
  }
  $scope.onSwipeNews = function(thing){
    if($scope.ans){
      return;
    } else {
      $scope.confirmChoice(thing);
    }
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
    news_details_for_table.reverse();
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
