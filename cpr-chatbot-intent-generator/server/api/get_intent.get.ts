import { getIntent } from '~/utils/database';

export default defineEventHandler(async () => {
	return await getIntent('greet');
});
