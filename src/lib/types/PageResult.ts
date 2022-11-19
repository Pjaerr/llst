import type RedditComment from './RedditComment';
import type RedditPost from './RedditPost';

type PageResult = {
	posts: {
		post: RedditPost;
		comments: RedditComment[] | undefined;
	}[];
};

export default PageResult;
