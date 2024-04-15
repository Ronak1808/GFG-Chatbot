const express = require("express");
const PORT = 3000;
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const {connectDB} = require("./config/db");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const { Client, Server, Unans } = require("./config/models");

connectDB();
app.use(express.json());
app.use(cors());
// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.get('/downloadcsv', async (req, res) => {
    try {
        const clientData = await Client.find({});
        const serverData = await Server.find({});

        const combinedMessages = [];
        let clientIndex = 0;
        let serverIndex = 0;

        while (clientIndex < clientData.length || serverIndex < serverData.length) {

            const messageObject = {
                clientMessage: clientIndex < clientData.length ? clientData[clientIndex].message : '', 
                serverMessage: serverIndex < serverData.length ? serverData[serverIndex].message : '' 
            };

         
            combinedMessages.push(messageObject);

            clientIndex++;
            serverIndex++;
        }

        console.log(combinedMessages);
        res.status(200).json({messages: combinedMessages});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/unans', async (req, res) => {
    try {
        const Unanss = await Unans.find({});
        const answeredQueries = Unanss.map(item => ({
            UnansweredQuery: item.message
        }));
        res.status(200).json({messages: answeredQueries});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use("/", (req, res) => {
    res.json({ message: "API running...." });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// later for csv file download of admin that has stored chat history of each user  do at last

