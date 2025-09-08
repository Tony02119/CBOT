import React, { useEffect, useRef, useState } from 'react';
import "./chatbot.css";
import axios from "axios";

const Chatbot = () => {
	const [enableAnalytics, setEnableAnalytics] = useState(false);
	const [showAnalyticsPopup, setShowAnalyticsPopup] = useState(true);
	const [userMessageCount, setUserMessageCount] = useState(0);
	const [message, setMessage] = useState('');
	const [chatMessages, setChatMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const chatroomRef = useRef(null);
	const initialMessageSent = useRef(false);
	
	// Configuration de l'API - Rasa direct
	const RASA_URL = "http://localhost:5006";
	const RASA_ENDPOINT = "/webhooks/rest/webhook";

	const sendMessage = async (message) => {
		if (!message.trim()) return;
		
		setUserMessageCount(prev => prev + 1);
		setIsLoading(true);
		
		// Format de message pour Rasa
		const userMessage = { 
			sender: "user", 
			message: message.trim()
		};

		try {
			// Afficher immédiatement le message utilisateur
			setChatMessages(prevMessages => [...prevMessages, { 
				sender: "You", 
				text: message.trim() 
			}]);
			setMessage('');

			// Envoyer vers Rasa
			const response = await axios.post(RASA_URL + RASA_ENDPOINT, userMessage, {
				headers: {
					'Content-Type': 'application/json',
				},
				timeout: 10000, // 10 secondes de timeout
			});

			// Traiter la réponse de Rasa
			if (response.data && Array.isArray(response.data)) {
				for (const botMessage of response.data) {
					// Afficher le texte de la réponse
					if (botMessage.text) {
						// Diviser les réponses multiples par \n\n
						const messageParts = botMessage.text.split("\n\n");
						messageParts.forEach(part => {
							if (part.trim()) {
								setChatMessages(prevMessages => [...prevMessages, { 
									sender: "Chatbot", 
									text: part.trim() 
								}]);
							}
						});
					}

					// Afficher les boutons si présents
					if (botMessage.buttons && botMessage.buttons.length > 0) {
						setChatMessages(prevMessages => [...prevMessages, { 
							sender: "Chatbot", 
							buttons: botMessage.buttons 
						}]);
					}
				}
			} else {
				// Réponse inattendue
				setChatMessages(prevMessages => [...prevMessages, { 
					sender: "Chatbot", 
					text: "I'm sorry, I'm having trouble responding right now. Please try again." 
				}]);
			}
		} catch (error) {
			console.error('Error sending message:', error);
			
			let errorMessage = "I'm sorry, I'm having connection issues. ";
			
			if (error.code === 'ECONNREFUSED') {
				errorMessage += "The chatbot service seems to be offline. Please check if the service is running.";
			} else if (error.response) {
				errorMessage += `Server responded with error: ${error.response.status}`;
			} else if (error.request) {
				errorMessage += "No response from server. Please check your connection.";
			} else {
				errorMessage += "An unexpected error occurred.";
			}
			
			setChatMessages(prevMessages => [...prevMessages, { 
				sender: "System", 
				text: errorMessage,
				isError: true
			}]);
		} finally {
			setIsLoading(false);
		}
	};

	const prepareAndSendMessage = async () => {
		if (!message.trim() || isLoading) return;
		await sendMessage(message);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			prepareAndSendMessage();
		}
	};

	const handleButtonClick = (buttonPayload) => {
		// Extraire le message du payload (enlever le / du début)
		const buttonMessage = buttonPayload.startsWith('/') ? 
			buttonPayload.substring(1).replace(/_/g, ' ') : 
			buttonPayload;
		sendMessage(buttonMessage);
	};

	// Auto-scroll vers le bas
	useEffect(() => {
		if (chatroomRef.current) {
			chatroomRef.current.scrollTop = chatroomRef.current.scrollHeight;
		}
	}, [chatMessages]);

	// Message de bienvenue automatique
	useEffect(() => {
		if (!initialMessageSent.current) {
			// Attendre un peu avant d'envoyer le message de bienvenue
			setTimeout(() => {
				sendMessage("hello");
				initialMessageSent.current = true;
			}, 1000);
		}
	}, []);

	const handlePopupResponse = (response) => {
		setEnableAnalytics(response);
		setShowAnalyticsPopup(false);
		
		// Stocker le choix pour 24h
		localStorage.setItem('analyticsChoice', JSON.stringify({
			enabled: response,
			timestamp: Date.now()
		}));
	};

	// Vérifier le choix d'analytics au chargement
	useEffect(() => {
		const stored = localStorage.getItem('analyticsChoice');
		if (stored) {
			try {
				const choice = JSON.parse(stored);
				const now = Date.now();
				// Vérifier si le choix a moins de 24h
				if (now - choice.timestamp < 86400000) {
					setEnableAnalytics(choice.enabled);
					setShowAnalyticsPopup(false);
				}
			} catch (e) {
				console.error('Error parsing stored analytics choice:', e);
			}
		}
	}, []);

	return (
		<div className='box'>
			{showAnalyticsPopup && (
				<div className='popup'>
					<div className='popup-content'>
						<h3>Privacy Settings</h3>
						<p>
							Would you like to help us improve the chatbot by allowing us to store your conversation 
							for analytical purposes? All data is completely anonymous and cannot be linked to you in any way.
						</p>
						<div className="popup-buttons">
							<button onClick={() => handlePopupResponse(true)} className="accept-btn">
								Yes, help improve the chatbot
							</button>
							<button onClick={() => handlePopupResponse(false)} className="decline-btn">
								No, keep my conversation private
							</button>
						</div>
					</div>
				</div>
			)}

			<div className='chatroom-wrapper'>
				<div className='chatroom' ref={chatroomRef}>
					{chatMessages.map((msg, index) => (
						<React.Fragment key={index}>
							{msg.text && (
								<div className={`message ${
									msg.sender === 'You' ? 'user-message' : 
									msg.sender === 'System' ? 'system-message' : 
									'bot-message'
								} ${msg.isError ? 'error-message' : ''}`}>
									{msg.text}
								</div>
							)}

							{msg.buttons && (
								<div className='buttons-container'>
									{msg.buttons.map((button, idx) => (
										<button
											key={idx}
											className='chat-button'
											onClick={() => handleButtonClick(button.payload)}
											disabled={isLoading}
										>
											{button.title}
										</button>
									))}
								</div>
							)}
						</React.Fragment>
					))}
					
					{isLoading && (
						<div className="bot-message loading-message">
							<div className="typing-indicator">
								<span></span>
								<span></span>
								<span></span>
							</div>
							Chatbot is typing...
						</div>
					)}
				</div>
			</div>
			
			<div className='input-area'>
				<input
					type="text"
					className='message-input'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyPress}
					placeholder={isLoading ? "Please wait..." : "Type your message about CPR or first aid..."}
					disabled={isLoading}
					maxLength={500}
				/>
				<button 
					className='send-message-button' 
					onClick={prepareAndSendMessage}
					disabled={isLoading || !message.trim()}
				>
					{isLoading ? (
						<div className="loading-spinner"></div>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" className='icon-send-button' width="20" height="20" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 3l3 9l-3 9l19-9Zm3 9h16"></path>
						</svg>
					)}
				</button>
			</div>
			
			<div className="chatbot-info">
				<p>💡 Try asking: "How to do CPR", "What is cardiac arrest", "Emergency numbers"</p>
			</div>
		</div>
	)
}

export default Chatbot;