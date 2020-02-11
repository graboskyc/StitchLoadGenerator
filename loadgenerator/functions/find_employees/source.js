exports = async function(){
  var conn = context.services.get("mongodb-atlas").db("metrics").collection("employees");
  
  var first_names = ["Charles", "Chris", "John", "Matt"];
  var last_names = ["Smith", "Lee", "Jones", "Brown"];
  
  for(var i = 0; i < 3; i++) {
    //var ceo = await conn.find({"companies.title": "CEO"}).sort({"lastName": 1}).limit(2300).toArray();
    var mongodb = await conn.find({"companies.companyName": "MongoDB"}).sort({"firstName": -1}).limit(2300).toArray();
    var lee = await conn.find({lastName: last_names[i]}).sort({"lastModificationDateTime": -1}).limit(2300).toArray();
    var first_name = await conn.find({firstName: first_names[i]}).sort({"lastModificationDateTime": -1}).limit(2300).toArray();
    var account = await conn.aggregate([{$match: {
                                        "companies.title": "Account Manager"
                                      }}, {$group: {
                                        "_id": "$companies.companyName"
                                      }}, {$unwind: {
                                        path: "$_id"
                                      }}, {$group: {
                                        _id: "$_id",
                                        count: {
                                          $sum: 1
                                        }
                                      }}, {$sort: {
                                        count: -1
                                      }}, {$limit: 2300}])
  };
};