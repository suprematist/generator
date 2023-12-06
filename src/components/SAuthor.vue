<template lang="pug">
.s-author
	img.s-author__avatar(:src="avatarUrl")
	div
		.s-author__name(v-html="formattedFullname")
		.s-author__alias(v-html="alias")
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'

interface Props {
	username: string
	fullname: string
	alias?: string
}

const props = defineProps<Props>()
const { username, fullname, alias } = toRefs(props)

const avatarUrl = computed(() => {
	return `/authors/${username.value}.png`
})

const formattedFullname = computed(() => {
	return alias.value ? fullname.value : fullname.value.replaceAll(' ', '<br>')
})
</script>

<style lang="sass" scoped>
.s-author
	display: flex
	flex-direction: column
	gap: 48px
	min-width: 300px

.s-author__avatar
	width: 96px
	height: 96px

.s-author__alias
	color: var(--s-color-muted)
</style>
