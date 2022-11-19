type RedditPost = {
	id: string;
	title: string;
	permalink: string;
	selftext: string | null;
	num_comments: number;
	stickied: boolean;
};

export default RedditPost;
