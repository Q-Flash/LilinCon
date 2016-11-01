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
