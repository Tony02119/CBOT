#!/bin/bash

echo "=== Test de connexion au chatbot ==="

echo "1. Vérification des conteneurs Docker..."
cd cpr-chatbot
docker compose -f docker-compose.dev.yml ps

echo -e "\n2. Test de connexion au port 5006..."
nc -zv localhost 5006

echo -e "\n3. Test HTTP direct..."
curl -X POST http://localhost:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender": "test", "message": "hello"}' \
  --connect-timeout 5 \
  --max-time 10 \
  -v

echo -e "\n4. Vérification des logs Rasa..."
docker compose -f docker-compose.dev.yml logs --tail=20 rasa

echo -e "\n5. Test avec différentes adresses..."
echo "Test avec 127.0.0.1:"
curl -X POST http://127.0.0.1:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender": "test", "message": "hello"}' \
  --connect-timeout 5 \
  --max-time 10

echo -e "\nTest avec 0.0.0.0:"
curl -X POST http://0.0.0.0:5006/webhooks/rest/webhook \
  -H "Content-Type: application/json" \
  -d '{"sender": "test", "message": "hello"}' \
  --connect-timeout 5 \
  --max-time 10