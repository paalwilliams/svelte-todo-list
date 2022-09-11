<script lang="ts">
	import Button from '@smui/button';
	import Textfield from '@smui/textfield';
	import { addDBItem } from '../shared/utils';
	let value: string | null = null;

	const handleToDoFormChange = async (e: Event) => {
		if (value) await addDBItem({ title: value, completed: false });
	};
</script>

<div class="columns margins">
	<div>
		<Textfield variant="filled" bind:value label="Label" />
		<Button on:click={handleToDoFormChange}>Submit</Button>
	</div>
</div>
