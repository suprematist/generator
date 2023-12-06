<template lang="pug">
ul.s-authors-list
  li.s-authors-list__item(
    v-for="(author, username) in authors"
    :id="'author-' + username"
		:key="username"
    :class="{ 's-authors-list__item--selected': username === modelValue }"
  )
    s-button(@click="selectAuthor(String(username))")
      s-author(
        :username="String(username)"
        :fullname="author.fullname"
        :alias="author.alias"
      )
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'

import type { AuthorsList } from '../types/index.js'

import { SAuthor, SButton } from './index.js'

interface Props {
	modelValue: string
	authors: AuthorsList
}

interface Emits {
	(event: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedAuthor = useVModel(props, 'modelValue', emit)

function selectAuthor (username: string): void {
	selectedAuthor.value = username
}
</script>

<style lang="sass" scoped>
.s-authors-list
	display: flex
	flex-direction: column
	gap: 96px

.s-authors-list__item .s-button
	--s-button-background: var(--s-color-post-button-background)
	--s-button-hover-background: var(--s-color-post-button-hover-background)
	--s-button-active-background: var(--s-color-post-button-active-background)

.s-authors-list__item--selected
	.s-button
		--s-button-background: var(--s-color-post-button-active-background)
		--s-button-hover-background: var(--s-color-post-button-active-background)
		--s-button-active-background: var(--s-color-post-button-active-background)
</style>
