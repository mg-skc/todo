const mongoose = require('mongoose');
var List = require('./models/ToDo.js'); 
var Item = require('./models/ToDoItem.js'); 
//putting in lodash
var _ = require('lodash');

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


mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, (err, client) => {
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
//if I pass the body, remove /:id to match route      /:id
app.patch("/items", (request, response) => {
    console.log(request.body);
    var itemUpdateId = request.body._id;
    var itemUpdateName = request.body.itemName;
    var itemUpdateAssignee = request.body.assignee;
    var itemUpdateItemPriority = request.body.itemPriority;
    var itemUpdateComplete = request.body.completed;
    console.log(itemUpdateId);
    //let updatedItem = new Item(request.body);
   Item.findByIdAndUpdate(itemUpdateId, { 
            itemName : itemUpdateName,
            assignee : itemUpdateAssignee,
            itemPriority : itemUpdateItemPriority,
            completed : itemUpdateComplete
        }, 
         function (err, docs) { 
        if (err){ 
            console.log(err) 
            } 
    else{ 
        console.log("here's the old record:"+docs);
        response.status(200).send({ status: 'OK'})
    } 
    }); 
}); 







//     Item.findOneAndUpdate({id: request.params.id}).exec((err, item) => {
//         if (err) return console.error(err);
//         itemName = updatedItem.itemName;
//         assignee = updatedItem.assignee;
//         itemPriority = updatedItem.itemPriority;
//         completed = updatedItem.completed;
//         item.save((err, item) => {
//             if (err){
//                 response.sendStatus(500);
//                 return console.error(err);
//             }
//             // response.sendStatus(200);
//             console.log(item);
//             response.status(200).send({ status: 'OK'})
//         })
//     });
// });




        // var user_id = '5eb985d440bd2155e4d788e2'; 
        // User.findByIdAndUpdate(user_id, { name: 'Gourav' }, 
        // function (err, docs) { 
        // if (err){ 
        // console.log(err) 
        // } 
        // else{ 
        // console.log("Updated User : ", docs); 
        // } 
        // }); 
        
        
        
        
        // try {
        //     response.sendStatus(200);
        //     item.save();
        //     } catch {
        //         response.sendStatus(500);
        //             }
        //         });
        //     });

// });
// });

// app.put('/tasks/:id', async (request, response) => {
//     let updatedTask = new Task(request.body);
//     Task.findOne({_id: request.params.id}).exec((err, item) => {
//         if (err) return console.error(err);
//         item.name = updatedTask.name;
//         item.assignedTo = updatedTask.assignedTo;
//         item.priority = updatedTask.priority;
//         item.completed = updatedTask.completed;
//         try {
//             response.sendStatus(200);
//             item.save();
//         } catch {
//             response.sendStatus(500);
//         }
//     });
// });