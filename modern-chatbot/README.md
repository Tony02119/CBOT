# Modern CPR Chatbot

Un chatbot moderne et fonctionnel pour l'apprentissage des procédures de RCP, compatible Linux et macOS.

## 🚀 Fonctionnalités

- **Interface moderne** avec React
- **Backend Node.js** robuste et performant
- **NLP avancé** avec node-nlp
- **Compatible** Linux et macOS
- **Multilingue** (Anglais/Français)
- **Analytics** intégrées
- **CORS configuré** correctement
- **Responsive design**

## 📋 Prérequis

- Node.js 16+ 
- npm ou yarn

## 🛠️ Installation

1. **Cloner et installer les dépendances :**
```bash
cd modern-chatbot
npm run install-all
```

2. **Configuration :**
```bash
cp .env.example .env
```

3. **Démarrer en mode développement :**
```bash
npm run dev
```

Le serveur backend sera disponible sur `http://localhost:5000`
Le client React sera disponible sur `http://localhost:3000`

## 🔧 Scripts disponibles

- `npm run dev` - Démarre backend et frontend en parallèle
- `npm run server` - Démarre uniquement le backend
- `npm run client` - Démarre uniquement le frontend
- `npm run build` - Build de production
- `npm start` - Démarre en mode production

## 🏗️ Architecture

```
modern-chatbot/
├── server/                 # Backend Node.js
│   ├── server.js          # Serveur principal
│   ├── nlp/               # Logique NLP
│   │   └── cprBot.js      # Bot CPR
│   └── routes/            # Routes API
│       ├── chatbot.js     # Routes chatbot
│       └── analytics.js   # Routes analytics
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   └── App.js         # App principale
│   └── public/
└── package.json           # Configuration principale
```

## 🌐 API Endpoints

### Chatbot
- `POST /api/chatbot/chat` - Envoyer un message
- `GET /api/chatbot/history/:sessionId` - Historique de conversation
- `GET /api/chatbot/capabilities` - Capacités du bot

### Analytics
- `GET /api/analytics/stats` - Statistiques d'utilisation
- `POST /api/analytics/reset` - Reset analytics (dev only)

## 💬 Utilisation

1. Ouvrez `http://localhost:3000`
2. Commencez à chatter avec le bot
3. Posez des questions sur :
   - Procédures CPR
   - Symptômes d'arrêt cardiaque
   - Numéros d'urgence
   - Utilisation d'un défibrillateur

## 🔍 Exemples de questions

**Anglais :**
- "What is CPR?"
- "How to perform CPR?"
- "What are the symptoms of cardiac arrest?"
- "Emergency numbers"
- "How to use AED?"

**Français :**
- "Qu'est-ce que la RCP ?"
- "Comment faire la RCP ?"
- "Numéros d'urgence"

## 🚀 Déploiement

1. **Build de production :**
```bash
npm run build
```

2. **Démarrer en production :**
```bash
NODE_ENV=production npm start
```

## 🔧 Dépannage

### Problème de connexion
1. Vérifiez que le serveur backend est démarré sur le port 5000
2. Testez la connexion : `curl http://localhost:5000/health`
3. Vérifiez les logs du serveur

### Problème CORS
- Le CORS est configuré pour accepter localhost:3000
- En développement, toutes les origines sont acceptées

### Problème de port
- Backend : PORT=5000 (configurable via .env)
- Frontend : PORT=3000 (proxy configuré)

## 📊 Monitoring

- Endpoint de santé : `GET /health`
- Analytics : `GET /api/analytics/stats`
- Logs serveur dans la console

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📝 License

MIT License - voir le fichier LICENSE pour plus de détails.

## 🆘 Support

En cas de problème :
1. Vérifiez les logs serveur
2. Testez l'endpoint `/health`
3. Vérifiez la configuration CORS
4. Redémarrez les services

---

**Note importante :** Ce chatbot est à des fins éducatives uniquement. En cas d'urgence réelle, contactez immédiatement les services d'urgence professionnels.