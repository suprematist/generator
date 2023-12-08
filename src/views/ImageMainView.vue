<template lang="pug">
.view
	input.s-visually-hidden(
		id="main-image"
		type="file"
		accept="image/*"
		@change="uploadImage"
	)
	label.view__label(for="main-image")
		s-button.view__button(v-if="showUploadButton") Upload image
		img.view__image(
			v-else
			:src="imageUrl"
		)
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { SButton } from '../components/index.js'
import { useVModel } from '../composables/index.js'
import { $post } from '../stores/index.js'

const imageUrl = useVModel($post, 'image')

const showUploadButton = computed(() => !imageUrl.value)

function uploadImage (event: Event): void {
	let input = event.target as HTMLInputElement
	let file = input.files?.[0]

	if (!file) return

	imageUrl.value = URL.createObjectURL(file)
}
</script>

<style lang="sass" scoped>
.view
	position: relative
	box-sizing: border-box
	width: 1080px
	height: 1080px
	padding: 40px
	background: var(--s-color-post-background)

.view__label
	position: absolute
	inset: 0
	display: flex
	align-items: center
	justify-content: center
	padding: 40px
	cursor: pointer
	background: var(--s-color-post-background)
	transition: transform 0.15s ease-in

.view__button
	--s-button-background: var(--s-color-post-button-background)
	pointer-events: none

.view__label:hover
	transform: scale(1.005)

	.view__button
		--s-button-background: var(--s-color-post-button-hover-background)

.view__image
	max-width: 100%
	max-height: 100%
	object-fit: contain
	border-radius: 10px
</style>
