CREATE TABLE intents(
	id SERIAL PRIMARY KEY,
	intent VARCHAR(150) NOT NULL,
	answer TEXT NOT NULL
);

CREATE TABLE questions(
	id SERIAL PRIMARY KEY,
	intent_id INTEGER NOT NULL REFERENCES intents(id),
	content TEXT NOT NULL
);

-- Fill the intents table.
INSERT INTO intents (intent, answer) VALUES
	('greet', 'Hey! I''m a chatbot that can answer questions about CPR, how to do it, what are the benefits of doing it, etc.')
;