exports = async function(){
  var conn = context.services.get("mongodb-atlas").db("sample_mflix").collection("comments");
  var movies = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
  var names = ["Mace Tyrell", "Missandei", "The High Sparrow", "Sansa Stark", "Rodrik Cassel", "Robert Jordan", "Thoros of Myr", "Brienne of Tarth", "Catherine Romero", "Kathryn Sosa"];
  
  for(var i = 0; i < 10; i++) {
    //var find = await conn.find({name: "TV"}).limit(999).toArray();
    var groupCommentNames = await conn.aggregate([{$group: {
                                          _id: "$name",
                                          count: {$sum:1}
                                        }}, {$sort: {
                                          count: -1
                                        }}]);
    var top = await conn.find({name: names[i]}).sort({"date": -1}).limit(999).toArray();
    
    var groupMovieCountries = await movies.aggregate([{$unwind: {
                                                      path: "$countries"
                                                    }}, {$group: {
                                                      _id: "$countries",
                                                      count: {
                                                        $sum: 1
                                                      }
                                                    }}, {$sort: {
                                                      count: -1
                                                    }}])
  };
};