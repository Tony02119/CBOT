<script setup lang="ts">
const links = [{
	label: 'Home',
	to: '/',
	icon: 'lucide:house',
}, {
	label: 'Help',
	to: '/help',
	icon: 'lucide:circle-help',
}];

const currentRoute = ref(useRoute().path);

function updateCurrentRoute(path: string) {
	currentRoute.value = path;
}
</script>

<template>
	<header class="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full header-gradient backdrop-blur-sm border-b border-gray-200 sticky top-0 shadow-sm">
		<nav
			class="relative max-w-7xl w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-4 px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center gap-x-1">
				<NuxtLink class="flex items-center font-bold text-2xl text-gray-900 focus:outline-none focus:opacity-80 transition-opacity duration-200"
					to="https://nightingale.uni-mainz.de/" aria-label="Brand">
					<img alt="jgu-icon" class="mr-3 h-8 sm:h-10 transition-transform duration-200 hover:scale-105" src="/img/jgu-icon.svg" />
					<span class="self-center text-2xl font-bold whitespace-nowrap text-gradient">
						CPR-CA
					</span>
				</NuxtLink>

				<!-- Buttons for mobile menu. -->
				<button type="button"
					class="hs-collapse-toggle md:hidden relative size-10 flex justify-center items-center font-medium text-[12px] rounded-xl border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
					id="hs-header-base-collapse" aria-expanded="false" aria-controls="hs-header-base"
					aria-label="Toggle navigation" data-hs-collapse="#hs-header-base">
					<Icon class="hs-collapse-open:hidden size-5" name="lucide:align-justify" />
					<Icon class="hs-collapse-open:block shrink-0 hidden size-5" name="lucide:x" />
					<span class="sr-only">Toggle navigation</span>
				</button>
			</div>

			<div id="hs-header-base"
				class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
				aria-labelledby="hs-header-base-collapse">
				<div
					class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
					<div class="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
						<div class="grow">
							<div class="flex flex-col md:flex-row md:justify-end md:items-center md:gap-2">
								<NuxtLink v-for="link of links" :key="link.label"
									:class="currentRoute === link.to ? 'link-active' : 'link'" :to="link.to"
									:aria-current="currentRoute === link.to && 'page'"
									@click="updateCurrentRoute(link.to)">
									<Icon :name="link.icon" class="shrink-0 size-5 me-3 md:me-2 block md:hidden" />
									{{ link.label }}
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</header>
</template>