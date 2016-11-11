'Use Strict';
angular.module('starter').controller('calendarCtrl', function ($scope,$firebaseObject,$firebaseArray) {
  var events = firebase.database().ref("Events");
  var event_array = $firebaseArray(events);
  var eventHighlights = [];

  event_array.$loaded(function(eventInfo){
    angular.forEach(eventInfo, function (value, key){
      var leh_date;
      var mm;
      leh_date = value.event_date.split(" ");
      console.log("leh_date: "+leh_date[0]);

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
      console.log("Month: "+mm);

      var dd = leh_date[1].split("");
      var newDD = dd[0]+dd[1];
      console.log("dd: "+dd);
      console.log("NewDD: "+newDD);


      eventHighlights.push({
        date:  new Date(leh_date[2], mm-1, newDD),
        color: '#8FD4D9',
        textColor: '#fff'
        });
        console.log("Actual date? "+eventHighlights[key].date);
    })

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
      disablePastDays: false,
      disableSwipe: false,
      disableWeekend: false,
      disableDates: disableDates,
      disableDaysOfWeek: disableDaysOfWeek,
      showDatepicker: false,
      showTodayButton: true,
      calendarMode: true,
      hideCancelButton: true,
      hideSetButton: true,
      highlights: eventHighlights,

      callback: function(value){
        console.log("Value: "+value);
          // your code
      }
    };
  })
})
