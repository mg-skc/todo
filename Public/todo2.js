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

    // Append the new article card to the article section div
    $("#itemcards").append(card)
}

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
}

