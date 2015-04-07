module.exports = function(searchText){
  return $.get('https://api.worldoftanks.com/wot/account/list/?application_id=demo&search=' + searchText)
  .done(function(result){
      return result.data || {};
  }).fail(function(err){
    console.log(err);
  });
};