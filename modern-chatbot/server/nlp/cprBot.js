const { NlpManager } = require('node-nlp');

class CPRBot {
  constructor() {
    this.manager = new NlpManager({ languages: ['en', 'fr'] });
    this.isTrained = false;
    this.initializeBot();
  }

  async initializeBot() {
    await this.addTrainingData();
    await this.train();
  }

  async addTrainingData() {
    // Greetings - English
    this.manager.addDocument('en', 'hello', 'greet');
    this.manager.addDocument('en', 'hi', 'greet');
    this.manager.addDocument('en', 'hey', 'greet');
    this.manager.addDocument('en', 'good morning', 'greet');
    this.manager.addDocument('en', 'good evening', 'greet');

    // Greetings - French
    this.manager.addDocument('fr', 'bonjour', 'greet');
    this.manager.addDocument('fr', 'salut', 'greet');
    this.manager.addDocument('fr', 'bonsoir', 'greet');
    this.manager.addDocument('fr', 'coucou', 'greet');

    // What is CPR
    this.manager.addDocument('en', 'what is cpr', 'what_is_cpr');
    this.manager.addDocument('en', 'what does cpr mean', 'what_is_cpr');
    this.manager.addDocument('en', 'explain cpr', 'what_is_cpr');
    this.manager.addDocument('en', 'define cpr', 'what_is_cpr');
    this.manager.addDocument('fr', 'qu\'est-ce que la rcp', 'what_is_cpr');
    this.manager.addDocument('fr', 'définir rcp', 'what_is_cpr');

    // How to perform CPR
    this.manager.addDocument('en', 'how to do cpr', 'how_to_cpr');
    this.manager.addDocument('en', 'cpr steps', 'how_to_cpr');
    this.manager.addDocument('en', 'how to perform cpr', 'how_to_cpr');
    this.manager.addDocument('en', 'cpr procedure', 'how_to_cpr');
    this.manager.addDocument('fr', 'comment faire la rcp', 'how_to_cpr');
    this.manager.addDocument('fr', 'étapes rcp', 'how_to_cpr');

    // Cardiac arrest symptoms
    this.manager.addDocument('en', 'cardiac arrest symptoms', 'symptoms');
    this.manager.addDocument('en', 'signs of cardiac arrest', 'symptoms');
    this.manager.addDocument('en', 'how to recognize cardiac arrest', 'symptoms');
    this.manager.addDocument('fr', 'symptômes arrêt cardiaque', 'symptoms');
    this.manager.addDocument('fr', 'signes arrêt cardiaque', 'symptoms');

    // Emergency numbers
    this.manager.addDocument('en', 'emergency number', 'emergency_numbers');
    this.manager.addDocument('en', 'call for help', 'emergency_numbers');
    this.manager.addDocument('en', 'who to call', 'emergency_numbers');
    this.manager.addDocument('fr', 'numéro d\'urgence', 'emergency_numbers');
    this.manager.addDocument('fr', 'appeler les secours', 'emergency_numbers');

    // AED/Defibrillator
    this.manager.addDocument('en', 'what is aed', 'what_is_aed');
    this.manager.addDocument('en', 'how to use defibrillator', 'how_to_aed');
    this.manager.addDocument('en', 'aed steps', 'how_to_aed');
    this.manager.addDocument('fr', 'qu\'est-ce qu\'un défibrillateur', 'what_is_aed');
    this.manager.addDocument('fr', 'comment utiliser défibrillateur', 'how_to_aed');

    // Thank you
    this.manager.addDocument('en', 'thank you', 'thanks');
    this.manager.addDocument('en', 'thanks', 'thanks');
    this.manager.addDocument('fr', 'merci', 'thanks');

    // Responses - English
    this.manager.addAnswer('en', 'greet', 'Hello! I\'m your CPR assistant. I can help you learn about CPR, cardiac arrest symptoms, emergency procedures, and how to use an AED. How can I help you today?');
    
    this.manager.addAnswer('en', 'what_is_cpr', 'CPR stands for Cardiopulmonary Resuscitation. It\'s an emergency procedure that combines chest compressions and rescue breathing to maintain blood flow and oxygen to the brain and heart when someone\'s heart stops beating.');
    
    this.manager.addAnswer('en', 'how_to_cpr', `Here are the basic CPR steps:

1. **Check responsiveness** - Tap shoulders and shout "Are you okay?"
2. **Call for help** - Call emergency services (911/112)
3. **Position the person** - Place on firm, flat surface
4. **Hand placement** - Center of chest, between nipples
5. **Compressions** - Push hard and fast, at least 2 inches deep
6. **Rate** - 100-120 compressions per minute
7. **Rescue breaths** - 2 breaths after every 30 compressions (if trained)
8. **Continue** - Until emergency services arrive

Remember: Push hard, push fast, allow complete chest recoil!`);

    this.manager.addAnswer('en', 'symptoms', `Signs of cardiac arrest:

**Immediate signs:**
- Person collapses suddenly
- No response to verbal or physical stimuli
- No normal breathing or gasping
- No pulse (if you know how to check)

**Warning signs (may occur before):**
- Chest pain or discomfort
- Shortness of breath
- Nausea or vomiting
- Dizziness or lightheadedness
- Rapid or irregular heartbeat

**Act immediately if someone shows signs of cardiac arrest!**`);

    this.manager.addAnswer('en', 'emergency_numbers', `Emergency numbers by region:

**Europe:** 112 (universal emergency number)
**USA/Canada:** 911
**UK:** 999
**Australia:** 000

**When calling:**
- Stay calm and speak clearly
- Give exact location
- Describe the situation
- Follow dispatcher instructions
- Don't hang up until told to do so

**Remember: Call immediately when you suspect cardiac arrest!**`);

    this.manager.addAnswer('en', 'what_is_aed', 'An AED (Automated External Defibrillator) is a portable device that analyzes heart rhythm and can deliver an electric shock to restore normal heart rhythm during cardiac arrest. It provides voice prompts to guide users through the process.');

    this.manager.addAnswer('en', 'how_to_aed', `AED Steps:

1. **Turn on the AED** - Follow voice prompts
2. **Expose chest** - Remove clothing, ensure dry
3. **Attach pads** - Follow diagram on pads
4. **Clear the area** - "Everyone clear!"
5. **Let AED analyze** - Don't touch person
6. **Deliver shock if advised** - Press flashing button
7. **Resume CPR** - Start compressions immediately
8. **Follow AED prompts** - Continue until help arrives

**Remember: AEDs are designed to be used by anyone!**`);

    this.manager.addAnswer('en', 'thanks', 'You\'re welcome! Remember, learning CPR can save lives. Practice regularly and stay prepared. Is there anything else you\'d like to know about CPR or emergency procedures?');

    // Responses - French
    this.manager.addAnswer('fr', 'greet', 'Bonjour ! Je suis votre assistant RCP. Je peux vous aider à apprendre la RCP, les symptômes d\'arrêt cardiaque, les procédures d\'urgence et l\'utilisation d\'un défibrillateur. Comment puis-je vous aider ?');
    
    this.manager.addAnswer('fr', 'what_is_cpr', 'La RCP signifie Réanimation Cardio-Pulmonaire. C\'est une procédure d\'urgence qui combine compressions thoraciques et ventilation pour maintenir la circulation sanguine et l\'oxygénation du cerveau quand le cœur s\'arrête.');
    
    this.manager.addAnswer('fr', 'thanks', 'De rien ! N\'oubliez pas, apprendre la RCP peut sauver des vies. Pratiquez régulièrement et restez préparé. Y a-t-il autre chose que vous aimeriez savoir ?');

    // Default fallback
    this.manager.addAnswer('en', 'None', 'I\'m sorry, I didn\'t understand that. I can help you with CPR procedures, cardiac arrest symptoms, emergency numbers, and AED usage. Could you please rephrase your question?');
    this.manager.addAnswer('fr', 'None', 'Désolé, je n\'ai pas compris. Je peux vous aider avec les procédures RCP, les symptômes d\'arrêt cardiaque, les numéros d\'urgence et l\'utilisation du défibrillateur. Pouvez-vous reformuler votre question ?');
  }

  async train() {
    console.log('🧠 Training CPR Bot...');
    await this.manager.train();
    this.isTrained = true;
    console.log('✅ CPR Bot trained successfully!');
  }

  async processMessage(message, language = 'en') {
    if (!this.isTrained) {
      await this.train();
    }

    try {
      const response = await this.manager.process(language, message);
      
      return {
        text: response.answer || "I'm sorry, I didn't understand that. Could you please rephrase your question?",
        intent: response.intent,
        confidence: response.score,
        language: response.locale
      };
    } catch (error) {
      console.error('Error processing message:', error);
      return {
        text: "I'm sorry, there was an error processing your message. Please try again.",
        intent: 'error',
        confidence: 0,
        language: language
      };
    }
  }

  getAvailableIntents() {
    return [
      'greet',
      'what_is_cpr',
      'how_to_cpr',
      'symptoms',
      'emergency_numbers',
      'what_is_aed',
      'how_to_aed',
      'thanks'
    ];
  }
}

module.exports = CPRBot;