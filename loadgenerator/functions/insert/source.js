exports = function(){
  var conn = context.services.get("mongodb-atlas").db("metrics").collection("customers");
  
  
  // https://gist.github.com/ruanbekker/a1506f06aa1df06c5a9501cb393626ea
  var names = context.values.get("names"); 
  var states = context.values.get("states");
  
  // do 10 random inserts
  
  var i = 0;
  while(i< 30) {
    var obj = {};
    obj.pad = Array(65537).join('a');
    obj.customerName = names[Math.floor(Math.random() * names.length)];
    obj.accountBalanceCents = Math.floor((Math.random() * 10000000) + 1);
    obj.state = states[Math.floor(Math.random() * states.length)];
    conn.insertOne(obj);
    i++;
  }
};