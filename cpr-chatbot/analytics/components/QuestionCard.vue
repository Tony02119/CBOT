<script setup lang="ts">
const props = defineProps<{
	question: QuestionType,
}>();

const htmlId = 'popup-question-' + props.question.id;
const refHtmlId = '#' + htmlId;
</script>

<template>
	<div class="question-card group flex flex-col w-80 p-5 md:p-6 focus:outline-none"
		aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-scale-animation-modal"
		:data-hs-overlay="refHtmlId">
		<div class="flex items-start gap-x-4 mb-4">
			<div class="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
				<Icon name="lucide:message-circle" class="size-5 text-white" />
			</div>
			<div class="flex-1 min-w-0">
				<h3 class="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 leading-tight">
					{{ question.content }}
				</h3>
				<div class="flex items-center gap-x-2 mt-2">
					<span class="badge">
						Position {{ question.conv_position }}
					</span>
				</div>
			</div>
			<div class="flex-shrink-0">
				<Icon class="size-5 text-gray-400 group-hover:text-primary-500 transition-colors duration-300 group-hover:translate-x-1" name="lucide:chevron-right" />
			</div>
		</div>
		<p class="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
			Click for more information
		</p>
	</div>

	<div :id="htmlId"
		class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none modal-backdrop"
		role="dialog" tabindex="-1" aria-labelledby="hs-scale-animation-modal-label">
		<div
			class="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-300 sm:max-w-2xl sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
			<div class="modal-content w-full flex flex-col pointer-events-auto">
				<div class="flex justify-between items-center py-4 px-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
					<div class="flex items-center gap-x-3">
						<div class="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
							<Icon name="lucide:info" class="size-4 text-white" />
						</div>
						<h3 id="hs-scale-animation-modal-label" class="font-bold text-gray-800 text-lg">
						Question informations
						</h3>
					</div>
					</h3>
					<button type="button"
						class="size-10 inline-flex justify-center items-center gap-x-2 rounded-xl border border-transparent bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
						aria-label="Close" :data-hs-overlay="refHtmlId">
						<span class="sr-only">Close</span>
						<Icon class="size-5" name="lucide:x" />
					</button>
				</div>

				<div class="p-6 overflow-y-auto space-y-6">
					<div class="flex items-center gap-x-3">
						<div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
							<Icon name="lucide:hash" class="size-3 text-white" />
						</div>
						<div>
							<p class="font-semibold text-gray-800">Position in conversation</p>
							<p class="text-primary-600 font-medium">{{ question.conv_position }}</p>
						</div>
					</div>

					<div class="space-y-3">
						<div class="flex items-center gap-x-2">
							<Icon name="lucide:help-circle" class="size-5 text-primary-500" />
							<h4 class="text-lg font-semibold text-gray-800">Question</h4>
						</div>
						<div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
							<p class="text-gray-800 leading-relaxed">
								{{ question.content }}
							</p>
						</div>
					</div>

					<div class="space-y-3">
						<div class="flex items-center gap-x-2">
							<Icon name="lucide:message-square" class="size-5 text-green-500" />
							<h4 class="text-lg font-semibold text-gray-800">Answer</h4>
						</div>
						<div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
							<p class="text-gray-800 leading-relaxed">
								{{ question.answer }}
							</p>
						</div>
					</div>
				</div>

				<div class="flex justify-end items-center gap-x-3 py-4 px-6 border-t border-gray-200 bg-gray-50">
					<button type="button"
						class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-xl border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
						:data-hs-overlay="refHtmlId">
						<Icon name="lucide:x" class="size-4" />
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
</template>