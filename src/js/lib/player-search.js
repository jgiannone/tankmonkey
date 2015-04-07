var TANKS = [];

// initialize tanks on startup
$.get('https://api.worldoftanks.com/wot/encyclopedia/tanks/?application_id=demo').done(function(results){
  TANKS = results.data;
});

module.exports = function(searchText){

  return $.get('https://api.worldoftanks.com/wot/account/list/?application_id=demo&search=' + searchText)
  .then(function(result){

      var playerObject = result.data || {count: 0};
      // Here we have to make another call with the ID of the player.
      if(playerObject[0].account_id){
        return $.get('https://api.worldoftanks.com/wot/account/tanks/?application_id=demo&account_id=' + playerObject[0].account_id).then(function(result){
          playerObject[0].stats = mapTanks(result.data[playerObject[0].account_id]);
          playerObject[0].count = 1;
          return playerObject[0];
        })
      }
      //else{
        //return playerObject;
      //}

  }).fail(function(err){
    console.log(err);
  });

  function mapTanks(playerTanks){
    return playerTanks.map(function(tank){
      var TANK = TANKS[tank.tank_id]
      var wins = tank.statistics.wins
      var losses = tank.statistics.battles - wins;
      var percentage = wins / tank.statistics.battles * 100;
      return {  tier: TANK.level,
                name: TANK.name_i18n,
                wins: wins,
                losses: losses,
                percentage: Math.round(10 * percentage) / 10,
                mastery: tank.mark_of_mastery };
    });
  };
};