import type { PageServerLoad } from '../../$types';
import type RedditPost from '$lib/types/RedditPost';
import type RedditComment from '$lib/types/RedditComment';
import type PageResult from '$lib/types/PageResult';
import { JSDOM } from 'jsdom';

type RedditPostListing = {
	kind: 'Listing';
	data: {
		after: string;
		before: string | null;
		children: {
			data: RedditPost;
		}[];
	};
};

type RedditCommentListing = {
	kind: 'Listing';
	data: {
		after: string;
		before: string | null;
		children: {
			kind: string;
			data: RedditComment;
		}[];
	};
};

const POSTS_PER_PAGE = 25;

const fetchCommentsForPost = async (
	post: RedditPost
): Promise<{ parentId: string; results: RedditComment[] }> => {
	const res = await fetch(`https://api.reddit.com${post.permalink}?raw_json=1`);

	const data: RedditCommentListing[] = await res.json();

	const results = data[1].data.children
		.filter(({ kind }) => kind !== 'more')
		.map((child) => child.data)
		.filter(({ stickied }) => !stickied)
		.map((comment) => {
			return {
				...comment,
				body: JSDOM.fragment(comment.body_html).textContent as string
			};
		})
		.filter(
			({ body }) => body.length <= 300 && body !== '[deleted]\n' && body.split(' ').length >= 3
		);

	// TODO: Have a seperate thing for what is returned to the browser and what we actually get from reddit...we don't need all of the properties that reddit gives us, and we also need to do some transforming.
	return {
		parentId: post.id,
		results: results.slice(0, 10)
	};
};

//TODO: We can probably set count to be maximum (100) and then request 3 pages at a time but return all as one to the server
//TODO: Keeping this stuff serverside so that our massive frequency list isn't shipped to the browser
export const load: PageServerLoad = async () => {
	const res = await fetch(`https://api.reddit.com/r/de/hot?limit=${POSTS_PER_PAGE}`);

	const data: RedditPostListing = await res.json();

	const posts = data.data.children.map((child) => child.data).filter(({ stickied }) => !stickied);

	const commentRequests: Promise<{ parentId: string; results: RedditComment[] }>[] = [];

	posts.forEach((post) => {
		commentRequests.push(fetchCommentsForPost(post));
	});

	const comments = await Promise.all(commentRequests);

	const result: PageResult = {
		posts: posts.map((post) => {
			return {
				post,
				comments: comments.find((comment) => comment.parentId === post.id)?.results
			};
		})
	};

	return result;
};

// TODO (for sending stuff back to the server): https://kit.svelte.dev/docs/form-actions
