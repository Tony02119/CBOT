# Project Introduction & Technical Overview – CPR LifeSaver

## 1. Project Overview
• **Project Name:** CPR LifeSaver - Interactive First Aid Learning Platform  
• **Objective / Goal:** Create a comprehensive educational platform for CPR and first aid training with AI-powered chatbot assistance  
• **Project Type:** AI Chatbot, Educational Web Platform, Healthcare Technology  
• **Stakeholders:** Medical Educators, Healthcare Professionals, General Public, Data Mining Group JGU Mainz  
• **Demo Link:** https://lifesaver.nightingale.uni-mainz.de/  
• **GitHub Repo:** [CPR Chatbot Repository]  
• **Tech Stack:** React.js, Rasa NLU, Nuxt.js, PostgreSQL, Docker, Node.js  

## 2. Purpose & Problem Statement
Cardiac arrest affects millions globally, with survival rates heavily dependent on immediate CPR intervention. Studies show that brain damage begins after 5 minutes without oxygen, yet many people lack proper CPR knowledge.

**CPR LifeSaver solves this by:**
• Providing interactive CPR and AED training with visual guides
• Offering an AI-powered chatbot for instant first aid questions
• Testing knowledge through comprehensive quizzes
• Collecting analytics to improve training effectiveness
• Making life-saving education accessible to everyone

## 3. Technical Architecture

### 3.1 Frontend
• **Technology:** React.js 18.3.1 + React Router + Axios  
• **Purpose:** Interactive user interface for learning, testing, and chatbot interaction  
• **Features:** 
  - Responsive design with mobile optimization
  - Interactive quiz system with real-time feedback
  - Step-by-step visual instructions with GIFs
  - Real-time chat interface with AI assistant
  - Disclaimer popup with consent management

### 3.2 Backend
• **Technology:** Rasa 3.6.20 (NLU Framework) + Node.js + Express.js  
• **Purpose:** AI chatbot for medical Q&A, analytics collection, and data processing  
• **APIs Used:** Rasa REST API, Custom Analytics API  
• **Key Endpoints:**
  - POST /webhooks/rest/webhook → Chatbot conversation
  - POST /api/ask_chatbot → Analytics-enabled chat
  - GET /api/db/questionsCount → Usage statistics
  - GET /api/db/getQuestions → Conversation history

### 3.3 Database & Storage
• **Database:** PostgreSQL with Docker containerization  
• **Dataset Sources:** Medical guidelines, CPR protocols, user interactions  
• **Data Handling:** 
  - bot_answers table: Stores chatbot responses with usage counts
  - user_questions table: Anonymous conversation logs with position tracking
  - Automated analytics collection with privacy protection

### 3.4 Deployment & Infrastructure
• **Hosting Platform:** Docker Compose with multi-service architecture  
• **Infrastructure Setup:** 
  - Rasa chatbot container (rasa/rasa:3.6.20-full)
  - PostgreSQL database with persistent volumes
  - Nuxt.js analytics dashboard
  - React frontend with Nginx
• **Monitoring Tools:** Docker health checks, PostgreSQL query monitoring, Adminer for database management

## 4. Features & Functionalities

| Feature | Description | Status | Demo Link |
|---------|-------------|--------|-----------|
| Interactive Quiz | 14-question CPR knowledge test with instant feedback | ✅ Live | [View Quiz] |
| CPR Instructions | Step-by-step visual guide with animated GIFs | ✅ Live | [View Instructions] |
| AED Instructions | Automated External Defibrillator usage guide | ✅ Live | [View AED Guide] |
| AI Chatbot | Rasa-powered assistant for first aid questions | ✅ Live | [Chat Now] |
| Analytics Dashboard | Usage statistics and conversation insights | ✅ Live | [View Analytics] |
| Intent Generator | Crowdsourced training data collection tool | ✅ Live | [Generate Intents] |
| Mobile Responsive | Optimized experience across all devices | ✅ Live | [Test Mobile] |
| Privacy Controls | Opt-in analytics with anonymous data collection | ✅ Live | [Privacy Info] |

## 5. Current Status & Achievements
• ✅ **Completed:**
  - Full-stack React application with 5 main pages
  - Trained Rasa chatbot with 11 medical intents
  - PostgreSQL analytics system with privacy protection
  - Docker-based deployment architecture
  - Responsive design with modern UI/UX
  - Comprehensive CPR/AED instruction system

• 🔄 **In Progress:**
  - Enhanced chatbot training with more medical scenarios
  - Advanced analytics visualizations
  - Multi-language support preparation

• ⏳ **Pending:**
  - Integration with medical certification systems
  - Advanced progress tracking for users
  - Offline mode capabilities

## 6. Roadmap & Deliverables

| Phase | Goal | Owner | Deadline | Priority |
|-------|------|-------|----------|----------|
| Phase 1 | Enhanced chatbot training data | Data Mining Team | Q1 2025 | High |
| Phase 2 | Multi-language support (German, French) | Development Team | Q2 2025 | Medium |
| Phase 3 | Mobile app development | Mobile Team | Q3 2025 | Medium |
| Phase 4 | Medical certification integration | Partnership Team | Q4 2025 | High |
| Phase 5 | Advanced analytics dashboard | Analytics Team | Q1 2026 | Low |

## 7. Stakeholder Value
• **For Medical Educators:** Ready-to-use platform for CPR training with built-in assessment tools  
• **For Healthcare Professionals:** Data insights on public CPR knowledge gaps and training effectiveness  
• **For General Public:** Free, accessible, and comprehensive first aid education with instant AI support  
• **For Researchers:** Anonymous conversation data for improving medical AI and educational methodologies  
• **For Developers:** Open-source example of medical AI integration with modern web technologies

## 8. Resources
• **Live Demo:** https://lifesaver.nightingale.uni-mainz.de/  
• **Analytics Dashboard:** https://cpr-chatbot.nightingale.uni-mainz.de/  
• **GitHub Repo:** [CPR Chatbot Repository]  
• **API Documentation:** Available in repository README files  
• **Technical Documentation:** Comprehensive setup guides in LAUNCH_GUIDE.md  
• **Research Institution:** https://www.datamining.informatik.uni-mainz.de/  
• **Funding Source:** https://curatime.org/  

---

## Technical Specifications

### **Chatbot Capabilities:**
- **11 trained intents:** greet, thank_you, what_is_cardiac_arrest, symptoms, how_to_react, emergency_numbers, what_is_cpr, how_to_cpr, mouth_to_mouth, defibrillator_usage, cpr_benefits
- **Multi-turn conversations** with context awareness
- **Fallback handling** for unknown queries
- **Button-based interactions** for guided responses

### **Data Privacy & Security:**
- **Anonymous data collection** with user consent
- **GDPR-compliant** privacy controls
- **Secure database** with Docker isolation
- **No personal information** stored or tracked

### **Performance Metrics:**
- **Response time:** <2 seconds for chatbot queries
- **Uptime:** 99.9% availability target
- **Mobile performance:** Optimized for 3G networks
- **Accessibility:** WCAG 2.1 AA compliance

This comprehensive platform represents a significant advancement in accessible medical education technology, combining modern web development with AI-powered assistance to potentially save lives through improved CPR knowledge and confidence.