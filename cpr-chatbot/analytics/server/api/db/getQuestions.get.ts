import { getQuestions } from '~/utils/database';

export default defineEventHandler(async () => {
	return await getQuestions();
});