<template>
	<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
		<div class="max-w-4xl px-4 pt-8 lg:pt-12 pb-16 sm:px-6 lg:px-8 mx-auto">
			<div class="max-w-3xl mx-auto">
				<!-- Header -->
				<div class="text-center mb-12">
					<div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
						<Icon name="lucide:help-circle" class="size-4 mr-2" />
						Help & Information
					</div>
					<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How can we help?</h1>
					<p class="text-lg text-gray-600">Everything you need to know about CCIG</p>
				</div>

				<div class="space-y-8">
					<div class="card p-8">
						<div class="flex items-start space-x-4">
							<div class="flex-shrink-0">
								<div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
									<Icon name="lucide:info" class="size-6 text-white" />
								</div>
							</div>
							<div class="flex-1">
								<h3 class="text-2xl font-semibold text-gray-900 mb-4">What is CCIG?</h3>
								<p class="text-lg text-gray-700 leading-relaxed">
						CPR Chatbot Intent Generator (CCIG) is a website used to generate a chabot's training data
						thanks to users participation. The chatbot is available on the following website ADD WEBSITE
						and answer questions about CPR, mouth-to-mouth, and globally how to react when seeing a victim
						of cardiac arrest.
					</p>
							</div>
						</div>
				</div>

					<div class="card p-8">
						<div class="flex items-start space-x-4">
							<div class="flex-shrink-0">
								<div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
									<Icon name="lucide:play-circle" class="size-6 text-white" />
								</div>
							</div>
							<div class="flex-1">
								<h3 class="text-2xl font-semibold text-gray-900 mb-4">How to use it</h3>
								<p class="text-lg text-gray-700 leading-relaxed">
						The website will display one of the chatbot answer, and you will be asked to input
						a question that could lead to this answer. You can submit as much questions as you want
						before going to the next prompt.
					</p>
							</div>
						</div>
					</div>

					<!-- Quick Tips -->
					<div class="card p-8">
						<div class="flex items-start space-x-4">
							<div class="flex-shrink-0">
								<div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
									<Icon name="lucide:lightbulb" class="size-6 text-white" />
								</div>
							</div>
							<div class="flex-1">
								<h3 class="text-2xl font-semibold text-gray-900 mb-4">Quick Tips</h3>
								<div class="space-y-3">
									<div class="flex items-start space-x-3">
										<Icon name="lucide:check-circle" class="size-5 text-green-500 mt-0.5 flex-shrink-0" />
										<p class="text-gray-700">Think of natural ways people might ask about the topic</p>
									</div>
									<div class="flex items-start space-x-3">
										<Icon name="lucide:check-circle" class="size-5 text-green-500 mt-0.5 flex-shrink-0" />
										<p class="text-gray-700">Use different phrasings and question styles</p>
									</div>
									<div class="flex items-start space-x-3">
										<Icon name="lucide:check-circle" class="size-5 text-green-500 mt-0.5 flex-shrink-0" />
										<p class="text-gray-700">Consider both formal and informal language</p>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>