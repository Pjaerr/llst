const punctuation = new RegExp(/([ .,/#!$%^&?*;:{}=\-_`~()"'])/g);

type Word = {
	string: string;
	interactive: boolean;
};

const getWordsFromSentence = (sentence: string): Word[] => {
	return sentence.split(punctuation).map((s) => {
		return {
			string: s,
			interactive: !punctuation.test(s)
		};
	});
};

export default getWordsFromSentence;
