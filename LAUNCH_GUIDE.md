# 🚀 Guide de Lancement du Projet CPR

## 📋 Prérequis

### Logiciels nécessaires :
- **Docker** et **Docker Compose** (recommandé)
- **Node.js** (version 18+) pour le développement
- **Python** (3.8, 3.9 ou 3.10) pour Rasa
- **PostgreSQL** (si pas Docker)

---

## 🐳 **MÉTHODE 1 : Lancement avec Docker (Recommandé)**

### 🎯 **Lancement Complet en Production**

```bash
# 1. Cloner le repository
git clone <repository-url>
cd cpr-chatbot

# 2. Configurer les variables d'environnement
cp docker/postgres/.env.example docker/postgres/.env
cp docker/analytics/.env.example docker/analytics/.env

# 3. Éditer les fichiers .env avec vos valeurs
# docker/postgres/.env :
POSTGRES_DATABASE=cpr_chatbot
POSTGRES_USER=cpr_chatbot
POSTGRES_PASSWORD=votre_mot_de_passe
POSTGRES_HOST=db

# docker/analytics/.env :
CHATBOT_API_URL="http://rasa:5005/webhooks/rest/webhook"

# 4. Entraîner le modèle Rasa (optionnel, un modèle existe déjà)
rasa train

# 5. Lancer tous les services
docker-compose up -d

# 6. Vérifier que tout fonctionne
docker-compose ps
```

**Services disponibles :**
- 🤖 **Chatbot Rasa** : http://localhost:5005 (API)
- 📊 **Analytics** : http://localhost:5005 (Interface web)
- 🗄️ **Base de données** : PostgreSQL (interne)

### 🛠️ **Lancement en Mode Développement**

```bash
# 1. Utiliser le docker-compose de développement
docker-compose -f docker-compose.dev.yml up -d

# 2. Services supplémentaires disponibles
# - Adminer (gestion DB) : http://localhost:8080
# - Base de données exposée : localhost:5055
# - Chatbot avec CORS : http://localhost:5005
```

---

## 💻 **MÉTHODE 2 : Lancement Manuel (Développement)**

### 🤖 **1. Lancer le Chatbot Rasa**

```bash
cd cpr-chatbot

# Installer les dépendances Python
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt

# Entraîner le modèle (si nécessaire)
rasa train

# Lancer le serveur Rasa
rasa run --enable-api --cors "*" --port 5005
```

### 🗄️ **2. Lancer PostgreSQL**

```bash
# Option A : Docker uniquement pour la DB
docker run --name cpr-postgres \
  -e POSTGRES_DB=cpr_chatbot \
  -e POSTGRES_USER=cpr_chatbot \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -v ./docker/postgres:/docker-entrypoint-initdb.d \
  -d postgres

# Option B : PostgreSQL local
# Créer la base et exécuter docker/postgres/init_db.sql
```

### 📊 **3. Lancer le Site Analytics**

```bash
cd cpr-chatbot/analytics

# Configurer l'environnement
cp .env.dev.example .env.dev

# Éditer .env.dev :
CHATBOT_API_URL="http://localhost:5005/webhooks/rest/webhook"
POSTGRES_DATABASE=cpr_chatbot
POSTGRES_USER=cpr_chatbot
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Installer et lancer
npm install
npm run dev
```

**Disponible sur :** http://localhost:3000

### 🌐 **4. Lancer l'Interface React**

```bash
cd cpr_project

# Installer les dépendances
npm install

# Lancer en développement
npm start
```

**Disponible sur :** http://localhost:3000

### 🔧 **5. Lancer le Générateur d'Intents**

```bash
cd cpr-chatbot-intent-generator

# Configurer la base de données
cp docker/postgres/.env.example docker/postgres/.env

# Lancer la DB pour ce projet
docker-compose -f docker-compose-dev.yml up -d

# Installer et lancer
npm install
npm run dev
```

**Disponible sur :** http://localhost:3000

---

## 🔧 **MÉTHODE 3 : Lancement Hybride (Recommandé pour le développement)**

### Étape 1 : Services avec Docker
```bash
cd cpr-chatbot

# Lancer uniquement Rasa et PostgreSQL
docker-compose -f docker-compose.dev.yml up -d rasa db adminer
```

### Étape 2 : Interface React en local
```bash
cd cpr_project
npm install
npm start
```

### Étape 3 : Analytics en local (optionnel)
```bash
cd cpr-chatbot/analytics
cp .env.dev.example .env.dev
# Configurer .env.dev avec POSTGRES_HOST=localhost et POSTGRES_PORT=5055
npm install
npm run dev -- --port 3001
```

---

## 🌐 **URLs d'Accès**

### Production (Docker complet)
- **Interface principale** : http://localhost:8001 (si configuré)
- **Analytics** : http://localhost:5005
- **API Chatbot** : http://localhost:5005/webhooks/rest/webhook

### Développement
- **Interface React** : http://localhost:3000
- **Analytics** : http://localhost:3001
- **Chatbot API** : http://localhost:5005
- **Adminer (DB)** : http://localhost:8080
- **Intent Generator** : http://localhost:3000

---

## 🐛 **Résolution des Problèmes Courants**

### Erreur : "Port already in use"
```bash
# Voir les processus utilisant le port
lsof -i :5005
# Tuer le processus
kill -9 <PID>
```

### Erreur : "Database connection failed"
```bash
# Vérifier que PostgreSQL fonctionne
docker-compose ps
# Voir les logs
docker-compose logs db
```

### Erreur : "Rasa model not found"
```bash
cd cpr-chatbot
rasa train
```

### Erreur : "CORS policy"
```bash
# Vérifier que Rasa est lancé avec --cors "*"
# Ou utiliser docker-compose.dev.yml qui configure CORS
```

---

## 📝 **Commandes Utiles**

### Docker
```bash
# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart rasa

# Arrêter tout
docker-compose down

# Supprimer les volumes (reset DB)
docker-compose down -v
```

### Base de Données
```bash
# Accéder à la DB via Adminer
# http://localhost:8080
# Serveur: db, Utilisateur: cpr_chatbot

# Ou via ligne de commande
docker exec -it <container_id> psql -U cpr_chatbot
```

### Rasa
```bash
# Tester le chatbot
curl -X POST http://localhost:5005/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"hello"}'

# Entraîner avec de nouvelles données
rasa train --force
```

---

## 🎯 **Ordre de Lancement Recommandé**

1. **Base de données** (PostgreSQL)
2. **Chatbot Rasa** 
3. **Interface React** (cpr_project)
4. **Analytics** (optionnel)
5. **Intent Generator** (optionnel)

### Commande rapide pour tout lancer :
```bash
# Dans le dossier cpr-chatbot
docker-compose -f docker-compose.dev.yml up -d

# Dans un autre terminal, pour l'interface React
cd ../cpr_project && npm start
```

Cela vous donnera un environnement de développement complet avec tous les services nécessaires !