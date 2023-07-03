<template>
  <datepicker
    v-model="value"
    :clearable="true"
    ref="date_picker_ref"
  />
</template>

<script setup>
import Datepicker from 'vue3-datepicker'
import {computed, ref, watch} from "vue";

const props = defineProps({modelValue: [Date]})
const emit = defineEmits(['update:modelValue'])

const date_picker_ref = ref();
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

watch(value, () => {
  date_picker_ref.value.$el.querySelector("input").blur();
})
</script>

<style scoped>

</style>
