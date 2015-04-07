'use strict';

$(function(){

  $('#player-input').keypress(function(e){
    if(e.which === 13){
      debugger;
      console.log('Submitted', e);
    }
  });

});
