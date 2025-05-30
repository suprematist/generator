<script lang="ts" setup>
import type { AuthorsList } from '../types/index.js'
import { computed, toRefs } from 'vue'
import { SAuthor } from '../components/index.js'
import authors from '../data/authors.json'

interface Props {
	username: string
}

const props = defineProps<Props>()
const { username } = toRefs(props)

const author = computed(() => (authors as AuthorsList)[username.value])
</script>

<template>
  <s-author
    :username="username"
    :fullname="author.fullname"
    :alias="author.alias"
  />
</template>
