import { JSDOM } from 'jsdom';
import type Sentence from '$lib/types/Sentence';

// Loose typings for objects returned from the Reddit API
type RedditPost = {
	id: string;
	title: string;
	permalink: string;
	selftext: string | null;
	num_comments: number;
	stickied: boolean;
};

type RedditComment = {
	id: string;
	kind: string;
	body: string;
	body_html: string;
	stickied: boolean;
	permalink: string;
};

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

type RedditRequestOptions = {
	subreddit: string;
	count?: number;
	anchor?: number;
};

const fetchSentencesFromRedditComments = async (
	post: RedditPost,
	count = 10
): Promise<Sentence[]> => {
	const res: RedditCommentListing[] = await fetch(
		`https://api.reddit.com${post.permalink}?raw_json=1`
	).then((r) => r.json());

	const results = res[1].data.children
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

	return results.slice(0, count).map((result) => {
		return {
			content: result.body,
			url: result.permalink,
			context: {
				content: post.title,
				url: post.permalink
			}
		};
	});
};

export async function fetchSentencesFromReddit(options: RedditRequestOptions): Promise<Sentence[]> {
	const res: RedditPostListing = await fetch(
		`https://api.reddit.com/r/${options.subreddit}/hot?limit=${options.count || 10}`
	).then((r) => r.json());

	const posts = res.data.children.map((child) => child.data).filter(({ stickied }) => !stickied);

	const commentRequests: Promise<Sentence[]>[] = [];

	posts.forEach((post) => {
		commentRequests.push(fetchSentencesFromRedditComments(post, 10));
	});

	const comments = await Promise.all(commentRequests);

	const sentencesFromPosts: Sentence[] = posts.map((post) => {
		return {
			id: post.id,
			content: post.title,
			url: post.permalink
		};
	});

	// TODO: Clean this up
	const sentencesFromComments: Sentence[] = [];

	for (const sentences of comments) {
		for (const sentence of sentences) {
			sentencesFromComments.push(sentence);
		}
	}

	const result = [...sentencesFromPosts, ...sentencesFromComments];

	// Shuffle results so post is not followed immediately by all of its comments to give some variety
	return result.sort(() => Math.random() - 0.5);
}
