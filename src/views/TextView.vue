<template lang="pug">
.view
	s-textarea(
		v-model="text"
		:placeholder="placeholder"
	)
</template>

<script lang="ts" setup>
import { computed, watchEffect } from 'vue'

import type { AuthorsList, Hashtags } from '../types/index.js'

import { STextarea } from '../components/index.js'
import { useVModels } from '../composables/index.js'
import authorsData from '../data/authors.json'
import hashtagsDate from '../data/hashtags.json'
import { $post } from '../stores/index.js'

const authors = authorsData as AuthorsList
const hashtags = hashtagsDate as Hashtags

const {
	title,
	year,
	medium,
	location,
	dimensions,
	author,
	text
} = useVModels($post)

watchEffect(() => {
	if (
		!title.value &&
		!year.value &&
		!medium.value &&
		!location.value &&
		!dimensions.value
	) {
		text.value = ''
		return
	}
	text.value = ''
	text.value += title.value ? `${title.value.replaceAll('\n', ', ')}` : ''
	if (year.value) {
		text.value += `, ${year.value}`
	}
	text.value += '\n'
	if (author.value) {
		text.value += `${authors[author.value].fullname}`
	}
	text.value += '\n\n'
	if (medium.value) {
		text.value += `${medium.value.replaceAll('\n', ' ')}. `
	}
	if (location.value) {
		let formattedLocation = location.value
			.replaceAll('\n', ', ')
			.replaceAll('The ', '')
		text.value += `Lives at the ${formattedLocation}.`
	}
	text.value += '\n\n'
	if (dimensions.value) {
		text.value += `${dimensions.value}\n\n`
	}
	text.value += `#${hashtags.join(' #')} `
	text.value += `#${authors[author.value].hashtags.join(' #')}`
})

const placeholder = computed(() => {
	return 'Suprematist Composition, 1920s\n' +
		'Kazimir Severinovich Malevich\n\n' +
		'Oil on canvas. ' +
		'Lives at the Private Collection, Moscow, Russia.\n\n' +
		'42 × 19 1/5″ \n106.9 × 48.7 cm\n\n' +
		`#${hashtags.join(' #')} ` +
		`#${authors[author.value].hashtags.join(' #')}`
})
</script>

<style lang="sass" scoped>
.view
	box-sizing: border-box
	max-width: 1080px
	height: fit-content
</style>
