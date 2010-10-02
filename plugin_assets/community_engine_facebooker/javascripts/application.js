var CE_Facebooker;
CE_Facebooker = {
  
  intercept_blog_post_form: function(){
    $('post_form').observe('submit', function(event){

      if(tinyMCE){tinyMCE.triggerSave()};
      $('post_form').request();      

      Event.stop(event);
      return false;
    })
  },
 
  showFbFeedForm: function(user_message_prompt, data, callback){
    FB.Connect.streamPublish(data['user_message'], data['attachment'], data['action_links'], data['target_id'], user_message_prompt, callback, data['auto_publish']);
  },
  
  fbConnected: function(facebook_id){      
    if (facebook_id == null){
      return false;
    }
    
    if( window.facebook_id != facebook_id ){
      // either there's no current user, 
      // or the current user has a different facebook_id, so re-connect with the new facebook_id 
      $$('#fb-sign-in').invoke('show');
      $$('#fb-sign-in .fbgreybox').invoke('update', 'Logged in through Facebook... redirecting');      
      window.location = '/facebooker/authenticate';
    } else if ((window.facebook_session == 'false') && (window.facebook_id == facebook_id)){
      // there is a current user, but there was no FB session,
      // and they are already connected using the same facebook_id, 
      // so just reload the page now that we have a session
      window.location.reload();
    }
  }

}

document.observe('dom:loaded', function(){
  if(!$('ajax_spinner')){
    var spinner = new Element('div', {style: "display:none", id: 'ajax_spinner' });
    spinner.update("<div><img src='/plugin_assets/community_engine/images/spinner.gif' /> Loading ...</div>")
    abody = document.getElementsByTagName('body')[0];
    new Insertion.Top(abody, spinner);
  }  
})


Ajax.Responders.register({
  onCreate: function() {
    Ajax.activeRequestCount++;
    if (Ajax.activeRequestCount > 0){
			$$('#ajax_spinner').invoke('show');
    }
  },
  onComplete: function() {
    Ajax.activeRequestCount--;
    if (Ajax.activeRequestCount < 1){
			$$('#ajax_spinner').invoke('hide');
    }    
  }
});