<template>
	<section class="view">
		<header class="view__header">
			<s-textarea
				v-model="title"
				placeholder="Suprematist Composition"
				:rendering="rendering"
			></s-textarea>
		</header>
		<main class="view__main">
			<dl class="view__dl">
				<template v-if="!rendering || (rendering && year)">
					<dt class="view__dt">Year</dt>
					<dd class="view__dd">
						<s-textarea
							v-model="year"
							placeholder="1920s"
							:rendering="rendering"
						></s-textarea>
					</dd>
				</template>
				<template v-if="!rendering || (rendering && medium)">
					<dt class="view__dt">Medium</dt>
					<dd class="view__dd">
						<s-textarea
							v-model="medium"
							placeholder="Oil on canvas"
							:rendering="rendering"
						></s-textarea>
					</dd>
				</template>
				<template v-if="!rendering || (rendering && dimensions)">
					<dt class="view__dt">Dimensions</dt>
					<dd class="view__dd">
						<s-textarea
							v-model.dimensions="dimensions"
							placeholder="42 × 19 1/5″ \n106.9 × 48.7 cm"
							:rendering="rendering"
						></s-textarea>
					</dd>
				</template>
				<template v-if="!rendering || (rendering && location)">
					<dt class="view__dt">Location</dt>
					<dd class="view__dd">
						<s-textarea
							v-model="location"
							placeholder="Private collection\nMoscow, Russia"
							:rendering="rendering"
						></s-textarea>
					</dd>
				</template>
			</dl>
		</main>
		<footer class="view__footer">
			<img class="view__logo" src="../assets/logo.svg" />
			<div>
				<s-button class="view__author" @click="openAuthorsList()">
					<author-view :username="author"></author-view>
				</s-button>
			</div>
		</footer>
		<authors-list-view
			v-model:show="showAuthorsList"
			v-model:selected="author"
		></authors-list-view>
	</section>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'

import { SButton, STextarea } from '../components/index.js'
import { useVModels } from '../composables/index.js'
import { $post } from '../stores/index.js'
import AuthorView from './AuthorView.vue'
import AuthorsListView from './AuthorsListView.vue'

interface Props {
	rendering: boolean
}

const props = defineProps<Props>()
const { rendering } = toRefs(props)

const {
	title,
	year,
	medium,
	dimensions,
	location,
	author
} = useVModels($post)

const showAuthorsList = ref(false)

function openAuthorsList (): void {
	showAuthorsList.value = true
}
</script>

<style lang="sass" scoped>
.view
	position: relative
	box-sizing: border-box
	display: flex
	flex-direction: column
	width: 1080px
	height: 1080px
	padding: 40px
	background: var(--s-color-post-background)

.view__header
	display: inline-flex
	margin-left: 360px

.view__main
	margin-top: 96px

.view__dl
	display: grid
	grid-template-columns: 360px 1fr
	gap: 0

.view__dt
	padding: 10px 0 9px
	font-style: italic
	color: var(--s-color-muted)

.view__dd
	display: inline-flex
	padding: 10px 0 9px

.view__dt,
.view__dd
	border-bottom: 1px solid var(--s-color-border)

.view__dt:last-of-type,
.view__dd:last-of-type
	padding-bottom: 0
	border-bottom: none

.view__dt:first-of-type,
.view__dd:first-of-type
	padding-top: 0

.view__footer
	display: grid
	flex: 1
	grid-template-columns: 360px 1fr
	gap: 0
	align-items: flex-end

.view__logo
	margin-bottom: 4px

.view__author
	--s-button-background: var(--s-color-post-button-background)
	--s-button-hover-background: var(--s-color-post-button-hover-background)
	--s-button-active-background: var(--s-color-post-button-active-background)
</style>
