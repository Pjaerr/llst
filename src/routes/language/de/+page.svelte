<script lang="ts">
	import Sentence from '$lib/components/Sentence.svelte';
	import type PageResult from '$lib/types/PageResult';

	export let data: PageResult;

	console.log(data.posts);
</script>

<svelte:head>
	<title>Language - German</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>🇩🇪 German</h1>

	<ul>
		{#each data.posts as { post, comments }}
			<li>
				<Sentence sentence={post.title} />

				<!-- {#if comments}
					<ul>
						{#each comments as comment}
							<li>
								{comment.body}
							</li>
						{/each}
					</ul>
				{/if} -->
			</li>
		{/each}
	</ul>
</section>
