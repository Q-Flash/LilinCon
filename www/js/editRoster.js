'Use Strict';
angular.module('starter').controller('editRosterCtrl', function ($window,Players,$firebaseArray,$scope, $state,$http, $firebaseObject) {
  //var ref = new Firebase(FURL);

  var players = firebase.database().ref("Players");
  var players_array = $firebaseArray(players);
  var player_details_for_table = [];

  players_array.$loaded(function(playerInfo){
    angular.forEach(playerInfo, function (value, key){
      var displayPlayerInfo = value;
      console.log("data id:" +value.player_id);
      var temp_player = {
        id: displayPlayerInfo.player_id,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_prole: displayPlayerInfo.player_prole,
        player_srole: displayPlayerInfo.player_srole,
      };
      player_details_for_table.push(temp_player);
    })
  })
  var next_id = Players.getNextID();
  console.log("Next id: "+next_id);
  $scope.player = {
    player_id: '',
    player_fname: '',
    player_lname: '',
    player_prole: '',
    player_srole: ''
  };

  $scope.userSubmit = function(form){
    players.push({
      player_id: next_id,
      player_fname: form.txtplayerfname.$viewValue,
      player_lname: form.txtplayerlname.$viewValue,
      player_prole: form.txtplayerprole.$viewValue,
      player_srole: form.txtplayersrole.$viewValue
    })
    console.log("Submitting");
    $state.go("news");
    $window.location.reload(true);//This refreshes everything
  }
})

.directive('formManager', function($ionicLoading){
  return{
    restrict: 'A',
    controller: function($scope){
      $scope.$watch('playerForm.$valid', function(){
        console.log("For validity changed. Now : " + $scope.playerForm.$valid);
      });
      $scope.submit = function(){
        if($scope.playerForm.$valid){
          $scope.userSubmit($scope.playerForm);
        }
      }

    }
  }
})
