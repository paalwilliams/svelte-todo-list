<script lang="ts">
	import Card, { Content, Actions } from '@smui/card';
	import Button from '@smui/button';
	import type { IToDoItem } from 'src/types';
	import { setCompleted } from '../shared/utils';
	import Loading from './Layout/Loading.svelte';
	export let todo: IToDoItem;
	$: ({ title, completed, _id, _rev } = todo);
</script>

{#if title && _id && _rev}
	<div class="card-container">
		<Card>
			<Content>{title}</Content>
			<Content>Status: {completed ? 'Completed' : 'To Do'}</Content>
			<Actions>
				<Button
					on:click={() => {
						if (_id && _rev) {
							setCompleted({ _id, completed: !completed, _rev, title });
						}
					}}
				>
					<i class="material-icons" aria-hidden="true">{completed ? 'cancel' : 'check'}</i>
				</Button>
			</Actions>
		</Card>
	</div>
{:else}
	<Loading />
{/if}

<style>
	div.card-container {
		margin: 5px;
	}
</style>
