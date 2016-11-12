'Use Strict';
angular.module('starter').controller('calendarCtrl', function ($filter,$ionicPopup,$scope,$firebaseObject,$firebaseArray) {
  var events = firebase.database().ref("Events");
  var event_array = $firebaseArray(events);
  var eventHighlights = [];
  var eventPresent = [];

  event_array.$loaded(function(eventInfo){
    angular.forEach(eventInfo, function (value, key){
      var leh_date;
      var mm;
      leh_date = value.event_date.split(" ");
      //console.log("leh_date: "+leh_date[0]);

      if(leh_date[0]== "Jan"){
          mm = 1;
      }else if(leh_date[0]== "Feb"){
        mm = 2;
      }else if(leh_date[0]== "Mar"){
        mm = 3;
      }else if(leh_date[0]== "Apr"){
        mm = 4;
      }else if(leh_date[0]== "May"){
        mm = 5;
      }else if(leh_date[0]== "Jun"){
        mm = 6;
      }else if(leh_date[0]== "Jul"){
        mm = 7;
      }else if(leh_date[0]== "Aug"){
        mm = 8;
      }else if(leh_date[0]== "Sep"){
        mm = 9;
      }else if(leh_date[0]== "Oct"){
        mm = 10;
      }else if(leh_date[0]== "Nov"){
        mm = 11;
      }else if(leh_date[0]== "Dec"){
        mm = 12;
      }
      //console.log("Month: "+mm);

      var dd = leh_date[1].split("");
      var newDD = dd[0]+dd[1];
      //console.log("dd: "+dd);
      //console.log("NewDD: "+newDD);
      var temp_event= {
        event_id: value.event_id,
        event_title: value.event_title,
        event_description: value.event_description,
        event_venue: value.event_venue,
        event_time: value.event_time,
        event_date: value.event_date,
        date_added: value.date_added
      };
      eventPresent.push(temp_event);

      eventHighlights.push({
        date:  new Date(leh_date[2], mm-1, newDD),
        color: '#8FD4D9',
        textColor: '#fff'
        });
        console.log("Highlight Dates: "+eventHighlights[key].date);
    })
  })
  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: 'It might taste good'
   });

   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };
  var date = new Date(); console.log("Date: "+date);
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var startDate = new Date(2013, 1, 26);
  var endDate = new Date(2025, 12, 26);
  var disableDates = {};
  var disableDaysOfWeek = {};
  var highlights = [
    {
        date: new Date(2016, 1, 7),
        color: '#8FD4D9',
        textColor: '#fff'
    },
    {
        date: new Date(2016, 1, 18)
    }
  ];

  $scope.onezoneDatepicker = {
    date: date, // MANDATORY
    mondayFirst: false,
    months: months,
    daysOfTheWeek: daysOfTheWeek,
    startDate: startDate,
    endDate: endDate,
    disablePastDays: true,
    disableSwipe: false,
    disableWeekend: false,
    disableDates: disableDates,
    disableDaysOfWeek: disableDaysOfWeek,
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: true,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: eventHighlights,

    callback: function(value){
      $scope.showEvent = false;
      $scope.eventSelect = null;
      console.log("Value: "+value);
      for(var z=0; z <eventHighlights.length; z++){
        console.log("Highlight: "+eventHighlights[z].date);
        console.log("Value    : "+value);
        if($filter('date')(eventHighlights[z].date) == $filter('date')(value)){
          $scope.showEvent = true;
          $scope.eventSelect = eventPresent[z];
          //console.log("Mhm");
          //$scope.showAlert();
        }
      }
        // your code
    }
  };
})
