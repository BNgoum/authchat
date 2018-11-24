/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');
    const mongoose = require('mongoose');

    // INNER
    const { checkFields } = require('../../services/request.checker');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');

    const db = mongoose.connection;
    let collectionUser = db.collection('users');
//

/*
Routes definition
*/
    class AuthRouterClass {
        routes(){
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {

                // Check for mandatories
                const { miss, extra, ok } = checkFields(['first_name', 'last_name', 'email', 'password'], req.body);

                // Check oppropriated values
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                register(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'User register', apiRes) )
                .catch( apiErr => sendApiErrorResponse(res, 'User not register', apiErr) )
            });

            // Login
            authRouter.post('/login', (req, res) => {

                // Check for mandatories
                const { miss, extra, ok } = checkFields(['email', 'password'], req.body);

                // Check oppropriated values
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

                // Use controller function
                login(req.body)
                .then( apiRes =>  sendApiSuccessResponse(res, 'User login', apiRes) )
                .catch( apiErr => sendApiErrorResponse(res, 'User not login', apiErr) )
            });
        };

        init(){
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//