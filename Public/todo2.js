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
    card += "<div class='card-header container-fluid'>"+ "Assignee: "+ body.assignee +"</div>";
 /*   card += "<div class='card-header container-fluid'>"+ "Assignee: "+ body.assignee +"</div>";
    card += "<div class='row'>";
    card += "<div class='col-md-10>";
    card += "<h3>"+ "Assignee: "+ body.assignee +"</h3>";
    card += "</div>";
    
    card += "<div class='col-md-2 float-right'>";
    card += "<button class='btn btn-danger' onclick='clickDeleteToDo()'><i class='far fa-trash-alt'></i></button>";
    card += "<button class='btn btn-warning' onclick=''><i class='fas fa-edit'></i></button>"; 
    card += "</div>";  
    card += "</div>";  
    card += "</div>";  */
    card += "<div class='card-body'>";
    card += "<h5 class='card-title'>" + body.itemName + "</h5>";
    card += "<p class='card-text'>" + "Priority: "+ body.itemPriority + "</p>";
    card += "<p class='card-text'>" + "Completed?  "+body.completed + "</p>";
    card += "<p class='card-text'><small>" + "Last Updated: "+body.updatedAt + "</small></p>";
    card += "</div>";
    card += "<div class='card-footer'>"
    card += "<div class='card-footer'><small>"+"System ID: "+body._id +"</small><br>"
    card += "<a href='#editToDoForm' data-toggle='collapse' data-target='#editToDoForm' data-id="+body._id+" onclick='clickGetEditToDo(\"" +body._id+ "\")' class='item-edit btn btn-primary btn-sm' role='button' aria-pressed='true'>Edit</a>"
    card += "<a href='' data-id="+body._id+" onclick='clickDeleteToDo(\"" +body._id+ "\")' class= 'item-delete btn btn-danger btn-sm' role='button' aria-pressed='true'>Delete</a></div>"
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
        throw Error('item not saved!');
    }   
    window.location.href = 'index.html';
    return true;
}

// DELETE TO DO ******** DELETE DELETE

function clickDeleteToDo(deleteId){
console.log('got to 137');

     deleteToDo(deleteId).then(function(body){


         
          console.log(body); 


         
     }).catch(function(err){
         console.log(err);
     });
 };

 async function deleteToDo(deleteId){
    console.log('got to 153');
    let requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }
    let delId = deleteId;

    let item = { _id: delId};
    console.log(item);

    const response = await fetch('/items/'+ delId, requestOptions);
    if (response.status != 204){
        throw Error('item not deleted!');
    }
    //document.getElementById("delSystemId").innerHTML = " ";
    document.getElementById("deleteSuccessCopy").innerHTML = "Delete Successful";
    return true;
}

function clickGetEditToDo(editId){
   
     getEditToDo(editId).then(function(body){
        itemEditCard(body);
        let editInfo =
        document.getElementById('editItemName').innerHTML=body.itemName;
        document.getElementById('editItemPriority').value.checked=body.itemPriority;
        document.getElementById('editItemAssignee').innerHTML=body.assignee;
        document.getElementById('editItemCompleted').value.checked=body.completed; 
         console.log(body); 
         $("").append(card)
     }).catch(function(err){
         console.log(err);
     });
 };
async function getEditToDo(editId){
    let requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }
    let getEditId = editId;
    
    const response = await fetch('/items/' + getEditId, requestOptions);
    const body = await response.json();
    if (response.status != 200){
        throw Error('Error!');
    }
    return body;
}
async function itemEditCard(body) {
    // Function for display article data and generating a bootstrap card
    let card = "<div class='card bg-dark text-center mx-auto col col-sm-4'>";
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
    $("#editId").append(card)
};


//888888888888888********WHERE I AM WITH CODING
//888888888888888********WHERE I AM WITH CODING
//888888888888888********WHERE I AM WITH CODING
//888888888888888********WHERE I AM WITH CODING
//888888888888888********WHERE I AM WITH CODING


// THIS IS CODE FROM STACK OVERFLOW ON A PATCH COMMAND UPDATE : https://stackoverflow.com/questions/44631826/how-to-handle-a-patch-request
// router.patch('/user/:_id', (req, res) => {

//     User.findByIdAndUpdate( req.params._id , req.body, {
  
//         new: true
  
//       }).then(function(user) {
//       res.send(user);
  
//       //in case of error
//     }, function(err) {
//       res.send(err);
//     });
//   });

function clickUpdateToDo(){
   
    updateToDo().then(function(body){
       //itemEditCard(body);
       // document.getElementById('editItemName').innerHTML=body.itemName;
      //  document.getElementById('editItemPriority').value.checked=body.itemPriority;
      //  document.getElementById('editItemAssignee').innerHTML=body.assignee;
     //   document.getElementById('editItemCompleted').value.checked=body.completed; 
        console.log(body); 
    }).catch(function(err){
        console.log(err);
    });
};

async function updateToDo(){
    let requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    }
    //let getEditId = document.getElementById('editSystemId').value;
    let getEditId = editSystemId.value;

    const response = await fetch('/items/' + getEditId, requestOptions);
    const body = await response.json();

    if (response.status != 200){
        throw Error('Error - update not saved!');
    }
    window.location.href = 'index.html';
    return true;
}
