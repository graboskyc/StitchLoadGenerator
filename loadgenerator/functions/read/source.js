exports = async function(){
  var conn = context.services.get("mongodb-atlas").db("metrics").collection("customers");
  var states = context.values.get("states");
  
  // do 10 random reads
  
  var i = 0;
  while(i< 100) {
    var state = states[Math.floor(Math.random() * names.states)];
    var docs = await conn.findOne({"state":state});
    i++;
  }
};