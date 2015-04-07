'use strict';
var playerSearch = require('./lib/player-search');

$(function(){

  $('#player-input').keypress(function(e){
    var searchText = e.target.value;
    // hide grid and alert if user is typing
    $('.alert-error').addClass('hidden');
    $('.player-stats-grid').addClass('hidden');
    // on enter call api
    if(e.which === 13){
      playerSearch(searchText).then(function(data){
        if(data.count > 0) {
          $('#player-name-heading').text(searchText);
        $('.player-stats-grid').removeClass('hidden');
        }else{
          $('.alert-error').removeClass('hidden');
        }

      });
      e.preventDefault();
    }
  });

});
