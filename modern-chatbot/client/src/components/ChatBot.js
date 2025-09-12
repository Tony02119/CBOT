import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => uuidv4());
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);

  // Test connection on component mount
  useEffect(() => {
    testConnection();
    // Send initial greeting
    sendInitialGreeting();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const testConnection = async () => {
    try {
      const response = await axios.get('/api/chatbot/capabilities');
      setIsConnected(true);
      console.log('✅ Connected to chatbot server:', response.data);
    } catch (error) {
      setIsConnected(false);
      console.error('❌ Failed to connect to chatbot server:', error);
      addSystemMessage('Connection failed. Please check if the server is running.');
    }
  };

  const sendInitialGreeting = async () => {
    try {
      const response = await axios.post('/api/chatbot/chat', {
        message: 'Hello',
        sessionId: sessionId,
        language: 'en'
      });

      addBotMessage(response.data.response.text);
    } catch (error) {
      console.error('Failed to send initial greeting:', error);
      addSystemMessage('Welcome! I\'m your CPR assistant. How can I help you today?');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addUserMessage = (text) => {
    const message = {
      id: uuidv4(),
      type: 'user',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addBotMessage = (text, intent = null, confidence = null) => {
    const message = {
      id: uuidv4(),
      type: 'bot',
      text: text,
      intent: intent,
      confidence: confidence,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const addSystemMessage = (text) => {
    const message = {
      id: uuidv4(),
      type: 'system',
      text: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message immediately
    addUserMessage(userMessage);

    try {
      const response = await axios.post('/api/chatbot/chat', {
        message: userMessage,
        sessionId: sessionId,
        language: 'en'
      });

      // Add bot response
      addBotMessage(
        response.data.response.text,
        response.data.response.intent,
        response.data.response.confidence
      );

    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
        errorMessage = 'Connection failed. Please check if the server is running on port 5000.';
        setIsConnected(false);
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again in a moment.';
      }
      
      addSystemMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const getMessageClassName = (message) => {
    switch (message.type) {
      case 'user':
        return 'message user-message';
      case 'bot':
        return 'message bot-message';
      case 'system':
        return 'message system-message';
      default:
        return 'message';
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-info">
          <h3>CPR Assistant</h3>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>
      </div>

      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <div className="welcome-icon">🏥</div>
            <h4>Welcome to CPR Assistant!</h4>
            <p>I can help you learn about:</p>
            <ul>
              <li>CPR procedures and techniques</li>
              <li>Cardiac arrest symptoms</li>
              <li>Emergency contact numbers</li>
              <li>AED (defibrillator) usage</li>
            </ul>
            <p>Ask me anything about CPR and emergency procedures!</p>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={getMessageClassName(message)}>
            <div className="message-content">
              <div 
                className="message-text"
                dangerouslySetInnerHTML={{ 
                  __html: formatMessage(message.text) 
                }}
              />
              {message.type === 'bot' && message.confidence && (
                <div className="message-meta">
                  Intent: {message.intent} | Confidence: {Math.round(message.confidence * 100)}%
                </div>
              )}
            </div>
            <div className="message-timestamp">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about CPR, emergency procedures, or AED usage..."
            className="message-input"
            rows="1"
            disabled={isLoading || !isConnected}
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading || !isConnected}
            className="send-button"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
        <div className="input-help">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatBot;