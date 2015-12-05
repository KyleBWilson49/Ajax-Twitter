var FollowToggle = require('./follow_toggle');
var UserSearch = require('./user_search');

$(function() {
  var $buttons = $('.follow-toggle');
  $buttons.each( function(index, button) {
    new FollowToggle($(button));
  });
  var $searchBars = $('.user-search');
  $searchBars.each(function(index, searchBar) {
    new UserSearch($(searchBar));
  });
});
