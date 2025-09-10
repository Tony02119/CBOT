<script setup lang="ts">
const { data: questionsCount } = await useFetch('/api/db/questionsCount');
const { data: highestConvLength } = await useFetch('/api/db/highestConvLength');
const { data: questions } = await useFetch('/api/db/getQuestions');
</script>

<template>
	<div class="px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-80 mx-auto">
		<div class="space-y-5 md:space-y-8">
			<div class="space-y-3">
				<h1 class="text-4xl">Analytics</h1>

				<div class="w-full py-10 sm:px-6 lg:py-14 mx-auto">
					<div class="flex flex-row flex-wrap justify-center gap-4 sm:gap-6">
						<StatCard title="Questions asked">
							{{ questionsCount }}
						</StatCard>

						<StatCard title="Highest conversation length">
							{{ highestConvLength || 0 }}
							{{ highestConvLength && highestConvLength === 1 ? "question" : "questions" }}
						</StatCard>
					</div>
				</div>

				<h2 class="text-2xl">Questions</h2>

				<div class="w-full py-10 sm:px-6 lg:py-14 mx-auto">
					<div class="flex flex-row flex-wrap justify-center md:justify-normal gap-4 sm:gap-6">
						<p v-if="!questions?.length" class="w-full text-center text-xl">No questions</p>
						<QuestionCard v-for="quest of questions" :key="quest.id" :question="quest" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
