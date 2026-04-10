<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state'

	const onClick = (path: string) => {
		goto(path);
	}

</script>

<nav class="w-[270px] h-full shrink-0 p-6 border-r-[#3A5A40]/[.2] border-r">
	<h1 class=" text-2xl font-bold pb-12 text-[#3A5A40]">FocusBloom</h1>

	<div class="section">
		<div class="heading">Main Menu</div>

		<button
			class={`page ${page.url.pathname === '/pomodoro' ? 'selected' : 'unselected'}`}
			onclick={() => onClick('/pomodoro')}
			disabled={page.url.pathname === '/pomodoro'}
		>
			<i class="icon icon-pomodoro"></i>
			<span>Pomodoro</span>
		</button>

		<button
			class={`page ${page.url.pathname === '/notes' ? 'selected' : 'unselected'}`}
			onclick={() => onClick('/notes')}
			disabled={page.url.pathname === '/notes'}
		>
			<i class="icon icon-notes"></i>
			<span>Notes</span>
		</button>

		<div class="page unselected">
			<i class="icon icon-tasks"></i>
			<span>Tasks</span>
		</div>
	</div>

	<div class="section">
		<div class="heading">Preferences</div>

		<div class="page unselected">
			<i class="icon icon-setting"></i>
			<span>Settings</span>
		</div>

		<div class="page unselected">
			<i class="icon icon-help"></i>
			<span>Help</span>
		</div>
	</div>
</nav>

<style>
	.section:not(:last-child) {
		margin-bottom: 24px;
	}

	.heading {
		padding-bottom: 8px;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		font-size: 12px;
		color: #6C757D;
		font-weight: 700;
	}

	.page {
		display: flex;
		width: 100%;
		align-items: center;
		padding-block: 10px;
		padding-inline: 16px;
		color: #3A5A40;
		border-radius: 12px;
		cursor: pointer;
		font-weight: 500;
		font-size: 16px;

		transition: all .2s ease-in;

		&:not(:last-child) {
			margin-bottom: 12px;
		}

		&.unselected:hover {
			cursor: pointer;
			background-color: rgba(182, 178, 161, 0.2);
			transform: translateY(-2px);
		}



		&.selected {
			background-color: #FEFCF3;
			
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
			cursor: default;
		}

		& i.icon {
			margin-right: 12px;
		}
	}
</style>
