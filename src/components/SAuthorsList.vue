<script lang="ts" setup>
import type { AuthorsList } from '../types/index.js'
import { useVModel } from '@vueuse/core'
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

function selectAuthor(username: string): void {
	selectedAuthor.value = username
}
</script>

<template>
  <ul class="s-authors-list">
    <li
      v-for="(author, username) in authors"
      :id="'author-' + username"
      :key="username"
      class="s-authors-list__item"
      :class="{ 's-authors-list__item--selected': username === modelValue }"
    >
      <s-button @click="selectAuthor(String(username))">
        <s-author
          :username="String(username)"
          :fullname="author.fullname"
          :alias="author.alias"
        />
      </s-button>
    </li>
  </ul>
</template>

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
