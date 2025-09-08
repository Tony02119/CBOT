# 🚀 Guide Détaillé - Lancement du Chatbot CPR

## 📋 Prérequis

### Logiciels nécessaires :
- **Docker Desktop** (recommandé) ou **Docker + Docker Compose**
- **Node.js** (version 18+) pour le frontend React
- **Python** (3.8, 3.9 ou 3.10) pour développement Rasa (optionnel)
- **Git** pour cloner le repository

---

## 🐳 **MÉTHODE 1 : Lancement Complet avec Docker (RECOMMANDÉE)**

### **Étape 1 : Vérifier Docker**

```bash
# Vérifier que Docker est installé et fonctionne
docker --version
docker-compose --version

# Tester Docker
docker run hello-world
```

Si Docker n'est pas installé :
- **Mac** : Télécharger Docker Desktop depuis https://www.docker.com/products/docker-desktop/
- **Windows** : Télécharger Docker Desktop depuis https://www.docker.com/products/docker-desktop/
- **Linux** : `sudo apt install docker.io docker-compose` (Ubuntu/Debian)

### **Étape 2 : Préparer le Projet**

```bash
# Aller dans le dossier du chatbot
cd cpr-chatbot

# Vérifier la structure du projet
ls -la
# Vous devriez voir : docker-compose.yml, requirements.txt, domain.yml, etc.
```

### **Étape 3 : Configurer les Variables d'Environnement**

```bash
# Copier les fichiers d'exemple
cp docker/postgres/.env.example docker/postgres/.env
cp docker/analytics/.env.example docker/analytics/.env

# Éditer le fichier PostgreSQL
nano docker/postgres/.env
# ou
code docker/postgres/.env
```

**Contenu de `docker/postgres/.env` :**
```env
POSTGRES_DATABASE=cpr_chatbot
POSTGRES_USER=cpr_chatbot
POSTGRES_PASSWORD=your_secure_password_here
POSTGRES_HOST=db
```

**Contenu de `docker/analytics/.env` :**
```env
CHATBOT_API_URL="http://rasa:5005/webhooks/rest/webhook"
```

### **Étape 4 : Lancer les Services**

```bash
# Lancer tous les services en arrière-plan
docker-compose up -d

# Voir les logs en temps réel (optionnel)
docker-compose logs -f

# Vérifier que tous les services fonctionnent
docker-compose ps
```

**Résultat attendu :**
```
NAME                IMAGE                    STATUS
analytics           cpr-chatbot-analytics    Up
crp_chatbot         rasa/rasa:3.6.20-full    Up
cpr-chatbot-db-1    postgres                 Up
```

### **Étape 5 : Tester le Chatbot**

```bash
# Tester l'API du chatbot
curl -X POST http://localhost:5005/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"hello"}'
```

**Réponse attendue :**
```json
[{"recipient_id":"test","text":"Hey! I'm a chatbot that can answer questions about CPR..."}]
```

---

## 💻 **MÉTHODE 2 : Lancement en Mode Développement**

### **Étape 1 : Lancer avec Docker Dev**

```bash
cd cpr-chatbot

# Utiliser la configuration de développement
docker-compose -f docker-compose.dev.yml up -d

# Vérifier les services
docker-compose -f docker-compose.dev.yml ps
```

**Services disponibles en mode dev :**
- **Chatbot Rasa** : http://localhost:5005
- **Base de données** : localhost:5055 (exposée pour développement)
- **Adminer** (interface DB) : http://localhost:8080
- **Analytics** : http://localhost:5005

### **Étape 2 : Lancer le Frontend React**

```bash
# Dans un nouveau terminal
cd ../cpr_project

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

**Frontend disponible sur :** http://localhost:3000

---

## 🔧 **MÉTHODE 3 : Lancement Manuel (Développement Avancé)**

### **Étape 1 : Préparer l'Environnement Python**

```bash
cd cpr-chatbot

# Créer un environnement virtuel
python3 -m venv venv

# Activer l'environnement
# Sur Mac/Linux :
source venv/bin/activate
# Sur Windows :
venv\Scripts\activate

# Vérifier la version Python
python --version
# Doit être 3.8, 3.9 ou 3.10
```

### **Étape 2 : Installer les Dépendances**

```bash
# Installer les dépendances Rasa
pip install -r requirements.txt

# Vérifier l'installation
rasa --version
```

### **Étape 3 : Entraîner le Modèle (si nécessaire)**

```bash
# Entraîner le modèle Rasa
rasa train

# Le modèle sera sauvé dans le dossier models/
ls models/
```

### **Étape 4 : Lancer PostgreSQL**

```bash
# Option A : Avec Docker uniquement pour la DB
docker run --name cpr-postgres \
  -e POSTGRES_DB=cpr_chatbot \
  -e POSTGRES_USER=cpr_chatbot \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -v ./docker/postgres:/docker-entrypoint-initdb.d \
  -d postgres

# Option B : PostgreSQL local (si installé)
# Créer la base de données et exécuter docker/postgres/init_db.sql
```

### **Étape 5 : Lancer le Serveur Rasa**

```bash
# Lancer Rasa avec CORS activé
rasa run --enable-api --cors "*" --port 5005

