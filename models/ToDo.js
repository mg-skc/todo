//create an interface to the mongoose module 
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 


const listSchema = new Schema({
    name : { type:String },
    items : [
        {
        item : { type: Schema.Types.ObjectId, ref : "Item" }
        }
        ],
    });


module.exports = mongoose.model("List", listSchema); 

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastNameName: String
   });
module.exports = mongoose.model("User", nameSchema);   
   

/*Embedding:

Small subdocuments
Data that does not change regularly
Eventual consistency is acceptable
Document that grow by a small amout
Data that you will often need to perform a second query to fetch
Fast reads

Referencing:
Large subdocuments
Volatile data
Immediate consistency is necessary
Document that grow a large amount
Data that you will often exclude from results
Fast writes */ 