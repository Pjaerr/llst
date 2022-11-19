import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

// Temporarily redirect requests for / to /language/de until multiple languages are implemented, at which point we can redirect to last chosen language
export const load: PageServerLoad = () => {
	throw redirect(307, '/language/de');
};
