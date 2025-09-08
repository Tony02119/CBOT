# 🧪 Guide Détaillé - Test du Chatbot CPR

## 📋 **Prérequis avant de tester**

### ✅ Vérifications initiales
```bash
# 1. Vérifier que Docker fonctionne
docker --version
docker compose --version

# 2. Être dans le bon dossier
cd cpr-chatbot
pwd
# Doit afficher : /chemin/vers/cpr-chatbot
```

---

## 🚀 **ÉTAPE 1 : Démarrer tous les services**

### 1.1 Lancer les services Docker
```bash
# Arrêter d'éventuels services en cours
docker compose down

# Lancer tous les services
docker compose up -d

# Attendre 2-3 minutes que tout démarre
echo "Attente du démarrage des services..."
sleep 180
```

### 1.2 Vérifier l'état des services
```bash
# Vérifier que tous les containers sont UP
docker compose ps

# Résultat attendu :
# NAME                IMAGE                    STATUS
# analytics           cpr-chatbot-analytics    Up
# crp_chatbot         rasa/rasa:3.6.20-full    Up  
# cpr-chatbot-db-1    postgres                 Up
```

### 1.3 Vérifier les logs
```bash
# Voir les logs de Rasa (doit montrer "server is up and running")
docker compose logs rasa | tail -10

# Voir les logs d'analytics
docker compose logs analytics | tail -10

# Si erreurs, voir tous les logs :
docker compose logs
```

---

## 🔗 **ÉTAPE 2 : Tester l'API Rasa directement**

### 2.1 Test de base
```bash
# Test simple avec curl
curl -X POST http://localhost:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"hello"}'
```

**✅ Résultat attendu :**
```json
[{"recipient_id":"test","text":"Hey! I'm a chatbot that can answer questions about CPR, how to do it, what are the benefits of doing it, etc."}]
```

**❌ Si erreur "Connection refused" :**
```bash
# Vérifier que le port est ouvert
nc -zv localhost 5006

# Voir les logs de Rasa
docker compose logs rasa
```

### 2.2 Tests avec différents messages
```bash
# Test 1: Question sur CPR
curl -X POST http://localhost:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"what is CPR"}'

# Test 2: Question sur les symptômes
curl -X POST http://localhost:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"symptoms of cardiac arrest"}'

# Test 3: Question sur les numéros d'urgence
curl -X POST http://localhost:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"emergency numbers"}'

# Test 4: Instructions CPR
curl -X POST http://localhost:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"how to do CPR"}'
```

---

## 📊 **ÉTAPE 3 : Tester l'API Analytics**

### 3.1 Test de l'API analytics
```bash
# Test avec analytics activées
curl -X POST http://localhost:5005/api/ask_chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "test_user",
    "message": "how to perform CPR",
    "conv_position": 1,
    "analytics": true
  }'
```

### 3.2 Vérifier l'interface analytics
```bash
# Ouvrir l'interface analytics dans le navigateur
open http://localhost:5005

# Ou manuellement : aller sur http://localhost:5005
```

**✅ Vous devriez voir :**
- Une page avec des statistiques
- Le nombre de questions posées
- La liste des questions récentes

---

## 🌐 **ÉTAPE 4 : Tester l'interface web React**

### 4.1 Lancer l'interface React
```bash
# Ouvrir un nouveau terminal
# Aller dans le dossier React
cd cpr_project

# Vérifier que vous êtes dans le bon dossier
ls -la
# Doit contenir : package.json, src/, public/

# Installer les dépendances (première fois seulement)
npm install

# Lancer le serveur de développement
npm start
```

**✅ Résultat attendu :**
- Le navigateur s'ouvre automatiquement sur http://localhost:3000
- Vous voyez la page d'accueil "LifeSaver Project"

### 4.2 Naviguer vers le chatbot
1. **Cliquer** sur "Virtual Assistant" ou aller sur http://localhost:3000/chatbot
2. **Accepter** le popup de disclaimer en cochant la case et cliquant "I Understand"
3. **Choisir** "Yes" ou "No" pour les analytics

### 4.3 Tester la conversation
```
Messages à tester dans l'ordre :

1. "hello" 
   ✅ Doit répondre avec la présentation du chatbot

2. "what is CPR"
   ✅ Doit expliquer ce qu'est la RCP

3. "how to do CPR"  
   ✅ Doit donner les étapes avec des boutons pour plus d'infos

4. "symptoms"
   ✅ Doit lister les symptômes d'arrêt cardiaque

5. "emergency numbers"
   ✅ Doit donner les numéros d'urgence

6. "what is a defibrillator"
   ✅ Doit expliquer le défibrillateur avec bouton

7. "thank you"
   ✅ Doit répondre "You're welcome!"
```

---

## 🗄️ **ÉTAPE 5 : Vérifier la base de données**

### 5.1 Accéder à l'interface de base de données
```bash
# Ouvrir Adminer (interface de gestion DB)
open http://localhost:8080
```

