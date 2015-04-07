'use strict';
var playerSearch = require('./lib/player-search');

$(function(){

  $('#player-input').keypress(function(e){
    var searchText = e.target.value;
    // hide grid and alert if user is typing
    hideStats();
    // on enter call api
    if(e.which === 13){
      playerSearch(searchText).then(function(data){
        if(data.count === 1) {
          $('#player-name-heading').text(searchText);
          // append the rows
          data.stats.forEach(function(stat){ return addTankStatRow(stat); });

          $('.player-stats-grid').removeClass('hidden');
        }else if(data.count === 0){
          $('.alert-error').removeClass('hidden');
        }else{
          // TODO Show a list of users;
        }

      });
      e.preventDefault();
    }
  });

  function addTankStatRow(tankData){
    var el = '<tr><td>' + tankData.tier + '</td>';
    el = el + '<td>' + tankData.name + '</td>';
    el = el + '<td>' + tankData.wins + '</td>';
    el = el + '<td>' + tankData.losses + '</td>';
    el = el + '<td>' + tankData.percentage + '</td>';
    el = el + '<td>' + tankData.mastery + '</td></tr>';
    $('#tank-stats').append(el);
  }

  function hideStats(){
    $('.alert-error').addClass('hidden');
    $('.player-stats-grid').addClass('hidden');
    $('#tank-stats').empty();
  };

});
