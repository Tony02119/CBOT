<script setup lang="ts">
const { data: questionsCount } = await useFetch('/api/db/questionsCount');
const { data: highestConvLength } = await useFetch('/api/db/highestConvLength');
const { data: questions } = await useFetch('/api/db/getQuestions');
</script>

<template>
	<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
		<div class="px-4 pt-8 lg:pt-12 pb-16 sm:px-6 lg:px-8 mx-auto max-w-7xl">
		<div class="space-y-5 md:space-y-8">
				<!-- Header Section -->
				<div class="text-center space-y-4">
					<div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
						<Icon name="lucide:bar-chart-3" class="size-4 mr-2" />
						CPR Chatbot Analytics
					</div>
					<h1 class="text-4xl md:text-5xl font-bold text-gray-900">Analytics Dashboard</h1>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto">Monitor and analyze chatbot interactions to improve user experience and response quality.</p>
				</div>

				<!-- Statistics Cards -->
				<div class="w-full py-8 sm:px-6 lg:py-12 mx-auto">
					<div class="flex flex-row flex-wrap justify-center gap-6 sm:gap-8">
						<StatCard title="Questions asked">
							{{ questionsCount }}
						</StatCard>

						<StatCard title="Highest conversation length">
							{{ highestConvLength || 0 }}
							{{ highestConvLength && highestConvLength === 1 ? "question" : "questions" }}
						</StatCard>
					</div>
				</div>

				<!-- Questions Section -->
				<div class="space-y-6">
					<div class="text-center">
						<h2 class="text-3xl font-bold text-gray-900 mb-2">Recent Questions</h2>
						<p class="text-gray-600">Explore the questions users have asked and their corresponding answers</p>
					</div>

					<div class="w-full py-8 sm:px-6 lg:py-12 mx-auto">
						<div class="flex flex-row flex-wrap justify-center md:justify-start gap-6 sm:gap-8">
							<div v-if="!questions?.length" class="w-full text-center py-12">
								<Icon name="lucide:message-square-plus" class="size-16 text-gray-400 mx-auto mb-4" />
								<p class="text-xl text-gray-500 mb-2">No questions yet</p>
								<p class="text-gray-400">Questions will appear here as users interact with the chatbot</p>
							</div>
						<QuestionCard v-for="quest of questions" :key="quest.id" :question="quest" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
