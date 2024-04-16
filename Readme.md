#  CourseWebsite : An AI Powered chatbot

## 🔗 To see the project
[CourseWebsite](https://gfg-chatbot.vercel.app/)

##  About

Welcome to the Course chatbot ! This chatbot is designed to assist users in the courses available on the website (DSA, Android and web development). Chat bot is deveoped using DialogFlow an NLP platform by Google. 
 

##  Features of Course-Website

This chatbot is designed to help users so that they don't have to look up into the FAQs. Instead they can directly ask the bot and chatbot can tell the answer. The key features of the project are : 
- SignIn and SignUp system for personalized chat experince.
- Admin access system so that Admin can monitor the chats for improvements in the accuracy of chat bot.
- **context of question**. So that user doesn't need to mention the course name again and again.
- Sends the queries to which are not answered by the bot in a **CSV** format so that admin can add the answers for them.

## 👓 Preview
### Home Page 
<img src="https://github.com/Ronak1808/GFG-Chatbot/blob/main/demo_img/Home.PNG">

### Login Page
<img src="https://github.com/Ronak1808/GFG-Chatbot/blob/main/demo_img/LoginPage.PNG">

### Chat Feature
<img src= "https://github.com/Ronak1808/GFG-Chatbot/blob/main/demo_img/Chat.PNG">

### Admin access
<img src="https://github.com/Ronak1808/GFG-Chatbot/blob/main/demo_img/Admin.PNG">


## Aproach of chat bot : 
- Chat bot is created using DialogFlow. DialogFlow supports **Intents** and **Contexts** which are useful for a meaninful chat.
- Chat bot is trained on various questions on three different courses (DSA, Android Dev, Web Dev). 
- Whenver user types any message then depending on the current context the most suitable intent is selected and its response it given by the chat bot. So, I the training questions were put in appropriate contexts. The context created are explained below. 

### Contexts in the chat bot 
Context is set by the type of Query or message that user types. And at any time if user type any such message by which his/her intention seems to change context, the context is changed.

For example if user types : "I have a query regarding App course ?" then the context will be set to "App-Query"
Contexts are the most important part of the chatbot. Because without them it won't be possible to determine about which course the question is being asked. 
Apart from the basic Welcome context there are Four important contexts defined : 

1. App-Query : Whenever the user is asking question about Android Dev then context is set to App-Query. So that answer will be given from the data which is about Android Dev. 
2. Web-Query : Same context for Web dev also to answer question based on web development course.
3. DSA-Query : When this context is active the answers will be given based on the data available from DSA-course.
4. When there is no matching for any intent then a Fallback intent is triggered and the query is sent to the database which can then be accessed by admin.

## Important : 
- To access the admin feature firstly login from a sample account then on the nav bar admin login will be visible.
For the testing purpose password feature is not added in the admin. 

## Installation Guide :
### Clone the Repository in locally
```JavaScript
git clone https://github.com/Ronak1808/GFG-Chatbot.git
```
### Run the following commands one by one
```JavaScript
cd backend
npm install
npm run dev
cd..
cd frontent
npm install
npm run dev
Access website at http://localhost:5173/
```