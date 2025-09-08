-- Initialisation de la base de données pour le chatbot CPR
-- Ce script est exécuté automatiquement lors du premier démarrage de PostgreSQL

-- Création de la table pour stocker les réponses du bot
CREATE TABLE IF NOT EXISTS bot_answers(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    use_count INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table pour stocker les questions des utilisateurs
CREATE TABLE IF NOT EXISTS user_questions(
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    conv_position INTEGER NOT NULL,
    answer_id INTEGER NOT NULL REFERENCES bot_answers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_questions_created_at ON user_questions(created_at);
CREATE INDEX IF NOT EXISTS idx_bot_answers_use_count ON bot_answers(use_count);

-- Insertion de quelques réponses de base pour les tests
INSERT INTO bot_answers (content) VALUES 
('Hello! I''m your CPR assistant. I can help you learn about CPR, cardiac arrest, and emergency procedures. How can I help you today?'),
('CPR (Cardiopulmonary Resuscitation) is an emergency procedure that combines chest compressions and rescue breaths to keep blood and oxygen flowing when someone''s heart has stopped.'),
('If someone has cardiac arrest: 1. Check if they''re responsive 2. Call emergency services immediately 3. Start CPR right away 4. Use an AED if available 5. Continue until help arrives')
ON CONFLICT DO NOTHING;

-- Affichage d'un message de confirmation
DO $$
BEGIN
    RAISE NOTICE 'Base de données CPR initialisée avec succès!';
END $$;