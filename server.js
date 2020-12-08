const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://MGengelbach:6zy6RKSSc3p@cluster0.lhqif.mongodb.net/<dbname>?retryWrites=true&w=majority'; 
var List = require('./models/ToDo.js'); 
var Item = require('./models/ToDoItem.js'); 

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
   /* let item1 = new Item({
        itemName     : "Do Dishes",
        itemPriority : "High" ,
        assignee     : "Willie",
        completed    : false  
    }); 
    */
//Here I've created my own new item
    let item2 = new Item({
        itemName     : "Finish mixing Christmas Song",
        itemPriority : "High" ,
        assignee     : "Mad",
        completed    : false  
    }); 
//Here's the commmand to save and log the new item I created.
    item2.save(function(err, item){
        if (err) return console.error(err);
        console.log(item); 
    }); 

    let notComplete = Item.find({completed: false }, function(err, arr){});
        console.log(notComplete); 
 } ); 

    //create new list with our item. 
    var myList = new List({
        name : "Mad's List",
        items : [
            {
            item : item2._id 
            }
            ],
    }); 

    //how to add more items to the list
    //how to find an item
    //how to update an item
    //how to delete an item 

    myList.save(); //add callback to error check if we wanted

    
