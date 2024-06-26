const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors')


const app = express();
const page = "mongodb://user:pass@127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.10";


const client = new MongoClient(page,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
});

console.log("running a.js");

app.use(bodyParser.json())
app.use(cors({"origin" : "*"}));

app.use((err, req, res, next) => {
  //console.error(err.stack)
  res.status(400).send('Something broke!')
})

app.get('/find', function(req, res){
   if(req.query["criteria"]){
    get(JSON.parse(req.query["criteria"])).then(function(data){
      res.send(JSON.stringify(data));
    });
    
   } else { 
    getAll().then((data) => res.send(JSON.stringify(data)));
   }
});



app.get('/findById', function(req, res){
  if(req.query["id"]){
   getById(req.query["id"]).then(function(data){
     res.send(JSON.stringify(data));
   });
   
  } else { 
    res.send("You need to specify an Id" , 400); 
  }
});


app.get('/all', function(req, res){
  run().then((s) => res.send(JSON.stringify(s)));
});

app.get('/', function(req, res){
  res.send("Hello, world!");

});



/* 

x = {"id":"667c8bfdf5123f843ae30b5a", "data":{"content" : "this is some post" }};
fetch("http://localhost:3001/update", {method:"POST",headers:{"Content-Type":"application/json"} ,body:JSON.stringify(x)}).then((x) => x.text()).then((x) => console.log(x));

*/ 

app.post("/update", function(req, res){
  let body =req.body; 
  console.log(body);
  if(!body.id){
    res.send("Id is missing", 400); 
    return; 
  }
  if(body.toString().indexOf("__proto__") !== -1){
    res.send("Prototype injection attack detected!", 400); 
    return; 
  }
  update(body.id, body.data).then((x) => res.send(x));
  
})


app.post("/delete", function(req, res){
  let body =req.body; 
  console.log(body);
  if(!body.id){
    res.send("Id is missing", 400); 
    return; 
  }
  delete_(body.id, body.data).then((x) => res.send(x));

})

app.post("/clear", function(req, res){
  clear().then((x) => res.send(x));
})


// MUST BE JSON

/* example : 

x = {name : "abcdefga", user : "abcefgh user", content : "asdjladal "};
fetch("http://localhost:3001/add", {method:"POST",headers:{"Content-Type":"application/json"} ,body:JSON.stringify(x)}).then((x) => x.text()).then((x) => console.log(x));

*/

app.post('/add', function(req, res){
  let body =req.body; 
  // start parsing json here
  // check for various missing stuff
  if(!body.name){
    res.send("Name is missing", 400); 
    return;
  }
  if(!body.user){
    res.send("User is missing", 400); 
    return;
  }
  if(!body.content){
    res.send("Content  is missing", 400); 
    return;
  }

  get({name:body.name, user:body.user, content:body.content}).then(existing => {   
    if(existing.length > 0){
      res.send("Duplicate post!", 400); 
      return;
    } else { 
      add({name:body.name, user:body.user, content:body.content}).then((x) => JSON.stringify(x)).then((x) => res.send(x));
    }
  })
})
app.listen(3001);


function getAll(){ 
  console.log("getting all");
  return client.connect().then(function(){
    return client.db("databasething").collection("posts").find().toArray();
  })
}    


// example : http://localhost:3001/?criteria={%22name%22:{%22$in%22%20:%20[%22newabc2a9%22,%20%22newabc2a7%22]}}

function get(criteria){ 
  return client.connect().then(function(){
    return client.db("databasething").collection("posts").find(criteria == undefined ? {} : criteria).toArray();
  })
}    


function getById (id){ 
  return client.connect().then(function(){
    return client.db("databasething").collection("posts").find({"_id":new ObjectId(id)}).toArray();
  })
}    



function add(data){ 
  return client.connect().then(function(){
    return client.db("databasething").collection("posts").insertOne(data) 
  });
}    

function update(id, data ){
  return client.db("databasething").collection("posts").updateOne({"_id" : new ObjectId(id)}, {"$set" : data})
}

function delete_(id){
  return client.db("databasething").collection("posts").deleteOne({"_id" : new ObjectId(id)}); 

}

function clear(){
  return client.db("databasething").collection("posts").deleteMany({}); 

}