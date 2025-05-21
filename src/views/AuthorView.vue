<template>
  <s-author
    :username="username"
    :fullname="author.fullname"
    :alias="author.alias"
  />
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'

import type { AuthorsList } from '../types/index.js'

import { SAuthor } from '../components/index.js'
import authors from '../data/authors.json'

interface Props {
	username: string
}

const props = defineProps<Props>()
const { username } = toRefs(props)

const author = computed(() => (authors as AuthorsList)[username.value])
</script>
