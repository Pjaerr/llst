<script lang="ts">
	import Word from './Word.svelte';
	import getWordsFromSentence from '$lib/utils/get-words-from-sentence';

	export let sentence: string;

	const words = getWordsFromSentence(sentence);

	console.log(words);
</script>

<p>
	{#each words as { string, interactive }}
		{#if interactive}
			<Word {string} />
		{:else}
			<span class="non-interactive-string">
				{string}
			</span>
		{/if}
	{/each}
</p>

<style lang="scss">
	$word-spacing: 3px;

	p {
		display: inline-flex;
		gap: $word-spacing;
		flex-wrap: wrap;
	}

	.non-interactive-string {
		display: inline-flex;
		// Cancel out the gap between "words" when a word is punctuation (so "What ?" -> "What?")
		// TODO: What do we do about stuff like 'My name is "Josh"' becoming 'My name is"Josh"' as the speech marks have been moved left by the gap...can we be smart here without context 🤔
		margin-inline-start: -#{$word-spacing};
	}
</style>
