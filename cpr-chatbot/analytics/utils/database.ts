import pg from 'pg';
import type { QuestionType } from './types';

const { Client } = pg;


function getDbClient() {
	return new Client({
		user: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		host: process.env.POSTGRES_HOST,
		database: process.env.POSTGRES_USER,
		port: process.env.POSTGRES_PORT as unknown as number,
	});
}

export async function getUsersQuestionsCount(): Promise<number> {
	const client = getDbClient();
	await client.connect();

	try {
		const res = await client.query('SELECT COUNT(*) FROM user_questions;');
		if (res.rowCount !== 0) {
			return res.rows[0].count;
		}
	}
	catch (err) {
		console.log(err);
		return 0;
	}
	await client.end();
	return 0;
}


export async function getHighestConvLength(): Promise<number> {
	const client = getDbClient();
	await client.connect();

	try {
		const res = await client.query('SELECT conv_position FROM user_questions ORDER BY conv_position DESC LIMIT 1;');
		if (res.rowCount !== 0) {
			return res.rows[0].conv_position;
		}
	}
	catch (err) {
		console.log(err);
		return 0;
	}
	await client.end();
	return 0;
}


export async function getQuestions(): Promise<QuestionType[]> {
	const client = getDbClient();
	await client.connect();

	try {
		const res = await client.query(
			`SELECT uq.id, uq.content AS content, uq.conv_position, ba.content AS answer
			FROM user_questions uq
			JOIN bot_answers ba ON uq.answer_id = ba.id;`,
		);
		return res.rows;
	}
	catch (err) {
		console.log(err);
		return [];
	}
}


export async function addUserQuestion(question: string, conv_position: number, answer_id: number) {
	const client = getDbClient();
	await client.connect();

	try {
		await client.query(
			'INSERT INTO user_questions (content, conv_position, answer_id) VALUES ($1, $2, $3)',
			[question, conv_position, answer_id],
		);
	}
	catch (err) {
		console.log(err);
		return false;
	}
	await client.end();
	return true;
}


export async function updateBotAnswerCount(answer: string) {
	const client = getDbClient();
	await client.connect();

	let res;
	try {
		res = await client.query('SELECT id FROM bot_answers WHERE content = $1', [answer]);

		if (res.rowCount === 0) {
			res = await client.query(
				'INSERT INTO bot_answers (content) VALUES ($1) RETURNING id',
				[answer],
			);
		}
		else {
			res = await client.query(
				'UPDATE bot_answers SET use_count = use_count + 1 WHERE content = $1 RETURNING id',
				[answer],
			);
		}
	}
	catch (err) {
		console.log(err);
		return false;
	}
	await client.end();
	return res.rows[0].id;
}