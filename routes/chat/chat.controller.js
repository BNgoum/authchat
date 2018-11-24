/*
Import
*/
const ChatModel = require('../../models/chat.model');
const UserModel = require('../../models/user.model');
//

/*
Functions
*/

const post = body => {
    // Post a new message
    return new Promise( (resolve, reject) => {

        UserModel.findOne({last_name: body.last_name}, (error, user) => {
            if(error){ // Mongo Error
                return reject(error)
            }
            else if(!user) { // User n'existe pas
                return reject(user)
            }
            else {
                let newChat = new ChatModel();

                ChatModel.create({ message: body.message, postDate: Date.now(), last_name: body.last_name }, function (err, newChat) {
                    if (err) return reject(err);
                    // saved!
                    return resolve(newChat);
                });
            }
        })
    });
};

const deleteMessage = body => {
    // Delete a message
    return new Promise( (resolve, reject) => {

        ChatModel.deleteOne({ _id: body._id }, function (err) {
        if (err) return reject(err);

        return resolve();
        });
    });
};

const refreshMessage = () => {
    // Delete a message
    return new Promise( (resolve, reject) => {

        ChatModel.find({}, function (err, chats) {
        if (err) return reject(err);

        console.log(chats)

        return resolve({chats: chats});
        });
    });
};

//

/*
Export
*/
module.exports = {
    post,
    deleteMessage,
    refreshMessage
}
//