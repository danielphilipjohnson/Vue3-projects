<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    created: {type:Function as PropType<Function>},
    content: {type:String as PropType<string>, required: true},
	classes: {type:String as PropType<string>, required: true},
  }
})
</script>

<template>
	<button
	  type="button"
		@click="this.$emit('buttonClick')"
		class="border border-gray-200"
		:class="classes"
	>{{content}}</button>
</template>