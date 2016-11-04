'Use Strict';
angular.module('starter').controller('edithealthCtrl', function (Players,$scope,$http,$firebaseObject) {

  var injuries = firebase.database().ref("Players/Injuries");
  $scope.player_details_inj = Players.all();
  $scope.injury = {
    player_fname: '',
    player_lname: '',
    player_injury: '',
    recovery_days: ''
  };

  $scope.userSubmit = function(form){
    injuries.push({
      player_fname: form.txtplayerfname.$viewValue,
      player_lname: form.txtplayerlname.$viewValue,
      player_injury: form.txtplayerinjury.$viewValue,
      recovery_days: form.txtrecoverydays.$viewValue
    })
    //Utils.show("Submitting");
    //$state.go('/manager');
    //Utils.hide();
    console.log("Submitting");

  }
})

.directive('formInjuries', function($ionicLoading){
  return{
    restrict: 'A',
    controller: function($scope){
      $scope.$watch('injuryForm.$valid', function(){
        console.log("For validity changed. Now : " + $scope.injuryForm.$valid);
      });
      $scope.submit = function(){
        if($scope.injuryForm.$valid){
          $scope.userSubmit($scope.injuryForm);
        }
      }

    }
  }
})
