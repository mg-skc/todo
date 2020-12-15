async function getToDoList(){
    let requestOptions = {
        method: "GET",
        headers : { "Content-Type": "application/json"} 
    }

    const response = await fetch("/items", requestOptions); 
    const body = await response.json(); 
    if(response.status != 200){
        throw Error(body.message); 
    }

    return body; 

}


//app.post('/item', function(request, response){
        //use the request data to create a new item 
       //and add it to my database. 
    //     console.log(request); 
    //     let item1 = new Item({
    //         itemName     : "Do Dishes",
    //         itemPriority : "High" ,
    //         assignee     : "Willie",
    //         completed    : false  
    //     }); 
    
    //     item1.save(function(err, item){
    //         if (err) return console.error(err);
    //         console.log(item); 
    //     }); 
    // });
    

async function itemCardDisplay(body) {
    // Function for display article data and generating a bootstrap card
    let card = "<div class='card bg-dark'>";
    card += "<div class='card-header'>"+ "Assignee: "+ body.assignee +"</div>";
    card += "<div class='card-body'>";
    card += "<h5 class='card-title'>" + body.itemName + "</h5>";
    card += "<p class='card-text'>" + "Priority: "+ body.itemPriority + "</p>";
    card += "<p class='card-text'>" + "Completed?  "+body.completed + "</p>";
    card += "<p class='card-text'><small>" + "Last Updated: "+body.updatedAt + "</small></p>";
    card += "</div>";
    card += "<div class='card-footer'><small>"+"System ID: "+body._id +"</small></div>"
    card += "</div>";
    card += "</div>";

    // Append the new item card to the item section section div
    $("#itemcards").append(card)
};

function clickButton(){
   /* getToDoList().then(function(body){
        for(let i = 0; i < body.length; i++){
            console.log(body[i].itemName); 
        } */
    getToDoList().then(function(body){
        for(let i = 0; i < body.length; i++){
            itemCardDisplay(body[i]); 
            } 
         console.log(body); 
        
    }).catch(function(err){
        console.log(err);
    });
};

function clickAddToDo(){
    /* getToDoList().then(function(body){
         for(let i = 0; i < body.length; i++){
             console.log(body[i].itemName); 
         } */
     addToDo().then(function(body){
         //getToDoList();
          console.log(body); 


         
     }).catch(function(err){
         console.log(err);
     });
 };

async function addToDo(){
    //var itemTdPriority = document.querySelector('input[name=itemPriority]:checked').value;
    console.log(document.querySelector('input[name=itemPriority]:checked').value);
    //var itemTdCompleted = document.querySelector('input[name="compStatus"]:checked').value;
    console.log(document.querySelector('input[name="compStatus"]:checked').value);
    //figure out which radio button is selected 
   // let radio  = document blah lah name in html and loop per stack overflow, if checked!
   //set itemPriority to radio, etc.
    let item = {
        itemName : document.getElementById("itemName").value, 
        itemPriority : document.querySelector('input[name=itemPriority]:checked').value,
        assignee : document.getElementById("itemAssignee").value,
        completed : document.querySelector('input[name="compStatus"]:checked').value
    } 

   console.log (item);
   
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {'Content-Type': 'application/json'}
    }


    const response = await fetch('/items', requestOptions);
    if (response.status != 200){
        throw Error('task not saved!');
    }   
    window.location.href = 'index.html';
    return true;
}

function clickDeleteToDo(){
    /* getToDoList().then(function(body){
         for(let i = 0; i < body.length; i++){
             console.log(body[i].itemName); 
         } */
     deleteToDo().then(function(body){
         
          console.log(body); 


         
     }).catch(function(err){
         console.log(err);
     });
 };

 async function deleteToDo(itemSyId){
    let requestOptions = {
        method: 'DELETE', 
        headers: {'Content-Type': 'application/json'}
    }
    let deleteId = itemSyId;

    const response = await fetch('/items' + deleteId, requestOptions);
    if (response.status != 204){
        throw Error('task not deleted');
    }
    document.getElementById("deleteSuccessCopy").innerHTML = "Delete Successful";
    return true;
}

