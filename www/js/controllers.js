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

.controller('scheduleController', function(){

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

.controller('NewsCtrl', function($scope,$firebaseObject,$firebaseArray) {
  var isLoggedIn;

  $scope.hideManagerTab = function(){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user.email == "mubarakdcricketer@hotmail.com") {
        console.log("In function show - "+user.email);
        //console.log(user);
        return "ng-show";
      } else {
        console.log("In function hide");
        return "ng-hide";
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
