function UserSearch ($el) {
  this.$el = $el;
  this.$ul = this.$el.find('.users');
  this.setupEvent();
}

UserSearch.prototype.setupEvent = function () {
  $('.user-search').on('keyup', this.handleInput.bind(this));
};

UserSearch.prototype.handleInput = function (e) {
  var searchInput = this.$el.find('input[name="username"]').val();
  var search = {};
  search["query"] = searchInput;
  var that = this;

  $.ajax({
    url: "/users/search",
    type: "GET",
    dataType: "json",
    data: search,
    success: function(resp) { that.renderResults(resp);},
    error: function() {console.log("something went WRONG");}
  });

  UserSearch.prototype.renderResults = function (resp) {
    this.$ul.find('li').remove();
    var $li;
    var $a;
    var newThat = this;
    resp.forEach( function(result) {
      // $a = $('<a>'); add the link by using the result
      $li = $('<li>').text(result.username).prop("href", "http://www.google.com");
      newThat.$ul.append($li);
    });
  };
};

module.exports = UserSearch;
