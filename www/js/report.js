'Use Strict';
angular.module('starter').controller('reportController', function (News,$filter,$window,$firebaseArray,$scope, $state, $firebaseObject) {
  var news = firebase.database().ref("News");

  var nextNewsID = News.getNextID();
  console.log("Next News ID: "+nextNewsID);
  $scope.doSubmitNews = function(newSubmit){
    var currDate = new Date();
    console.log(newSubmit);
    currDate = $filter('date')(currDate);

    var newsData = {
      news_id: nextNewsID,
      title: newSubmit.newsTitle,
      message: newSubmit.newsDetail,
      date_added: $filter('date')(currDate)
    }

    console.log("Data to push: "+newsData.news_id +newsData.title + newsData.message +newsData.date_added);

    news.push(newsData);
    console.log("Push successful");

    alert('Message Added');
    $state.go("news");

  }
});
