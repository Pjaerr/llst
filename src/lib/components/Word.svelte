<script lang="ts">
	export let word: string;
</script>

<button type="button" class="button-reset">
	{word}
</button>

<style>
	.button-reset {
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		color: inherit;
		font: inherit;
		line-height: normal;
		-webkit-font-smoothing: inherit;
		-moz-osx-font-smoothing: inherit;
		-webkit-appearance: none;
	}

	button {
		display: inline-flex;
		cursor: pointer;
	}
</style>