### 5.2 Se connecter à la base
**Paramètres de connexion :**
- **Système** : PostgreSQL
- **Serveur** : db
- **Utilisateur** : cpr_chatbot  
- **Mot de passe** : [celui configuré dans docker/postgres/.env]
- **Base de données** : cpr_chatbot

### 5.3 Vérifier les données
```sql
-- Voir les tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Voir les questions des utilisateurs
SELECT * FROM user_questions ORDER BY id DESC LIMIT 10;

-- Voir les réponses du bot
SELECT * FROM bot_answers ORDER BY use_count DESC LIMIT 10;
```

---

## 🧪 **ÉTAPE 6 : Tests avancés**

### 6.1 Test de conversation longue
Dans l'interface React, testez une conversation complète :
```
1. "hello"
2. "what is cardiac arrest" 
3. "what are the symptoms"
4. "how should I react"
5. "what is CPR"
6. "how to do CPR"
7. Cliquer sur "How to do mouth-to-mouth"
8. "what is defibrillator"
9. Cliquer sur "How to use a defibrillator"  
10. "thank you"
```

### 6.2 Test des boutons interactifs
- Vérifier que les boutons apparaissent après certaines réponses
- Cliquer sur les boutons et vérifier les réponses
- Tester les boutons "How to do mouth-to-mouth" et "How to use a defibrillator"

### 6.3 Test de performance
```bash
# Test de charge simple (10 requêtes rapides)
for i in {1..10}; do
  curl -X POST http://localhost:5006/webhooks/rest/webhook \
    -H "Content-Type: application/json" \
    -d "{\"sender\":\"test$i\",\"message\":\"hello\"}" &
done
wait
```

---

## 📱 **ÉTAPE 7 : Test sur mobile**

### 7.1 Tester la responsivité
1. Ouvrir http://localhost:3000 sur votre téléphone
2. Ou utiliser les outils de développement du navigateur (F12 > Mode mobile)
3. Tester toutes les pages : Home, Quiz, Instructions, Chatbot, About

### 7.2 Vérifier l'interface mobile du chatbot
- La zone de chat doit être lisible
- Le clavier virtuel ne doit pas cacher l'interface
- Les boutons doivent être facilement cliquables

---

## ✅ **ÉTAPE 8 : Checklist finale**

### Services backend
- [ ] **Rasa API** répond sur http://localhost:5006/webhooks/rest/webhook
- [ ] **Analytics API** répond sur http://localhost:5005/api/ask_chatbot  
- [ ] **Interface Analytics** accessible sur http://localhost:5005
- [ ] **Base de données** accessible via http://localhost:8080

### Interface React
- [ ] **Page d'accueil** accessible sur http://localhost:3000
- [ ] **Page Quiz** fonctionne (/quiz)
- [ ] **Page Instructions** fonctionne (/instructions)
- [ ] **Page Chatbot** fonctionne (/chatbot)
- [ ] **Page About** fonctionne (/about)

### Fonctionnalités chatbot
- [ ] **Salutation** : "hello" → présentation du bot
- [ ] **Questions CPR** : réponses appropriées avec boutons
- [ ] **Questions symptômes** : liste des symptômes
- [ ] **Questions urgence** : numéros d'urgence
- [ ] **Boutons interactifs** : fonctionnent correctement
- [ ] **Analytics** : conversations enregistrées (si activées)

### Tests de robustesse
- [ ] **Messages vides** : gérés correctement
- [ ] **Messages inconnus** : message de fallback
- [ ] **Conversation longue** : pas de perte de contexte
- [ ] **Responsive design** : fonctionne sur mobile

---

## 🚨 **Dépannage des problèmes courants**

### Problème : "Connection refused"
```bash
# Vérifier les services
docker compose ps

# Redémarrer si nécessaire
docker compose restart

# Vérifier les ports
netstat -an | grep 5005
netstat -an | grep 5006
```

### Problème : Réponses vides du chatbot
```bash
# Vérifier les logs Rasa
docker compose logs rasa | grep -i error

# Vérifier le modèle Rasa
docker compose exec rasa ls -la models/
```

### Problème : Interface React ne se connecte pas
```bash
# Vérifier la configuration dans Chatbot.jsx
grep -n "localhost" cpr_project/src/pages/Chatbot/Chatbot.jsx

# Vérifier les logs du navigateur (F12 > Console)
```

### Problème : Base de données vide
```bash
# Vérifier les variables d'environnement
cat docker/postgres/.env
cat docker/analytics/.env

# Redémarrer avec reset de la DB
docker compose down -v
docker compose up -d
```

---

## 🎉 **Félicitations !**

Si tous les tests passent, votre chatbot CPR est complètement opérationnel !

**Pour arrêter tous les services :**
```bash
# Arrêter React (Ctrl+C dans le terminal npm start)
# Arrêter Docker
docker compose down
```

**Pour relancer rapidement :**
```bash
# Backend
docker compose up -d

# Frontend (dans un autre terminal)
cd cpr_project && npm start
```