const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();


const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const {Client, Server, Unans} = require('../config/models');

// Your google dialogflow project-id
const PROJECID = CREDENTIALS.project_id;

// Configuration for the client
const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
    }
}

// Create a new session
const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

// Detect intent method
const detectIntent = async (languageCode, queryText, sessionId) => {

    let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);
    await Client.create({message: queryText});
    // The text query request.
    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: queryText,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
        
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    await Server.create({message: result.fulfillmentText});
    const variable = result.fulfillmentText;
    const givenString = "Sorry. I am not sure about that. Your query has been sent to admin for resolution.";

    if (variable === givenString) {
        await Unans.create({message: queryText});
    } 
    return {
        response: result.fulfillmentText
    };
}

const getResponse= async (req, res) => {

    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

    let responseData = await detectIntent(languageCode, queryText, sessionId);

    res.send(responseData.response);
};
module.exports={getResponse};
