import { useEffect, useRef, useState } from "react";
import Courses from './product/ProductItem';
import axios from "axios";
import { API_BASE_URL } from '../utils/localStorage';
// Import your logo image
import logo from '../assets/logo.png';

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function HomePage({isLoggedIn, setIsLoggedIn}) {
    const [isHidden, setIsHidden] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    useEffect(() => {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    useEffect(() => {
        const handleResize = () => {
            setIsHidden(window.innerWidth < 800);
        };

        handleResize(); // Call the function initially to set the initial state

        window.addEventListener('resize', handleResize); // Add event listener for resize

        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup the event listener
        };
    }, []);

    const handleSendMessage = async () => {
        if (inputValue.trim() !== '') {
            console.log("User input:", inputValue); // Log user input
            setMessages(prevMessages => [
                ...prevMessages,
                { text: inputValue, sender: 'user' }
            ]); // Update messages with user input
            setInputValue(''); // Clear input value

            try {
                // Send the user input as the query text to the server
                const requestBody = {
                    queryText: inputValue,
                    languageCode: "en",
                    sessionId: "abcd12343R3QRW"
                };

                // Make the Axios POST request to the server
                const response = await axios.post(`${API_BASE_URL}chat/query`, requestBody);

                // Log the server response
                console.log("Server response:", response.data);

                // Update messages with the server response
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: response.data, sender: 'server' }
                ]);
            } catch (error) {
                // Handle errors here
                console.error('Error:', error);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {

            handleSendMessage();
        }
    };

    return (
        <>
            <div className="h-screen bg-gray-900">
              
                <div className="flex bg-gray-900">
                    <div className={`${isHidden ? 'w-0 hidden' : 'w-[50%]'} bg-gray-900 `}>
                        <div className="mx-auto container pt-8 pb-5">
                            <div className="flex flex-wrap items-center justify-center ">
                                {Courses.map((item) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <div className="mx-2 w-80 mb-4 ">
                                        <div>
                                            <img src={item.imgg} className="w-full h-28" />
                                        </div>
                                        <div className="bg-gray-800 text-white ">
                                            <div className="pt-2 pl-4 pr-4">
                                                <div className="flex items-center">
                                                    <h2 className="text-lg font-semibold">{item.course}</h2>
                                                    <p className="text-xs text-gray-600 pl-5">{item.date}</p>
                                                </div>
                                                <p className="text-xs text-white mt-2">{item.description}</p>
                                                <div className="flex items-center justify-between py-3">
                                                    <h2 className="text-indigo-500 text-xs font-semibold">{item.instructor}</h2>
                                                    <h3 className="text-indigo-500 text-xl font-semibold">{item.price}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                    <div className={`${isHidden ? 'w-full' : 'w-[50%]'} dark:bg-black mt-5 ml-5 mr-5 rounded-lg flex flex-col h-[620px]`}>
                        <div className={`flex-1 overflow-y-auto px-4 py-8 `}>
                            {messages.length === 0 ? (
                                <div className="flex flex-col justify-center items-center h-full">
                                    <img src={logo} alt="Logo" className="w-20 mx-auto mb-4" />
                                    <h2 className="text-gray-500">Start a conversation with 'Hi'</h2>
                                </div>
                            ) : (
                                messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${
                                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                                            } mb-4`}
                                    >
                                        <div
                                            className={`${
                                                message.sender === 'user'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 text-gray-800'
                                                } py-2 px-4 rounded-lg`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className="flex items-center px-4 py-2 border-t border-gray-500">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 border rounded-lg py-2 px-4 mr-4"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
