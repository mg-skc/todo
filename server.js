const mongoose = require('mongoose');
var List = require('./models/ToDo.js'); 
var Item = require('./models/ToDoItem.js'); 
//load in express
const express = require('express');
const path = require('path');
//new express app and validator
const app =  express();
const { body,validationResult } = require('express-validator');
//load local port 
const port = 3000;
var bodyParser = require('body-parser');
const { response } = require('express');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const mongoDB = 'mongodb+srv://MGengelbach:6zy6RKSSc3p@cluster0.lhqif.mongodb.net/<dbname>?retryWrites=true&w=majority'; 


mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if(err) return console.error(err);
    console.log('Connected to database'); 
}); 


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

//use says "use the following middleware!"
app.use(
 //express.static is middleware for delivering static files like html, css, javascript, images, etc.
 express.static(
 //this takes care of relative paths 
 path.join(__dirname, 'Public')));



//opening up server at specific ip adderess and portlocation to listen
//ip addrsses are also known as hostnames
app.listen(port,function(){
    console.log('The server is running at port: '+ port);
});

/*
app.get('/', function(request,response){
    
    response.send('Hello World!\n');
});
*/
app.get('/name', function(request,response){
    
    response.send('Mad!\n');
});

app.get('/items', function(request,response){
    Item.find(function(err,items){
        if (err) return console.error(err);
        response.send(items);
    }); 
});


app.post("/items", (request, response) => {
    console.log(request.body);
    let item = new Item(request.body);
    item.save((err, item) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});

app.delete('/items/:id', async (request, response) => {
    try {
        await Item.deleteOne({_id: request.params.id});
        response.sendStatus(204);
    } catch {
        response.sendStatus(404);
        console.log('didnt find it!');
    }
});

// THIS GETS THE RECORD TO EDIT
app.get('/items/:id', (request, response) => {
    Item.findOne({_id: request.params.id}).exec((err, item) => {
        if (err) return console.error(err);
        response.send(item);
    })
});

//888888888888888********WHERE I AM WITH CODING

// THIS IS THE POST FUNCTION FOR UPDATING AN EXISTING TO DO
//if I pass the body, remove /:id to match route    
app.patch("/items/:id", (request, response) => {
    console.log(request.body);
    Item.findOneAndUpdate({_id: request.params.id}).exec((err, item) => {
        if (err) return console.error(err);
        response.send(item);
    })
});

/* MY POST FROM ABOVE for a new record
app.post("/items", (request, response) => {
    console.log(request.body);
    let item = new Item(request.body);
    item.save((err, item) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});

RYAN'S UPDATE SERVER SIDE (BUT REMEMBER HE ALREADY POPULATED THE FIELDS SO HE'S WRITING ALL RECORDS)
app.post("/items", (request, response) => {
    console.log(request.body);
    let item = new Item(request.body);
    item.save((err, item) => {
        if (err){
            response.sendStatus(500);
            return console.error(err);
        }
        response.sendStatus(200);
    })
});
*/



   


/*
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
}); 
  
/*Here I've created my own new item
    let item3 = new Item({
        itemName     : "Make chocolate pudding",
        itemPriority : "Medium" ,
        assignee     : "Mad",
        completed    : false  
    }); 
    */
//Here's the commmand to save and log the new item I created.
/*
    item3.save(function(err, item){
        if (err) return console.error(err);
        console.log(item); 
    }); 

    let notComplete = Item.find({completed: false }, function(err, arr){});
        console.log(notComplete); 
 } ); 
*/
    //create new list with our item. 
    /*
    var myList = new List({
        name : "Mad's List",
        items : [
            {
            item : item3._id, 
            }
            ],
    }); 



    //how to add more items to the list
    //how to find an item
   app.get('/medium', function(request,response){ 
    Item.find({
        assignee: "Mad" // traverse through list and find an item by priority
        }, function(err, items){
        if (err) return console.error(err);
        response.send(items)
        });

    });
    */
    //how to update an item
    //how to delete an item 

   // myList.save(); //add callback to error check if we wanted

