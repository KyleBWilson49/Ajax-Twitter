function FollowToggle ($el) {
  this.$el = $el;
  this.userId = this.$el.data('user-id');
  this.followState = this.setText();
  this.render();
  this.createEvent();
}

  FollowToggle.prototype.setText = function () {
    var state = this.$el.data('initial-follow-state');
    if (state) {
      return "followed";
    } else {
      return "unfollowed";
    }
  };

  FollowToggle.prototype.render = function () {
    if(this.followState === "followed") {
      this.$el.val("Unfollow!");
    } else if(this.followState === "unfollowed" ) {
      this.$el.val("Follow!");
    } else if (this.followState === "following"){
      this.$el.val("Following");
      this.$el.prop("disabled", true);
    } else {
      this.$el.val("Unfollowing");
      this.$el.prop("disabled", true);
    }
  };

  FollowToggle.prototype.createEvent = function () {
    this.$el.on("click", this.handleClick.bind(this));
  };

  FollowToggle.prototype.handleClick = function (e) {
    e.preventDefault();
    
    if (this.followState === 'followed') {
      this.followState = "unfollowing";
    } else {
      this.followState = "following";
    }

    this.render();
    var that = this;

    $.ajax({
      url: "/users/" + this.userId + "/follow",
      type: this.followState === "unfollowing" ? "DELETE" : "POST",
      dataType: "json",
      success: function() {
        that.followState = that.followState === "following" ? "followed" : "unfollowed";
        that.$el.prop("disabled", false);
        that.render();
      },
      error: function(){ console.log("something went wrong"); },
    });
  };



module.exports = FollowToggle;
