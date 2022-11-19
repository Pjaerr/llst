<script lang="ts">
	import Word from './Word.svelte';

	export let sentence: string;

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
