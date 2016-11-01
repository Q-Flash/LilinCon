'Use Strict';
angular.module('starter').controller('editRosterCtrl', function (Utils, $scope, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, FURL, Utils) {
  var ref = new Firebase(FURL);

  var players = ref.child("Players");
  $scope.player = {
    player_fname: '',
    player_lname: '',
    player_prole: '',
    player_srole: ''
  };

  $scope.userSubmit = function(form){
    players.push({
      player_fname: form.txtplayerfname.$viewValue,
      player_lname: form.txtplayerlname.$viewValue,
      player_prole: form.txtplayerprole.$viewValue,
      player_srole: form.txtplayersrole.$viewValue
    })
    //Utils.show("Submitting");
    //$state.go('/manager');
    //Utils.hide();
    console.log("Submitting");

  }
})

.directive('formManager1', function($ionicLoading){
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
