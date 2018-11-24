/*
Imports
*/
const express = require('express');
const chatRouter = express.Router({ mergeParams: true });
const { post, deleteMessage, refreshMessage } = require('./chat.controller');

// INNER
const { checkFields } = require('../../services/request.checker');
const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

//

/*
Routes definition
*/
class ChatRouterClass {
    routes(){
        // HATEOAS
        chatRouter.get('/', (req, res) => {
            res.json('HATEOAS for Chat');
        });
        
        // Post message
        chatRouter.post('/post', (req, res) => {

            // Check for mandatories
            const { miss, extra, ok } = checkFields(['message', 'last_name'], req.body);

            // Check oppropriated values
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

            // Use controller function
            post(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'User post ok', apiRes) )
            .catch( apiErr => sendApiErrorResponse(res, 'User post not ok', apiErr) )
        });

        // Delete message
        chatRouter.post('/delete', (req, res) => {

            // Check for mandatories
            const { miss, extra, ok } = checkFields(['_id'], req.body);

            // Check oppropriated values
            if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

            // Use controller function
            deleteMessage(req.body)
            .then( apiRes =>  sendApiSuccessResponse(res, 'Message is deleted', apiRes) )
            .catch( apiErr => sendApiErrorResponse(res, 'Message is not deleted', apiErr) )
        });

        // Refresh messages
        chatRouter.get('/refresh', (req, res) => {
            refreshMessage()
            .then( apiRes =>  sendApiSuccessResponse(res, 'Refresh all messages', apiRes) )
            .catch( apiErr => sendApiErrorResponse(res, 'Refresh messages failed', apiErr) )
        })
    };

    init(){
        this.routes();
        return chatRouter;
    }
}
//

/*
Export
*/
module.exports = ChatRouterClass;
//