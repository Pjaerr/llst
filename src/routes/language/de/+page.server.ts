import type { PageServerLoad } from '../../$types';
import type RedditPost from '$lib/types/RedditPost';

type RedditListingChild = {
	data: RedditPost;
};

type RedditListing = {
	kind: 'Listing';
	data: {
		after: string;
		before: string | null;
		children: RedditListingChild[];
	};
};

const PER_PAGE = 10;

//TODO: We can probably set count to be maximum (100) and then request 3 pages at a time but return all as one to the server
//TODO: Keeping this stuff serverside so that our massive frequency list isn't shipped to the browser
export const load: PageServerLoad = async () => {
	const res = await fetch(`https://api.reddit.com/r/de/hot?limit=${PER_PAGE}`);

	const data: RedditListing = await res.json();

	const posts = data.data.children.map((child) => child.data);

	return { posts };
};

// TODO (for sending stuff back to the server): https://kit.svelte.dev/docs/form-actions
