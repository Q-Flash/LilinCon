//angular.module('starter.services', [])
'Use Strict';
angular.module('starter')
.factory('News', function() {
  var news = [{
  id: 1,
   name: 'Fishing',
   details: 'Gotta get dem potaters',
   location:'Browns Beach',
   date:' Mon Oct 24, 2016',
   date_added: 'Oct 12 2016'
 }, {
  id: 2,
  name: 'Baseball',
  details: 'Goose lurks holding fish',
  location:'Sommoners Rift',
  date:' Mon Oct 17, 2016',
  date_added: 'Oct 12 2016'
 }];
  return {
    all: function() {
      return news;
    },
    remove: function(item) {
      news.splice(news.indexOf(item), 1);
    },
    get: function(itemId) {
      for (var i = 0; i < news.length; i++) {
        if (news[i].id === parseInt(itemId)) {
          return news[i];
        }
      }
      return null;
    }
  };
})
.factory('Players', function($firebaseObject,CONFIG,$firebaseArray) {
//  var ref = new Firebase(CONFIG.FIREBASE_DB_URL);
  var players = firebase.database().ref("Players");
  var players_array = $firebaseArray(players);
  var player_details_for_table = [];
  players_array.$loaded(function(playerInfo){
    angular.forEach(playerInfo, function (value, key){
      var displayPlayerInfo = value;
      var temp_player = {
        id: key,
        player_fname: displayPlayerInfo.player_fname,
        player_lname: displayPlayerInfo.player_lname,
        player_prole: displayPlayerInfo.player_prole,
        player_srole: displayPlayerInfo.player_srole,

      };
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
      players.child(record.id).remove();
      console.log("Delete record function happened");
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
