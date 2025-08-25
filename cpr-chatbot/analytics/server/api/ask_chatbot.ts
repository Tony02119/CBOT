import { addUserQuestion, updateBotAnswerCount } from '~/utils/database';


export default defineEventHandler(async (event) => {
	if (event.method === 'OPTIONS') {
		setResponseStatus(event, 204, 'No content');
		return 'OK';
	}

	if (event.method !== 'POST') {
		setResponseStatus(event, 404);
		return;
	}

	try {
		const body = await readBody(event);
		const chatbotResponse = await $fetch(process.env.CHATBOT_API_URL as string, {
			method: 'POST',
			body: body,
		}) as { recipient_id: string, text: string}[];

		if (body.analytics && body.message !== 'Hello!') {
			const answer_id = await updateBotAnswerCount(chatbotResponse[0].text);
			await addUserQuestion(body.message, body.conv_position, answer_id);
		}

		return chatbotResponse;
	}
	catch (err) {
		setResponseStatus(event, 500);
		return {
			message: 'Error while sending request to chatbot.',
			error: (err as { message: string }).message,
		};
	}
});