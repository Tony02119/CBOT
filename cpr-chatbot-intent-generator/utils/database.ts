import dotenv from 'dotenv';
import path from 'path';

import pg from 'pg';
const { Client } = pg;

const DOCKER_ENV_CONF = dotenv.config({ path: path.resolve('docker/postgres/.env') })?.parsed;


export type IntentType = {
	id: number,
	intent: string,
	answer: string
}


function getDbClient() {
	return new Client({
		user: DOCKER_ENV_CONF?.POSTGRES_USER,
		password: DOCKER_ENV_CONF?.POSTGRES_PASSWORD,
		host: DOCKER_ENV_CONF?.POSTGRES_HOST,
		port: DOCKER_ENV_CONF?.POSTGRES_PORT as unknown as number,
		database: DOCKER_ENV_CONF?.POSTGRES_USER,
	});
}


export async function getIntent(intent: string): Promise<IntentType | undefined> {
	const client = getDbClient();
	await client.connect();

	let res;
	try {
		res = await client.query('SELECT * FROM intents WHERE intent=$1;', [intent]);
	}
	catch (err) {
		console.log(err);
	}
	await client.end();
	return res?.rows[0];
}


export async function addQuestion(intent_id: number, question: string): Promise<boolean> {
	const client = getDbClient();
	await client.connect();

	try {
		await client.query('INSERT INTO questions (intent_id, content) VALUES ($1, $2);', [intent_id, question]);
	}
	catch (err) {
		console.log(err);
		return false;
	}
	await client.end();
	return true;
}