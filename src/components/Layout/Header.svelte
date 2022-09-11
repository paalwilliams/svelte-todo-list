<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	let prominent = false;
	let dense = false;
	let secondaryColor = false;
</script>

<div class="top-app-bar-container">
	<TopAppBar variant="static" {prominent} {dense} color={secondaryColor ? 'secondary' : 'primary'}>
		<Row>
			<Section>
				<Title>To Do list</Title>
			</Section>
			<Section align="end" toolbar />
		</Row>
	</TopAppBar>
</div>

<style lang="scss">
	.top-app-bar-container {
		width: 100%;
		background-color: var(--mdc-theme-background, #fff);

		overflow: auto;
		display: inline-block;
	}

	@media (max-width: 480px) {
		.top-app-bar-container {
			margin-right: 0;
		}
	}

	:global {
		body,
		html {
			padding: 0;
			margin: 0;
		}
	}
</style>
