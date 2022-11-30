// EG: If the sentence is a comment on a reddit post, then it will contain a context: SentenceContext pointing to the parent
type SentenceContext = {
	content: string;
	url: string;
};

type Sentence = {
	id?: string;
	content: string;
	url: string;
	context?: SentenceContext;
};

export default Sentence;
