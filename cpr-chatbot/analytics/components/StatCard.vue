<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<div class="flex flex-col w-72 bg-white border shadow-sm rounded-xl">
		<div class="p-4 md:p-5">
			<div class="flex items-center gap-x-2 empty:hidden">
				<p class="text-xs uppercase tracking-wide text-gray-500">
					{{ title }}
				</p>
			</div>

			<div class="mt-1 flex items-center gap-x-2">
				<h3 class="text-xl sm:text-2xl font-medium text-gray-800">
					<slot />
				</h3>
			</div>
		</div>
	</div>
</template>