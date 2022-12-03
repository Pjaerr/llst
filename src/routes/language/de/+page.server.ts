import { fetchSentencesFromReddit } from '$lib/server/Reddit';
import type { PageServerLoad } from '../../$types';

//TODO: We can probably set count to be maximum (100) and then request 3 pages at a time but return all as one to the server
//TODO: Keeping this stuff serverside so that our massive frequency list isn't shipped to the browser
export const load: PageServerLoad = async () => {
	const resultsFromReddit = await fetchSentencesFromReddit({ subreddit: 'de', count: 1 });

	return { sentences: resultsFromReddit };
};

// TODO (for sending stuff back to the server): https://kit.svelte.dev/docs/form-actions
