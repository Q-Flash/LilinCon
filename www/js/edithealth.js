'Use Strict';
angular.module('starter').controller('edithealthCtrl', function (Utils, $scope, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, FURL, Utils) {
  var ref = new Firebase(FURL);

  var injuries = ref.child("Injuries");
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
