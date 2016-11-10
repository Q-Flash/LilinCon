'Use Strict';
angular.module('starter').controller('editRosterCtrl', function ($window,$firebaseArray,$scope, $state,$http, $firebaseObject) {
  //var ref = new Firebase(FURL);

  var players = firebase.database().ref("Players");
  var players_array = $firebaseArray(players);
  var player_details_for_table = [];

  players_array.$loaded(function(playerInfo){
    angular.forEach(playerInfo, function (value, key){
      var displayPlayerInfo = value;
      console.log("data id:" +value.player_id);
      var temp_player = {
        player_id: displayPlayerInfo.player_id,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_prole: displayPlayerInfo.player_prole,
        player_srole: displayPlayerInfo.player_srole,
      };
      player_details_for_table.push(temp_player);
    })

    //console.log("Player array: "+player_details_for_table);
    //console.log("Player array obj" +player_details_for_table[0]);
    //console.log("Player array obj" +player_details_for_table[0].player_id);
    var lengths = player_details_for_table.length;
    var checkNum = -1;

    for(var i=0; i<lengths; i++){
      if(player_details_for_table[i].player_id > checkNum){
        checkNum = player_details_for_table[i].player_id;
      }
    }
    if(lengths == 0){
      checkNum = 0;
    }
    var next_id = checkNum+1;

    console.log("Next id: "+next_id);

    $scope.userSubmit = function(form){
      players.push({
        player_id: next_id,
        player_fname: form.txtplayerfname.$viewValue,
        player_lname: form.txtplayerlname.$viewValue,
        player_prole: form.txtplayerprole.$viewValue,
        player_srole: form.txtplayersrole.$viewValue
      })
      console.log("Submitting");
      alert('Data submitted successfully');
      $state.go("news");
    }
  })


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
