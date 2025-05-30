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

<template>
	<div class="s-author">
		<img class="s-author__avatar" :src="avatarUrl" />
		<div>
			<div class="s-author__name" v-html="formattedFullname"></div>
			<div class="s-author__alias" v-html="alias"></div>
		</div>
	</div>
</template>

<style scoped>
.s-author {
	display: flex;
	flex-direction: column;
	gap: 48px;
	min-width: 300px;
}

.s-author__avatar {
	width: 96px;
	height: 96px;
}

.s-author__alias {
	color: var(--s-color-muted);
}
</style>
