<script setup lang="ts">

const currentAnswer = ref((await useFetch('/api/get_intent')).data.value);
const examples = ref(new Array<string>());
const saving = ref(false);
const errorData = ref({
	display: false,
	title: 'Server error',
	message: '',
	codeText: '',
});

onMounted(async () => {
	const storedExamples = localStorage.getItem('examples');
	if (storedExamples) {
		examples.value = JSON.parse(storedExamples) as Array<string>;
	}
	localStorage.removeItem('examples');
});

onUnmounted(() => {
	if (examples.value.length) {
		localStorage.setItem('examples', JSON.stringify(examples.value));
	}
});

function saveQuestion() {
	if (saving.value) return;

	const input = document.getElementById('input-user-question') as HTMLInputElement;
	if (!input.value) return;

	if (!examples.value.includes(input.value)) examples.value.push(input.value);
	input.value = '';
}

function removeExample(example: string) {
	examples.value = examples.value.filter(e => e !== example);
}

function downloadIntentsFile() {
	console.log('Generating the file');
}

async function saveQuestions() {
	if (!examples.value.length) return;

	saving.value = true;
	for (const question of examples.value) {
		try {
			await $fetch('/api/add_question', {
				method: 'POST',
				body: {
					intent_id: currentAnswer.value?.id,
					question: question,
				},
			});
		}
		catch (err) {
			// TODO Display a popover to warn the user that a server-side error occured.
			const typedErr = err as { data: { message: string, data: string } };
			errorData.value.display = true;
			errorData.value.message = 'Error while saving the following question:';
			errorData.value.codeText = typedErr.data.data;
			saving.value = false;
			return;
		}
		removeExample(question);
	}

	saving.value = false;
}

function nextAnswer() {
	saveQuestions();
	console.log('Getting next question');
}
</script>

<template>
	<div v-if="errorData.display" class="z-50 fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
		<div class="w-full max-w-md">
			<div class="bg-white rounded-2xl shadow-2xl border border-gray-100">
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div class="flex-shrink-0">
							<Icon name="lucide:alert-circle" class="size-6 text-red-500" />
						</div>
						<h1 class="ml-3 text-xl font-semibold text-gray-900">{{ errorData.title }}</h1>
					</div>

					<div class="flex flex-col">
						<p class="text-gray-700 mb-4">
							{{ errorData.message }}
						</p>
						<div class="bg-gray-50 rounded-xl p-4 max-h-40 overflow-y-auto border border-gray-200">
							<p class="text-sm text-gray-600 font-mono">{{ errorData.codeText }}</p>
						</div>
					</div>

					<div class="flex justify-end mt-6">
						<button class="button" @click="errorData.display = false">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
		<div class="max-w-4xl px-4 pt-8 lg:pt-12 pb-16 sm:px-6 lg:px-8 mx-auto">
			<div class="max-w-3xl mx-auto">
				<div class="space-y-8 md:space-y-12">
					<!-- Header Section -->
					<div class="text-center space-y-4">
						<div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
							<Icon name="lucide:message-circle" class="size-4 mr-2" />
							Intent Generator
						</div>
						<h1 class="text-4xl md:text-5xl font-bold text-gray-900">Chatbot's Answer</h1>
						<p class="text-lg text-gray-600 max-w-2xl mx-auto">Help us improve our chatbot by suggesting questions that could lead to this answer.</p>
					</div>

					<!-- Answer Card -->
					<div class="card p-8">
						<div class="flex items-start space-x-4">
							<div class="flex-shrink-0">
								<div class="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
									<Icon name="lucide:bot" class="size-6 text-white" />
								</div>
							</div>
							<blockquote class="flex-1">
								<p class="text-gray-800 text-xl leading-relaxed italic">
							<em>{{ currentAnswer?.answer }}</em>
						</p>
					</blockquote>
						</div>
				</div>

					<!-- Input Section -->
					<div class="card p-6">
						<h3 class="text-2xl font-semibold text-gray-900 mb-4">Enter your questions</h3>
						<div class="flex gap-3">
							<input type="text" id="input-user-question" @keypress.enter="saveQuestion"
								class="input-field flex-1"
								placeholder="How do I perform CPR?" aria-describedby="input-user-question-submit">
							<button type="button" @click="saveQuestion" class="button" :disabled="saving">
								<Icon name="lucide:plus" class="size-4" />
								Add
						</button>
					</div>
						<p class="mt-3 text-sm text-gray-500" id="input-user-question-submit">
						You can press ENTER to add the question.
					</p>
				</div>

					<!-- Questions List -->
					<div class="card p-6">
						<div class="flex items-center justify-between mb-4">
							<h3 class="text-2xl font-semibold text-gray-900">Your questions</h3>
							<div class="badge">
								{{ examples.length }} question{{ examples.length !== 1 ? 's' : '' }}
							</div>
						</div>

						<div v-if="examples.length === 0" class="text-center py-12">
							<Icon name="lucide:message-square-plus" class="size-12 text-gray-400 mx-auto mb-4" />
							<p class="text-gray-500">No questions added yet. Start by adding your first question above!</p>
						</div>

						<ul v-else class="space-y-3 max-h-80 overflow-y-auto">
						<li v-for="example of examples" :key="example">
								<div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors duration-200">
									<p class="text-gray-800 flex-1 mr-4">{{ example }}</p>
									<button class="flex items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200" @click="removeExample(example)">
										<Icon class="size-5" name="lucide:x" />
								</button>
							</div>
						</li>
					</ul>
				</div>

					<!-- Action Buttons -->
					<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
						<button type="button" @click="downloadIntentsFile" class="button w-full sm:w-auto" title="Download intents">
							<Icon class="size-5" name="lucide:download" />
							<span class="hidden md:inline">Download intents</span>
							<span class="md:hidden">Download</span>
					</button>
						<button type="button" @click="saveQuestions" class="button w-full sm:w-auto" title="Save questions" :disabled="!examples.length">
							<Icon v-if="saving" class="size-5 animate-spin" name="lucide:loader-circle" />
							<Icon v-else class="size-5" name="lucide:save" />
							<span class="hidden md:inline">Save questions</span>
							<span class="md:hidden">Save</span>
					</button>
						<button type="button" @click="nextAnswer" class="button w-full sm:w-auto" title="Next answer">
							<span class="hidden md:inline">Next answer</span>
							<span class="md:hidden">Next</span>
							<Icon class="size-5" name="lucide:arrow-right" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>