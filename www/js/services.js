//angular.module('starter.services', [])
'Use Strict';
angular.module('starter')
.factory('myPopUps', function($ionicPopup) {
  return{
    missingFieldAlert: function(field_name){
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: 'You have to enter '+field_name+'!'
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    },
    alertMessage: function(title,message){
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    },
    confirmChoice: function(title,message) {
      var value;
      var confirmPopup = $ionicPopup.confirm({
       title: title,
       template: message
     });

     confirmPopup.then(function(res) {
       if(res) {
         value = true;
       } else {
         console.log('You are not sure');
         value = false;
       }
       console.log("Value: "+value);
       return value;
     });

   }
  };
})
