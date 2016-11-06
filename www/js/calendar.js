'Use Strict';
angular.module('starter').controller('calendarCtrl', function ($scope,$firebaseObject) {
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
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: highlights,

    callback: function(value){
        // your code
    }
  };
})
