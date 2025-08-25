<template>
	<div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
		<div class="max-w-4xl px-4 pt-8 lg:pt-12 pb-16 sm:px-6 lg:px-8 mx-auto">
		<div class="max-w-2xl">
				<!-- Header -->
				<div class="text-center mb-12">
					<div class="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-4">
						<Icon name="lucide:help-circle" class="size-4 mr-2" />
						Help & Information
					</div>
					<h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How can we help?</h1>
					<p class="text-lg text-gray-600">Everything you need to know about CPR-CA</p>
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
								<h3 class="text-2xl font-semibold text-gray-900 mb-4">What is CPR-CA?</h3>
								<p class="text-lg text-gray-700 leading-relaxed">
						CPR Chatbot Analytics (CPR-CA) is a website that display the use of the chatbot. It stores the
						questions asked by the users and the bot's answers depending on the users' questions in a
						database to then display them here.
								</p>
							</div>
						</div>
				</div>

					<div class="card p-8">
						<div class="flex items-start space-x-4">
							<div class="flex-shrink-0">
								<div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
									<Icon name="lucide:bot" class="size-6 text-white" />
								</div>
							</div>
							<div class="flex-1">
								<h3 class="text-2xl font-semibold text-gray-900 mb-4">The chatbot</h3>
								<p class="text-lg text-gray-700 leading-relaxed">
						The CPR Chatbot is available at the
									<NuxtLink class="text-primary-600 underline hover:text-primary-700 hover:no-underline font-medium"
							to="https://lifesaver.nightingale.uni-mainz.de/">
							Lifesaver</NuxtLink>
						website. You can talk with him in the <strong>Ask questions</strong> section.
								</p>
							</div>
						</div>
				</div>

					<div class="card p-8">
						<div class="flex items-start space-x-4">
							<div class="flex-shrink-0">
								<div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
									<Icon name="lucide:shield-check" class="size-6 text-white" />
								</div>
							</div>
							<div class="flex-1">
								<h3 class="text-2xl font-semibold text-gray-900 mb-4">Privacy</h3>
								<p class="text-lg text-gray-700 leading-relaxed">
						The chatbot's use is by default anonymous hence the data stored in this website is also
						anonymous.
						This means that we don't and can't know who uses the chatbot and who asked each question.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>