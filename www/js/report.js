'Use Strict';
angular.module('starter').controller('reportController', function ($window,$firebaseArray,$scope, $state,$http, $firebaseObject) {
  var ref = firebase.database().ref("News");

/*
  var report = ref.child("Acheivements");
  $scope.player = {
    report_acheivement: '',
  };

  $scope.userSubmit = function(form){
    report.push({
      report_acheivement: form.txtreportacheivement.$viewValue,
    })
    //Utils.show("Submitting");
    //$state.go('/manager');
    //Utils.hide();
    console.log("Submitting");

  }
})

.directive('formManager', function($ionicLoading){
  return{
    restrict: 'A',
    controller: function($scope){
      $scope.$watch('acheivementForm.$valid', function(){
        console.log("For validity changed. Now : " + $scope.acheivementForm.$valid);
      });
      $scope.submit = function(){
        if($scope.acheivementForm.$valid){
          $scope.userSubmit($scope.acheivementForm);
        }
      }

    }
  }
*/
});
