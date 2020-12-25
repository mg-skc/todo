var editCardData;
var editedItem;
//var isEqual = require('lodash.isequal');

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
  
    // Function for display article data and generating a bootstrap card  container-fluid
    let card = "<div class='card bg-dark'>";
    card += "<div class='card-header'>"+ "Assignee: "+ body.assignee +"</div>";
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
        $("#itemcards").empty();
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
// DELETE TO DO ******** DELETE DELETE
// DELETE TO DO ******** DELETE DELETE
// DELETE TO DO ******** DELETE DELETE

// function delConfirm(){
//    let ans =  confirm("Are you sure you want to delete?");
//    if(ans=true){clickDeleteToDo(deleteId);}{return;}
//     }

function clickDeleteToDo(deleteId){
//  CODE THAT DOESN'T WORK..THE DELETE STILL HAPPENS. >:+()  
//  var r = confirm("Continue delete?");
//     if (r == true) {
//    deleteToDo(deleteId);
//     } else {
//     return alert('Delete canceled');
//     };
    
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

        let showPriority=body.itemPriority;
        let showCompleted=body.completed;
        console.log(showPriority);
        console.log(showCompleted);
        //let editInfo =
        document.getElementById('editItemName').value=body.itemName;
        //  document.getElementById('editItemPriority').value.checked=body.itemPriority;
        //WILLIE:    use a switch or for, check value and then: cases string hml set val to true or whatever.... 
        switch (showPriority) {
            case "High":
                document.getElementById('editPriorityHigh').checked=true;
                break;
            case "Medium":
                document.getElementById('editPriorityMedium').checked=true;
                break;    
            case "Low":
                document.getElementById('editPriorityLow').checked=true;
                break;
            default:
                console.log("No Priority value found - error!")
                break;
        }
        document.getElementById('editItemAssignee').value=body.assignee;
        // document.getElementById('editItemCompleted').value.checked=body.completed; 
        switch (showCompleted) {
            case true:
                document.getElementById('editCompletedTrue').checked=true;
                break;
            case false:
                document.getElementById('editCompletedFalse').checked=true;
                break;    
            default:
                console.log("No completion value found - error!")
                break;
        }
         console.log(body); 
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
    //code line below empties card so no dups on extra presses :)
    $("#editId").empty();
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
    card += "<button onclick='clickUpdateToDo(\"" +body._id+ "\")' class='radio btn btn-primary'>Click to Update</button>"
    card += "<br>";
    card += "</div>";

    // Append the new item card to the item section section div
    editCardData = body;
    console.log(editCardData);
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

function clickUpdateToDo(editId){
    console.log(document.querySelector('input[name="editItemCompleted"]:checked').value)
    console.log(document.querySelector('input[name="editItemPriority"]:checked').value)
    console.log(editId);

   
    updateToDo(editId).then(function(body){
             //getToDoList();
              console.log(body); 
    
    
             
         }).catch(function(err){
             console.log(err);
         });
     };
    // let editedPriority = document.querySelector('input[name="editItemPriority"]:checked').value;
    //  let editedCompStatus = document.querySelector('input[name="editItemCompleted"]:checked').value; 
    // {switch (editedPriorityCheck) {
    //         case "High":
    //             document.getElementById('editPriorityHigh').checked=true;
    //             break;
    //         case "Medium":
    //             document.getElementById('editPriorityMedium').checked=true;
    //             break;    
    //         case "Low":
    //             document.getElementById('editPriorityLow').checked=true;
    //             break;
    //         default:
    //             console.log("No Priority value found - error!")
    //             break;
    //     }
    // let editedPriority = editedPriorityCheck;
    // console.log(document.getElementById('editPriorityLow').checked);
    // console.log(editedPriority);
  
    //    { switch (editCompletedCheck) {
    //         case "true":
    //             document.getElementById('editCompletedTrue').checked=true;
    //             break;
    //         case "false":
    //             document.getElementById('editCompletedFalse').checked=true;
    //             break;    
    //         default:
    //             console.log("No completion value found - error!")
    //             break;
    //     }
    //     }
    //     let editedCompStatus = editCompletedCheck;
    //     console.log(document.getElementById('editCompletedFalse').checked);
    //     console.log(editedCompStatus);

    // let editedItem = {

    //         itemName : document.getElementById('editItemName').value,
    //         itemPriority : document.querySelector('input[name="editItemPriority"]:checked').value,
    //         assignee : document.getElementById('editItemAssignee').value,
    //         completed : document.querySelector('input[name="editItemCompleted"]:checked').value,
    // }

   //_.isEqual(editCardData,editedItem)
        // console.log(editedItem);
        // console.log(_.isEqual(editCardData,editedItem));


   
//     updateToDo(editId).then(function(body){
       
//         console.log(body); 
//     }).catch(function(err){
//         console.log(err);
//     });
// };

async function updateToDo(editId){

    let editedItem = {
        // _id: editId,
        itemName : document.getElementById('editItemName').value,
        itemPriority : document.querySelector('input[name="editItemPriority"]:checked').value,
        assignee : document.getElementById('editItemAssignee').value,
        completed : document.querySelector('input[name="editItemCompleted"]:checked').value,
}

//_.isEqual(editCardData,editedItem)
    console.log(editedItem);

    let requestOptions = {
        method: 'PUT',
        body: JSON.stringify(editedItem),
        headers: {'Content-Type': 'application/json'}
    }
    //WILLIE: AD A BODY PROP TO REQ OPTIONS. same as add to do...get it from the form...You can pass the prop for ID for editID in the JSOn thingy
    //let getEditId = document.getElementById('editSystemId').value;
   // let getEditId = editId;

    

    const response = await fetch('/items/' + editId, requestOptions); //items...handle the Patch call no eed
    const body = await response.json();

    if (response.status != 200){
        throw Error('Error - update not saved!');
    }
    window.location.href = 'index.html';
    return true;
};
    //     router.patch('/user/:_id', (req, res) => {

    //     User.findByIdAndUpdate( req.params._id , req.body, {
      
    //         new: true
      
    //       }).then(function(user) {
    //       res.send(user);
      
    //       //in case of error
    //     }, function(err) {
    //       res.send(err);
    //     });
    //   });

    //from online on removing empty fields


        // $(document).ready(function() {
        // $('.remove-empty-values').submit(function() {
        //     $(this).find(':input').filter(function() { return !this.value; }).attr('disabled', 'disabled');
        //     return true; // make sure that the form is still submitted
        // });
        // });
//Then put this as a class on the entire form:

        // $(document).ready(function() {
        // $('.remove-empty-values').submit(function() {
        //     $(this).find(':input').filter(function() { return !this.value; }).attr('disabled', 'disabled');
        //     return true; // make sure that the form is still submitted
        // });