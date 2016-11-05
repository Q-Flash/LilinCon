//angular.module('starter.controllers', ['ionic','ionic.rating', 'ngCordova'])
'Use Strict';
angular.module('starter')
.controller('RosterCtrl', function($scope, $location, Players) {
  $scope.player_details = Players.all();
})
.controller('AdminRosterCtrl', function(Players,$scope) {
  //$scope.team = Team.all();
  $scope.player_details = Players.all();
  $scope.remove_player= function(selected_player){
    Players.delete_record(selected_player);
    Players.remove(selected_player);
    console.log("Made it to remove_player function");
  }
})

.controller('NewsCtrl', function($scope,News) {
  $scope.news = News.all();
  $scope.remove = function(item){
    News.remove(item);
  };
})

.controller('healthController', function() {

})
.controller('managerController', function($scope) {

})


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
