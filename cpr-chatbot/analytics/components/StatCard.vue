<script setup lang="ts">
defineProps({
	title: {
		type: String,
		default: '',
	},
});
</script>

<template>
	<div class="stat-card flex flex-col w-72 p-6 md:p-7 group">
		<div class="flex items-center gap-x-3 mb-4">
			<div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
				<Icon name="lucide:bar-chart-3" class="size-6 text-white" />
			</div>
			<div class="flex items-center gap-x-2 empty:hidden">
				<p class="text-sm uppercase tracking-wider text-gray-600 font-semibold">
					{{ title }}
				</p>
			</div>
		</div>

		<div class="flex items-center gap-x-2">
			<h3 class="text-3xl sm:text-4xl font-bold text-gradient">
				<slot />
			</h3>
		</div>
	</div>
</template>