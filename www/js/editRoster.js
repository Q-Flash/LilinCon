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

  getNextID = function(){
    var lengths = player_details_for_table.length;
    var checkNum;
    var falseAlarm = false;
    if(player_details_for_table[lengths-1].player_id != (lengths-1)){
      for(var i=0;i<lengths;i++){
        falseAlarm = false;
        if(player_details_for_table[i].player_id != i){
          //console.log("i: "+ i + " id: "+player_details_for_table[i].player_id);
          for(var k=i;k<lengths;k++){
            if(i == player_details_for_table[k].player_id){
              falseAlarm = true;
            }
          }
          if(falseAlarm == false){
            checkNum = i;
            //console.log("checkNum: "+checkNum);
            return checkNum;
          }
        }
      }
    }
    else{
      return lengths;
    }
  }

  var next_id = getNextID();

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
