const express = require('express');
const router = express.Router();

// Simple in-memory analytics (in production, use a database)
let analytics = {
  totalMessages: 0,
  totalSessions: 0,
  intentCounts: {},
  dailyStats: {},
  startTime: new Date()
};

// Middleware to track analytics
const trackAnalytics = (req, res, next) => {
  if (process.env.ANALYTICS_ENABLED === 'true') {
    const originalSend = res.send;
    res.send = function(data) {
      // Track successful chat responses
      if (req.path === '/chat' && res.statusCode === 200) {
        analytics.totalMessages++;
        
        try {
          const response = JSON.parse(data);
          if (response.response && response.response.intent) {
            const intent = response.response.intent;
            analytics.intentCounts[intent] = (analytics.intentCounts[intent] || 0) + 1;
          }
        } catch (e) {
          // Ignore parsing errors
        }

        // Daily stats
        const today = new Date().toISOString().split('T')[0];
        if (!analytics.dailyStats[today]) {
          analytics.dailyStats[today] = { messages: 0, sessions: new Set() };
        }
        analytics.dailyStats[today].messages++;
      }
      
      originalSend.call(this, data);
    };
  }
  next();
};

// Apply analytics middleware
router.use(trackAnalytics);

// Get analytics data
router.get('/stats', (req, res) => {
  try {
    const uptime = Date.now() - analytics.startTime.getTime();
    
    res.json({
      totalMessages: analytics.totalMessages,
      totalSessions: analytics.totalSessions,
      intentCounts: analytics.intentCounts,
      dailyStats: analytics.dailyStats,
      uptime: {
        milliseconds: uptime,
        seconds: Math.floor(uptime / 1000),
        minutes: Math.floor(uptime / (1000 * 60)),
        hours: Math.floor(uptime / (1000 * 60 * 60))
      },
      startTime: analytics.startTime,
      mostPopularIntent: Object.keys(analytics.intentCounts).reduce((a, b) => 
        analytics.intentCounts[a] > analytics.intentCounts[b] ? a : b, 'none'
      )
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

// Reset analytics (development only)
router.post('/reset', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    analytics = {
      totalMessages: 0,
      totalSessions: 0,
      intentCounts: {},
      dailyStats: {},
      startTime: new Date()
    };
    
    res.json({ message: 'Analytics reset successfully' });
  } else {
    res.status(403).json({ error: 'Not allowed in production' });
  }
});

module.exports = router;