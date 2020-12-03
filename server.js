const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://lea_admin_willie:Dndmongodb_forlea44!@lea0-hs7rh.mongodb.net/to_do_list_db?retryWrites=true&w=majority'; 
var Item = require('./models/ToDo.js'); 
var List = require('./models/ToDoItem.js'); 

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database'); 
}); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");
    
    //create a new item instance using the Item model
    let item1 = new Item({
        itemName     : "Do Dishes",
        itemPriority : "High" ,
        assignee     : "Willie",
        completed    : false  
    }); 

    item1.save(function(err, item){
        if (err) return console.error(err);
        console.log(item); 
    }); 

    var myList = new List({
        name : "Willie's List",
        items : [
            {
            item : item1._id 
            }
            ],
    }); 

    myList.save(); //add callback to error check if we wanted

    
});