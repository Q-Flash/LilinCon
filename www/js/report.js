'Use Strict';
angular.module('starter').controller('reportController', function ($filter,$window,$firebaseArray,$scope, $state, $firebaseObject) {
  var news = firebase.database().ref("News");
  var news_array = $firebaseArray(news);
  var news_details_for_table = [];

  news_array.$loaded(function(newsInfo){
    angular.forEach(newsInfo, function (value, key){
      var temp_news= {
        news_id: value.news_id,
        news_title: value.title,
        news_message: value.message,
        news_time: value.date_added
      };
      news_details_for_table.push(temp_news);
    })
    var checkNum = -1;
    for(var i=0; i<news_details_for_table.length; i++){
      if(news_details_for_table[i].news_id > checkNum){
        checkNum = news_details_for_table[i].news_id;
        console.log("checkNum news: "+checkNum);
      }
    }
    if(news_details_for_table.length == 0){
      checkNum = 0;
    }
    nextNewsID = checkNum+1;
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
  })
});