# Le serveur sera disponible sur http://localhost:5005
```

### **Étape 6 : Lancer l'Analytics (optionnel)**

```bash
# Dans un nouveau terminal
cd analytics

# Configurer l'environnement
cp .env.dev.example .env.dev

# Éditer .env.dev avec vos paramètres
nano .env.dev

# Installer et lancer
npm install
npm run dev
```

---

## 🌐 **URLs d'Accès Finales**

### **Production (Docker complet) :**
- **Interface React** : http://localhost:3000
- **API Chatbot** : http://localhost:5005/webhooks/rest/webhook
- **Analytics** : http://localhost:5005

### **Développement :**
- **Interface React** : http://localhost:3000
- **API Chatbot** : http://localhost:5005/webhooks/rest/webhook
- **Analytics** : http://localhost:3001
- **Adminer (DB)** : http://localhost:8080
- **Base de données** : localhost:5055

---

## 🧪 **Tests et Vérifications**

### **1. Tester l'API Chatbot**

```bash
# Test simple
curl -X POST http://localhost:5005/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender":"test","message":"what is CPR"}'

# Test avec analytics
curl -X POST http://localhost:5005/api/ask_chatbot \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "test",
    "message": "how to do CPR",
    "conv_position": 1,
    "analytics": true
  }'
```

### **2. Vérifier la Base de Données**

```bash
# Accéder à Adminer
open http://localhost:8080

# Paramètres de connexion :
# Serveur: db (ou localhost si mode dev)
# Utilisateur: cpr_chatbot
# Mot de passe: [votre mot de passe]
# Base de données: cpr_chatbot
```

### **3. Tester l'Interface React**

1. Ouvrir http://localhost:3000
2. Aller sur la page "Virtual Assistant"
3. Tester une conversation avec le chatbot
4. Vérifier que les réponses s'affichent correctement

---

## 🐛 **Résolution des Problèmes Courants**

### **Erreur : "Port already in use"**
```bash
# Voir les processus utilisant le port 5005
lsof -i :5005

# Tuer le processus
kill -9 <PID>

# Ou utiliser un autre port
rasa run --enable-api --cors "*" --port 5006
```

### **Erreur : "Database connection failed"**
```bash
# Vérifier que PostgreSQL fonctionne
docker-compose ps

# Voir les logs de la base de données
docker-compose logs db

# Redémarrer la base de données
docker-compose restart db
```

### **Erreur : "Rasa model not found"**
```bash
# Entraîner un nouveau modèle
cd cpr-chatbot
rasa train

# Vérifier que le modèle existe
ls models/
```

### **Erreur : "CORS policy"**
```bash
# Vérifier que Rasa est lancé avec CORS
rasa run --enable-api --cors "*" --port 5005

# Ou utiliser docker-compose.dev.yml qui configure CORS automatiquement
```

### **Erreur : "Docker daemon not running"**
```bash
# Sur Mac : Lancer Docker Desktop
open /Applications/Docker.app

# Sur Linux : Démarrer Docker
sudo systemctl start docker

# Vérifier
docker ps
```

---

## 📝 **Commandes Utiles**

### **Docker**
```bash
# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart rasa

# Arrêter tout
docker-compose down

# Supprimer les volumes (reset DB)
docker-compose down -v

# Reconstruire les images
docker-compose build --no-cache
```

### **Base de Données**
```bash
# Accéder à la DB via ligne de commande
docker exec -it <container_id> psql -U cpr_chatbot

# Voir les tables
\dt

# Voir les questions des utilisateurs
SELECT * FROM user_questions LIMIT 10;
```

### **Rasa**
```bash
# Tester le chatbot en mode interactif
rasa shell

# Entraîner avec de nouvelles données
rasa train --force

# Valider la configuration
rasa data validate
```

---

## 🎯 **Ordre de Lancement Recommandé**

### **Pour un démarrage rapide :**
```bash
# 1. Lancer les services backend
cd cpr-chatbot
docker-compose -f docker-compose.dev.yml up -d

# 2. Attendre que tous les services soient prêts (30-60 secondes)
docker-compose -f docker-compose.dev.yml logs -f

# 3. Dans un autre terminal, lancer le frontend
cd ../cpr_project
npm install
npm start

# 4. Ouvrir http://localhost:3000 dans votre navigateur
```

### **Vérification finale :**
1. ✅ Interface React accessible sur http://localhost:3000
2. ✅ Page "Virtual Assistant" fonctionne
3. ✅ Le chatbot répond aux messages
4. ✅ Analytics visible sur http://localhost:5005
5. ✅ Base de données accessible via Adminer sur http://localhost:8080

---

## 🚀 **Félicitations !**

Votre chatbot CPR est maintenant opérationnel ! Vous pouvez :
- Tester les fonctionnalités sur l'interface React
- Poser des questions au chatbot sur les premiers secours
- Consulter les analytics des conversations
- Développer de nouvelles fonctionnalités

Pour arrêter tous les services :
```bash
docker-compose down
```