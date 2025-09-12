# Diagnostic du problème de chatbot sur macOS

## Étape 1: Vérifier l'état des conteneurs Docker
```bash
cd cpr-chatbot
docker compose -f docker-compose.dev.yml ps
```
**Résultat attendu:** Tous les services doivent être "Up"

## Étape 2: Vérifier les logs du conteneur Rasa
```bash
cd cpr-chatbot
docker compose -f docker-compose.dev.yml logs rasa
```
**À rechercher:** Messages d'erreur, problèmes de démarrage

## Étape 3: Vérifier que le port 5006 est bien ouvert
```bash
lsof -i :5006
```
**Résultat attendu:** Le processus Docker doit apparaître

## Étape 4: Tester la connexion directe au chatbot
```bash
curl -X POST http://localhost:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender": "test", "message": "hello"}'
```
**Résultat attendu:** Réponse JSON du chatbot

## Étape 5: Vérifier la configuration réseau Docker sur macOS
```bash
docker network ls
docker network inspect bridge
```

## Solutions possibles selon les résultats:

### Si les conteneurs ne sont pas démarrés:
```bash
cd cpr-chatbot
docker compose -f docker-compose.dev.yml down
docker compose -f docker-compose.dev.yml up -d --build
```

### Si le port n'est pas accessible:
- Vérifier le firewall macOS
- Redémarrer Docker Desktop

### Si problème de CORS spécifique à macOS:
- Modifier la configuration Rasa pour accepter les connexions depuis localhost:3000