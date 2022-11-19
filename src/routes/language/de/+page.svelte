<script lang="ts">
	import type RedditPost from '$lib/types/RedditPost';

	export let data: { posts: RedditPost[] };

	console.log(data.posts);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Home</h1>

	<ul>
		{#each data.posts as { title, permalink }}
			<li>
				<h2>
					<a href={'https://reddit.com' + permalink}>
						{title}
					</a>
				</h2>
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
