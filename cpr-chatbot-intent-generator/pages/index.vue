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
	<div v-if="errorData.display" class="z-40 fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-30">
		<div class="flex justify-center h-screen">
			<div class="sm:w-1/2 sm:mt-12 h-fit mt-3 bg-white rounded-md">
				<div class="p-5">
					<h1 class="text-xl font-semibold mb-4 pb-2 border-b">{{ errorData.title }}</h1>

					<div class="flex flex-col">
						<p class="mt-1 text-gray-800">
							{{ errorData.message }}
						</p>
						<div id="output-display-div" class="font-light max-h-80 p-2 rounded bg-gray-200">
							<p>{{ errorData.codeText }}</p>
						</div>
					</div>

					<div class="flex justify-end mt-5">
						<button class="button" @click="errorData.display = false">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
		<div class="max-w-2xl">
			<div class="space-y-5 md:space-y-8">
				<div class="space-y-3">
					<h1 class="text-4xl">Chatbot's answer</h1>
					<blockquote class="relative border-s-4 ps-4 sm:ps-6">
						<p class="text-gray-800 sm:text-xl">
							<em>{{ currentAnswer?.answer }}</em>
						</p>
					</blockquote>
				</div>

				<div class="space-y-3">
					<h3 class="text-2xl font-semibold">Enter you questions</h3>
					<div class="inline-flex gap-x-2 w-full">
						<input type="text" id="input-user-question" @keypress.enter="saveQuestion"
							class="py-3 px-4 block w-full border border-gray-200 focus:outline-primary-500 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
							placeholder="How do I ..." aria-describedby="input-user-question-submit">
						<button type="button" @click="saveQuestion" class="button" :disabled="saving">
							Add
						</button>
					</div>
					<p class="mt-2 text-sm text-gray-500" id="input-user-question-submit">
						You can press ENTER to add the question.
					</p>
				</div>

				<div class="space-y-3">
					<h3 class="text-2xl font-semibold">Your questions</h3>

					<ul class="max-h-80 sm:h-80 divide-y overflow-y-scroll">
						<li v-for="example of examples" :key="example">
							<div class="inline-flex items-center justify-between w-full px-2 py-1">
								<p class="text-lg text-gray-800">{{ example }}</p>
								<button class="flex items-center p-2" @click="removeExample(example)">
									<Icon class="size-6" name="lucide:x" />
								</button>
							</div>
						</li>
					</ul>
				</div>

				<div class="flex flex-row items-center justify-center gap-2 pt-4 ">
					<button type="button" @click="downloadIntentsFile" class="button" title="Download intents">
						<Icon class="size-5" name="lucide:download" />
						<p class="hidden md:block">Download intents</p>
					</button>
					<button type="button" @click="saveQuestions" class="button" title="Save questions">
						<Icon v-if="saving" class="size-5 animate-spin" name="lucide:loader-circle" />
						<Icon v-else class="size-5" name="lucide:save" />
					</button>
					<button type="button" @click="nextAnswer" class="button" title="Next answer">
						<p class="hidden md:block">Next answer</p>
						<Icon class="size-5" name="lucide:arrow-right" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>