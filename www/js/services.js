//angular.module('starter.services', [])
'Use Strict';
angular.module('starter')
.factory('News', function($window,$firebaseObject,$firebaseArray) {
 var news = firebase.database().ref("News");
 var news_array = $firebaseArray(news);
 var news_details_for_table = [];

 news_array.$loaded(function(newsInfo){
   angular.forEach(newsInfo, function (value, key){
     var temp_news= {
       news_id: key,
       news_title: value.title,
       news_message: value.message,
       news_time: value.date_added
     };
     news_details_for_table.push(temp_news);
   })
 })

 return {

   all: function() {
     return news_details_for_table;
   },
   remove: function(displayNewsInfo) {
     news_details_for_table.splice(news_details_for_table.indexOf(displayNewsInfo), 1);
     console.log("Remove function happened -news-");
   },

   delete_record: function(record){
     var teh_key;
     firebase.database().ref("News")
     .orderByChild("news_id")
     .equalTo(record.news_id)
     .once("value", function (snapshot) {
       var key;
       snapshot.forEach(function (childSnapshot) {
         key = childSnapshot.key;
         return true; // Cancel further enumeration.
       });

       if (key) {
         teh_key = key;
         console.log("Found item: " + key);
       } else {
         console.log("Item not found.");
       }
     });
     var path = "News/" + teh_key;
     console.log(path);
     firebase.database().ref(path).remove()
       .then(function() {
         console.log("Remove succeeded. 100");
         $window.location.reload(true);//This refreshes everything
       })
       .catch(function(error) {
         console.log("Remove failed: " + error.message);
       });
     console.log("Delete record function happened-news-");
   },
   getNextID: function(){
     var lengths = news_details_for_table.length;
     var checkNum;
     var falseAlarm = false;
     if(lengths == 0){
       return 0;
     }
     if(news_details_for_table[lengths-1].news_id != (lengths-1)){
       for(var i=0;i<lengths;i++){
         falseAlarm = false;
         if(news_details_for_table[i].news_id != i){
           for(var k=i;k<lengths;k++){
             if(i == news_details_for_table[k].news_id){
               falseAlarm = true;
             }
           }
           if(falseAlarm == false){
             checkNum = i;
             return checkNum;
           }
         }
       }
     }
     else{
       return lengths;
     }
   },
   get: function(newsId) {
     for (var i = 0; i < news_details_for_table.length; i++) {
       if (news_details_for_table[i].news_id === parseInt(newsId)) {
         return news_details_for_table[i];
       }
     }
     return null;
   }
 };
})
.factory('Players', function($state,$window,$firebaseObject,CONFIG,$firebaseArray) {
//  var ref = new Firebase(CONFIG.FIREBASE_DB_URL);
  var players = firebase.database().ref("Players");
  var players_array = $firebaseArray(players);
  var player_details_for_table = [];
  players_array.$loaded(function(playerInfo){
    angular.forEach(playerInfo, function (value, key){
      var displayPlayerInfo = value;
      var temp_player = {
        unique_key: value.key,
        player_id: displayPlayerInfo.player_id,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_prole: displayPlayerInfo.player_prole,
        player_srole: displayPlayerInfo.player_srole,
      };
      console.log("unique id:"+ playerInfo.key);
      player_details_for_table.push(temp_player);
    })
  })

  return {

    all: function() {
      return player_details_for_table;
    },
    remove: function(displayPlayerInfo) {
      player_details_for_table.splice(player_details_for_table.indexOf(displayPlayerInfo), 1);
      console.log("Remove function happened");
    },
    delete_record: function(record){
      var teh_key;
      firebase.database().ref("Players")
      .orderByChild("player_id")
      .equalTo(record.player_id)
      .once("value", function (snapshot) {
        var key;
        snapshot.forEach(function (childSnapshot) {
          key = childSnapshot.key;
          return true; // Cancel further enumeration.
        });

        if (key) {
          teh_key = key;
          console.log("Found user: " + key);
        } else {
          console.log("User not found.");
        }
      });
      var path = "Players/" + teh_key;
      console.log(path);
      firebase.database().ref(path).remove()
        .then(function() {
          console.log("Remove succeeded. 100");
          $window.location.reload(true);//This refreshes everything
        })
        .catch(function(error) {
          console.log("Remove failed: " + error.message);
        });
      console.log("Delete record function happened");
    },
    getNextID: function(){
      var lengths = player_details_for_table.length;
      var checkNum;
      var falseAlarm = false;
      if(player_details_for_table[lengths-1].player_id != (lengths-1)){
        for(var i=0;i<lengths;i++){
          falseAlarm = false;
          if(player_details_for_table[i].player_id != i){
            //console.log("i: "+ i + " id: "+player_details_for_table[i].player_id);
            for(var k=i;k<lengths;k++){
              if(i == player_details_for_table[k].player_id){
                falseAlarm = true;
              }
            }
            if(falseAlarm == false){
              checkNum = i;
              //console.log("checkNum: "+checkNum);
              return checkNum;
            }
          }
        }
      }
      else{
        return lengths;
      }
    },
    get: function(playerId) {
      for (var i = 0; i < player_details_for_table.length; i++) {
        if (player_details_for_table[i].id === parseInt(playerId)) {
          return player_details_for_table[i];
        }
      }
      return null;
    }
  };

})
