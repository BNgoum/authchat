/*
Imports & configs
*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
//

/*
Model definition
*/
const chatSchema = new Schema({
    message: String,
    postDate: Date,
    last_name: String,
})
//

/*
Export
*/
const ChatModel = mongoose.model('chat', chatSchema);
module.exports = ChatModel;
//