import { getUsersQuestionsCount } from '~/utils/database';

export default defineEventHandler(async () => {
	return await getUsersQuestionsCount();
});