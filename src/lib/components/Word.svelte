<script lang="ts">
	export let string: string;
</script>

<button type="button">
	{string}
</button>

<style>
	button {
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

		display: inline-flex;
		cursor: pointer;
		color: red;
	}
</style>
