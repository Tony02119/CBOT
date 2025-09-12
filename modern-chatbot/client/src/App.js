import React from 'react';
import './App.css';
import ChatBot from './components/ChatBot';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h1>CPR Assistant</h1>
            <p>Your AI-powered guide for CPR and emergency procedures</p>
          </div>
          <ChatBot />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;