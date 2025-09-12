const express = require('express');
const { v4: uuidv4 } = require('uuid');
const CPRBot = require('../nlp/cprBot');

const router = express.Router();
const cprBot = new CPRBot();

// Store conversation sessions (in production, use Redis or database)
const sessions = new Map();

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message is required and must be a string'
      });
    }

    // Generate session ID if not provided
    const currentSessionId = sessionId || uuidv4();

    // Get or create session
    if (!sessions.has(currentSessionId)) {
      sessions.set(currentSessionId, {
        id: currentSessionId,
        messages: [],
        createdAt: new Date(),
        lastActivity: new Date()
      });
    }

    const session = sessions.get(currentSessionId);
    session.lastActivity = new Date();

    // Process message with CPR Bot
    const botResponse = await cprBot.processMessage(message.trim(), language);

    // Store messages in session
    session.messages.push({
      id: uuidv4(),
      type: 'user',
      text: message,
      timestamp: new Date()
    });

    session.messages.push({
      id: uuidv4(),
      type: 'bot',
      text: botResponse.text,
      intent: botResponse.intent,
      confidence: botResponse.confidence,
      timestamp: new Date()
    });

    // Clean up old sessions (keep last 100 messages per session)
    if (session.messages.length > 100) {
      session.messages = session.messages.slice(-100);
    }

    // Response format compatible with frontend
    res.json({
      sessionId: currentSessionId,
      response: {
        text: botResponse.text,
        intent: botResponse.intent,
        confidence: botResponse.confidence,
        language: botResponse.language
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Sorry, I encountered an error. Please try again.'
    });
  }
});

// Get conversation history
router.get('/history/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = sessions.get(sessionId);

    if (!session) {
      return res.status(404).json({
        error: 'Session not found'
      });
    }

    res.json({
      sessionId,
      messages: session.messages,
      createdAt: session.createdAt,
      lastActivity: session.lastActivity
    });

  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Get bot capabilities
router.get('/capabilities', (req, res) => {
  try {
    res.json({
      intents: cprBot.getAvailableIntents(),
      languages: ['en', 'fr'],
      features: [
        'CPR instructions',
        'Cardiac arrest symptoms',
        'Emergency numbers',
        'AED usage',
        'Multilingual support'
      ]
    });
  } catch (error) {
    console.error('Capabilities error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Clean up old sessions (run periodically)
setInterval(() => {
  const now = new Date();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.lastActivity > maxAge) {
      sessions.delete(sessionId);
    }
  }
}, 60 * 60 * 1000); // Run every hour

module.exports = router;