// Partie du code JSX pour le bouton envoyer
<button className='send-message-button' onClick={prepareAndSendMessage}>
  <svg xmlns="http://www.w3.org/2000/svg" className='icon-send-button' width="3em" height="3em" viewBox="0 0 24 24">
    <path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m3 3l3 9l-3 9l19-9Zm3 9h16"></path>
  </svg>
</button>

// Fonction associée au bouton
const prepareAndSendMessage = async () => {
  if (!message.trim()) return;
  sendMessage(message);
};

// CSS correspondant dans chatbot.css
.send-message-button {
  background: var(--primary-green);
  color: var(--white);
  border: none;
  padding: 0 20px;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.send-message-button:hover {
  background: #047857;
}

.icon-send-button {
  width: 20px;
  height: 20px;
}