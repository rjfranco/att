import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    login: function() {
      var username_value = this.$().find('[name=username]').val();
      $('[name="CtlLogin1$Login1$UserName"]').val(username_value);

      var password_value = this.$().find('[name=password]').val();
      $('[name="CtlLogin1$Login1$Password"]').val(password_value);

      $('#CtlLogin1_Login1_Button1').click();
    }
  },

  errorMessage: function() {
    var $error_message = $('#CtlLogin1_Login1_ErrorText').parent(':contains(try again)');
    if ($error_message.length) {
      return 'An error occured, please try again.';
    } else {
      return void 0;
    }
  }.property()
});
