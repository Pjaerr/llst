<script lang="ts">
	import InteractiveSentence from '$lib/components/InteractiveSentence.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { sentences } = data;
</script>

<svelte:head>
	<title>Language - German</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>🇩🇪 German</h1>

	<ul>
		{#each sentences as { content, url }}
			<li>
				<InteractiveSentence sentence={content} />
			</li>
		{/each}
	</ul>
</section>
