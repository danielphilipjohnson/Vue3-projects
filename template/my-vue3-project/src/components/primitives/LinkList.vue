<template>
  <ul class="flex flex-col space-y-2 mb-8">
    <li class="mb-1 font-bold" v-for="link in links" :key="link.content">
      <Link
        v-if="!link.external"
        :link="link.link"
        :content="link.content"
        :white="link.white"
      />
      <External-Link
        v-else
        :link="link.link"
        :content="link.content"
        :alt="link.alt"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
}
</script>