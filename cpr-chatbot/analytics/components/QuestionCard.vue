<script setup lang="ts">
const props = defineProps<{
	question: QuestionType,
}>();

const htmlId = 'popup-question-' + props.question.id;
const refHtmlId = '#' + htmlId;
</script>

<template>
	<div class="group flex flex-col w-80 bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition"
		aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal"
		:data-hs-overlay="refHtmlId">
		<div class="p-4 md:p-5">
			<div class="flex justify-between items-center gap-x-3">
				<div class="flex flex-col gap-y-2">
					<h3 class="w-64 group-hover:text-red-600 font-semibold text-gray-800 truncate">
						{{ question.content }}
					</h3>
					<p class="text-sm text-gray-500">
						Click for more informations
					</p>
				</div>
				<div>
					<Icon class="size-5" name="lucide:chevron-right" />
				</div>
			</div>
		</div>
	</div>

	<div :id="htmlId"
		class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
		role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
		<div
			class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
			<div class="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
				<div class="flex justify-between items-center py-3 px-4 border-b">
					<h3 id="hs-scale-animation-modal-label" class="font-bold text-gray-800">
						Question informations
					</h3>
					<button type="button"
						class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
						aria-label="Close" :data-hs-overlay="refHtmlId">
						<span class="sr-only">Close</span>
						<Icon class="size-4" name="lucide:x" />
					</button>
				</div>

				<div class="p-4 overflow-y-auto">
					<div class="inline-flex gap-x-1 text-lg">
						<p class="font-medium">Position in conversation:</p>
						<p>{{ question.conv_position }}</p>
					</div>

					<h4 class="mt-2 text-lg">Question</h4>
					<p class="ml-1 text-gray-800">
						{{ question.content }}
					</p>

					<h4 class="mt-2 text-lg">Answer</h4>
					<p class="ml-1 text-gray-800">
						{{ question.answer }}
					</p>
				</div>

				<div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
					<button type="button"
						class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						:data-hs-overlay="refHtmlId">
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>