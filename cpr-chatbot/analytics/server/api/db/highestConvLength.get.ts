import { getHighestConvLength } from '~/utils/database';

export default defineEventHandler(async () => {
	return await getHighestConvLength();
});