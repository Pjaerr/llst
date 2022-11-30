<script lang="ts">
	import Word from './Word.svelte';

	export let sentence: string;

	// TODO: Do we need to work out a better way to split words?
	// EG: If we get something like: 'and he said "Hello, I am Josh", something something'
	// The result would be: ['and', 'he', 'said', '"Hello,', 'I', 'am', 'Josh",', 'something', 'something']
	const words = sentence.split(' ');
</script>

<p>
	{#each words as word}
		<Word {word} />
	{/each}
</p>

<style>
	p {
		display: inline-flex;
		gap: 4px;
		flex-wrap: wrap;
	}
</style>
