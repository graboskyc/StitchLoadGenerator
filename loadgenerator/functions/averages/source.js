exports = async function(){
  var conn = context.services.get("mongodb-atlas").db("sample_airbnb").collection("listingsAndReviews");
  
  for(var i = 0; i < 100; i++) {
    var agg = await conn.aggregate([
      {
        '$unwind': {
          'path': '$accommodates'
        }
      }, {
        '$group': {
          '_id': '$address.country', 
          'avg_bedrooms': {
            '$avg': '$bedrooms'
          }, 
          'avg_bathrooms': {
            '$avg': '$bathrooms'
          }, 
          'avg_price': {
            '$avg': '$price'
          }, 
          'avg_security_deposit': {
            '$avg': '$security_deposit'
          }
        }
      }
    ]);
    
    var find = await conn.find({amenities: "TV"}).limit(1).toArray();
  }
};