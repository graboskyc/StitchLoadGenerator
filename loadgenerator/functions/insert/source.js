function generate_random_string(string_length){
    let random_string = '';
    let random_ascii;
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
}

exports = function(){
  var conn = context.services.get("mongodb-atlas").db("metrics").collection("customers");
  
  
  // https://gist.github.com/ruanbekker/a1506f06aa1df06c5a9501cb393626ea
  var names = context.values.get("names"); 
  var states = context.values.get("states");
  var colors = context.values.get("colors");
  
  var i = 0;
  while(i< 100) {
    var obj = {};
    obj.pad = Array(65537).join('a');
    obj.customerName = names[Math.floor(Math.random() * names.length)];
    obj.accountBalanceCents = Math.floor((Math.random() * 10000000) + 1);
    obj.state = states[Math.floor(Math.random() * states.length)];
    obj.favoriteColor = colors[Math.floor(Math.random() * colors.length)];
    obj.created = new Date();
    obj.randomFirst = generate_random_string(10);
    obj.randomSecond = generate_random_string(5);
    obj.randomThird = generate_random_string(7);
    conn.insertOne(obj);
    i++;
  }
};