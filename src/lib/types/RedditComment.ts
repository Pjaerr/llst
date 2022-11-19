type RedditComment = {
	id: string;
	kind: string;
	body: string;
	body_html: string;
	stickied: boolean;
	permalink: string;
};

export default RedditComment;
