import React, { useEffect, useRef, useState } from 'react';
import "./chatbot.css";

import axios from "axios";


const Chatbot = () => {
	const [enableAnalytics, setEnableAnalytics] = useState(false);
	const [showAnalyticsPopup, setShowAnalyticsPopup] = useState(true);

	const [userMessageCount, setUserMessageCount] = useState(0);
	const [message, setMessage] = useState('');
	const [chatMessages, setChatMessages] = useState([]);
	const chatroomRef = useRef(null);
	const initialMessageSent = useRef(false);
	// Use proxy endpoint to avoid CORS issues
	const DOMAIN = "";
	const URL = "/api/chatbot";

	const sendMessage = async (message) => {
		setUserMessageCount(userMessageCount + 1);
		const userMessage = { 
			sender: "user", 
			message: message,
			analytics: enableAnalytics, 
			conv_position: userMessageCount 
		};

		try {
			setChatMessages(prevMessages => [...prevMessages, { sender: "You", text: message }]);
			setMessage('');

			const response = await axios.post(DOMAIN + URL, userMessage, {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				timeout: 10000, // 10 second timeout
			});

			if (response.data && Array.isArray(response.data)) {
				for (const botMessage of response.data) {
					if (botMessage.text) {
						botMessage.text.split("\n\n").forEach(messageText => {
							if (!messageText.trim()) return;
							setChatMessages(prevMessages => [...prevMessages, { sender: "Chatbot", text: messageText }]);
						});
					}

					if (botMessage.buttons) {
						setChatMessages((prevMessages) => [
							...prevMessages,
							{ sender: "Chatbot", buttons: botMessage.buttons },
						]);
					}
				}
			} else {
				setChatMessages(prevMessages => [...prevMessages, { 
					sender: "Chatbot", 
					text: "Sorry, I didn't receive a proper response. Please try again." 
				}]);
			}
		} catch (error) {
			console.error('Error sending message:', error);
			let errorMessage = "Sorry, I'm having trouble connecting to the server. ";
			
			if (error.code === 'ERR_NETWORK') {
				errorMessage += "Please make sure the chatbot server is running on localhost:5006.";
			} else if (error.code === 'ECONNABORTED') {
				errorMessage += "The request timed out. Please try again.";
			} else {
				errorMessage += "Please try again later.";
			}
			
			setChatMessages(prevMessages => [...prevMessages, { 
				sender: "Chatbot", 
				text: errorMessage 
			}]);
		}
	};

	const prepareAndSendMessage = async () => {
		if (!message.trim()) return;
		sendMessage(message);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			prepareAndSendMessage();
		}
	};

	const handleButtonClick = (buttonMessage) => {
		sendMessage(buttonMessage);
	};

	useEffect(() => {
		if (chatroomRef.current) {
			chatroomRef.current.scrollTop = chatroomRef.current.scrollHeight;
		}
	}, [chatMessages]);

	useEffect(() => {
		if (!initialMessageSent.current) {
			sendMessage("Hello!");
			initialMessageSent.current = true;
		}
	});

	const handlePopupResponse = (response) => {
		setEnableAnalytics(response);
		setShowAnalyticsPopup(false);
	};

	return (
		<div className='box'>
			{showAnalyticsPopup && (
				<div className='popup'>
					<div className='popup-content'>
						<p>
							Do you agree that we keep your conversation with the chatbot in our database for purely analytical
							purposes and to improve the chatbot's responses. Conversations with this chatbot are completely
							anonymous and cannot be linked to you in any way.
						</p>
						<button onClick={() => handlePopupResponse(true)}>Yes</button>
						<button onClick={() => handlePopupResponse(false)}>No</button>
					</div>
				</div>
			)}

			<div className='chatroom-wrapper'>
				<div className='chatroom' ref={chatroomRef}>
					{chatMessages.map((msg, index) => (
						<React.Fragment key={index}>
							{msg.text && (
								<div className={msg.sender === 'You' ? 'user-message' : 'bot-message'}>
									{msg.text}
								</div>
							)}

							{msg.buttons && (
								<div className='buttons-container'>
									{msg.buttons.map((button, idx) => (
										<button
											key={idx}
											className='chat-button'
											onClick={() => handleButtonClick(button.title)}
										>
											{button.title}
										</button>
									))}
								</div>
							)}
						</React.Fragment>
					))}
				</div>
			</div>
			<div className='input-area'>
				<input
					type="text"
					className='message-input'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder="Type your message..."
				/>
				<button className='send-message-button' onClick={prepareAndSendMessage}>
					<svg xmlns="http://www.w3.org/2000/svg" className='icon-send-button' width="3em" height="3em" viewBox="0 0 24 24">
						<path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 3l3 9l-3 9l19-9Zm3 9h16"></path>
					</svg>
				</button>
			</div>
		</div>
	)
}

export default Chatbot