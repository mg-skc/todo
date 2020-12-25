//load in express module
const express = require("express");

//creates new express appliction
const app =  express();

//load local port 
const port = 3000;

//opening up server at specific ip adderess and portlocation to listen
//ip addrsses are also known as hostnames
app.listen(port,function(){
    console.log('The server is running at port: '+ port);
});

app.get('/', function(request,response){
    console.log(request);
    response.send('Hello World!\n');
});

app.get('/name', function(request,response){
    console.log(request);
    response.send('Mad!\n');
});
//first api call
app.get('/', function(request,response){
    Item.find(function(err,items){
        

    })
    
    console.log(request);
    response.send('Mad!\n');
});