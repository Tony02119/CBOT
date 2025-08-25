import { addQuestion } from '~/utils/database';

type IntentDataBody = {
	intent_id: number,
	question: string,
}


export default defineEventHandler(async (event) => {
	const body: IntentDataBody = await readBody(event);
	const saved = await addQuestion(body.intent_id, body.question);

	if (!saved) {
		// It could be good to return the database's error message.
		return createError({
			statusCode: 500,
			message: 'Error while saving a question.',
			data: body.question,
		});
	}

	return {
		message: 'Question successfully saved.',
	};
});
